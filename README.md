

{
src/
│
├── api/
│   ├── productAPI.js        // API calls related to products
│   ├── categoryAPI.js       // API calls related to categories
│   ├── orderAPI.js          // API calls related to orders
│   └── authAPI.js           // API calls related to authentication
│
├── assets/
│   ├── images/              // Product and UI images
│   └── styles/              // Global CSS or SCSS files
│
├── components/
│   ├── Admin/
│   │   ├── ProductForm.js   // Form for adding/updating products
│   │   ├── CategoryForm.js  // Form for managing categories
│   │   ├── OrderList.js     // Admin view of orders
│   │   └── AdminDashboard.js // Admin dashboard overview
│   ├── User/
│   │   ├── ProductList.js   // List of products for users
│   │   ├── ProductItem.js   // Individual product component
│   │   ├── Cart.js          // Shopping cart component
│   │   ├── Checkout.js      // Checkout process
│   │   ├── OrderHistory.js  // User order history
│   │   ├── UserProfile.js   // User profile management
│   │   └── LoginForm.js     // Login form component
│   └── Layout/
│       ├── Header.js        // Header component
│       ├── Footer.js        // Footer component
│       └── Sidebar.js       // Sidebar navigation
│
|─────slices    
│     ├── authSlice.js    // Redux slice for user authentication          
│     ├── productSlice.js   // Redux slice for products management
│     ├── categorySlice.js     // Redux slice for categories management          
│     ├── orderSlice.js   // Redux slice for orders management
│     ├── cartSlice.js   // Redux slice for shopping cart
│
├── pages/
│   ├── AdminPage.js         // Admin main page
│   ├── UserPage.js          // User main page
│   ├── LoginPage.js         // Login page
│   ├── SignupPage.js        // Signup page
│   ├── ProductPage.js       // Product details page
│   ├── CartPage.js          // Cart page
│   ├── CheckoutPage.js      // Checkout page
│   └── ProfilePage.js       // User profile page
│
├── store/
│   └── store.js             // Redux store setup
│
├── App.js                   // Main application component
├── index.js                 // Application entry point

}
