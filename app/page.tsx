'use client';

import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
  SunOutlined,
  MoonOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme as antdTheme, Typography, Dropdown, Avatar, Space, ConfigProvider } from 'antd';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import OrdersChart from '@/components/dashboard/OrdersChart';
import UsersTable from '@/components/dashboard/UsersTable';
import UsersPage from '@/components/dashboard/UsersPage';
import OrdersPage from '@/components/dashboard/OrdersPage';
import AnalyticsPage from '@/components/dashboard/AnalyticsPage';
import { readExcelFile, EcommerceData } from '@/utils/excelParser';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type PageKey = 'dashboard' | 'users' | 'orders' | 'analytics';

interface DashboardContentProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ isDarkMode, onToggleTheme }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');
  const [ecommerceData, setEcommerceData] = useState<EcommerceData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = antdTheme.useToken();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await readExcelFile();
        setEcommerceData(data);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const renderPage = () => {
    if (loading || !ecommerceData) {
      return <div style={{ textAlign: 'center', padding: '40px' }}>Loading data...</div>;
    }

    // Generate monthly revenue data from orders
    const monthlyRevenue = ecommerceData.orders.reduce((acc, order) => {
      const month = new Date(order.orderDate).toLocaleString('default', { month: 'short' });
      const existing = acc.find(item => item.month === month);
      if (existing) {
        existing.revenue += order.total;
      } else {
        acc.push({ month, revenue: order.total });
      }
      return acc;
    }, [] as { month: string; revenue: number }[]);

    // Generate weekly orders data
    const weeklyOrders = Array.from({ length: 8 }, (_, i) => {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - ((7 - i) * 7));
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - ((6 - i) * 7));
      
      const ordersInWeek = ecommerceData.orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= weekStart && orderDate <= weekEnd;
      }).length;
      
      return { week: `Week ${i + 1}`, orders: ordersInWeek };
    });

    switch (currentPage) {
      case 'users':
        return <UsersPage data={ecommerceData.users} />;
      case 'orders':
        return <OrdersPage data={ecommerceData.orders} />;
      case 'analytics':
        return <AnalyticsPage data={ecommerceData.analytics} />;
      case 'dashboard':
      default:
        return (
          <>
            {/* Page Title */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 24 }}>Dashboard Overview</h2>
              <span style={{ color: '#8c8c8c' }}>Welcome back! Here&apos;s what&apos;s happening today.</span>
            </div>

            {/* Stats Cards - Calculate from real data */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 24 }}>
              <StatCard 
                data={{
                  title: 'Total Users',
                  value: ecommerceData.users.length.toString(),
                  change: 12.5,
                  icon: 'user',
                  color: '#1890ff',
                }} 
              />
              <StatCard 
                data={{
                  title: 'Total Orders',
                  value: ecommerceData.orders.length.toString(),
                  change: 8.2,
                  icon: 'shopping-cart',
                  color: '#52c41a',
                }} 
              />
              <StatCard 
                data={{
                  title: 'Revenue',
                  value: `$${ecommerceData.orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`,
                  change: -3.1,
                  icon: 'dollar',
                  color: '#faad14',
                }} 
              />
              <StatCard 
                data={{
                  title: 'Avg Order Value',
                  value: `$${(ecommerceData.orders.reduce((sum, o) => sum + o.total, 0) / ecommerceData.orders.length).toFixed(2)}`,
                  change: 5.4,
                  icon: 'line-chart',
                  color: '#eb2f96',
                }} 
              />
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 16, marginBottom: 24 }}>
              <RevenueChart data={monthlyRevenue} />
              <OrdersChart data={weeklyOrders} />
            </div>

            {/* Users Table Preview */}
            <UsersTable data={ecommerceData.users.slice(0, 10)} />
          </>
        );
    }
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed} 
        width={250} 
        theme={isDarkMode ? 'dark' : 'light'}
      >
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ margin: 0, color: isDarkMode ? '#fff' : '#000' }}>Dashboard</Title>
        </div>
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[currentPage]}
          onClick={({ key }) => setCurrentPage(key as PageKey)}
          style={{ borderRight: 0 }}
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: 'users',
              icon: <UserOutlined />,
              label: 'Users',
            },
            {
              key: 'orders',
              icon: <ShoppingCartOutlined />,
              label: 'Orders',
            },
            {
              key: 'analytics',
              icon: <LineChartOutlined />,
              label: 'Analytics',
            },
          ]}
        />
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            height: 64,
            lineHeight: '64px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            
            {/* Theme Switcher */}
            <Button
              type="text"
              icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={onToggleTheme}
              style={{
                fontSize: '16px',
                width: 48,
                height: 48,
              }}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            />
          </div>
          
          {/* User Profile Dropdown */}
          <Dropdown
            menu={{
              items: [
                {
                  key: 'profile',
                  icon: <UserOutlined />,
                  label: 'My Profile',
                },
                {
                  key: 'settings',
                  icon: <SettingOutlined />,
                  label: 'Settings',
                },
                {
                  type: 'divider',
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Logout',
                  danger: true,
                },
              ],
            }}
            placement="bottomRight"
            arrow
          >
            <Space style={{ cursor: 'pointer', padding: '8px 16px' }}>
              <Avatar 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                style={{ backgroundColor: '#1890ff' }}
                size="default"
              />
              <span style={{ fontWeight: 500 }}>Admin User</span>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
            height: 'calc(100vh - 64px - 48px)',
          }}
        >
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <DashboardContent isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
    </ConfigProvider>
  );
}
