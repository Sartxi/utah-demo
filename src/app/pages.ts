import { PageData } from "./data";

export enum PageType {
  residential = "residential",
  commercial = "commercial",
  service = "service",
}

export const pages: PageData[] = [
  {
    id: "residential",
    type: PageType.service,
    title: "Residential Services",
    image: "residential.jpg",
    description:
      "Before any demolition services can take place, our technicians are trained experts that carry out all the necessary steps to guarantee proper job safety. Offering demolition service across the Wasatch Front.",
  },
  {
    id: "commercial",
    type: PageType.service,
    title: "Commercial Services",
    image: "residential.jpg",
    description:
      "Before any demolition services can take place, our technicians are trained experts that carry out all the necessary steps to guarantee proper job safety. Offering demolition service across the Wasatch Front.",
  },
  {
    id: "kitchen-demolition",
    type: PageType.residential,
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
  {
    id: "office-demolition",
    type: PageType.commercial,
    title: "Office Demolition",
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
