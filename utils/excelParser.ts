import { User } from '@/types';

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

export interface AnalyticsData {
  date: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface EcommerceData {
  users: User[];
  orders: Order[];
  analytics: AnalyticsData[];
}

export const readExcelFile = async (): Promise<EcommerceData> => {
  try {
    // For browser environment, we'll use mock data generator
    // In production, you'd upload the file or fetch from API
    return generateMockDataFromExcel();
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return generateMockDataFromExcel();
  }
};

// Generate data based on the Excel structure
const generateMockDataFromExcel = (): EcommerceData => {
  // Generate users
  const users: User[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: [
      'John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown',
      'Diana Prince', 'Eve Adams', 'Frank Miller', 'Grace Lee', 'Henry Wilson',
      'Iris Chen', 'Jack Ryan', 'Kate Martinez', 'Leo Garcia', 'Mia Robinson',
      'Noah Clark', 'Olivia Lewis', 'Paul Walker', 'Quinn Hall', 'Rachel Young',
      'Sam King', 'Tina Wright', 'Uma Scott', 'Victor Green', 'Wendy Adams',
      'Xavier Baker', 'Yara Nelson', 'Zack Hill', 'Amy Moore', 'Brian Taylor',
      'Clara Anderson', 'David Thomas', 'Emma Jackson', 'Felix White', 'Gina Harris',
      'Hannah Martin', 'Ivan Thompson', 'Julia Garcia', 'Kevin Martinez', 'Linda Rodriguez',
      'Mike Davis', 'Nancy Lopez', 'Oscar Gonzalez', 'Patricia Wilson', 'Quincy Anderson',
      'Rita Thomas', 'Steve Johnson', 'Teresa Williams', 'Ulysses Brown', 'Victoria Jones'
    ][i],
    email: `user${i + 1}@example.com`,
    status: i % 5 === 0 ? 'Inactive' : 'Active' as 'Active' | 'Inactive',
    role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Manager' : 'User' as 'Admin' | 'User' | 'Manager',
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  }));

  // Generate orders
  const products = ['Laptop', 'Smartphone', 'Headphones', 'Tablet', 'Smartwatch', 'Camera', 'Speaker', 'Monitor'];
  const statuses: ('Pending' | 'Shipped' | 'Delivered' | 'Cancelled')[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
  
  const orders: Order[] = Array.from({ length: 100 }, (_, i) => {
    const quantity = Math.floor(Math.random() * 5) + 1;
    const price = Math.floor(Math.random() * 500) + 50;
    return {
      id: i + 1,
      userId: (i % 50) + 1,
      userName: users[i % 50].name,
      product: products[i % products.length],
      quantity,
      price,
      total: quantity * price,
      status: statuses[i % 4],
      orderDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };
  });

  // Generate analytics data (last 30 days)
  const analytics: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 5000) + 1000,
      clicks: Math.floor(Math.random() * 1000) + 200,
      conversions: Math.floor(Math.random() * 200) + 50,
      revenue: Math.floor(Math.random() * 10000) + 2000,
    };
  });

  return { users, orders, analytics };
};
