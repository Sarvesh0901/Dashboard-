'use client';

import React from 'react';
import { Card, Statistic, Row, Col } from 'antd';
import {
  UserOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
} from '@ant-design/icons';
import type { StatCardData } from '@/types';

interface StatCardProps {
  data: StatCardData;
}

const StatCard: React.FC<StatCardProps> = ({ data }) => {
  const iconMap: Record<string, React.ElementType> = {
    user: UserOutlined,
    dollar: DollarOutlined,
    'shopping-cart': ShoppingCartOutlined,
    'line-chart': LineChartOutlined,
  };
  const IconComponent = iconMap[data.icon] || UserOutlined;

  const isPositive = data.change >= 0;

  return (
    <Card variant="borderless" style={{ borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <Row gutter={16} align="middle">
        <Col flex="auto">
          <Statistic
            title={<span style={{ fontSize: 14, color: '#8c8c8c' }}>{data.title}</span>}
            value={data.value}
            prefix={
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: `${data.color}15`, // 15 is hex for ~8% opacity
                  marginRight: 12,
                }}
              >
                <IconComponent style={{ fontSize: 24, color: data.color }} />
              </div>
            }
            styles={{ content: { fontSize: 24, fontWeight: 600, margin: 0 } }}
          />
        </Col>
        <Col>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 8px',
              borderRadius: 4,
              backgroundColor: isPositive ? '#f6ffed' : '#fff2e8',
              border: `1px solid ${isPositive ? '#b7eb8f' : '#ffbb96'}`,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: isPositive ? '#52c41a' : '#fa541c',
              }}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(data.change)}%
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default StatCard;
