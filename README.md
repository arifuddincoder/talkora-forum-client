# 💬 Talkora - A Modern MERN Forum Platform

**Talkora** is a full-featured forum platform where users can post, comment, vote, and interact with a vibrant community. Built using the MERN stack, Talkora offers an intuitive and responsive UI, powerful dashboard features for both users and admins, and secure Firebase authentication.

🚀 Built with **React.js**, **TailwindCSS**, **DaisyUI**, **Firebase Auth**, **React Router v7**, and **TanStack Query**, this app ensures high performance and modern UX standards.

---

## 🔗 Live Website

🌐 [https://b11a12-talkora.web.app](https://b11a12-talkora.web.app)

## 🧾 Repositories

- 🗂️ **Client GitHub:** [https://github.com/arifuddincoder/talkora-forum-client](https://github.com/arifuddincoder/talkora-forum-client)  
- ⚙️ **Server GitHub:** [https://github.com/arifuddincoder/talkora-forum-server](https://github.com/arifuddincoder/talkora-forum-server)  
- 🌐 **Main API:** [https://b11a12-talkora-server.vercel.app/](https://b11a12-talkora-server.vercel.app/)

---

## 🎯 Project Purpose

This assignment was developed as a MERN Stack Forum Platform where users can:
- Log in or register using social providers or email
- Post and browse discussion threads
- Upvote/downvote posts and comment on them
- Become a member for additional features
- Admins can manage users, review reports, and make announcements

---

## ✅ Key Features

### 🏠 Homepage
- Tag-based post search (with real-time MongoDB filter)
- Announcements section with unread count
- Posts are sortable by popularity (Upvote - Downvote logic)
- Pagination (5 posts per page)
- Recent tags and dynamic banner with search suggestions

### 🧑‍💼 User Dashboard
- 📌 My Profile: View name, email, badges, and recent posts
- 📝 Add Post: Form with dynamic tag select and vote fields
- 📋 My Posts: View own posts with comment and delete options
- 🔒 Private Route protected with Firebase JWT

### 🥇 Membership System
- Pay via Stripe to become a member
- Gold badge for members, Bronze badge for new users
- Members can add unlimited posts (others: max 5)

### 🔐 Authentication
- Email & Password login and registration
- Google Sign-in supported
- react-hook-form for form validation
- Protected routes with `PrivateRoute`

### 🛠 Admin Dashboard
- Manage Users (Make admin, search, view subscription)
- Reported Comments handling (feedback-based moderation)
- Post Tag Manager with pie chart stats
- Admin Profile: Site-wide post/comment/user counts

---

## 📦 Dependencies & Libraries

| Package                     | Purpose                                  |
|-----------------------------|------------------------------------------|
| `react`                     | UI Library                               |
| `react-router`              | Routing (v7.6.3+)                         |
| `firebase`                  | Authentication           |
| `tailwindcss`               | Utility-first CSS framework              |
| `daisyui`                   | Tailwind UI component library            |
| `@tanstack/react-query`     | Data fetching (GET methods only)         |
| `axios`                     | HTTP client                              |
| `sweetalert2`               | Alert dialogs                            |
| `react-hook-form`           | Form validation                          |
| `react-icons`               | Icon components                          |
| `react-spinners`            | Loading UI                               |
| `dayjs`                     | Time formatting                          |
| `react-select`              | Tag selection dropdown                   |
| `recharts`                  | Pie chart visualization                  |
| `react-share`               | Social sharing buttons                   |
| `@stripe/react-stripe-js`  | Stripe payment integration               |

---

## 📁 Folder Structure

```
src/
├── components/            # Reusable UI components
├── hooks/                 # Custom hooks (auth, axios, queries)
├── layouts/               # Root & Dashboard layout
├── pages/                 # All route-based pages (user/admin)
├── routes/                # Route config with private routing
├── firebase/              # Firebase init config
├── main.jsx               # Entry point
```

---

## 🛡️ Security & Environment

### ✅ Environment Variables (secured)
Stored in `.env.local`:
```
VITE_API_URL=https://b11a12-talkora-server.vercel.app
VITE_FIREBASE_API_KEY=...
VITE_AUTH_DOMAIN=...
...
```

### ✅ Security Measures
- MongoDB URI & Firebase credentials are stored in `.env`
- Firebase JWT used with secure `withCredentials` Axios
- Role-based access for user/admin dashboards

---

## 📊 Admin Panel Features

- View site statistics (pie chart: Posts vs Comments vs Users)
- Add new post tags
- Manage user roles & subscriptions
- Review and delete reported comments

---

## 🚀 Deployment

- Client hosted on **Firebase**
- Server hosted on **Vercel**
- Firebase authorized domains configured
- CORS, refresh handling, and JWT persistence are ensured

---

## 🧩 Bonus & Optional Features

- 💬 Read More modal for long comments
- 📌 Feedback-based report system (dropdown + disable)
- 🧠 MongoDB Aggregation for vote difference sorting
- 🔄 Axios interceptor configured

---

## 👨‍💻 Developer Info

**Md Arif Uddin**  
📧 arifuddincoder@gmail.com  
🌐 [https://codebyarif.web.app](https://codebyarif.web.app)  
🔗 [LinkedIn](https://linkedin.com/in/arifuddincoder) | [GitHub](https://github.com/arifuddincoder)

---

## 📬 Admin Access Info

- **Admin Email:** `rafiq.ahmed@mailinator.com`
- **Admin Password:** `Pa$$w0rd!`
- 🔗 **Live URL:** [https://b11a12-talkora.web.app](https://b11a12-talkora.web.app)
- 🧾 **Client GitHub:** [https://github.com/arifuddincoder/talkora-forum-client](https://github.com/arifuddincoder/talkora-forum-client)
- 🧾 **Server GitHub:** [https://github.com/arifuddincoder/talkora-forum-server](https://github.com/arifuddincoder/talkora-forum-server)

---
