export interface TitleDesc {
  title: string;
  description: string;
  detail?: string;
  image?: string;
}

export interface PageData extends TitleDesc {
  id: string;
  type: string;
  elements: TitleDesc[];
}

export const pages: PageData[] = [
  {
    id: "kitchen-demolition",
    type: "residential",
    title: "Kitchen Demolition",
    image: "backsplash.jpg",
    description:
      "Kitchens are central to family life, often prone to wear and tear. If you're looking to update your kitchen, whether by changing the backsplash, countertops, or removing cabinets, Utah Demolition is here to help. Their expert team specializes in efficient, dust free demolition, and can often save cabinetry for resale or donation, offering both skill and care throughout the process.",
    detail: "Dust free demolition & tile removal",
    elements: [
      {
        title: "Back Splash",
        image: "backsplash.jpg",
        description:
          "Let us help by removing the old backsplash effortlessly, making room for a beautiful new look!",
      },
      {
        title: "Cabinets",
        image: "backsplash.jpg",
        description:
          "Transform your kitchen by removing outdated cabinets and create the space of your dreams!",
      },
      {
        title: "Flooring",
        image: "backsplash.jpg",
        description:
          "Smoothly transition to a modern kitchen by letting us remove your old flooring.",
      },
      {
        title: "Counter Tops",
        image: "backsplash.jpg",
        description:
          "Upgrading your countertops? We will carefully clear the way for a beautiful new look!",
      },
    ],
  },
];
