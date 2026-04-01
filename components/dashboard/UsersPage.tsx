'use client';

import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { User } from '@/types';

interface UsersPageProps {
  data: User[];
}

const UsersPage: React.FC<UsersPageProps> = ({ data }) => {
  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        const colorMap: Record<string, string> = {
          Admin: 'red',
          Manager: 'blue',
          User: 'green',
        };
        return <Tag color={colorMap[role] || 'default'}>{role}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Active' ? 'success' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt.localeCompare(b.createdAt),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>Users Management</h2>
        <span style={{ color: '#8c8c8c' }}>View and manage all registered users</span>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default UsersPage;
