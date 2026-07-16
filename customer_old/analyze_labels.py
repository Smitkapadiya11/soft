#!/usr/bin/env python3
"""
analyze_labels.py

Reads every "Sub_Order_Labels_*.pdf" (or any .pdf) in a folder, extracts
the customer City / State / Pincode and Order No. from each label page,
dedupes by Order No. (so re-uploading overlapping exports never double
counts), and writes an Excel report with:
  - Raw sheet: one row per unique order (Order No, City, State, Pincode)
  - Pincode summary: order count per pincode, with the most common city name
  - State summary: order count per state
  - City summary: order count per (city, state)

USAGE:
    python3 analyze_labels.py /path/to/folder/with/pdfs [output.xlsx]

If no folder is given, defaults to /mnt/user-data/uploads
If no output path is given, defaults to /mnt/user-data/outputs/label_analytics.xlsx

Requires: pdftotext (poppler-utils), pandas, openpyxl
"""

import sys
import re
import glob
import os
import subprocess
from collections import Counter

import pandas as pd

ADDR_PATTERN = re.compile(
    r"([A-Za-z][A-Za-z0-9 .'/-]{1,40}?),\s*([A-Za-z][A-Za-z ]{2,25}),\s*(\d{6})"
)
ORDER_NO_PATTERN = re.compile(r"Order No\.\s*\n?.*?(\d{10,25}_\d+)", re.DOTALL)
ORDER_NO_SIMPLE = re.compile(r"(\d{15,20}_\d+)")


import PyPDF2

def pdf_to_text(path):
    """Convert a PDF to text using PyPDF2, return the string."""
    text = ""
    with open(path, "rb") as f:
        reader = PyPDF2.PdfReader(f)
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\f"
    return text


def extract_orders_from_text(text, seller_pincodes):
    """Split text into per-order pages and extract (order_no, city, state, pincode)."""
    records = []
    pages = text.split("\f")
    for page in pages:
        if "Customer Address" not in page:
            continue

        # Order number: look in the Product Details / Order No. column
        order_match = ORDER_NO_SIMPLE.search(page)
        order_no = order_match.group(1) if order_match else None

        # Customer address block = everything before "If undelivered"
        idx = page.find("If undelivered")
        block = page[:idx] if idx != -1 else page

        matches = ADDR_PATTERN.findall(block)
        # Drop matches whose pincode is one of the seller/return addresses
        matches = [m for m in matches if m[2] not in seller_pincodes]
        if not matches:
            continue

        city, state, pin = matches[-1]  # closest to "If undelivered" = customer's own line
        city = city.strip().title()
        state = state.strip().title()

        records.append({
            "Order No": order_no,
            "City": city,
            "State": state,
            "Pincode": pin,
        })
    return records


def main():
    folder = sys.argv[1] if len(sys.argv) > 1 else "/mnt/user-data/uploads"
    out_path = sys.argv[2] if len(sys.argv) > 2 else "/mnt/user-data/outputs/label_analytics.xlsx"

    pdf_files = sorted(glob.glob(os.path.join(folder, "*.pdf")))
    if not pdf_files:
        print(f"No PDF files found in {folder}")
        sys.exit(1)

    print(f"Found {len(pdf_files)} PDF file(s) in {folder}")

    # Seller/return-address pincodes to exclude (add more here if you ship from
    # multiple warehouses with different pincodes).
    seller_pincodes = {"395010"}

    all_records = []
    for path in pdf_files:
        print(f"  Reading {os.path.basename(path)} ...")
        text = pdf_to_text(path)
        recs = extract_orders_from_text(text, seller_pincodes)
        print(f"    -> {len(recs)} label(s) parsed")
        all_records.extend(recs)

    if not all_records:
        print("No orders parsed from any file.")
        sys.exit(1)

    df = pd.DataFrame(all_records)

    # Dedupe by Order No. where we have one; keep rows with no order number as-is
    has_order_no = df["Order No"].notna()
    with_no = df[has_order_no].drop_duplicates(subset="Order No", keep="first")
    without_no = df[~has_order_no]
    df_dedup = pd.concat([with_no, without_no], ignore_index=True)

    print(f"\nTotal label pages parsed : {len(df)}")
    print(f"Unique orders after dedup: {len(df_dedup)}")

    # --- Summaries ---
    pin_summary = (
        df_dedup.groupby("Pincode")
        .agg(Orders=("Pincode", "size"))
        .reset_index()
    )
    # Most common City/State per pincode
    def top_city_state(sub):
        combo = sub.groupby(["City", "State"]).size().sort_values(ascending=False)
        city, state = combo.index[0]
        return pd.Series({"City": city, "State": state})

    city_state_per_pin = df_dedup.groupby("Pincode").apply(top_city_state).reset_index()
    pin_summary = pin_summary.merge(city_state_per_pin, on="Pincode")
    pin_summary = pin_summary.sort_values("Orders", ascending=False).reset_index(drop=True)

    state_summary = (
        df_dedup.groupby("State")
        .agg(Orders=("State", "size"))
        .reset_index()
        .sort_values("Orders", ascending=False)
        .reset_index(drop=True)
    )

    city_summary = (
        df_dedup.groupby(["City", "State"])
        .agg(Orders=("City", "size"))
        .reset_index()
        .sort_values("Orders", ascending=False)
        .reset_index(drop=True)
    )

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with pd.ExcelWriter(out_path, engine="openpyxl") as writer:
        pin_summary.to_excel(writer, sheet_name="Pincode Summary", index=False)
        city_summary.to_excel(writer, sheet_name="City Summary", index=False)
        state_summary.to_excel(writer, sheet_name="State Summary", index=False)
        df_dedup.to_excel(writer, sheet_name="Raw Orders", index=False)

    print(f"\nWritten: {out_path}")
    print("\nTop 15 pincodes:")
    print(pin_summary.head(15).to_string(index=False))


if __name__ == "__main__":
    main()
