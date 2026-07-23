import type { AdminVehicle, ActivityItem } from "./types";

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