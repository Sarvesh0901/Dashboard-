// User interface for data table
export interface User {
  id: number;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  role: 'Admin' | 'User' | 'Manager';
  avatar?: string;
  createdAt: string;
}

// Stat card interface
export interface StatCardData {
  title: string;
  value: string | number;
  change: number;
  icon: string;
  color: string;
}

// Revenue data for line chart
export interface RevenueData {
  month: string;
  revenue: number;
}

// Orders data for bar chart
export interface OrdersData {
  week: string;
  orders: number;
}

// Theme mode type
export type ThemeMode = 'light' | 'dark';

// Navigation item type
export interface NavItem {
  key: string;
  label: string;
  icon: string;
  path: string;
}

// Dashboard store state type
export interface DashboardState {
  sidebarCollapsed: boolean;
  theme: ThemeMode;
  toggleSidebar: () => void;
  toggleTheme: () => void;
}

// Order interface
export interface Order {
  id: number;
  userId: number;
  userName: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
}

// Analytics data interface
export interface AnalyticsData {
  date: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}
