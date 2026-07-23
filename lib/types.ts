export type VehicleStatus = "published" | "draft" | "sold";
export type VehicleFuel = "Gasolina" | "Diésel" | "Híbrido" | "Eléctrico";
export type VehicleTransmission = "Automática" | "Manual";

export type AdminVehicle = {
  id: string;
  brand: string;
  model: string;
  version?: string;
  year: number;
  price: number;
  mileage: number;
  fuel: VehicleFuel;
  transmission: VehicleTransmission;
  power: string;
  color: string;
  category: string;
  description?: string;
  images: string[];
  status: VehicleStatus;
  featured: boolean;
  acceptsFinancing: boolean;
  discount?: number;
  createdAt: string;
  updatedAt: string;
};

export type ActivityType = "created" | "updated" | "deleted" | "sold";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  vehicleId: string;
  vehicleLabel: string;
  timestamp: string;
  user: string;
};

export type BlogPostStatus = "published" | "draft" | "archived";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: BlogPostStatus;
  author: string;
  readingTime: number;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
};