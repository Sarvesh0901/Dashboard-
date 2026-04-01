'use client';

import React from 'react';
import { Card } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { OrdersData } from '@/types';

interface OrdersChartProps {
  data: OrdersData[];
}

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#eb2f96', '#722ed1', '#13c2c2', '#f5222d', '#fa8c16'];

const OrdersChart: React.FC<OrdersChartProps> = ({ data }) => {
  return (
    <Card
      title="Weekly Orders"
      bordered={false}
      style={{ borderRadius: 8 }}
    >
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={{ stroke: '#d9d9d9' }}
              tick={{ fill: '#8c8c8c', fontSize: 12 }}
            />
            <YAxis
              axisLine={{ stroke: '#d9d9d9' }}
              tick={{ fill: '#8c8c8c', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              cursor={{ fill: '#fafafa' }}
            />
            <Bar
              dataKey="orders"
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OrdersChart;
