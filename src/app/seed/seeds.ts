const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Sean Archibeque",
    email: "sean.archibeque@gmail.com",
    password: "develop!",
    edited: "none",
    phone: "8015770263",
    address: null,
    city: null,
    state: null,
    zip: null,
    linkedn: null,
    instagram: null,
    facebook: null,
    contact: false,
  },
];

const nav = [
  {
    id: 10,
    name: "Contact",
    place: 1,
    href: "/contact",
  },
];

const pages = [
  {
    id: 1,
    name: "home",
    type: "custom",
  },
  {
    id: 2,
    name: "contact",
    type: "custom",
  },
];

const content = [
  {
    id: 1,
    page: 1,
    type: "hero",
    title: "UNMATCHED DEMOLITION EXPERIENCE & EXPERTISE",
    description:
      "There is no job too big or small. Utah Demolition can provide the services you require, from complete demolition to selective demolition. Dust Free Guarantee!",
    cta: "Free consultation",
    href: "/contact",
    image: "/home-hero.jpg",
    list: null,
  },
  {
    id: 2,
    page: 1,
    type: "service",
    title: "Demolition Contract Services",
    description:
      "When you work with us, you can expect flexibility and a dynamic approach to your demolition plan and needs, unsurpassed customer service with an emphasis on client relations, an active, family-like approach to safety day in and day out, and a paramount amount of experience and expertise. Call today to learn more!",
    cta: null,
    href: null,
    image: "/technician.png",
    list: '["Residential","Commercial","Industrial"]',
  },
  {
    id: 3,
    page: 1,
    type: "solutions",
    title: "Customized Project Solutions",
    description:
      "No matter the job size, we are always willing to supply you with a demo plan laid out in an easy-to-understand format with pictures and explanations. You deserve this kind of attention, and our design team is readily prepared. In addition to demolition plans and advice, we are capable of doing everything from pulling permits to coordinating inspections to unusual, out-of-the-ordinary dismantlement. We want you to feel confident when you are partnered with us.",
    cta: "Get Started",
    href: "/contact",
    image: "/solutions.jpg",
    list: '["Dust Free Guarantee","Safety First Approach","Time Saving & Efficient"]',
  },
];

const meta = [
  {
    id: 1,
    title: "Website",
    description: "New Website",
    page: 1,
  },
];

export { users, nav, pages, content, meta };
