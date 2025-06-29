# CartAnalytics - SaaS Dashboard

A comprehensive abandoned cart analytics and recovery platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 **Dashboard**

- **Real-time Metrics**: Track total abandoned carts, recovery rate, revenue recovered, and average cart value
- **Detailed Cart Table**: View customer information, products, cart values, abandonment dates, and recovery status
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Built with shadcn/ui components and IBM Design Language

### 🤖 **AI Decision Tree**

- **Automated Recovery Logic**: Intelligent decision-making framework for cart recovery optimization
- **Priority-based Actions**: High, medium, and low priority recovery strategies
- **Behavioral Segmentation**: Customer segmentation based on purchase history and cart value
- **AI Insights**: Performance recommendations and areas for improvement
- **Campaign Metrics**: Track active campaigns, success rates, and revenue impact

### 🎨 **Design System**

- **IBM Design Language**: Professional, enterprise-grade design tokens
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Responsive Sidebar**: Collapsible navigation for mobile and desktop
- **Consistent Branding**: Cohesive color scheme and typography

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with IBM Design tokens
- **UI Components**: shadcn/ui with custom theming
- **Icons**: Lucide React
- **Responsive**: Mobile-first design approach

## Sample Data

The application includes realistic sample data featuring:

- **20 diverse products** across multiple categories (Electronics, Accessories, Home, Fitness, Stationery)
- **15 abandoned cart scenarios** with varying customer profiles and recovery statuses
- **Realistic metrics** showing 40% recovery rate and $708.86 revenue recovered
- **Comprehensive customer data** including names, emails, and purchase histories

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── ai-decision-tree/        # AI Decision Tree page
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout with sidebar
│   └── page.tsx                 # Dashboard page
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── sidebar.tsx
│   │   └── table.tsx
│   └── abandoned-cart-dashboard.tsx
├── data/
│   └── sample-data.ts           # Sample data and interfaces
└── lib/
    └── utils.ts                 # Utility functions
```

## Key Features Breakdown

### Dashboard Metrics

- **Total Abandoned Carts**: 15 carts tracked
- **Recovery Rate**: 40% success rate
- **Revenue Recovered**: $708.86 total
- **Average Cart Value**: $112.65 per cart

### AI Decision Tree Logic

1. **Cart Value Analysis**: Prioritize high-value carts ($100+)
2. **Customer Tier Assessment**: VIP customers get premium treatment
3. **Behavioral Segmentation**: Tailor messaging based on customer behavior
4. **Time-sensitive Follow-ups**: Escalate based on response timing
5. **Product Category Optimization**: Customize approach by product type

## Future Enhancements

- **Real-time Notifications**: Push notifications for high-value cart abandonments
- **A/B Testing Framework**: Test different recovery strategies
- **Advanced Analytics**: Customer lifetime value and churn prediction
- **Integration APIs**: Connect with popular e-commerce platforms
- **Email Template Builder**: Visual editor for recovery campaigns
- **Performance Dashboard**: ROI tracking and campaign performance metrics

## License

This project is a prototype/demo application for showcasing SaaS dashboard development capabilities.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

## 🎯 **Key Features**

### **Interactive React Flow Decision Tree Builder** ⭐ **NEW**

- **Visual Flow Canvas**: Drag-and-drop nodes with React Flow 12
- **Custom Node Types**: Start, Decision, and Action nodes with distinct designs
- **Property Panel**: Comprehensive editing interface for all node properties
- **Visual Connections**: Color-coded branches (green for true, red for false)
- **Export/Import**: Save and load decision tree configurations as JSON

### **Decision Node Capabilities**

- **Decision Types**:
  - Customer Property (tier, purchase history, subscriptions)
  - Cart Property (value, item count, categories)
  - Event Occurred (email opens, clicks, deliveries)
  - Custom Condition
- **Condition Builder**: Property selection, operators (>=, <=, =, !=), and values
- **Visual Branches**: True/False paths for decision logic

### **Action Node Features**

- **Multi-Channel Actions**: Email, SMS, Push, Retargeting, Custom
- **Template System**: Pre-built templates for different scenarios
- **Discount Configuration**: Percentage-based offers
- **Timing Control**: Immediate, 1h, 24h, 72h delays
- **Response Tracking**: Check engagement with configurable timeouts
