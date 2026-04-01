import { User, RevenueData, OrdersData, StatCardData } from '@/types';

// Mock user data (50 users)
export const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
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
  status: i % 5 === 0 ? 'Inactive' : 'Active',
  role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Manager' : 'User',
  createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
}));

// Monthly revenue data (12 months)
export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
  { month: 'Jul', revenue: 72000 },
  { month: 'Aug', revenue: 69000 },
  { month: 'Sep', revenue: 78000 },
  { month: 'Oct', revenue: 85000 },
  { month: 'Nov', revenue: 92000 },
  { month: 'Dec', revenue: 98000 },
];

// Weekly orders data (8 weeks)
export const ordersData: OrdersData[] = [
  { week: 'Week 1', orders: 120 },
  { week: 'Week 2', orders: 150 },
  { week: 'Week 3', orders: 180 },
  { week: 'Week 4', orders: 140 },
  { week: 'Week 5', orders: 200 },
  { week: 'Week 6', orders: 220 },
  { week: 'Week 7', orders: 190 },
  { week: 'Week 8', orders: 250 },
];

// Stat cards data
export const statCardsData: StatCardData[] = [
  {
    title: 'Total Users',
    value: '12,842',
    change: 12.5,
    icon: 'user',
    color: '#1890ff',
  },
  {
    title: 'Revenue',
    value: '$84,320',
    change: 8.2,
    icon: 'dollar',
    color: '#52c41a',
  },
  {
    title: 'Orders',
    value: '1,456',
    change: -3.1,
    icon: 'shopping-cart',
    color: '#faad14',
  },
  {
    title: 'Growth',
    value: '24.5%',
    change: 5.4,
    icon: 'line-chart',
    color: '#eb2f96',
  },
];
