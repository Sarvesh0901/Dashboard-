'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Order } from '@/types';

interface OrdersPageProps {
  data: Order[];
}

const OrdersPage: React.FC<OrdersPageProps> = ({ data }) => {
  const columns: ColumnsType<Order> = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Customer',
      dataIndex: 'userName',
      key: 'userName',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number) => `$${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: (total: number) => `$${total.toFixed(2)}`,
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          Pending: 'orange',
          Shipped: 'blue',
          Delivered: 'green',
          Cancelled: 'red',
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>Orders Management</h2>
        <span style={{ color: '#8c8c8c' }}>Track and manage all customer orders</span>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 1000 }}
      />
    </div>
  );
};

export default OrdersPage;
