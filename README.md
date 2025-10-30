<div align="center">
  <img src="logo.png" alt="AstraHook Logo" width="64" height="64">
  
  # AstraHook

  ![Version](https://img.shields.io/badge/version-1.0-blue.svg)
  ![License](https://img.shields.io/badge/license-MIT-yellow.svg)
  [![Website](https://img.shields.io/badge/Website-khepridev.xyz-00C7B7?logo=google-chrome&logoColor=white)](https://khepridev.xyz/)
  ![Follow](https://img.shields.io/badge/Follow-@Khepridev-1DA1F2?logo=x&logoColor=white)

  A modern, full-featured webhook management platform built with Node.js, Vue.js, and PostgreSQL.
</div>

## Features

- 🎯 **Webhook Management** - Create, monitor, and manage webhooks with ease
- 📊 **Real-time Monitoring** - View incoming requests instantly with detailed logs
- 🔐 **HMAC Signature Verification** - Secure your webhooks with cryptographic signatures
- 📁 **File Upload Support** - Handle images and videos (up to 50MB)
- 👥 **User Management** - Role-based access control (Admin/User)
- 📚 **Documentation System** - Built-in docs with markdown support
- 📄 **Company Pages** - Create custom pages (About, Privacy Policy, Terms, etc.)
- ⚙️ **Site Settings** - Customizable branding, SEO, logos, and configuration
- 🎨 **Theme Support** - Separate logos for light/dark themes
- 🌐 **Multi-language** - Support for English and Turkish
- 🌓 **Dark Mode** - Beautiful UI with light/dark theme support
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔔 **Real-time Updates** - Live webhook request monitoring

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Multer** - File upload handling
- **Bcrypt** - Password hashing

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **Vue Router** - Client-side routing
- **Pinia** - State management
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful icon library

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Quick Start

For a step-by-step setup guide, see [SETUP_GUIDE.md](SETUP_GUIDE.md).

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/khepridev/astrahook.git
cd astrahook
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
# Server
PORT=3080
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=astrahook
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=52428800
UPLOAD_DIR=uploads
```

### 3. Database Setup

**Create a PostgreSQL database:**

```bash
# Using psql
psql -U postgres

# In psql console:
CREATE DATABASE astrahook;
\q

# Or using createdb command:
createdb -U postgres astrahook
```

**Run the database setup script:**

```bash
npm run db:setup
```

This will:
- Create all necessary tables with constraints
- Set up indexes for performance
- Insert seed data (documentation, settings)
- Create default admin user (admin@admin.com / 123123)

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:3080
```

### 5. Start the Application

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3080

## First Steps

### 1. Login as Admin

A default admin account is created automatically during database setup:

```
Email: admin@admin.com
Password: 123123
```

**⚠️ IMPORTANT:** Change the default password immediately after first login for security!

### 2. Create Your First Webhook

1. Log in to the dashboard
2. Navigate to "Webhooks"
3. Click "Create Webhook"
4. Fill in the details and save
5. Copy your unique webhook URL

### 3. Test Your Webhook

```bash
curl -X POST http://localhost:3080/webhook/your-webhook-key \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/change-password` - Change password
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/upload-avatar` - Upload avatar

### Webhooks
- `GET /api/webhooks` - List user webhooks
- `POST /api/webhooks` - Create webhook
- `GET /api/webhooks/:id` - Get webhook details
- `PUT /api/webhooks/:id` - Update webhook
- `DELETE /api/webhooks/:id` - Delete webhook
- `GET /api/webhooks/:id/logs` - Get webhook logs
- `GET /api/webhooks/:id/stats` - Get webhook statistics

### Incoming Webhooks
- `POST /webhook/:urlKey` - Receive webhook data
- `GET /webhook/:urlKey` - Receive webhook data (GET)
- `PUT /webhook/:urlKey` - Receive webhook data (PUT)
- `PATCH /webhook/:urlKey` - Receive webhook data (PATCH)
- `DELETE /webhook/:urlKey` - Receive webhook data (DELETE)

### Admin
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/webhooks` - List all webhooks
- `GET /api/admin/stats` - Get system statistics

### Documentation
- `GET /api/docs/categories` - List doc categories
- `GET /api/docs/pages` - List doc pages
- `GET /api/docs/slug/:slug` - Get page by slug

### Settings
- `GET /api/settings` - Get all settings (Admin)
- `PUT /api/settings` - Update settings (Admin)
- `GET /api/settings/public` - Get public settings

## File Upload

AstraHook supports file uploads through webhooks:

### Supported Formats
- **Images:** JPEG, PNG, GIF, WebP, SVG
- **Videos:** MP4, MPEG, WebM, OGG, MOV

### Limits
- Max file size: 50MB
- Max files per request: 10

### Example

```bash
curl -X POST http://localhost:3080/webhook/your-key \
  -F "files=@image.png" \
  -F "files=@video.mp4" \
  -F "message=File upload test"
```

## Security

### HMAC Signature Verification

Secure your webhooks with HMAC signatures:

1. Set a secret key when creating a webhook
2. Sign requests with the secret key
3. Include signature in `X-Webhook-Signature` header

**Node.js Example:**
```javascript
const crypto = require('crypto');

const secret = 'your-secret-key';
const payload = JSON.stringify({ data: 'test' });

const signature = crypto
  .createHmac('sha256', secret)
  .update(payload)
  .digest('hex');

// Include in request header
headers['X-Webhook-Signature'] = signature;
```

## Project Structure

```
astrahook/
├── backend/
│   ├── database/
│   │   ├── dump.sql          # Database schema and seed data
│   │   └── setup.js          # Database setup script
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── scripts/         # Utility scripts
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server entry point
│   ├── uploads/             # Uploaded files
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Vue components
│   │   ├── composables/     # Vue composables
│   │   ├── layouts/         # Layout components
│   │   ├── pages/           # Page components
│   │   ├── router/          # Vue Router config
│   │   ├── stores/          # Pinia stores
│   │   ├── utils/           # Utility functions
│   │   ├── App.vue          # Root component
│   │   └── main.js          # App entry point
│   └── package.json
└── README.md
```

## Scripts

### Backend
```bash
npm run dev                    # Start development server
npm run db:setup              # Setup database (initial setup)
npm run db:dump               # Dump current database to dump.sql
npm run create-admin          # Create admin user
npm start                     # Start production server
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Database
```bash
npm run db:setup     # Initial database setup with all tables and seed data
npm run db:dump      # Export current database to backend/database/dump.sql
```

## Environment Variables

### Backend (.env)
```env
PORT=3080
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=astrahook
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
MAX_FILE_SIZE=52428800
UPLOAD_DIR=uploads
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3080
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@astrahook.com or open an issue on GitHub.

## Acknowledgments

- Built with ❤️ using Vue.js and Node.js
- Icons by [Lucide](https://lucide.dev)
- UI inspired by modern design principles

## Author

**Khepridev**
- Twitter/X: [@Khepridev](https://twitter.com/Khepridev)
- GitHub: [@Khepridev](https://github.com/Khepridev)

## Star History

If you find this project useful, please consider giving it a ⭐️ on GitHub!

---

Made with ❤️ by [Khepridev](https://twitter.com/Khepridev)
