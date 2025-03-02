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

  const description = content.description?.split('\r\n') ?? [content.description];
  const slideClass = (index: number) => {
    if (single) return 'static';
    const animate = active === index ? styles.in : styles.out;
    const direction = dir === "left" ? styles.left : styles.right
    return `${animate} ${direction}`;
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
              key={style}
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
              key={slide}
              className={`${styles.slide} ${slideClass(index)}`}
              src={slide ?? ""}
              alt={content.title ?? ""}
            />
          );
        })}
      </div>
      <div className={styles.text}>
        <h4>{content.title}</h4>
        {description.map(desc => <p key={desc}>{desc}</p>)}
      </div>
    </div>
  )
}
