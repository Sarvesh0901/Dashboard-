'use client';

import React from 'react';
import { Table, Card, Row, Col, Statistic } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AnalyticsData } from '@/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface AnalyticsPageProps {
  data: AnalyticsData[];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ data }) => {
  // Calculate summary statistics
  const totalViews = data.reduce((sum, item) => sum + item.views, 0);
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgConversionRate = ((totalConversions / totalViews) * 100).toFixed(2);

  const columns: ColumnsType<AnalyticsData> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      width: 100,
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: 'Clicks',
      dataIndex: 'clicks',
      key: 'clicks',
      width: 100,
      sorter: (a, b) => a.clicks - b.clicks,
    },
    {
      title: 'Conversions',
      dataIndex: 'conversions',
      key: 'conversions',
      width: 100,
      sorter: (a, b) => a.conversions - b.conversions,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      width: 120,
      render: (revenue: number) => `$${revenue.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 24 }}>Analytics Dashboard</h2>
        <span style={{ color: '#8c8c8c' }}>Track performance metrics and trends</span>
      </div>

      {/* Summary Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Views" 
              value={totalViews.toLocaleString()} 
              suffix="views"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Clicks" 
              value={totalClicks.toLocaleString()} 
              suffix="clicks"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Conversions" 
              value={totalConversions.toLocaleString()} 
              suffix="conversions"
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Revenue" 
              value={`$${totalRevenue.toLocaleString()}`}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Conversion Rate Card */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Statistic 
              title="Average Conversion Rate" 
              value={avgConversionRate} 
              suffix="%"
              precision={2}
              valueStyle={{ color: '#722ed1' }}
            />
          </Col>
        </Row>
      </Card>

      {/* Charts */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card title="Views & Clicks Trend">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="views" stroke="#1890ff" fill="#1890ff" fillOpacity={0.3} />
                <Area type="monotone" dataKey="clicks" stroke="#52c41a" fill="#52c41a" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Conversions & Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="conversions" fill="#faad14" />
                <Bar yAxisId="right" dataKey="revenue" fill="#eb2f96" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Detailed Data Table */}
      <Card title="Daily Analytics Details">
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="date"
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 600 }}
        />
      </Card>
    </div>
  );
};

export default AnalyticsPage;
