# 🌾 Redneck Feeds LLC - Website

A modern, responsive website for Redneck Feeds, an agricultural grain delivery service serving Kitsap and Mason Counties.

## 🚀 Features

- **Responsive Design** - Works beautifully on mobile, tablet, and desktop
- **Product Categories** - Cattle, Equine, Poultry, Swine, Rabbit, Sheep & Goat, Grains
- **Admin Dashboard** - Secure login for product management
- **Firebase Integration** - Real-time product database
- **Modern UI** - Tailwind CSS with earthy agricultural colors

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Firebase** - Authentication & Database (Firestore)
- **Tailwind CSS** - Styling

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔐 Admin Access

The admin login is discreetly placed in the footer (look for a tiny dot after copyright).

**Admin URLs:**
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`

**Quick setup:**
1. Create Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Add your config to `src/firebase/config.js`
5. Create admin user
6. Start managing products!

## 📱 Contact Information

- **Phone**: (253) 313-8107
- **Service Area**: Kitsap and Mason Counties, Washington
- **Delivery**: Monday, Wednesday, Friday

## 🎨 Color Scheme

- **Primary Green**: `#2c5f2d` (Forest green)
- **Secondary Green**: `#8b9b5f` (Olive)
- **Accent**: `#c19a6b` (Camel/tan)
- **Light Background**: `#d4c4a8` (Warm tan)
- **Card Background**: `#f5f0e8` (Cream)
- **Body Background**: `#e0c297` (Light brown)

## 📂 Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Categories.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── pages/          # Page components
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   └── NotFound.jsx
├── context/        # React Context
│   └── AuthContext.jsx
├── firebase/       # Firebase config
│   └── config.js
└── App.jsx         # Main app component
```

## 🚀 Deployment

This site can be deployed to:
- **Vercel** (Recommended)
- **Netlify**
- **Firebase Hosting**

### Deploy to Vercel:
```bash
npm install -g vercel
vercel
```

## 📝 License

© 2025 Redneck Feeds LLC. All rights reserved.

## 🤝 Support

For questions or support, contact via phone or text at (253) 313-8107.
