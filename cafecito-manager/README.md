# ☕ Cafecito Manager

A full-stack, production-ready cafe management system built with React, Node.js, Express, and MongoDB.

## Tech Stack

**Frontend:** React (Vite) · Tailwind CSS · Framer Motion · React Router · Recharts  
**Backend:** Node.js · Express.js · Mongoose  
**Auth:** JWT · bcrypt  
**Database:** MongoDB Atlas

---

## Project Structure

```
cafecito-manager/
├── backend/
│   └── src/
│       ├── config/        # DB connection
│       ├── controllers/   # Route handlers
│       ├── middleware/    # Auth, error handler
│       ├── models/        # Mongoose models
│       ├── routes/        # Express routes
│       ├── utils/         # Token generator, seed script
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── context/       # Auth, Cart, Theme context
│       ├── hooks/         # Custom hooks
│       ├── layouts/       # Main + Admin layouts
│       ├── pages/         # All page components
│       │   └── admin/     # Admin panel pages
│       └── services/      # Axios API layer
└── README.md
```

---

## Quick Start

### 1. Clone and install

```bash
# Backend
cd cafecito-manager/backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure environment variables

```bash
# Backend
cp .env.example .env
# Fill in your MongoDB URI and JWT secret

# Frontend
cp .env.example .env
# Set VITE_API_URL if not using proxy
```

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/cafecito
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the database

```bash
cd backend
npm run seed
```

This creates:
- Admin: `admin@cafecito.com` / `admin123`
- Customer: `customer@cafecito.com` / `customer123`
- 18 menu items, sample orders and bookings

### 4. Run development servers

```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

App runs at `http://localhost:5173`  
API runs at `http://localhost:5000`

---

## API Reference

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/auth/register` | — | Register |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/auth/profile` | User | Get profile |
| GET | `/api/menu` | — | List menu (+ filters) |
| POST | `/api/menu` | Admin | Add item |
| PUT | `/api/menu/:id` | Admin | Update item |
| DELETE | `/api/menu/:id` | Admin | Delete item |
| POST | `/api/orders` | — | Place order |
| GET | `/api/orders` | Admin | All orders |
| GET | `/api/orders/my` | User | My orders |
| GET | `/api/orders/stats` | Admin | Dashboard stats |
| PUT | `/api/orders/:id/status` | Admin | Update status |
| POST | `/api/bookings` | — | Create booking |
| GET | `/api/bookings` | Admin | All bookings |
| PUT | `/api/bookings/:id/status` | Admin | Approve/Reject |

---

## Deployment

### Backend → Render

1. Push code to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set:
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
4. Add environment variables from `.env`
5. Set `FRONTEND_URL` to your Vercel frontend URL

### Frontend → Vercel

1. Import your repo on [vercel.com](https://vercel.com)
2. Set root directory to `frontend`
3. Add env variable: `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy

---

## Features

**Customer:**
- Browse and search menu with filters
- Add to cart (persisted in localStorage)
- Checkout and place orders
- Table booking system
- Order history
- Dark/light mode

**Admin:**
- Dashboard with charts and stats
- Full CRUD for menu items
- Order status management
- Booking approval/rejection
- User management

---

## License

MIT
