import { useState, useEffect } from "react";
import { isMobileDevice } from "./util";
import { usePathname, useRouter } from "next/navigation";

export function useMedia() {
  const [width, setWidth] = useState(0);
  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    if (typeof window !== "undefined") {
      setIsDevice(isMobileDevice());

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const mobile = isDevice && width <= 599;
  const tablet = isDevice && width >= 600 && width <= 1199;

  return { mobile, tablet, isDevice };
}

export function useRouteRefresh(name: string | undefined, refresh: boolean) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const path = pathname === "/" ? "home" : pathname;
    if (refresh && name && !path.includes(name)) router.refresh();
  }, [router, refresh, pathname, name]);
}
