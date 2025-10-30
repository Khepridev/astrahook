import WebhookService from '../services/webhookService.js'
import LogService from '../services/logService.js'
import Log from '../models/Log.js'

class IncomingController {
  // Handle incoming webhook requests with file uploads
  static async handleIncoming(req, res) {
    const urlKey = req.params.urlKey
    let payload = req.body
    const ip = req.ip || req.connection.remoteAddress
    const signature = req.headers['x-webhook-signature']

    try {
      // Find webhook by URL key
      const webhook = await WebhookService.getWebhookByUrlKey(urlKey)

      if (!webhook) {
        return res.status(404).json({
          error: true,
          message: 'Webhook not found',
          code: 'WEBHOOK_NOT_FOUND'
        })
      }

      // If files were uploaded, add their URLs to payload
      if (req.files && req.files.length > 0) {
        const baseUrl = `${req.protocol}://${req.get('host')}`
        payload.files = req.files.map(file => {
          const fileType = file.mimetype.startsWith('image/') ? 'image' : 
                          file.mimetype.startsWith('video/') ? 'video' : 'file'
          
          console.log('File uploaded:', {
            filename: file.filename,
            mimetype: file.mimetype,
            type: fileType,
            url: `${baseUrl}/uploads/webhooks/${file.filename}`
          })
          
          return {
            url: `${baseUrl}/uploads/webhooks/${file.filename}`,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            type: fileType
          }
        })
      }

      // Verify signature if provided and secret exists
      if (webhook.secret && signature) {
        const isValid = webhook.verifySignature(payload, signature)

        if (!isValid) {
          // Log invalid signature attempt
          await LogService.createLog(
            webhook.id,
            payload,
            ip,
            Log.STATUS.INVALID_SIGNATURE,
            'Invalid HMAC signature'
          )

          return res.status(401).json({
            error: true,
            message: 'Invalid signature',
            code: 'INVALID_SIGNATURE'
          })
        }
      }

      // Create log entry
      const log = await LogService.createLog(
        webhook.id,
        payload,
        ip,
        Log.STATUS.SUCCESS
      )

      return res.status(200).json({
        received: true,
        logId: log.id,
        timestamp: log.created_at,
        filesUploaded: req.files ? req.files.length : 0
      })
    } catch (error) {
      console.error('Incoming webhook error:', error)

      // Try to log the error if we have a webhook
      try {
        const webhook = await WebhookService.getWebhookByUrlKey(urlKey)
        if (webhook) {
          await LogService.createLog(
            webhook.id,
            payload,
            ip,
            Log.STATUS.FAILED,
            error.message
          )
        }
      } catch (logError) {
        console.error('Failed to log error:', logError)
      }

      return res.status(500).json({
        error: true,
        message: 'Failed to process webhook',
        code: 'WEBHOOK_PROCESSING_FAILED'
      })
    }
  }

  // Get webhook logs as JSON (public endpoint)
  static async getWebhookLogsJson(req, res) {
    const urlKey = req.params.urlKey
    const limit = parseInt(req.query.limit) || 50
    const page = parseInt(req.query.page) || 1

    try {
      // Find webhook by URL key
      const webhook = await WebhookService.getWebhookByUrlKey(urlKey)

      if (!webhook) {
        return res.status(404).json({
          error: true,
          message: 'Webhook not found',
          code: 'WEBHOOK_NOT_FOUND'
        })
      }

      // Get logs
      const result = await LogService.getLogsByWebhookId(webhook.id, page, limit)

      return res.status(200).json({
        success: true,
        webhook: {
          url_key: webhook.url_key,
          created_at: webhook.created_at
        },
        logs: result.logs.map(log => ({
          id: log.id,
          payload: log.payload,
          ip: log.ip,
          status: log.status,
          attempts: log.attempts,
          last_error: log.last_error,
          created_at: log.created_at
        })),
        pagination: result.pagination
      })
    } catch (error) {
      console.error('Get webhook logs JSON error:', error)
      return res.status(500).json({
        error: true,
        message: 'Failed to get webhook logs',
        code: 'GET_LOGS_FAILED'
      })
    }
  }
}

export default IncomingController
