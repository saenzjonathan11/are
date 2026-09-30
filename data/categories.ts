import type { Category } from "@/lib/inventory/types";

/**
 * Equipment categories. Data-driven: add, rename, or reorder here.
 * `icon` must be a key in components/shared/CategoryIcon.tsx.
 * A category with no inventory still gets a page, which invites an equipment request.
 */
export const categories: Category[] = [
  {
    slug: "refrigeration",
    parent: null,
    icon: "Refrigerator",
    name: { en: "Refrigeration", es: "Refrigeración" },
    description: {
      en: "Reach-in coolers, glass door merchandisers, and commercial refrigerators.",
      es: "Refrigeradores verticales, exhibidores con puerta de vidrio y refrigeradores comerciales.",
    },
  },
  {
    slug: "freezers",
    parent: "refrigeration",
    icon: "Snowflake",
    name: { en: "Freezers", es: "Congeladores" },
    description: {
      en: "Reach-in and glass door freezers for kitchens and stores.",
      es: "Congeladores verticales y con puerta de vidrio para cocinas y tiendas.",
    },
  },
  {
    slug: "cooking-equipment",
    parent: null,
    icon: "Flame",
    name: { en: "Cooking Equipment", es: "Equipo de cocción" },
    description: {
      en: "Ranges, ovens, fryers, griddles, and charbroilers.",
      es: "Estufas, hornos, freidoras, planchas y asadores.",
    },
  },
  {
    slug: "fryers",
    parent: "cooking-equipment",
    icon: "CookingPot",
    name: { en: "Fryers", es: "Freidoras" },
    description: { en: "Commercial gas and electric fryers.", es: "Freidoras comerciales de gas y eléctricas." },
  },
  {
    slug: "ranges",
    parent: "cooking-equipment",
    icon: "Flame",
    name: { en: "Ranges", es: "Estufas" },
    description: { en: "Commercial ranges with burners, griddles, and ovens.", es: "Estufas comerciales con quemadores, plancha y hornos." },
  },
  {
    slug: "ovens",
    parent: "cooking-equipment",
    icon: "Microwave",
    name: { en: "Ovens", es: "Hornos" },
    description: { en: "Convection, deck, and pizza ovens.", es: "Hornos de convección, de piso y para pizza." },
  },
  {
    slug: "griddles",
    parent: "cooking-equipment",
    icon: "Heater",
    name: { en: "Griddles", es: "Planchas" },
    description: { en: "Countertop and range-top griddles.", es: "Planchas de mesa y de estufa." },
  },
  {
    slug: "charbroilers",
    parent: "cooking-equipment",
    icon: "Flame",
    name: { en: "Charbroilers", es: "Asadores" },
    description: { en: "Gas charbroilers for grilling.", es: "Asadores de gas para parrilla." },
  },
  {
    slug: "prep-tables",
    parent: null,
    icon: "Sandwich",
    name: { en: "Prep Tables", es: "Mesas de preparación" },
    description: {
      en: "Refrigerated sandwich, salad, and pizza prep tables.",
      es: "Mesas refrigeradas para sándwiches, ensaladas y pizza.",
    },
  },
  {
    slug: "ice-machines",
    parent: null,
    icon: "Snowflake",
    name: { en: "Ice Machines", es: "Máquinas de hielo" },
    description: { en: "Ice makers and ice bins.", es: "Máquinas de hielo y depósitos." },
  },
  {
    slug: "food-preparation",
    parent: null,
    icon: "ChefHat",
    name: { en: "Food Preparation", es: "Preparación de alimentos" },
    description: {
      en: "Slicers, mixers, processors, and other prep equipment.",
      es: "Rebanadoras, batidoras, procesadores y más equipo de preparación.",
    },
  },
  {
    slug: "meat-processing",
    parent: "food-preparation",
    icon: "Beef",
    name: { en: "Meat Grinders & Slicers", es: "Molinos y rebanadoras de carne" },
    description: {
      en: "Meat grinders, mixer-grinders, and slicers for butcher shops, markets, and kitchens.",
      es: "Molinos de carne, molinos mezcladores y rebanadoras para carnicerías, mercados y cocinas.",
    },
  },
  {
    slug: "mixers",
    parent: "food-preparation",
    icon: "Blend",
    name: { en: "Mixers", es: "Batidoras" },
    description: { en: "Planetary and spiral mixers.", es: "Batidoras planetarias y de espiral." },
  },
  {
    slug: "stainless-steel",
    parent: null,
    icon: "Table",
    name: { en: "Stainless Steel", es: "Acero inoxidable" },
    description: { en: "Work tables, shelving, and stainless fixtures.", es: "Mesas de trabajo, repisas y muebles de acero inoxidable." },
  },
  {
    slug: "sinks",
    parent: "stainless-steel",
    icon: "Droplets",
    name: { en: "Sinks", es: "Fregaderos" },
    description: { en: "Compartment sinks and hand sinks.", es: "Fregaderos de compartimientos y lavamanos." },
  },
  {
    slug: "dishwashing",
    parent: null,
    icon: "Droplets",
    name: { en: "Dishwashing", es: "Lavado de loza" },
    description: { en: "Commercial dishwashers and dish tables.", es: "Lavavajillas comerciales y mesas para loza." },
  },
  {
    slug: "holding-warming",
    parent: null,
    icon: "Thermometer",
    name: { en: "Holding & Warming", es: "Mantenedores y calentadores" },
    description: { en: "Hot holding cabinets, warmers, and steam tables.", es: "Gabinetes calientes, calentadores y mesas de vapor." },
  },
  {
    slug: "beverage-equipment",
    parent: null,
    icon: "CupSoda",
    name: { en: "Beverage Equipment", es: "Equipo para bebidas" },
    description: { en: "Coffee, soda, and beverage equipment.", es: "Equipo para café, refrescos y bebidas." },
  },
  {
    slug: "bakery-equipment",
    parent: null,
    icon: "Croissant",
    name: { en: "Bakery Equipment", es: "Equipo de panadería" },
    description: { en: "Proofers, dough equipment, and bakery ovens.", es: "Fermentadoras, equipo para masa y hornos de panadería." },
  },
  {
    slug: "restaurant-furniture",
    parent: null,
    icon: "Armchair",
    name: { en: "Restaurant Furniture", es: "Muebles para restaurante" },
    description: { en: "Tables, chairs, and booths.", es: "Mesas, sillas y gabinetes." },
  },
  {
    slug: "smallwares",
    parent: null,
    icon: "Utensils",
    name: { en: "Smallwares", es: "Utensilios" },
    description: { en: "Pans, utensils, trash cans, and kitchen supplies.", es: "Sartenes, utensilios, botes de basura y artículos de cocina." },
  },
  {
    slug: "other-equipment",
    parent: null,
    icon: "Package",
    name: { en: "Other Equipment", es: "Otro equipo" },
    description: { en: "Equipment that doesn't fit another category.", es: "Equipo que no entra en otra categoría." },
  },
];
