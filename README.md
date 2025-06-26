# Mini Reconciliation Tool

A sophisticated financial reconciliation application designed to compare transaction records between internal systems and payment providers, built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

[View Live Application](https://your-deployment-url.com)

## 📋 Overview

The Mini Reconciliation Tool streamlines the financial reconciliation process by automatically comparing transaction data from two sources, identifying discrepancies, and providing actionable insights through an intuitive interface.

## ✨ Key Features

### 🔄 Smart File Processing
- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **CSV Validation**: Automatic validation of file format and required columns
- **Error Handling**: Clear, actionable error messages for invalid data
- **Real-time Processing**: Visual loading states and progress indicators

### 🔍 Advanced Reconciliation Logic
- **Exact Matching**: Identifies transactions present in both systems
- **Discrepancy Detection**: Highlights amount and status differences
- **Missing Transaction Identification**: Finds transactions unique to each system
- **Comprehensive Categorization**: Organizes results into actionable groups

### 📊 Rich Data Visualization
- **Summary Dashboard**: Key metrics and match rates at a glance
- **Color-coded Results**: Visual distinction between transaction categories
- **Interactive Tables**: Sortable, searchable transaction displays
- **Status Indicators**: Clear visual representation of transaction states

### 📤 Export Capabilities
- **Category-specific Exports**: Download results by transaction type
- **CSV Format**: Industry-standard format for further analysis
- **Discrepancy Reports**: Detailed reports for audit trails

## 🛠 Technical Architecture

### Frontend Stack
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development with comprehensive interfaces
- **Tailwind CSS**: Utility-first styling with responsive design
- **Vite**: Fast development server and optimized builds

### Key Libraries
- **Papa Parse**: Robust CSV parsing and validation
- **Lucide React**: Consistent, scalable icon system

### Code Organization
```
src/
├── components/          # Reusable UI components
│   ├── FileUpload.tsx   # File handling and validation
│   ├── SummaryStats.tsx # Dashboard metrics
│   ├── ResultsTable.tsx # Transaction display tables
│   └── DiscrepancyTable.tsx # Discrepancy-specific view
├── utils/               # Business logic and utilities
│   ├── reconciliation.ts # Core matching algorithms
│   └── csvExport.ts     # Export functionality
├── types/               # TypeScript definitions
│   └── index.ts         # Shared interfaces
└── App.tsx             # Main application component
```

## 📝 Data Requirements

### Required CSV Columns
- `transaction_reference`: Unique identifier for matching
- `amount`: Transaction amount in KSh
- `status`: Transaction status (completed, pending, failed)

### Sample Data Format
```csv
transaction_reference,amount,status
TXN001,1500.50,completed
TXN002,2750.00,pending
TXN003,875.25,failed
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd mini-reconciliation-tool

# Install dependencies
npm install

# Start development server
npm run dev
```

### Testing the Application
1. Use the provided test CSV files in the `test-data/` directory
2. Upload `internal_system.csv` as the Internal System Export
3. Upload `provider_statement.csv` as the Provider Statement
4. Click "Start Reconciliation" to see results
5. Test export functionality for each category

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality.

### Build Configuration
- **Development**: `npm run dev` - Hot reload development server
- **Production**: `npm run build` - Optimized production build
- **Preview**: `npm run preview` - Preview production build locally

## 🎯 Business Logic

### Reconciliation Algorithm
1. **Data Ingestion**: Parse and validate CSV files
2. **Reference Mapping**: Create lookup maps using transaction_reference
3. **Matching Process**: Compare transactions across both datasets
4. **Discrepancy Detection**: Identify amount and status differences
5. **Categorization**: Group results into actionable categories
6. **Report Generation**: Compile comprehensive reconciliation report

### Transaction Categories
- **✅ Matched**: Transactions present in both systems with identical details
- **🔍 Discrepancies**: Matched transactions with amount or status differences
- **⚠️ Internal Only**: Transactions missing from provider statement
- **❌ Provider Only**: Transactions missing from internal system

## 📈 Performance Considerations

- **Efficient Algorithms**: O(n) time complexity for reconciliation
- **Memory Optimization**: Streaming CSV processing for large files
- **Responsive Design**: Optimized for desktop and mobile devices
- **Error Boundaries**: Graceful handling of unexpected errors

## 🔒 Security Features

- **Client-side Processing**: No data transmitted to external servers
- **Input Validation**: Comprehensive validation of uploaded files
- **XSS Protection**: Sanitized data rendering
- **Type Safety**: TypeScript prevents runtime errors

## 🚀 Deployment

### Supported Platforms
- Netlify (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

### Build Process
```bash
npm run build
```
Generates optimized static files in the `dist/` directory.

## 🔮 Future Enhancements

### Immediate Improvements
- **Advanced Filtering**: Filter results by amount range, status, or date
- **Bulk Operations**: Select and export multiple categories simultaneously
- **Data Persistence**: Save reconciliation sessions for later review
- **Print Functionality**: Generate printable reconciliation reports

### Advanced Features
- **API Integration**: Direct integration with accounting systems
- **Scheduled Reconciliation**: Automated daily/weekly reconciliation
- **Multi-currency Support**: Handle multiple currencies with exchange rates
- **Audit Trail**: Complete history of reconciliation activities
- **Machine Learning**: Intelligent matching for similar transactions
- **Real-time Collaboration**: Multi-user reconciliation workflows

### Technical Improvements
- **Progressive Web App**: Offline functionality and app-like experience
- **Advanced Analytics**: Trend analysis and reconciliation insights
- **Database Integration**: Persistent storage for large datasets
- **Microservices Architecture**: Scalable backend services
- **Advanced Security**: Role-based access control and encryption

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@reconciliation-tool.com or create an issue in the repository.

---

**Built with ❤️ for financial operations teams**