'use client';

import React from 'react';
import { Card } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts';
import type { RevenueData } from '@/types';

interface RevenueChartProps {
  data: RevenueData[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <Card
      title="Monthly Revenue"
      bordered={false}
      style={{ borderRadius: 8 }}
    >
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: '#d9d9d9' }}
              tick={{ fill: '#8c8c8c', fontSize: 12 }}
            />
            <YAxis
              axisLine={{ stroke: '#d9d9d9' }}
              tick={{ fill: '#8c8c8c', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #f0f0f0',
                borderRadius: 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1890ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1890ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#1890ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#1890ff"
              strokeWidth={2}
              dot={{ fill: '#1890ff', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
