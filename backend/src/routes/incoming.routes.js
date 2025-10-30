import express from 'express'
import IncomingController from '../controllers/incomingController.js'
import webhookUpload from '../config/webhookUpload.js'
import WebhookService from '../services/webhookService.js'
import LogService from '../services/logService.js'
import Log from '../models/Log.js'

const router = express.Router()

// Error handler for multer
const handleUploadError = async (err, req, res, next) => {
  if (err) {
    console.error('Upload error:', err.message)
    
    const urlKey = req.params.urlKey
    const ip = req.ip || req.connection.remoteAddress
    
    // Try to log the error
    try {
      const webhook = await WebhookService.getWebhookByUrlKey(urlKey)
      if (webhook) {
        await LogService.createLog(
          webhook.id,
          req.body || {},
          ip,
          Log.STATUS.FAILED,
          `File upload error: ${err.message}`
        )
      }
    } catch (logError) {
      console.error('Failed to log upload error:', logError)
    }
    
    return res.status(400).json({
      error: true,
      message: err.message,
      code: 'FILE_UPLOAD_ERROR'
    })
  }
  next()
}

// Handle webhook POST requests (with optional file uploads)
router.post('/:urlKey', 
  (req, res, next) => {
    webhookUpload.array('files', 10)(req, res, (err) => {
      handleUploadError(err, req, res, next)
    })
  },
  IncomingController.handleIncoming
)

// Get webhook logs as JSON (public endpoint)
router.get('/:urlKey/json', IncomingController.getWebhookLogsJson)

export default router
