'use client';

import React from 'react';
import { Table, Input, Button, Space, Tag, Badge } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { User } from '@/types';

interface UsersTableProps {
  data: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ data }) => {
  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void, confirm: () => void) => {
    clearFilters();
    confirm();
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
      render: (name: string, record: User) => (
        <Space>
          <img
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${record.id}`}
            alt={name}
            style={{ width: 32, height: 32, borderRadius: '50%' }}
          />
          <span style={{ fontWeight: 500 }}>{name}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: 'Active' | 'Inactive') => (
        <Badge
          status={status === 'Active' ? 'success' : 'default'}
          text={status}
        />
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Admin', value: 'Admin' },
        { text: 'Manager', value: 'Manager' },
        { text: 'User', value: 'User' },
      ],
      onFilter: (value, record) => record.role === value,
      render: (role: string) => {
        const color = role === 'Admin' ? 'red' : role === 'Manager' ? 'blue' : 'green';
        return (
          <Tag color={color} style={{ textTransform: 'uppercase' }}>
            {role}
          </Tag>
        );
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => {
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            style={{ color: '#1890ff' }}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      scroll={{ x: 800 }}
      bordered={false}
      size="middle"
    />
  );
};

export default UsersTable;
