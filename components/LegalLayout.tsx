import { ReactNode } from "react";
import styles from "./LegalLayout.module.css";

interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  subtitle?: string;
  children: ReactNode;
}

export default function LegalLayout({ title, lastUpdated, subtitle, children }: LegalLayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <p className={styles.lastUpdated}>Last updated: {lastUpdated}</p>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
