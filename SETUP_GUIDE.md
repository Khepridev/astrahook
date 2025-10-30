# Quick Setup Guide

## Prerequisites

- Node.js v18+
- PostgreSQL v14+
- npm or yarn

## Installation Steps

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/astrahook.git
cd astrahook
```

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```env
PORT=3080
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=astrahook
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRES_IN=7d

MAX_FILE_SIZE=52428800
UPLOAD_DIR=uploads
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:3080
```

### 4. Setup Database

```bash
# Create database
createdb -U postgres astrahook

# Run setup script
cd backend
npm run db:setup
```

**Output:**
```
✅ Database schema created successfully!
✅ Seed data inserted successfully!
✅ Default admin user created!

🔐 Default Admin Credentials:
   Email:    admin@admin.com
   Password: 123123

⚠️  IMPORTANT: Change the password after first login!
```

### 5. Start Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Access Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3080
- **Admin Login:** http://localhost:5173/admin/login

**Login with:**
- Email: `admin@admin.com`
- Password: `123123`

## Troubleshooting

### Database Connection Error

Check PostgreSQL is running:
```bash
# Windows
pg_ctl status

# Linux/Mac
sudo systemctl status postgresql
```

### Port Already in Use

Change ports in `.env` files:
```env
# Backend
PORT=3081

# Frontend
VITE_API_URL=http://localhost:3081
```

### Permission Denied

Grant database permissions:
```sql
GRANT ALL PRIVILEGES ON DATABASE astrahook TO your_user;
```

## What's Included

After setup, you'll have:

- ✅ Complete database schema
- ✅ 9 documentation pages
- ✅ 22 site settings (SEO, branding, etc.)
- ✅ Default admin account
- ✅ Ready-to-use webhook system

## Next Steps

1. Change admin password
2. Update site settings (Admin Panel → Settings)
3. Create your first webhook
4. Explore documentation

## Need Help?

- Check [README.md](README.md) for detailed information
- Open an issue on GitHub
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines

---

Happy coding! 🚀
