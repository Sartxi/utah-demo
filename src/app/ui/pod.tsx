import styles from "../styles/service.module.css";
import Image from "next/image";
import { Content } from "../../../lib/schema";
import { useEffect, useState } from "react";

interface PodProps {
  content: Content;
  width: number;
  imgHeight: number;
}

function useSlides(first: string | null) {
  if (!first) return [];
  const hasSlides = first.match('sa_slide') ?? false;
  if (!hasSlides) return [first];
  // format for slides = sa_slide-{id}-{item}-{items}.jpg
  const [name, ext] = first.split(".");
  const parts = name.split("-");
  if (parts.length) {
    const [slide, id, item, total] = parts;
    const slides = Array.from(Array(parseInt(total)).keys()).map(i => {
      return `${slide}-${id}-${i + parseInt(item)}-${total}.${ext}`;
    });
    return slides
  }
  return [first];
}

export default function Pod({ content, width, imgHeight }: PodProps) {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState('right');
  const slides = useSlides(content.image);

  const single = slides.length <= 1

  useEffect(() => {
    if (slides.length) setTimeout(() => setLoaded(true), 350);
  }, [slides]);

  const slideClass = (index: number) => {
    if (single) return 'static';
    const animate = active === index ? styles.in : styles.out;
    const direction = dir === "left" ? styles.left : styles.right
    return `${animate} ${direction}`;
  }

  function renderDescription(description: string | null, className: string) {
    if (!description) return null;

    // Split by single newlines to get each line
    const lines = description.split(/\r?\n/).filter(line => line.trim() !== "");

    // Separate lines with and without '---'
    const priceLines = lines.filter(line => line.includes('---'));
    const otherLines = lines.filter(line => !line.includes('---'));

    return (
      <>
        {otherLines.map((line, idx) => (
          <div className={className} key={`desc-other-${idx}`}>
            {line.trim()}
          </div>
        ))}
        {priceLines.length > 0 && (
          <div className={styles.priceTable}>
            {priceLines.map((line, idx) => {
              const parts = line.split('---');
              return (
                <div className={className} key={`desc-price-${idx}`}>
                  <div className={styles.nestedSection}>{parts[0].trim()}</div>
                  <div className={styles.nestedSection}>{parts[1].trim()}</div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  }

  return (
    <div className={`${styles.service} pod shadow`} style={{ width: `${width}%` }}>
      <div className={`${styles.images} ${!single ? styles.slides : styles.single}`} style={{ height: `${imgHeight}px` }}>
        <div className={`${styles.load} ${loaded ? styles.loaded : ''}`}></div>
        {!single && loaded && [`${styles.nav} ${styles.left}`, styles.nav].map((style, i) => {
          const isLeft = i === 0;
          const click = () => {
            let next = active + 1;
            if (isLeft) next = active - 1;
            setDir(isLeft ? 'left' : 'right');
            setActive(next);
          }
          if (((active === 0 && i === active) || (active + 1 === slides.length && i === 1))) return '';
          return (
            <Image
              key={`${content.id ?? content.title ?? "pod"}-nav-${i}`}
              src="/arrow.svg"
              className={style}
              width={35}
              height={35}
              alt={`${isLeft ? 'Left' : 'Right'} Arrow`}
              onClick={click}
            />
          )
        })}
        {slides.map((slide, index) => {
          return (
            <Image
              fill
              key={`${content.id ?? content.title ?? "pod"}-slide-${index}`}
              className={`${styles.slide} ${slideClass(index)}`}
              src={slide ?? ""}
              alt={content.title ?? ""}
            />
          );
        })}
      </div>
      <div className={styles.text}>
        <h4>{content.title}</h4>
        {renderDescription(content.description, styles.priceItem)}
      </div>
    </div>
  )
}
