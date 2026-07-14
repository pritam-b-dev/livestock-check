/**
 * User Interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  plan: "free" | "growth" | "business";
}

/**
 * Item / Stock Interface
 */
export interface Item {
  _id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
  location: string;
  imageUrl?: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  ownerId: string;
  ownerName: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Category Count Breakdown for Analytics
 */
export interface CategoryCount {
  category: string;
  count: number;
}

/**
 * Time Series Data Point for Analytics
 */
export interface TimeSeriesData {
  date: string;
  count: number;
}

/**
 * Analytics Summary Interface
 */
export interface AnalyticsSummary {
  totalItems: number;
  totalUsers: number;
  totalValue: number;
  lowStockCount: number;
  byCategory: CategoryCount[];
  addedOverTime: TimeSeriesData[];
}
