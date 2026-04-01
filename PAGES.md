# Dashboard Pages Implementation

## Overview
This dashboard now includes 4 main pages that display data from the Excel file:

1. **Dashboard** - Overview with stats, charts, and recent users
2. **Users** - Complete user management table
3. **Orders** - Order tracking and management
4. **Analytics** - Performance metrics and trends

## Features

### Dashboard Page
- Real-time statistics calculated from data
- Monthly revenue chart
- Weekly orders chart
- Recent users preview

### Users Page
- Full user table with sorting and filtering
- Search functionality
- User details (ID, Name, Email, Role, Status, Created Date)
- Pagination with customizable page sizes

### Orders Page
- Complete order management
- Order details (ID, Customer, Product, Quantity, Price, Total, Status, Date)
- Status indicators with color coding
- Sortable columns

### Analytics Page
- Summary statistics cards (Views, Clicks, Conversions, Revenue)
- Average conversion rate
- Interactive charts:
  - Views & Clicks trend (Area chart)
  - Conversions & Revenue (Bar chart)
- Detailed daily analytics table

## Data Source
All data is loaded from `ecommerce_data.xlsx` using the `xlsx` library. The data parser (`utils/excelParser.ts`) generates:
- 50 users
- 100 orders
- 30 days of analytics data

## Navigation
Use the sidebar menu to navigate between pages:
- 📊 Dashboard
- 👥 Users
- 🛒 Orders
- 📈 Analytics

## Technical Details
- Built with Next.js 16 and React 19
- UI Components from Ant Design
- Charts powered by Recharts
- State management with Zustand
- TypeScript for type safety
