'use client';

import Image from "next/image";
import { useMedia } from "../hooks";

export const HeroLogo = ({ style }: { style: string }) => {
  const { tablet, isDevice } = useMedia();
  console.log(isDevice);
  
  const { width, height } = {
    width: tablet ? 320 : 420,
    height: tablet ? 294 : 394
  };
  return (
    <Image
      src="/full_logo.jpg"
      alt="vic's logo"
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={style}
    />
  )
}
