"use client";

import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("@/components/CartDrawer"), { ssr: false });
const AgeGate = dynamic(() => import("@/components/AgeGate"), { ssr: false });

export { CartDrawer, AgeGate };
