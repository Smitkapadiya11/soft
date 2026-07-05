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
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <button className={styles.header} onClick={() => toggle(index)}>
            <span className={styles.title}>{item.title}</span>
            <ChevronDown 
              size={20} 
              className={`${styles.icon} ${openIndex === index ? styles.open : ""}`} 
            />
          </button>
          <div 
            className={styles.content}
            style={{ maxHeight: openIndex === index ? '500px' : '0' }}
          >
            <div className={styles.innerContent}>
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
