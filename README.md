# Kapee E-Commerce Frontend Overview

## Project Summary
Kapee is a React and Vite based e-commerce frontend that connects to a separate backend API for authentication, catalog data, cart management, category management, product management, and order workflows.

The application supports three main user experiences:
- public storefront browsing for customers
- vendor product management
- admin management for products, categories, and orders

## Core User Flows

### 1. Public storefront
Customers can:
- browse the home page with featured products and category highlights
- explore the shop page and category-filtered views
- open product detail pages
- add items to cart
- proceed to checkout
- view account and order-related pages
- use search and category navigation

### 2. Authentication
The frontend uses an auth context to manage:
- login
- registration
- session state
- role-based experience for customer, vendor, and admin users

### 3. Cart and checkout
The cart flow includes:
- adding products to cart
- updating quantities
- removing items
- clearing the cart
- cart drawer quick access
- checkout page integration

### 4. Vendor dashboard
Vendors can:
- open the vendor dashboard
- view product-related stats
- create products
- edit products
- delete products
- upload product images
- select categories for products

The vendor product form depends on real categories returned by the backend.

### 5. Admin dashboard
Admins can manage:
- dashboard overview
- product categories
- products
- orders

Admin pages support CRUD-style workflows for the catalog and order monitoring.

## Technical Structure

### Frontend stack
- React 19
- TypeScript
- Vite
- React Router
- React Query
- Axios
- Tailwind CSS
- React Icons and Lucide icons

### Important application areas
- `src/App.tsx`: top-level route registration
- `src/context/AuthContext.tsx`: authentication state
- `src/context/Cart.tsx`: cart state and cart API calls
- `src/api/`: API client modules
- `src/pages/`: public and admin pages
- `src/components/`: shared UI and vendor dashboard

## Backend Integration
The frontend is designed to work with this deployed backend:
- `https://backend-zi60.onrender.com`

Integrated backend domains include:
- auth
- products
- categories
- cart
- orders
- stats

A shared URL helper is used in safe integration files to:
- target the deployed backend instead of localhost
- resolve image/media URLs
- support production-safe API requests

## Fallback Behavior
Some public-facing pages include fallback demo data so the UI can still render when the backend returns empty product or category arrays.

This fallback is for display only.
It is not used for vendor product submission, because vendor actions require real backend IDs such as `categoryId`.

## Current Operational Notes
- If product or category sections look empty, check whether the backend actually contains records.
- If the vendor category dropdown is empty, create categories first from the admin side.
- Product images displayed from backend data depend on valid backend image paths.
- Long-term production image handling is best served by Cloudinary or another persistent media store rather than temporary local uploads.

## Run Commands
- Development: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Deployment Notes
This frontend is intended for deployment on Render and communicates with a separately deployed backend service. Correct API base URL and media URL resolution are important for production behavior.
