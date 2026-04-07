<<<<<<< HEAD
<div align="center">

# 🛍️ ShopHub — Premium React E-Commerce App

<img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/React_Router-7.13.0-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
<img src="https://img.shields.io/badge/Context_API-State_Mgmt-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/FakeStore_API-REST-FF6B6B?style=for-the-badge&logo=json&logoColor=white" />

<br/><br/>

> **ShopHub** is a fully functional, production-ready eCommerce web application built with **React 19**, **React Router v7**, and the **Context API**. It features real product data, a complete multi-step checkout flow with UPI & COD payment options, geolocation-based address auto-fill, persistent cart via localStorage, and animated UI interactions — all with zero CSS framework dependencies.

<br/>

![ShopHub Banner](https://via.placeholder.com/900x300/0f172a/a78bfa?text=ShopHub+%E2%80%94+Premium+React+eCommerce)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Project Structure](#️-project-structure)
- [⚙️ Tech Stack](#️-tech-stack)
- [🔌 API Integration](#-api-integration)
- [🪝 React Hooks Used](#-react-hooks-used)
- [🧩 Components & Pages](#-components--pages)
- [🛒 Cart System Deep Dive](#-cart-system-deep-dive)
- [💳 Checkout Flow](#-checkout-flow)
- [📦 Context API — State Management](#-context-api--state-management)
- [💾 localStorage Persistence](#-localstorage-persistence)
- [📍 Geolocation Address Auto-Fill](#-geolocation-address-auto-fill)
- [🚀 Getting Started](#-getting-started)
- [📁 File-by-File Walkthrough](#-file-by-file-walkthrough)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ **Product Listing** | Fetches 20 real products via FakeStore API with images, titles, prices, and categories |
| 🔍 **Live Search** | Instantly filters products by name as you type (case-insensitive) |
| 🏷️ **Category Filter** | Dropdown to filter by `electronics`, `jewelery`, `men's clothing`, `women's clothing` |
| 🧺 **Add to Cart** | Adds products with a 2-second animated "Added! ✅" confirmation state |
| 🔢 **Quantity Controls** | Increment/decrement item quantities directly in cart (min: 1) |
| 🗑️ **Remove from Cart** | Remove individual items or clear entire cart |
| 💾 **Persistent Cart** | Cart state auto-saved and restored from `localStorage` on every visit |
| 🏷️ **Cart Badge** | Live count badge on the nav with a bounce animation when items are added |
| 📍 **GPS Address Auto-Fill** | Uses the browser Geolocation API + OpenStreetMap Nominatim to auto-fill shipping address |
| 💳 **UPI Payment** | Dynamically generated QR code via `api.qrserver.com` for the exact cart amount |
| 🚚 **Cash on Delivery** | COD payment option with custom order confirmation screen |
| 📦 **Order Confirmation** | Success page showing order total, shipping address, and payment method |
| 📊 **Filter Status** | Live counter showing "Showing X of Y products" |
| 🔄 **Multi-Step Checkout** | Cart → Address → Payment → Success (with back navigation) |
| ⚡ **Loading Spinner** | Animated spinner while products are fetching |
| ❌ **Error Handling** | User-friendly error display if the API call fails |
| 📱 **Responsive Design** | Mobile-friendly layout built with pure Vanilla CSS |
| 🎨 **Fade-in Animations** | Smooth `fade-in` CSS transitions for cards and page sections |

---

## 🏗️ Project Structure

```
Ecommerce/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images & icons
│   ├── components/
│   │   ├── Navbar.jsx          # 🔗 Navigation bar with animated cart badge
│   │   └── ProductCard.jsx     # 🃏 Individual product card with add-to-cart
│   ├── contexts/
│   │   ├── CartContext.jsx     # 🗂️ React Context creation
│   │   └── CartProvider.jsx    # 🏭 Context Provider — cart state + actions
│   ├── pages/
│   │   ├── Products.jsx        # 🛍️ Product listing with search & filter
│   │   ├── Cart.jsx            # 🛒 Cart + multi-step checkout flow
│   │   └── About.jsx           # ℹ️  About page
│   ├── App.jsx                 # 🧭 Route definitions
│   ├── App.css                 # 🎨 All component styles
│   ├── index.css               # 🌍 Global styles & CSS variables
│   └── main.jsx                # 🚀 App entry point with providers
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Dependencies & scripts
```

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **React** | `^19.2.0` | Core UI library — functional components |
| **React DOM** | `^19.2.0` | DOM rendering |
| **React Router DOM** | `^7.13.0` | Client-side routing & navigation |
| **Vite** | `^7.2.4` | Lightning-fast build tool & dev server |
| **ESLint** | `^9.39.1` | Code quality & linting |
| **Vanilla CSS** | — | All styling — no CSS framework |

---

## 🔌 API Integration

### 1. 🛍️ FakeStore API — Product Data

```js
// src/pages/Products.jsx
useEffect(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
      setFiltered(data);
      setLoading(false);
    })
    .catch(() => {
      setError("Failed to fetch products");
      setLoading(false);
    });
}, []);
```

| Endpoint | Method | Returns |
|---|---|---|
| `https://fakestoreapi.com/products` | `GET` | 20 products with `id`, `title`, `price`, `image`, `category` |

---

### 2. 📍 OpenStreetMap Nominatim — Reverse Geocoding

Used in the checkout address step to auto-fill the user's street, city, and ZIP from GPS coordinates.

```js
// src/pages/Cart.jsx
const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
);
const data = await response.json();
```

| Endpoint | Method | Trigger |
|---|---|---|
| `https://nominatim.openstreetmap.org/reverse` | `GET` | "Use Current Location" button click |

---

### 3. 📱 QR Server — Dynamic UPI QR Code

Generates a scannable UPI payment QR code matching the exact cart total.

```js
// src/pages/Cart.jsx
`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=...&am=${totalPrice}&cu=INR`
```

| Endpoint | Method | Returns |
|---|---|---|
| `https://api.qrserver.com/v1/create-qr-code/` | `GET` | QR code image with UPI deep-link data |

---

## 🪝 React Hooks Used

A detailed breakdown of every React Hook used across the application:

### `useState`

| File | State Variable | Purpose |
|---|---|---|
| `CartProvider.jsx` | `cart` | Stores array of cart items with quantities |
| `Products.jsx` | `products` | Raw product list from API |
| `Products.jsx` | `filtered` | Filtered product list after search/category applied |
| `Products.jsx` | `category` | Currently selected category filter |
| `Products.jsx` | `loading` | Shows spinner while API is fetching |
| `Products.jsx` | `error` | Stores error message from failed API call |
| `Products.jsx` | `search` | Current value of the search input |
| `Cart.jsx` | `step` | Current checkout step: `"cart"` → `"address"` → `"payment"` → `"success"` |
| `Cart.jsx` | `address` | Object: `{ name, street, city, zip }` |
| `Cart.jsx` | `paymentMethod` | Selected payment: `"upi"` or `"cod"` |
| `Cart.jsx` | `isLocating` | True while GPS + geocoding API is running |
| `Navbar.jsx` | `isPop` | Triggers the cart badge bounce animation |
| `ProductCard.jsx` | `added` | Shows "Added! ✅" for 2 seconds after clicking add |

---

### `useEffect`

| File | Dependency Array | Side Effect |
|---|---|---|
| `CartProvider.jsx` | `[cart]` | Saves the cart array to `localStorage` on every change |
| `Products.jsx` | `[]` | Fetches all products from FakeStore API once on mount |
| `Products.jsx` | `[category, search, products]` | Re-filters `filtered` list whenever search, category, or raw products change |
| `Navbar.jsx` | `[cart.length]` | Triggers the cart badge pop animation when item count changes |

---

### `useContext`

| File | Context | Values Consumed |
|---|---|---|
| `Navbar.jsx` | `CartContext` | `cart` (for badge count) |
| `ProductCard.jsx` | `CartContext` | `addToCart` |
| `Cart.jsx` | `CartContext` | `cart`, `removeFromCart`, `updateQuantity`, `clearCart` |

---

### `createContext` (React API)

```js
// src/contexts/CartContext.jsx
import { createContext } from "react";
export const CartContext = createContext();
```

Creates the global cart context that is consumed by `Navbar`, `ProductCard`, and `Cart`.

---

## 🧩 Components & Pages

### 🔗 `Navbar.jsx`
- Renders the app name **ShopHub** and nav links: `Products`, `Cart`, `About`
- Uses `NavLink` from React Router for active-state styling
- Reads `cart` from `CartContext` to display a live **item count badge**
- **Badge pop animation**: `useEffect` watches `cart.length` and triggers a CSS bounce class for 400ms via `setTimeout`

---

### 🃏 `ProductCard.jsx`
- Displays product `image`, `category`, `title`, and `price`
- "Add to Cart" button calls `addToCart(product)` from `CartContext`
- Local `added` state flips the button to **"Added! ✅"** for 2 seconds, then resets

---

### 🛍️ `Products.jsx`
- Fetches data from FakeStore API on mount (`useEffect` with `[]`)
- Maintains separate `products` (raw) and `filtered` (display) arrays
- **Search**: filters `filtered` by `title.toLowerCase().includes(search.toLowerCase())`
- **Category**: derived from live product data — `[...new Set(products.map(p => p.category))]`
- Renders loading spinner, error state, filter counts, and the product grid

---

### 🛒 `Cart.jsx`
The most complex component — handles the entire checkout experience:

```
Step 1: cart      → Review items, see order summary
Step 2: address   → Fill shipping details (or auto-fill via GPS)
Step 3: payment   → Choose UPI (scan QR) or COD
Step 4: success   → Order confirmed!
```

- Uses a `step` state machine to render different UI sections
- Back navigation between steps supported

---

### ℹ️ `About.jsx`
- Static informational page about the ShopHub app and its technical stack

---

## 🛒 Cart System Deep Dive

The cart is managed entirely in `CartProvider.jsx` and shared via `CartContext`.

### Cart Actions

```js
// ADD: If product exists, increment quantity. Otherwise push with quantity: 1
const addToCart = (product) => {
  setCart((prevCart) => {
    const exists = prevCart.find((item) => item.id === product.id);
    if (exists) {
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...prevCart, { ...product, quantity: 1 }];
  });
};

// REMOVE: Filter out the item by productId
const removeFromCart = (productId) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
};

// UPDATE QUANTITY: Minimum quantity is 1 (Math.max guard)
const updateQuantity = (productId, amount) => {
  setCart((prevCart) =>
    prevCart.map((item) => {
      if (item.id === productId) {
        const newQuantity = Math.max(1, item.quantity + amount);
        return { ...item, quantity: newQuantity };
      }
      return item;
    })
  );
};

// CLEAR: Reset cart to empty array
const clearCart = () => setCart([]);
```

### Order Totals

```js
const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
```

---

## 💳 Checkout Flow

```
🛒 Cart Review
      │
      ▼ "Proceed to Checkout"
📍 Shipping Address
  ┌── Manual input (name, street, city, ZIP)
  └── Auto-fill via GPS + OpenStreetMap Nominatim API
      │
      ▼ "Continue to Payment"
💳 Payment Method
  ├── UPI → Dynamic QR Code (api.qrserver.com) for exact amount
  └── COD → Cash on Delivery
      │
      ▼ "Place Order"
✅ Order Success
  └── Shows total, shipping address, and payment method used
```

---

## 📦 Context API — State Management

```
main.jsx
  └── <BrowserRouter>
        └── <CartProvider>      ← Wraps entire app with cart state
              └── <App>
                    ├── <Navbar />          ← useContext(CartContext) → cart
                    ├── <Products />
                    │     └── <ProductCard />  ← useContext(CartContext) → addToCart
                    └── <Cart />            ← useContext(CartContext) → all actions
```

**Context Value Shape:**
```js
{
  cart: [],              // Array of { id, title, price, image, category, quantity }
  addToCart: fn,         // (product) => void
  removeFromCart: fn,    // (productId) => void
  updateQuantity: fn,    // (productId, amount) => void  [+1 or -1]
  clearCart: fn          // () => void
}
```

---

## 💾 localStorage Persistence

The cart automatically persists across browser sessions.

**Write on every change:**
```js
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);
```

**Read on initial load (lazy initializer in useState):**
```js
const [cart, setCart] = useState(() => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
});
```

> This lazy initializer pattern runs **only once** on mount, avoiding unnecessary reads on every re-render.

---

## 📍 Geolocation Address Auto-Fill

Uses the browser's native **Geolocation API** + the free **OpenStreetMap Nominatim** reverse geocoding service.

```js
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  const data = await response.json();

  setAddress({
    street: data.display_name.split(',').slice(0, 2).join(','),
    city: data.address.city || data.address.town || data.address.village || "",
    zip: data.address.postcode || ""
  });
});
```

**Flow:**
1. User clicks "📍 Use Current Location"
2. Browser prompts for location permission
3. GPS coordinates are sent to Nominatim API
4. Street, city, and ZIP fields are auto-populated
5. `isLocating` state shows a "📍 Locating..." loading state on the button
=======
# 🛒 Shop Hub - The Store

**Shop Hub** is a fully-featured, Amazon-inspired e-commerce web application designed to provide a seamless and engaging online shopping experience. From browsing categories to managing a personal wallet, this platform offers a modern, dark-themed UI with robust functionality.

🌐 **Live Demo:** [shop-hub-the-store.netlify.app](https://shop-hub-the-store.netlify.app/)

---

## ✨ Features

Based on a comprehensive shopping workflow, Shop Hub includes:

* **Dynamic Homepage:** Engaging hero banners for major sales (e.g., "Biggest Sale of the Year") and quick-access category tiles (Mobiles, Groceries, Fashion, Electronics, Home & Furniture).
* **Detailed Product Listings:** Browse products with high-quality images, pricing, ratings, and quick "Add to Cart" or "Buy Now" actions.
* **Comprehensive Product Details:** Deep dive into product specs (RAM, Storage, Color), descriptions, and delivery policies (Free Delivery, Pay on Delivery, Replaceable).
* **Shopping Cart System:** A fully functional cart that calculates subtotals and displays user-friendly "Empty Cart" illustrations when no items are selected.
* **User Dashboard & Profile:** A dedicated user space to manage Profile Settings, Delivery Addresses, and Passwords.
* **Digital Wallet (My Wallet):** Integrated wallet system allowing users to hold a balance (e.g., ₹3000) for faster checkouts.
* **Order Tracking:** "My Orders" section to keep track of past and current purchases.
* **Modern Dark UI:** A sleek, responsive dark mode design that looks great on desktop and mobile screens.

---

## 🛠️ Tech Stack

*(Note: Update this section with the actual technologies you used!)*

* **Frontend:** React.js / Next.js, HTML5, CSS3
* **Styling:** Tailwind CSS / Custom CSS (Dark Theme)
* **State Management:** Redux / Context API
* **Backend/Database:** Node.js, Express, MongoDB / Firebase *(if applicable)*
* **Hosting:** Netlify

---

## 📸 Screenshots

*(Pro-tip: Upload your project screenshots to an `assets` folder in your repo and update the paths below to show them off!)*

| Homepage Categories | Product Listing |
| :---: | :---: |
| ![Homepage](path/to/your/image_4eb2ed.png) | ![Products](path/to/your/image_4eb023.jpg) |

| Product Details | User Dashboard & Wallet |
| :---: | :---: |
| ![Details](path/to/your/image_4eb040.png) | ![Dashboard](path/to/your/image_4eb01e.png) |
>>>>>>> f60d2856f772277f3e01bffd85fa00afcce8e7a7

---

## 🚀 Getting Started

<<<<<<< HEAD
### Prerequisites

- Node.js `>= 18`
- npm `>= 9`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/ecommerce-shophub.git

# 2. Navigate into the project directory
cd ecommerce-shophub

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be live at **`http://localhost:5173`**

### Available Scripts

| Script | Command | Description |
|---|---|---|
| Dev Server | `npm run dev` | Starts Vite dev server with HMR |
| Build | `npm run build` | Builds optimized production bundle |
| Preview | `npm run preview` | Serves the production build locally |
| Lint | `npm run lint` | Runs ESLint across all source files |

---

## 📁 File-by-File Walkthrough

| File | Lines | Responsibility |
|---|---|---|
| `main.jsx` | 14 | App bootstrap — wraps `<App>` in `<BrowserRouter>` and `<CartProvider>` |
| `App.jsx` | 21 | Route definitions: `/`, `/cart`, `/about` |
| `contexts/CartContext.jsx` | 4 | Creates the bare `CartContext` with `createContext()` |
| `contexts/CartProvider.jsx` | 53 | All cart logic: state, actions, localStorage sync |
| `components/Navbar.jsx` | 39 | Nav links, cart badge with pop animation |
| `components/ProductCard.jsx` | 36 | Product display card, add-to-cart with feedback |
| `pages/Products.jsx` | 95 | Product fetching, search + category filtering, grid render |
| `pages/Cart.jsx` | 267 | Full multi-step checkout: review, address, payment, success |
| `pages/About.jsx` | 30 | Static about/info page |
| `App.css` | 400+ | All component-level styles + animations |
| `index.css` | — | Global resets, CSS custom properties |

---

<div align="center">

### 🌟 Built with ❤️ using React 19 + Vite

**If you found this project helpful, please give it a ⭐ on GitHub!**

<img src="https://img.shields.io/badge/Made_with-React-61DAFB?style=flat-square&logo=react" />
<img src="https://img.shields.io/badge/Powered_by-FakeStore_API-FF6B6B?style=flat-square" />
<img src="https://img.shields.io/badge/Build_Tool-Vite-646CFF?style=flat-square&logo=vite" />

</div>
=======
To run this project locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   git clone https://github.com/sahilchaudhari32/E-commers.git
   
2. **Navigate to the project directory:**
cd shop-hub

3. **Install dependencies:**

npm install

4. **Start the development server:**

npm start

 **pen your browser:**
Navigate to http://localhost:3000 to see the app in action!

## 🤝 **Contributing**
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

1. Fork the Project

2. Create your Feature Branch (git checkout -b feature/AmazingFeature)

3. Commit your Changes (git commit -m 'Add some AmazingFeature')

4. Push to the Branch (git push origin feature/AmazingFeature)

5. Open a Pull Request

## 👨‍💻 Author
<h1>Sahil Chaudhari</h1>
>>>>>>> f60d2856f772277f3e01bffd85fa00afcce8e7a7
