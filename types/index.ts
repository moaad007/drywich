export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description?: string;
  isAvailable: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 'new' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  notes?: string;
  tableNumber?: string;
}

export interface PrinterSettings {
  ipAddress: string;
  port: number;
  isEnabled: boolean;
}

export interface AppSettings {
  printer: PrinterSettings;
  shopName: string;
  receiptFooter?: string;
  currency: string;
  taxRate: number;
}