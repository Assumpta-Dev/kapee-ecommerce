# Admin Dashboard Documentation

## Overview
The admin dashboard is a complete management system for the e-commerce platform, styled according to the Nova design with a purple theme. It provides full CRUD operations for orders, products, and categories.

## Features

### 🎨 Design
- **No Navbar/Footer**: Clean admin interface without the public site navigation
- **Sidebar Navigation**: Collapsible sidebar with intuitive navigation
- **Purple Theme**: Matches the Nova design system with #7C3AED purple accent
- **Responsive Layout**: Works on all screen sizes
- **Modern UI**: Clean, professional interface with smooth transitions

### 📍 Navigation Structure
```
Admin Dashboard
├── Dashboard (Overview with stats)
├── Orders (List & Detail views with CRUD)
├── Product
│   ├── Product List (Full CRUD operations)
│   └── Product Categories (Full CRUD operations)
├── Customers (Placeholder)
├── Campaign (Placeholder)
├── Help Center (Placeholder)
└── Settings (Placeholder)
```

## Pages

### 1. Dashboard (`/admin`)
**Features:**
- Statistics cards showing:
  - Total Orders
  - Total Products
  - Total Categories
  - Total Revenue
- Trend indicators (percentage changes)
- Welcome banner

### 2. Orders Page (`/admin/orders`)
**Features:**
- **List View:**
  - Sortable table with all orders
  - Status filtering (All, Pending, Processing, Shipped, Delivered, Cancelled)
  - Quick actions: View, Edit, Delete
  - Status badges with color coding

- **Detail View:**
  - Breadcrumb navigation
  - Order header with ID, product count, status, and date
  - Order items table with product images and specs
  - Order summary with payment method and calculations
  - Customer details (name, email, phone)
  - Shipping information (method, company, tracking number)
  - Billing and shipping addresses
  - Status dropdown for updates
  - Invoice button
  - Delete order functionality

**CRUD Operations:**
- **Create**: Not directly available (orders come from customers)
- **Read**: View order list and detailed order information
- **Update**: Change order status via dropdown
- **Delete**: Remove orders with confirmation

### 3. Categories Page (`/admin/categories`)
**Features:**
- Grid layout with category cards
- Category image preview
- Add new category button
- Edit and delete actions on each card
- Modal form for create/edit operations

**CRUD Operations:**
- **Create**: Add new category with name, description, and image
- **Read**: View all categories in grid layout
- **Update**: Edit category details and image
- **Delete**: Remove category with confirmation

**Form Fields:**
- Category Name (required)
- Description (optional)
- Category Image (optional file upload)

### 4. Products Page (`/admin/products`)
**Features:**
- Data table with product listings
- Search functionality
- Stock status indicators (color-coded)
- Product images in table
- Category badges
- Add new product button
- Edit and delete actions

**CRUD Operations:**
- **Create**: Add new product with all details
- **Read**: View all products in searchable table
- **Update**: Edit product information
- **Delete**: Remove product with confirmation

**Form Fields:**
- Product Name (required)
- Description (required)
- Price (required, number)
- Quantity/Stock (required, number)
- Category (required, dropdown from existing categories)
- Product Images (optional, multiple file upload)

## Access Control

### Authentication Required
- **Role**: Admin
- **Check**: Performed in `AdminLayout.tsx`
- **Redirect**: Access denied page with "Go to Home" button

### To Access Admin Dashboard:
1. User must be logged in
2. User role must be 'admin'
3. Navigate to `/admin`

**Testing Access:**
You can temporarily modify the auth check in `AdminLayout.tsx` for development testing, or create an admin user account through your backend API.

## File Structure
```
src/
├── pages/admin/
│   ├── AdminLayout.tsx       # Main layout with sidebar
│   ├── DashboardPage.tsx     # Dashboard overview
│   ├── OrdersPage.tsx        # Orders list & detail
│   ├── CategoriesPage.tsx    # Categories CRUD
│   └── ProductsPage.tsx      # Products CRUD
├── api/
│   ├── apiOrder.ts          # Orders API endpoints
│   ├── apiProductNew.ts     # Products API endpoints
│   └── apiCategoryNew.ts    # Categories API endpoints
└── App.tsx                  # Routing configuration
```

## API Integration

### Orders API (`apiOrder.ts`)
```typescript
orderAPI.getAll()           // Get all orders
orderAPI.getById(id)        // Get order details
orderAPI.create(data)       // Create new order
orderAPI.update(id, data)   // Update order
orderAPI.updateStatus(id, status) // Update order status
orderAPI.delete(id)         // Delete order
```

### Products API (`apiProductNew.ts`)
```typescript
productAPI.getAll()         // Get all products
productAPI.getById(id)      // Get product details
productAPI.create(data)     // Create new product
productAPI.update(id, data) // Update product
productAPI.delete(id)       // Delete product
```

### Categories API (`apiCategoryNew.ts`)
```typescript
categoryAPI.getAll()        // Get all categories
categoryAPI.getById(id)     // Get category details
categoryAPI.create(data)    // Create new category
categoryAPI.update(id, data) // Update category
categoryAPI.delete(id)      // Delete category
```

## Key Components

### Sidebar Navigation
- **Collapsible**: Toggle button to collapse/expand
- **Active State**: Purple background for active page
- **Sub-menu**: Product section has expandable sub-items
- **User Profile**: Bottom section shows logged-in admin

### Top Header
- **Action Buttons**: Add, Calendar, Messages, Notifications, Flag
- **Notification Badges**: Red badges show unread counts
- **Consistent Across Pages**: Same header on all admin pages

### Modals
- **Create/Edit Forms**: Centered modal overlays
- **File Upload**: Drag-and-drop style file inputs
- **Validation**: Required field indicators
- **Error Handling**: Error messages displayed in modal

### Tables
- **Sortable Headers**: Column headers for organization
- **Hover Effects**: Row highlighting on hover
- **Action Icons**: Edit and delete icons per row
- **Status Badges**: Color-coded status indicators

## Color Scheme
- **Primary Purple**: `#7C3AED` (buttons, active states)
- **Purple Hover**: `#6D28D9` (button hover states)
- **Gray Scale**: Various gray tones for backgrounds and text
- **Status Colors**:
  - Pending: Gray (`#6B7280`)
  - Processing: Yellow (`#F59E0B`)
  - Shipped: Blue (`#3B82F6`)
  - Delivered: Green (`#10B981`)
  - Cancelled: Red (`#EF4444`)

## Icons
All icons from `react-icons/fa`:
- FaShoppingCart, FaBox, FaUsers, FaTh (Navigation)
- FaPlus, FaEdit, FaTrash (Actions)
- FaEye, FaSearch, FaFilter (Viewing)
- FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight (Navigation)

## Responsive Design
- **Desktop**: Full sidebar with text labels
- **Tablet**: Collapsible sidebar with icons
- **Mobile**: Hamburger menu (can be added)

## Future Enhancements
1. **Customers Page**: Complete customer management system
2. **Campaign Page**: Marketing campaign management
3. **Analytics**: Advanced charts and graphs
4. **Reports**: Export functionality
5. **Settings**: Admin preferences and configurations
6. **Real-time Updates**: WebSocket for live order updates
7. **Bulk Actions**: Select multiple items for batch operations

## Usage Examples

### Creating a New Product
1. Navigate to `/admin/products`
2. Click "Add Product" button
3. Fill in the form:
   - Enter product name and description
   - Set price and quantity
   - Select category from dropdown
   - Upload product images
4. Click "Create Product"

### Managing Orders
1. Navigate to `/admin/orders`
2. View list of all orders
3. Click eye icon to view order details
4. In detail view:
   - Update status from dropdown
   - View customer and shipping info
   - Print invoice
   - Delete if needed

### Editing Categories
1. Navigate to `/admin/categories`
2. Click "Edit" on any category card
3. Update name, description, or image
4. Click "Update Category"

## Troubleshooting

### Access Denied
- **Issue**: "You don't have permission to access the admin dashboard"
- **Solution**: Ensure you're logged in with an admin account

### Images Not Loading
- **Issue**: Category or product images show placeholders
- **Solution**: Check backend image server is running on `localhost:7000`

### API Errors
- **Issue**: CRUD operations fail
- **Solution**: Verify backend API endpoints are accessible and CORS is configured

## Notes
- All CRUD operations include proper error handling
- Confirmation dialogs prevent accidental deletions
- Mock data is provided for orders if backend is unavailable
- Forms validate required fields before submission
- Loading states provide user feedback during operations
