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

  const tablet = width >= 600 && width <= 1199;
  const mobile = width <= 599;

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

export function useClickOutside(el: string, enabled: boolean, callback: () => void) {
  return useEffect(() => {
    const handleCloseOnClick = (e) => {
      const closeEl = document.getElementById(el);
      if (enabled && !closeEl?.contains(e.target)) callback();
    }
    document.addEventListener('click', handleCloseOnClick);
    return () => document.removeEventListener('click', handleCloseOnClick);
  }, [el, enabled, callback]);
}
