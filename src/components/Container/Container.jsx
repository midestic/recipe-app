import styles from "./Container.module.css";

export default function ({ children }) {
  return <div className={styles.parentContainer}>{children}</div>;
}
