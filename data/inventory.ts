import type { EquipmentItem } from "@/lib/inventory/types";

/**
 * STARTER INVENTORY (needs owner review before launch)
 * ----------------------------------------------------------------------------
 * These listings were built from photos on the business's Facebook page
 * (posted early 2025). Only details legible in the photos were used.
 *
 * Because the photos are old:
 *   - every item is set to availability "call-to-confirm"
 *   - every price is null ("Call for price"). The handwritten price tag seen in
 *     each photo is recorded in a comment so the owner can confirm or update it.
 *
 * Replace or edit this file, or swap the repository in lib/inventory/index.ts
 * for a database, spreadsheet, or inventory system. See README.md.
 */

const ADDED = "2026-09-30";

export const inventory: EquipmentItem[] = [
  {
    // Photo tag: "Hobart Grinder MG2032 $13,000"
    id: "ARE-1001",
    slug: "hobart-mg2032-mixer-grinder",
    sku: null,
    title: "Hobart MG2032 Mixer-Grinder",
    category: "meat-processing",
    subcategory: "Mixer-grinders",
    brand: "Hobart",
    model: "MG2032",
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Floor model meat mixer-grinder with mix, grind, and foot switch controls. On casters.",
    description:
      "Hobart MG2032 mixer-grinder with separate mix and mix/grind start buttons and a foot switch control. The unit sits on casters. Call or send a message to confirm availability, condition, and electrical requirements.",
    features: ["Mix and mix/grind start controls", "Foot switch control", "Mounted on casters"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/hobart-mg2032-mixer-grinder.jpg",
        alt: "Hobart MG2032 stainless steel mixer-grinder on casters, front view",
        width: 760,
        height: 1120,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: true,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Hobart MG2032 Mixer-Grinder in Dallas-Fort Worth",
    seoDescription:
      "Used Hobart MG2032 meat mixer-grinder at Affordable Restaurant Equipment in Farmers Branch, TX. Call to confirm availability and price.",
    tags: ["meat grinder", "mixer grinder", "butcher", "hobart"],
    translations: {
      es: {
        title: "Molino mezclador Hobart MG2032",
        shortDescription: "Molino mezclador de carne de piso con controles de mezcla, molienda y pedal. Con ruedas.",
        description:
          "Molino mezclador Hobart MG2032 con botones separados para mezclar y mezclar/moler, y control de pedal. La unidad tiene ruedas. Llame o envíe un mensaje para confirmar disponibilidad, condición y requisitos eléctricos.",
        features: ["Controles de mezcla y mezcla/molienda", "Control de pedal", "Montado sobre ruedas"],
        seoTitle: "Molino mezclador Hobart MG2032 usado en Dallas-Fort Worth",
        seoDescription:
          "Molino mezclador de carne Hobart MG2032 usado en Affordable Restaurant Equipment, Farmers Branch, TX. Llame para confirmar disponibilidad y precio.",
      },
    },
  },
  {
    // Photo tag: "Hobart Meat Grinder $11,000"
    id: "ARE-1002",
    slug: "hobart-meat-grinder",
    sku: null,
    title: "Hobart Meat Grinder",
    category: "meat-processing",
    subcategory: "Mixer-grinders",
    brand: "Hobart",
    model: null, // TODO(owner): model number
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Hobart floor meat grinder with mix, grind, and foot switch controls. On casters.",
    description:
      "Hobart meat grinder with mix and mix/grind start buttons and a foot switch control, mounted on casters. Ask us for the model number, condition details, and electrical requirements.",
    features: ["Mix and mix/grind start controls", "Foot switch control", "Mounted on casters"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/hobart-meat-grinder.jpg",
        alt: "Hobart stainless steel meat grinder on casters, front view",
        width: 590,
        height: 1120,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: false,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Hobart Meat Grinder in Dallas-Fort Worth",
    seoDescription:
      "Used Hobart commercial meat grinder in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["meat grinder", "hobart", "butcher"],
    translations: {
      es: {
        title: "Molino de carne Hobart",
        shortDescription: "Molino de carne Hobart de piso con controles de mezcla, molienda y pedal. Con ruedas.",
        description:
          "Molino de carne Hobart con botones para mezclar y mezclar/moler y control de pedal, montado sobre ruedas. Pregúntenos el número de modelo, la condición y los requisitos eléctricos.",
        features: ["Controles de mezcla y mezcla/molienda", "Control de pedal", "Montado sobre ruedas"],
      },
    },
  },
  {
    // Photo tag: "Hobart [model unclear, possibly 4246] Grinder $8,500"
    id: "ARE-1003",
    slug: "hobart-mixer-grinder",
    sku: null,
    title: "Hobart Mixer-Grinder",
    category: "meat-processing",
    subcategory: "Mixer-grinders",
    brand: "Hobart",
    model: null, // TODO(owner): tag may read "4246". Confirm.
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Hobart mixer-grinder with mix, stop, mix/grind, and foot switch controls.",
    description:
      "Hobart mixer-grinder with mix start, stop, mix/grind start, and foot switch controls. Ask us for the model number, condition details, and electrical requirements.",
    features: ["Mix and mix/grind start controls", "Foot switch control"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/hobart-mixer-grinder.jpg",
        alt: "Hobart stainless steel mixer-grinder, front angle view",
        width: 738,
        height: 1110,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: false,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Hobart Mixer-Grinder in Dallas-Fort Worth",
    seoDescription:
      "Used Hobart mixer-grinder in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["meat grinder", "mixer grinder", "hobart"],
    translations: {
      es: {
        title: "Molino mezclador Hobart",
        shortDescription: "Molino mezclador Hobart con controles de mezcla, paro, mezcla/molienda y pedal.",
        description:
          "Molino mezclador Hobart con controles de inicio de mezcla, paro, inicio de mezcla/molienda y pedal. Pregúntenos el número de modelo, la condición y los requisitos eléctricos.",
        features: ["Controles de mezcla y mezcla/molienda", "Control de pedal"],
      },
    },
  },
  {
    // Photo tag: "Biro Grinder AMFG-52 $9,500"
    id: "ARE-1004",
    slug: "biro-amfg-52-mixer-grinder",
    sku: null,
    title: "Biro AMFG-52 Mixer-Grinder",
    category: "meat-processing",
    subcategory: "Mixer-grinders",
    brand: "Biro",
    model: "AMFG-52",
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Biro AMFG-52 floor mixer-grinder on casters with a foot pedal.",
    description:
      "Biro AMFG-52 mixer-grinder on casters, shown with its foot pedal. Call or send a message to confirm availability, condition, and electrical requirements.",
    features: ["Foot pedal included in photo", "Mounted on casters"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/biro-amfg-52-mixer-grinder.jpg",
        alt: "Biro AMFG-52 stainless steel mixer-grinder with yellow power cord and orange foot pedal",
        width: 610,
        height: 1260,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: false,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Biro AMFG-52 Mixer-Grinder in Dallas-Fort Worth",
    seoDescription:
      "Used Biro AMFG-52 mixer-grinder in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["meat grinder", "mixer grinder", "biro"],
    translations: {
      es: {
        title: "Molino mezclador Biro AMFG-52",
        shortDescription: "Molino mezclador Biro AMFG-52 de piso, con ruedas y pedal.",
        description:
          "Molino mezclador Biro AMFG-52 sobre ruedas, mostrado con su pedal. Llame o envíe un mensaje para confirmar disponibilidad, condición y requisitos eléctricos.",
        features: ["Pedal incluido en la foto", "Montado sobre ruedas"],
      },
    },
  },
  {
    // Photo tag: "Biro Mini 32 Grinder $9,500"
    id: "ARE-1005",
    slug: "biro-mini-32-grinder",
    sku: null,
    title: "Biro Mini 32 Grinder",
    category: "meat-processing",
    subcategory: "Grinders",
    brand: "Biro",
    model: "Mini 32",
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Biro Mini 32 grinder with a large hopper, on a stainless stand with casters.",
    description:
      "Biro Mini 32 grinder with a wide hopper, mounted on a stainless steel stand with casters. Call or send a message to confirm availability, condition, and electrical requirements.",
    features: ["Large feed hopper", "Stainless steel stand", "Mounted on casters"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/biro-mini-32-grinder.jpg",
        alt: "Biro Mini 32 meat grinder with wide hopper on a stainless stand",
        width: 730,
        height: 1220,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: false,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Biro Mini 32 Meat Grinder in Dallas-Fort Worth",
    seoDescription:
      "Used Biro Mini 32 meat grinder in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["meat grinder", "biro"],
    translations: {
      es: {
        title: "Molino Biro Mini 32",
        shortDescription: "Molino Biro Mini 32 con tolva grande, sobre base de acero inoxidable con ruedas.",
        description:
          "Molino Biro Mini 32 con tolva amplia, montado sobre una base de acero inoxidable con ruedas. Llame o envíe un mensaje para confirmar disponibilidad, condición y requisitos eléctricos.",
        features: ["Tolva de alimentación grande", "Base de acero inoxidable", "Montado sobre ruedas"],
      },
    },
  },
  {
    // Photo tags: two units, each "Biro Grinder EMG-32 $8,500"
    id: "ARE-1006",
    slug: "biro-emg-32-mixer-grinder",
    sku: null,
    title: "Biro EMG-32 Mixer-Grinder",
    category: "meat-processing",
    subcategory: "Mixer-grinders",
    brand: "Biro",
    model: "EMG-32",
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Biro EMG-32 mixer-grinder with separate mix and grind controls, on casters.",
    description:
      "Biro EMG-32 mixer-grinder with separate mix and grind controls, on a stand with locking casters. The photos show two units. Ask how many are available.",
    features: ["Separate mix and grind controls", "Stand with casters"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/biro-emg-32-grinder.jpg",
        alt: "Biro EMG-32 stainless steel mixer-grinder, front view",
        width: 580,
        height: 1040,
      },
      {
        src: "/images/inventory/biro-emg-32-grinder-2.jpg",
        alt: "Second Biro EMG-32 mixer-grinder, front view",
        width: 700,
        height: 1080,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: true,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Biro EMG-32 Mixer-Grinder in Dallas-Fort Worth",
    seoDescription:
      "Used Biro EMG-32 mixer-grinder in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["meat grinder", "mixer grinder", "biro"],
    translations: {
      es: {
        title: "Molino mezclador Biro EMG-32",
        shortDescription: "Molino mezclador Biro EMG-32 con controles separados de mezcla y molienda, con ruedas.",
        description:
          "Molino mezclador Biro EMG-32 con controles separados de mezcla y molienda, sobre base con ruedas con freno. Las fotos muestran dos unidades. Pregunte cuántas hay disponibles.",
        features: ["Controles separados de mezcla y molienda", "Base con ruedas"],
      },
    },
  },
  {
    // Photo tags: "Hobart Slicer $3,500" (two Hobart slicers tagged; other slicers' tags illegible)
    id: "ARE-1007",
    slug: "hobart-meat-slicer",
    sku: null,
    title: "Hobart Meat Slicer",
    category: "meat-processing",
    subcategory: "Slicers",
    brand: "Hobart",
    model: null, // TODO(owner): model number(s)
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Hobart commercial meat slicers. More than one unit shown in photos.",
    description:
      "Hobart commercial meat slicers for delis, markets, and kitchens. The photos show more than one slicer. Ask which models are available.",
    features: [],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/hobart-meat-slicer.jpg",
        alt: "Hobart commercial meat slicer on a stainless table",
        width: 1200,
        height: 998,
      },
      {
        src: "/images/inventory/hobart-meat-slicer-2.jpg",
        alt: "Row of commercial meat slicers including Hobart models",
        width: 1000,
        height: 1000,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: true,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Hobart Meat Slicers in Dallas-Fort Worth",
    seoDescription:
      "Used Hobart commercial meat slicers in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm models, availability, and price.",
    tags: ["slicer", "deli slicer", "hobart"],
    translations: {
      es: {
        title: "Rebanadora de carne Hobart",
        shortDescription: "Rebanadoras comerciales Hobart. Las fotos muestran más de una unidad.",
        description:
          "Rebanadoras de carne comerciales Hobart para salchichonerías, mercados y cocinas. Las fotos muestran más de una rebanadora. Pregunte qué modelos hay disponibles.",
      },
    },
  },
  {
    // Photo tags: "Single Door Cooler $1,000" (Habco unit and a second single-door unit)
    id: "ARE-1008",
    slug: "habco-single-glass-door-cooler",
    sku: null,
    title: "Habco Single Glass Door Cooler",
    category: "refrigeration",
    subcategory: "Glass door merchandisers",
    brand: "Habco",
    model: null, // TODO(owner): model number
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Single glass door merchandiser cooler with wire shelving.",
    description:
      "Habco single glass door cooler with adjustable wire shelves. Good for drinks and grab-and-go items. Call to confirm availability and electrical requirements.",
    features: ["Glass door", "Wire shelving"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/habco-single-door-cooler.jpg",
        alt: "Black Habco single glass door merchandiser cooler with wire shelves",
        width: 607,
        height: 1600,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: true,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Single Glass Door Cooler in Dallas-Fort Worth",
    seoDescription:
      "Used Habco single glass door merchandiser cooler in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["cooler", "merchandiser", "glass door", "refrigerator", "convenience store"],
    translations: {
      es: {
        title: "Refrigerador Habco de una puerta de vidrio",
        shortDescription: "Exhibidor refrigerado de una puerta de vidrio con repisas de alambre.",
        description:
          "Refrigerador Habco de una puerta de vidrio con repisas de alambre ajustables. Ideal para bebidas y productos para llevar. Llame para confirmar disponibilidad y requisitos eléctricos.",
        features: ["Puerta de vidrio", "Repisas de alambre"],
      },
    },
  },
  {
    // Photo tag: "Two door Freezer $1,800.00"
    id: "ARE-1009",
    slug: "two-door-glass-door-freezer",
    sku: null,
    title: "Two-Door Glass Door Freezer",
    category: "freezers",
    subcategory: "Glass door merchandisers",
    brand: null, // TODO(owner): brand and model
    model: null,
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "Two-door glass merchandiser freezer with a header sign panel.",
    description:
      "Two-door glass door freezer with wire shelving and a header panel. Good for convenience stores, markets, and restaurants. Ask us for the brand, model, and electrical requirements.",
    features: ["Two glass doors", "Wire shelving", "Header sign panel"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/two-door-glass-freezer.jpg",
        alt: "Black two-door glass door freezer with Frozen Food header sign",
        width: 940,
        height: 1600,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: true,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Two-Door Glass Freezer in Dallas-Fort Worth",
    seoDescription:
      "Used two-door glass door merchandiser freezer in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm availability and price.",
    tags: ["freezer", "merchandiser", "glass door", "convenience store"],
    translations: {
      es: {
        title: "Congelador de dos puertas de vidrio",
        shortDescription: "Congelador exhibidor de dos puertas de vidrio con panel superior.",
        description:
          "Congelador de dos puertas de vidrio con repisas de alambre y panel superior. Ideal para tiendas de conveniencia, mercados y restaurantes. Pregúntenos la marca, el modelo y los requisitos eléctricos.",
        features: ["Dos puertas de vidrio", "Repisas de alambre", "Panel para letrero"],
      },
    },
  },
  {
    // No price tag visible. Several units with "Dairy", "Frozen Foods", "Refuel" header panels.
    id: "ARE-1010",
    slug: "multi-door-glass-merchandisers",
    sku: null,
    title: "Multi-Door Glass Door Merchandisers",
    category: "refrigeration",
    subcategory: "Glass door merchandisers",
    brand: null, // TODO(owner): at least one unit appears to be True. Confirm brands and door counts.
    model: null,
    serialNumber: null,
    condition: "used",
    price: null,
    priceDisplay: null,
    shortDescription: "One-, two-, and three-door glass merchandisers with header sign panels.",
    description:
      "A row of glass door merchandisers in different door configurations, with header sign panels. Tell us how many doors you need and whether you need a cooler or a freezer.",
    features: ["Multiple door configurations", "Header sign panels", "Wire shelving"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/true-glass-door-merchandisers.jpg",
        alt: "Row of black glass door merchandisers with Dairy, Frozen Foods, and Refuel header signs",
        width: 1083,
        height: 1600,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: false,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "Used Glass Door Merchandisers in Dallas-Fort Worth",
    seoDescription:
      "Used multi-door glass merchandiser coolers and freezers in Farmers Branch, TX. Call Affordable Restaurant Equipment to confirm configurations and price.",
    tags: ["merchandiser", "glass door", "cooler", "freezer", "convenience store"],
    translations: {
      es: {
        title: "Exhibidores de varias puertas de vidrio",
        shortDescription: "Exhibidores de una, dos y tres puertas de vidrio con panel para letrero.",
        description:
          "Una fila de exhibidores con puertas de vidrio en distintas configuraciones, con panel para letrero. Díganos cuántas puertas necesita y si busca refrigerador o congelador.",
        features: ["Varias configuraciones de puertas", "Panel para letrero", "Repisas de alambre"],
      },
    },
  },
  {
    // Source: business Facebook flyer "Brand NEW ASBER cooking range". Price tag not legible.
    id: "ARE-1011",
    slug: "asber-range-with-griddle",
    sku: null,
    title: "Asber Range with Griddle and Two Ovens",
    category: "ranges",
    subcategory: null,
    brand: "Asber",
    model: null, // TODO(owner): model number, burner count, gas type
    serialNumber: null,
    condition: "new",
    price: null,
    priceDisplay: null,
    shortDescription: "New Asber commercial range with open burners, a griddle section, and two ovens.",
    description:
      "New Asber commercial range with open burners, a griddle section, and two ovens below. Ask us for the model, burner count, and gas type.",
    features: ["Open burners", "Griddle section", "Two ovens"],
    conditionNotes: null,
    specifications: [],
    dimensions: null,
    powerRequirements: null,
    gasType: null,
    images: [
      {
        src: "/images/inventory/asber-range-griddle.jpg",
        alt: "New Asber commercial range with burners, griddle, and two oven doors",
        width: 597,
        height: 328,
      },
    ],
    videoUrl: null,
    availability: "call-to-confirm",
    quantity: null,
    location: null,
    deliveryAvailable: null,
    shippingAvailable: null,
    warranty: null,
    featured: true,
    dateAdded: ADDED,
    dateUpdated: ADDED,
    seoTitle: "New Asber Commercial Range with Griddle in Dallas-Fort Worth",
    seoDescription:
      "New Asber commercial range with griddle and ovens in Farmers Branch, TX. Call Affordable Restaurant Equipment for price and availability.",
    tags: ["range", "stove", "griddle", "oven", "asber", "cooking"],
    translations: {
      es: {
        title: "Estufa Asber con plancha y dos hornos",
        shortDescription: "Estufa comercial Asber nueva con quemadores, plancha y dos hornos.",
        description:
          "Estufa comercial Asber nueva con quemadores abiertos, sección de plancha y dos hornos. Pregúntenos el modelo, el número de quemadores y el tipo de gas.",
        features: ["Quemadores abiertos", "Sección de plancha", "Dos hornos"],
      },
    },
  },
];
