import type { AdminVehicle, ActivityItem, BlogPost, AdminUser } from "./types";

const IMAGE_BASE =
  "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1600&q=80";

const BASE_VEHICLES: Array<Omit<AdminVehicle, "id" | "createdAt" | "updatedAt">> = [
  {
    brand: "BMW", model: "M4 Competition", version: "M xDrive", year: 2024, price: 89900000,
    mileage: 12500, fuel: "Gasolina", transmission: "Automática", power: "510 HP",
    color: "Negro Zafiro", category: "Deportivo", images: [IMAGE_BASE],
    status: "published", featured: true, acceptsFinancing: true,
    description: "BMW M4 Competition en estado impecable, único dueño, mantenciones al día.",
  },
  {
    brand: "Porsche", model: "Taycan 4S", version: "Performance Battery Plus", year: 2024,
    price: 112000000, mileage: 5400, fuel: "Eléctrico", transmission: "Automática", power: "530 HP",
    color: "Blanco Carrara", category: "Eléctrico", images: [IMAGE_BASE], status: "published",
    featured: true, acceptsFinancing: true,
  },
  {
    brand: "Mercedes-Benz", model: "AMG GT 53", version: "4MATIC+", year: 2024, price: 78900000,
    mileage: 8200, fuel: "Híbrido", transmission: "Automática", power: "435 HP",
    color: "Gris Selenita", category: "Sedán", images: [IMAGE_BASE], status: "published",
    featured: true, acceptsFinancing: true,
  },
  {
    brand: "Audi", model: "RS 6 Avant", version: "Performance", year: 2023, price: 95900000,
    mileage: 18200, fuel: "Gasolina", transmission: "Automática", power: "600 HP",
    color: "Azul Nogaro", category: "Wagon", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Tesla", model: "Model Y Long Range", year: 2024, price: 49900000, mileage: 9800,
    fuel: "Eléctrico", transmission: "Automática", power: "384 HP", color: "Rojo Multicapa",
    category: "SUV", images: [IMAGE_BASE], status: "published", featured: false,
    acceptsFinancing: true,
  },
  {
    brand: "Volvo", model: "XC90 Recharge", version: "T8 AWD Inscription", year: 2024,
    price: 65900000, mileage: 7200, fuel: "Híbrido", transmission: "Automática", power: "455 HP",
    color: "Verde Bosque", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Land Rover", model: "Range Rover Sport", version: "Autobiography", year: 2024,
    price: 84500000, mileage: 11200, fuel: "Gasolina", transmission: "Automática", power: "510 HP",
    color: "Negro Santorin", category: "SUV", images: [IMAGE_BASE], status: "draft",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Lexus", model: "LC 500", version: "Sport+", year: 2024, price: 72900000, mileage: 6400,
    fuel: "Gasolina", transmission: "Automática", power: "471 HP", color: "Amarillo Halcón",
    category: "Coupé", images: [IMAGE_BASE], status: "published", featured: false,
    acceptsFinancing: true,
  },
  {
    brand: "BMW", model: "iX xDrive50", version: "M Sport", year: 2024, price: 68900000,
    mileage: 4800, fuel: "Eléctrico", transmission: "Automática", power: "523 HP",
    color: "Blanco Mineral", category: "SUV", images: [IMAGE_BASE], status: "draft",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Mercedes-Benz", model: "GLE 53 AMG", version: "4MATIC+ Coupé", year: 2024,
    price: 72900000, mileage: 9100, fuel: "Híbrido", transmission: "Automática", power: "429 HP",
    color: "Plata Iridio", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Audi", model: "e-tron GT", version: "quattro", year: 2024, price: 89900000,
    mileage: 6800, fuel: "Eléctrico", transmission: "Automática", power: "530 HP",
    color: "Grío Daytona", category: "Eléctrico", images: [IMAGE_BASE], status: "sold",
    featured: false, acceptsFinancing: false,
  },
  {
    brand: "Porsche", model: "Cayenne S", version: "V6", year: 2024, price: 79900000,
    mileage: 8500, fuel: "Gasolina", transmission: "Automática", power: "440 HP",
    color: "Negro Jet", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "BMW", model: "X5 M Competition", year: 2023, price: 85900000, mileage: 22400,
    fuel: "Gasolina", transmission: "Automática", power: "617 HP", color: "Azul Tanzanita",
    category: "SUV", images: [IMAGE_BASE], status: "published", featured: false,
    acceptsFinancing: true,
  },
  {
    brand: "Tesla", model: "Model 3 Performance", year: 2024, price: 42900000, mileage: 7300,
    fuel: "Eléctrico", transmission: "Automática", power: "510 HP", color: "Blanco Perla",
    category: "Sedán", images: [IMAGE_BASE], status: "published", featured: false,
    acceptsFinancing: true,
  },
  {
    brand: "Volvo", model: "EX30", version: "Twin Motor Performance", year: 2024,
    price: 38900000, mileage: 3200, fuel: "Eléctrico", transmission: "Automática", power: "428 HP",
    color: "Azul Vapor", category: "SUV", images: [IMAGE_BASE], status: "draft",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Mercedes-Benz", model: "EQS 580", version: "4MATIC", year: 2024, price: 119000000,
    mileage: 4900, fuel: "Eléctrico", transmission: "Automática", power: "523 HP",
    color: "Negro Obsidiana", category: "Sedán", images: [IMAGE_BASE], status: "published",
    featured: true, acceptsFinancing: true,
  },
  {
    brand: "Audi", model: "Q7 60 TFSIe", version: "S line", year: 2024, price: 74900000,
    mileage: 10100, fuel: "Híbrido", transmission: "Automática", power: "462 HP",
    color: "Blanco Glaciar", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Land Rover", model: "Defender 110", version: "X-Dynamic SE", year: 2024,
    price: 68900000, mileage: 12800, fuel: "Gasolina", transmission: "Automática", power: "400 HP",
    color: "Verde Pangea", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Lexus", model: "RX 500h", version: "F SPORT", year: 2024, price: 64900000,
    mileage: 8900, fuel: "Híbrido", transmission: "Automática", power: "366 HP",
    color: "Negro Grafito", category: "SUV", images: [IMAGE_BASE], status: "sold",
    featured: false, acceptsFinancing: false,
  },
  {
    brand: "Porsche", model: "911 Carrera S", version: "992", year: 2023, price: 149000000,
    mileage: 9200, fuel: "Gasolina", transmission: "Automática", power: "450 HP",
    color: "Guards Red", category: "Deportivo", images: [IMAGE_BASE], status: "published",
    featured: true, acceptsFinancing: true,
  },
  {
    brand: "BMW", model: "M3 Competition", version: "M xDrive Touring", year: 2024,
    price: 94900000, mileage: 7100, fuel: "Gasolina", transmission: "Automática", power: "510 HP",
    color: "Blanco Alpino", category: "Wagon", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Mercedes-Benz", model: "G 63 AMG", year: 2024, price: 159000000, mileage: 5800,
    fuel: "Gasolina", transmission: "Automática", power: "577 HP", color: "Negro Designo",
    category: "SUV", images: [IMAGE_BASE], status: "published", featured: true,
    acceptsFinancing: true,
  },
  {
    brand: "Audi", model: "A6 e-tron", version: "Performance", year: 2025, price: 79900000,
    mileage: 1200, fuel: "Eléctrico", transmission: "Automática", power: "503 HP",
    color: "Plata Floret", category: "Sedán", images: [IMAGE_BASE], status: "draft",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Tesla", model: "Cybertruck", version: "Foundation Series", year: 2024,
    price: 89900000, mileage: 2100, fuel: "Eléctrico", transmission: "Automática", power: "600 HP",
    color: "Acero", category: "Pickup", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Volvo", model: "XC60 Recharge", version: "T8 AWD Polestar", year: 2024,
    price: 58900000, mileage: 11200, fuel: "Híbrido", transmission: "Automática", power: "455 HP",
    color: "Azul Denim", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "BMW", model: "i7 M70", version: "xDrive", year: 2024, price: 139000000,
    mileage: 3400, fuel: "Eléctrico", transmission: "Automática", power: "660 HP",
    color: "Negro Zafiro", category: "Sedán", images: [IMAGE_BASE], status: "published",
    featured: true, acceptsFinancing: true,
  },
  {
    brand: "Mercedes-Benz", model: "CLE 53 AMG", version: "4MATIC+ Coupé", year: 2024,
    price: 79900000, mileage: 7600, fuel: "Híbrido", transmission: "Automática", power: "449 HP",
    color: "Gris Grafito", category: "Coupé", images: [IMAGE_BASE], status: "draft",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Porsche", model: "Macan EV", version: "4 Electric", year: 2025, price: 84900000,
    mileage: 800, fuel: "Eléctrico", transmission: "Automática", power: "408 HP",
    color: "Azul Gentian", category: "SUV", images: [IMAGE_BASE], status: "draft",
    featured: false, acceptsFinancing: true,
  },
  {
    brand: "Audi", model: "RS e-tron GT", version: "Performance", year: 2024, price: 149000000,
    mileage: 4200, fuel: "Eléctrico", transmission: "Automática", power: "925 HP",
    color: "Gris Tactical", category: "Eléctrico", images: [IMAGE_BASE], status: "sold",
    featured: false, acceptsFinancing: false,
  },
  {
    brand: "Land Rover", model: "Discovery Sport", version: "R-Dynamic SE", year: 2024,
    price: 49900000, mileage: 14600, fuel: "Gasolina", transmission: "Automática", power: "200 HP",
    color: "Blanco Ostuni", category: "SUV", images: [IMAGE_BASE], status: "published",
    featured: false, acceptsFinancing: true,
  },
];

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export const ADMIN_VEHICLES: AdminVehicle[] = BASE_VEHICLES.map((v, i) => ({
  ...v,
  id: `v-${String(i + 1).padStart(3, "0")}`,
  createdAt: isoDaysAgo(60 - (i % 60)),
  updatedAt: isoDaysAgo(i % 14),
}));

export const ADMIN_ACTIVITIES: ActivityItem[] = ADMIN_VEHICLES.slice(0, 12).map((v, i) => {
  const types: Array<ActivityItem["type"]> = [
    "created", "updated", "sold", "updated", "created", "deleted",
    "updated", "created", "updated", "sold", "updated", "created",
  ];
  return {
    id: `act-${i + 1}`,
    type: types[i],
    vehicleId: v.id,
    vehicleLabel: `${v.brand} ${v.model}`,
    timestamp: isoDaysAgo(i / 2),
    user: i % 3 === 0 ? "Camila" : "Tú",
  };
});

export function getStats() {
  const total = ADMIN_VEHICLES.length;
  const published = ADMIN_VEHICLES.filter((v) => v.status === "published").length;
  const drafts = ADMIN_VEHICLES.filter((v) => v.status === "draft").length;
  const sold = ADMIN_VEHICLES.filter((v) => v.status === "sold").length;
  return { total, published, drafts, sold };
}

export const VEHICLE_BRANDS = [
  "BMW", "Mercedes-Benz", "Audi", "Porsche", "Tesla", "Volvo", "Lexus", "Land Rover",
];

export const VEHICLE_CATEGORIES = [
  "Sedán", "SUV", "Deportivo", "Coupé", "Wagon", "Eléctrico", "Pickup",
];

const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1600&q=80",
];

const POST_TITLES = [
  {
    title: "Por qué los eléctricos premium redefinen el confort de manejo",
    category: "Tecnología",
    tags: ["Eléctricos", "Innovación"],
    excerpt:
      "La nueva generación de vehículos eléctricos no solo cambia el combustible, redefine cómo se siente conducir. Analizamos las claves.",
    featured: true,
  },
  {
    title: "Cómo elegir tu primer auto deportivo: 7 preguntas clave",
    category: "Guías",
    tags: ["Deportivos", "Compra"],
    excerpt:
      "Comprar un deportivo no es solo velocidad. Te ayudamos a pensar en uso, presupuesto, mantenimiento y valor de reventa.",
    featured: false,
  },
  {
    title: "SUV vs Wagon: la comparativa que ningún fabricante te muestra",
    category: "Comparativas",
    tags: ["SUV", "Wagon", "Estilo de vida"],
    excerpt:
      "Más espacio, mejor dinámica, menor consumo. ¿Por qué el wagon sigue siendo la opción subestimada?",
    featured: false,
  },
  {
    title: "Leasing vs compra tradicional en 2026: cuándo conviene cada uno",
    category: "Financiamiento",
    tags: ["Leasing", "Compra", "Finanzas"],
    excerpt:
      "El escenario económico cambió. Repasamos cuándo conviene financiar, cuándo comprar y cuándo suscribirse.",
    featured: false,
  },
  {
    title: "El futuro de la certificación vehicular: qué viene después de los 150 puntos",
    category: "Industria",
    tags: ["Certificación", "Tecnología"],
    excerpt:
      "Cómo la IA y los sensores están cambiando el proceso de inspección de vehículos usados en mercados maduros.",
    featured: true,
  },
  {
    title: "Interior minimalista: la nueva frontera del lujo automotriz",
    category: "Diseño",
    tags: ["Diseño", "Lujo"],
    excerpt:
      "Menos botones, más pantallas. Cómo las marcas premium están reinterpretando el lujo desde la simplicidad.",
    featured: false,
  },
  {
    title: "Mantenimiento predictivo: lo que tu auto sabe antes que tú",
    category: "Tecnología",
    tags: ["Mantenimiento", "Tecnología"],
    excerpt:
      "Sensores, telemetría y machine learning al servicio de prevenir fallas antes de que ocurran.",
    featured: false,
  },
  {
    title: "Carga pública en Chile: el mapa real de la electromovilidad 2026",
    category: "Tecnología",
    tags: ["Eléctricos", "Infraestructura", "Chile"],
    excerpt:
      "Recorremos las regiones con mayor cobertura de carga eléctrica y qué viene para el resto del país.",
    featured: false,
  },
  {
    title: "Por qué un auto usado certificado vale más que uno nuevo económico",
    category: "Compra inteligente",
    tags: ["Usados", "Certificación", "Valor"],
    excerpt:
      "La depreciación es brutal el primer año. Un usado certificado puede darte 80% del auto por 50% del precio.",
    featured: false,
  },
  {
    title: "Test: Porsche Taycan 4S vs BMW i7 — lujo eléctrico cara a cara",
    category: "Comparativas",
    tags: ["Porsche", "BMW", "Eléctricos"],
    excerpt:
      "Dos filosofías del lujo eléctrico. Uno deportivo y emotivo, otro refinado y tecnológico. ¿Cuál gana?",
    featured: true,
  },
  {
    title: "Cómo preparar tu auto para venderlo en 48 horas",
    category: "Guías",
    tags: ["Venta", "Consejos"],
    excerpt:
      "Fotos, documentación, precio. Una checklist rápida para maximizar el valor de tu vehículo en el menor tiempo.",
    featured: false,
  },
  {
    title: "El nuevo consumidor automotriz: digital, informado y sin paciencia",
    category: "Industria",
    tags: ["Mercado", "Consumidor"],
    excerpt:
      "Las nuevas generaciones compran autos como compran zapatos: online, con datos y sin reuniones innecesarias.",
    featured: false,
  },
];

const POST_CONTENT = `En este artículo exploramos a fondo un tema clave para cualquier comprador o entusiasta automotriz. 

Repasamos el contexto actual, las opciones disponibles y los criterios que realmente importan a la hora de tomar una decisión informada.

## Por qué importa

El mercado automotriz cambió más en los últimos cinco años que en las tres décadas anteriores. La electrificación, la digitalización y los nuevos modelos de propiedad están reescribiendo las reglas.

## Lo que viene

Los próximos años traerán más cambios. Mantenerse informado es la mejor herramienta para tomar buenas decisiones, sin importar si estás comprando tu primer auto o el décimo.

## Conclusión

No existe una respuesta universal. Pero entender el contexto, las opciones y los trade-offs es el primer paso para elegir bien.`;

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(2, Math.round(words / 200));
}

export const BLOG_POSTS: BlogPost[] = POST_TITLES.map((p, i) => {
  const now = new Date();
  const created = new Date(now);
  created.setDate(now.getDate() - (i * 5 + 12));
  const updated = new Date(created);
  updated.setDate(created.getDate() + (i % 4));
  const status: BlogPost["status"] =
    i % 7 === 6 ? "archived" : i % 4 === 3 ? "draft" : "published";
  const publishedAt =
    status === "published" ? new Date(created.getTime() + 86400000).toISOString() : undefined;

  return {
    id: `post-${String(i + 1).padStart(3, "0")}`,
    title: p.title,
    slug: slugify(p.title),
    excerpt: p.excerpt,
    content: POST_CONTENT,
    coverImage: COVER_IMAGES[i % COVER_IMAGES.length],
    category: p.category,
    tags: p.tags,
    status,
    author: i % 3 === 0 ? "Camila Rojas" : "David Méndez",
    readingTime: readingTime(POST_CONTENT),
    featured: p.featured,
    views: Math.floor(800 + Math.random() * 12000),
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
    publishedAt,
  };
});

export const BLOG_CATEGORIES = [
  "Tecnología",
  "Guías",
  "Comparativas",
  "Financiamiento",
  "Industria",
  "Diseño",
  "Compra inteligente",
];

export function getBlogStats() {
  const total = BLOG_POSTS.length;
  const published = BLOG_POSTS.filter((p) => p.status === "published").length;
  const drafts = BLOG_POSTS.filter((p) => p.status === "draft").length;
  const archived = BLOG_POSTS.filter((p) => p.status === "archived").length;
  const totalViews = BLOG_POSTS.reduce((acc, p) => acc + p.views, 0);
  return { total, published, drafts, archived, totalViews };
}

const BASE_USERS: Array<Omit<AdminUser, "id" | "joinedAt" | "lastActiveAt">> = [
  {
    role: "admin", name: "David Méndez", email: "david@miautomatch.cl", phone: "+56 9 1234 5678",
    city: "Santiago", status: "active", favoriteVehicleIds: [],
  },
  {
    role: "admin", name: "Camila Rojas", email: "camila@miautomatch.cl", phone: "+56 9 2345 6789",
    city: "Santiago", status: "active", favoriteVehicleIds: [],
  },
  {
    role: "admin", name: "Andrés Herrera", email: "andres@miautomatch.cl", phone: "+56 9 3456 7890",
    city: "Valparaíso", status: "suspended", favoriteVehicleIds: [],
  },
  {
    role: "user", name: "Felipe Torres", email: "felipe.torres@gmail.com", phone: "+56 9 4567 8901",
    city: "Santiago", status: "active", favoriteVehicleIds: ["v-001", "v-002", "v-003"],
  },
  {
    role: "user", name: "Isabel Sánchez", email: "isabel.sanchez@outlook.com", phone: "+56 9 5678 9012",
    city: "Concepción", status: "active", favoriteVehicleIds: ["v-001", "v-005"],
  },
  {
    role: "user", name: "Rodrigo Fuentes", email: "rfuentes@yahoo.com", phone: "+56 9 6789 0123",
    city: "Santiago", status: "pending", favoriteVehicleIds: [],
  },
  {
    role: "user", name: "María José Peña", email: "mj.pena@gmail.com", phone: "+56 9 7890 1234",
    city: "Valparaíso", status: "active", favoriteVehicleIds: ["v-002", "v-010"],
  },
  {
    role: "user", name: "Cristián Luna", email: "cristian.luna@icloud.com", phone: "+56 9 8901 2345",
    city: "Santiago", status: "suspended", favoriteVehicleIds: ["v-001"],
  },
  {
    role: "user", name: "Paula Araya", email: "paula.araya@gmail.com", phone: "+56 9 9012 3456",
    city: "La Serena", status: "active", favoriteVehicleIds: ["v-003", "v-007", "v-012"],
  },
  {
    role: "user", name: "Jorge Muñoz", email: "jorge.munoz@live.com", phone: "+56 9 0123 4567",
    city: "Santiago", status: "active", favoriteVehicleIds: ["v-001", "v-006"],
  },
  {
    role: "user", name: "Daniela Vargas", email: "daniela.v@gmail.com", phone: "+56 9 1111 2222",
    city: "Temuco", status: "active", favoriteVehicleIds: ["v-004"],
  },
  {
    role: "user", name: "Sebastián Castro", email: "sebastian.c@outlook.com", phone: "+56 9 2222 3333",
    city: "Santiago", status: "pending", favoriteVehicleIds: [],
  },
  {
    role: "user", name: "Antonieta Riquelme", email: "anto.riquelme@gmail.com", phone: "+56 9 3333 4444",
    city: "Valparaíso", status: "active", favoriteVehicleIds: ["v-001", "v-002", "v-003", "v-005"],
  },
];

export const ADMIN_USERS: AdminUser[] = BASE_USERS.map((u, i) => ({
  ...u,
  id: `user-${String(i + 1).padStart(3, "0")}`,
  joinedAt: isoDaysAgo(90 - i * 5),
  lastActiveAt: isoDaysAgo(i % 10),
}));

export function getUserStats() {
  const total = ADMIN_USERS.length;
  const admins = ADMIN_USERS.filter((u) => u.role === "admin").length;
  const clients = ADMIN_USERS.filter((u) => u.role === "user").length;
  const active = ADMIN_USERS.filter((u) => u.status === "active").length;
  const suspended = ADMIN_USERS.filter((u) => u.status === "suspended").length;
  const pending = ADMIN_USERS.filter((u) => u.status === "pending").length;
  return { total, admins, clients, active, suspended, pending };
}