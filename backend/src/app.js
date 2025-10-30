import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.routes.js'
import webhookRoutes from './routes/webhook.routes.js'
import adminRoutes from './routes/admin.routes.js'
import incomingRoutes from './routes/incoming.routes.js'
import docsRoutes from './routes/docs.routes.js'
import settingsRoutes from './routes/settings.routes.js'
import companyPageRoutes from './routes/companyPage.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' })) // Limit payload size

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/docs', docsRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/company-pages', companyPageRoutes)
app.use('/webhook', incomingRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: true,
    message: 'Internal server error',
    code: 'SERVER_ERROR'
  })
})

export default app
