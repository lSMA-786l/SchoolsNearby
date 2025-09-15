# Next.js + MySQL School Search Mini Project

#LINK - https://schools-nearby.vercel.app

## Overview
A fully responsive school search platform with a modern black-and-white theme, styled using TailwindCSS via CDN. Data is stored in MySQL, and school images are saved in `/public/schoolImages`.

## Features
- Add and display schools
- Responsive grid/card UI
- Black & white theme with Tailwind transitions
- MySQL backend

## Manual Steps (User Must Do)
- Create MySQL database `schoolDB` and `schools` table (see below)
- Update DB credentials in `/lib/db.js`
- Ensure `/public/schoolImages` exists

## MySQL Table Schema
```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT NOT NULL,
  email_id TEXT NOT NULL UNIQUE
);
```

## Project Structure
- `/pages/addSchool.jsx` — Add school form
- `/pages/showSchools.jsx` — Show schools grid
- `/pages/api/addSchool.js` — API: Add school
- `/pages/api/getSchools.js` — API: Get schools
- `/lib/db.js` — MySQL connection
- `/public/schoolImages/` — Uploaded images
- `/pages/_document.js` — Tailwind CDN

## Setup
1. Update `/lib/db.js` with your MySQL credentials.
2. Run the app: `npm run dev` (after installing Next.js if needed)
3. Access at [http://localhost:3000](http://localhost:3000)
