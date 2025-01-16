import styles from "./text-over.module.css";

interface TextProps {
  direction: 'left' | 'right';
  children: React.ReactNode;
}

export default function TextOver({ direction, children }: TextProps) {
  return (
    <div className={styles.textover}>
      <div className={`content ${styles[direction]}`}>
        {children}
      </div>
    </div>
  )
}
