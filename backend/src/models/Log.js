class Log {
  constructor(data) {
    this.id = data.id
    this.webhook_id = data.webhook_id
    this.payload = data.payload
    this.ip = data.ip
    this.status = data.status
    this.attempts = data.attempts || 1
    this.last_error = data.last_error
    this.created_at = data.created_at
  }

  // Status constants
  static STATUS = {
    SUCCESS: 'success',
    FAILED: 'failed',
    PENDING: 'pending',
    INVALID_SIGNATURE: 'invalid_signature'
  }

  // Check if log is successful
  isSuccess() {
    return this.status === Log.STATUS.SUCCESS
  }

  // Check if log failed
  isFailed() {
    return this.status === Log.STATUS.FAILED
  }

  // Get payload preview (first 100 characters)
  getPayloadPreview() {
    if (!this.payload) {
      return null
    }

    const payloadString = typeof this.payload === 'string'
      ? this.payload
      : JSON.stringify(this.payload)

    if (payloadString.length <= 100) {
      return payloadString
    }

    return payloadString.substring(0, 100) + '...'
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      webhook_id: this.webhook_id,
      payload: this.payload,
      payload_preview: this.getPayloadPreview(),
      ip: this.ip,
      status: this.status,
      attempts: this.attempts,
      last_error: this.last_error,
      created_at: this.created_at
    }
  }

  // Convert to JSON with minimal info (for lists)
  toMinimalJSON() {
    return {
      id: this.id,
      webhook_id: this.webhook_id,
      payload_preview: this.getPayloadPreview(),
      ip: this.ip,
      status: this.status,
      created_at: this.created_at
    }
  }
}

export default Log
