import { create } from 'zustand';
import { Product, Order, AppSettings, OrderItem } from '@/types';

interface AppState {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  
  // Current Order
  currentOrderItems: OrderItem[];
  addItemToOrder: (item: OrderItem) => void;
  updateOrderItem: (productId: string, quantity: number) => void;
  removeOrderItem: (productId: string) => void;
  clearCurrentOrder: () => void;
  
  // Orders History
  orders: Order[];
  createOrder: () => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // App Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
}

// Initial app settings
const defaultSettings: AppSettings = {
  printer: {
    ipAddress: '192.168.1.1',
    port: 9100,
    isEnabled: false,
  },
  shopName: 'Driwich',
  receiptFooter: 'Thank you for your order!',
  currency: 'USD',
  taxRate: 0,
};

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export const useStore = create<AppState>((set) => ({
  // Products
  products: [],
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: generateId() }],
    })),
  updateProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    })),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  
  // Current Order
  currentOrderItems: [],
  addItemToOrder: (item) =>
    set((state) => {
      const existingItem = state.currentOrderItems.find(
        (i) => i.productId === item.productId
      );
      
      if (existingItem) {
        return {
          currentOrderItems: state.currentOrderItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      
      return {
        currentOrderItems: [...state.currentOrderItems, item],
      };
    }),
  updateOrderItem: (productId, quantity) =>
    set((state) => ({
      currentOrderItems: state.currentOrderItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  removeOrderItem: (productId) =>
    set((state) => ({
      currentOrderItems: state.currentOrderItems.filter(
        (item) => item.productId !== productId
      ),
    })),
  clearCurrentOrder: () => set({ currentOrderItems: [] }),
  
  // Orders History
  orders: [],
  createOrder: () =>
    set((state) => {
      if (state.currentOrderItems.length === 0) return state;
      
      const total = state.currentOrderItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0
      );
      
      const newOrder: Order = {
        id: generateId(),
        items: [...state.currentOrderItems],
        total,
        status: 'new',
        createdAt: new Date(),
      };
      
      return {
        orders: [newOrder, ...state.orders],
        currentOrderItems: [],
      };
    }),
  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? { ...order, status } : order
      ),
    })),
  
  // App Settings
  settings: defaultSettings,
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));