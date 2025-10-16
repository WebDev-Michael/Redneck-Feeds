# Firebase Setup Instructions for Redneck Feeds

## 📋 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Name it: `redneck-feeds` (or your choice)
4. Disable Google Analytics (optional)
5. Click **"Create project"**

---

## 🔧 Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`)
2. Register app name: `Redneck Feeds Web`
3. **Don't** set up Firebase Hosting (we'll use another service)
4. Copy the **Firebase configuration object**

---

## 🔑 Step 3: Add Firebase Config

1. Open `src/firebase/config.js`
2. Replace the placeholder config with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

---

## 🔐 Step 4: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click **"Get started"**
3. Go to **Sign-in method** tab
4. Enable **"Email/Password"**
5. Click **Save**

---

## 🗄️ Step 5: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select your location (closest to your users)
5. Click **"Enable"**

---

## 👤 Step 6: Create Admin User

1. Go to **Authentication** > **Users** tab
2. Click **"Add user"**
3. Email: `admin@redneckfeeds.com` (or your choice)
4. Password: Create a strong password (you'll use this to login)
5. Click **"Add user"**

---

## 🔒 Step 7: Secure Firestore Rules

1. Go to **Firestore Database** > **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow everyone to read products
    match /products/{product} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

3. Click **"Publish"**

---

## ✅ Step 8: Test Your Setup

1. Start your dev server: `npm run dev`
2. Go to your footer and click the tiny dot (·) - that's the admin link!
3. Login with your admin credentials
4. Add your first product!

---

## 🎉 You're Done!

Your admin dashboard is now live. The admin link is intentionally subtle (just a dot in the footer) so customers don't see it.

### Admin URLs:
- **Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard` (after login)

---

## 🚀 Next Steps

1. Add all your products through the admin dashboard
2. Test the product pages on the public site
3. Deploy your site (Vercel, Netlify, etc.)
4. Update Firebase authorized domains in Authentication settings

---

## 📞 Need Help?

If you run into issues, check:
- Firebase config is correctly copied
- Authentication is enabled
- Firestore is created
- You created an admin user
- Firestore rules are published

