import { pages, PageType } from "./pages";

export interface TitleDesc {
  title: string;
  description: string;
  detail?: string;
  image?: string;
}

export interface PageData extends TitleDesc {
  id: string;
  type: PageType;
  elements?: TitleDesc[];
}

export function usePages(type: string) {
  return pages.filter((page: PageData) => page.type === type);
}

export function usePage(id: string) {
  return pages.find((page: PageData) => page.id === id);
}
