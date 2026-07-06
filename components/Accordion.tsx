"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;
        const headerId = `accordion-header-${index}`;
        return (
          <div key={index} className={styles.item}>
            <button
              id={headerId}
              type="button"
              className={styles.header}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span className={styles.title}>{item.title}</span>
              <ChevronDown
                size={20}
                className={`${styles.icon} ${isOpen ? styles.open : ""}`}
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={styles.content}
              style={{ maxHeight: isOpen ? "500px" : "0" }}
            >
              <div className={styles.innerContent}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
