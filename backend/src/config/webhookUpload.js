import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Create uploads directory for webhook files
const uploadsDir = path.join(__dirname, '../../uploads/webhooks')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    // Generate unique filename: random-timestamp.ext
    const randomName = crypto.randomBytes(16).toString('hex')
    const timestamp = Date.now()
    const ext = path.extname(file.originalname)
    cb(null, `${randomName}-${timestamp}${ext}`)
  }
})

// File filter - images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Images
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    // Videos
    'video/mp4',
    'video/mpeg',
    'video/webm',
    'video/ogg',
    'video/quicktime'
  ]
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'), false)
  }
}

// Configure multer for webhook uploads
const webhookUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB max file size
  }
})

export default webhookUpload
