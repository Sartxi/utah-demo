import styles from "../styles/text-over.module.css";

interface TextProps {
  size: 'large' | 'small' | 'cover';
  direction: 'left' | 'right';
  children: React.ReactNode;
}

export default function TextOver({ size, direction, children }: TextProps) {
  return (
    <div className={styles.textover}>
      <div className={`content ${styles[direction]} ${styles[size]}`}>
        {children}
      </div>
    </div>
  )
}
