"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ChevronDown size={20} aria-hidden />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div className={styles.innerContent}>{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
