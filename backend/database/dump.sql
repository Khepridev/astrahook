-- PostgreSQL Database Dump
-- Database: astrahook
-- Dumped at: 2025-10-30T22:25:28.073Z


-- Table: company_pages
DROP TABLE IF EXISTS company_pages CASCADE;
CREATE TABLE IF NOT EXISTS company_pages (
  id INTEGER DEFAULT nextval('company_pages_id_seq'::regclass) NOT NULL,
  slug CHARACTER VARYING(100) NOT NULL,
  title CHARACTER VARYING(255) NOT NULL,
  content TEXT NOT NULL,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data for table: company_pages
INSERT INTO company_pages (id, slug, title, content, meta_description, is_published, display_order, created_at, updated_at) VALUES (1, 'about-us', 'About Us', '# About AstraHook

## Who We Are

AstraHook is a modern webhook management platform designed to simplify your integration workflows. We provide developers and businesses with powerful tools to receive, process, and monitor webhooks efficiently.

## Our Mission

Our mission is to make webhook integration seamless and accessible for everyone. We believe that managing webhooks shouldn''t be complicated, and we''re committed to providing the best tools and support to help you succeed.

## What We Offer

- **Easy Webhook Management**: Create and manage unlimited webhooks with a user-friendly interface
- **Real-time Monitoring**: Track all incoming requests with detailed logs and analytics
- **File Upload Support**: Handle images, videos, and documents through your webhooks
- **Secure & Reliable**: Enterprise-grade security with 99.9% uptime guarantee
- **Developer Friendly**: Comprehensive API documentation and SDKs

## Our Team

We are a team of passionate developers and engineers dedicated to building the best webhook management platform. Our diverse backgrounds in software development, DevOps, and customer success enable us to understand and solve real-world integration challenges.

## Contact Us

Have questions or feedback? We''d love to hear from you!

- Email: support@astrahook.com
- Twitter: @astrahook
- GitHub: github.com/astrahook

---

*Building better integrations, one webhook at a time.*', 'Learn more about AstraHook - the modern webhook management platform for developers and businesses.', true, 1, '2025-10-29T19:33:12.025Z', '2025-10-29T19:33:12.025Z');
INSERT INTO company_pages (id, slug, title, content, meta_description, is_published, display_order, created_at, updated_at) VALUES (2, 'privacy-policy', 'Privacy Policy', '# Privacy Policy

**Last Updated: January 2024**

## Introduction

At AstraHook, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our webhook management platform.

## Information We Collect

### Personal Information
- Name and email address
- Account credentials
- Payment information (processed securely through third-party providers)
- Profile information you choose to provide

### Usage Data
- Webhook requests and responses
- Log data and analytics
- Device and browser information
- IP addresses and location data

### Cookies and Tracking
We use cookies and similar tracking technologies to enhance your experience and analyze platform usage.

## How We Use Your Information

We use the collected information to:
- Provide and maintain our services
- Process your transactions
- Send you technical notices and updates
- Respond to your requests and support needs
- Improve our platform and develop new features
- Detect and prevent fraud or abuse

## Data Storage and Security

### Security Measures
- Industry-standard encryption (SSL/TLS)
- Secure data centers with 24/7 monitoring
- Regular security audits and updates
- Access controls and authentication

### Data Retention
We retain your data for as long as your account is active or as needed to provide services. You can request data deletion at any time.

## Sharing Your Information

We do not sell your personal information. We may share data with:
- Service providers who assist in platform operations
- Legal authorities when required by law
- Business partners with your consent

## Your Rights

You have the right to:
- Access your personal data
- Correct inaccurate information
- Request data deletion
- Export your data
- Opt-out of marketing communications

## Third-Party Services

Our platform may contain links to third-party websites. We are not responsible for their privacy practices.

## Children''s Privacy

Our services are not intended for users under 13 years of age. We do not knowingly collect information from children.

## Changes to This Policy

We may update this Privacy Policy periodically. We will notify you of significant changes via email or platform notification.

## Contact Us

If you have questions about this Privacy Policy, please contact us:

- Email: privacy@astrahook.com
- Address: [Your Company Address]

---

*Your privacy matters to us.*', 'Read AstraHook''s Privacy Policy to understand how we collect, use, and protect your data.', true, 2, '2025-10-29T19:33:12.025Z', '2025-10-29T19:33:12.025Z');
INSERT INTO company_pages (id, slug, title, content, meta_description, is_published, display_order, created_at, updated_at) VALUES (3, 'terms-of-service', 'Terms of Service', '# Terms of Service

**Last Updated: January 2024**

## Agreement to Terms

By accessing or using AstraHook, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.

## Use License

### Permitted Use
Subject to these terms, we grant you a limited, non-exclusive, non-transferable license to:
- Create and manage webhooks
- Access platform features
- Use our API within rate limits

### Restrictions
You may not:
- Violate any laws or regulations
- Infringe on intellectual property rights
- Transmit malicious code or viruses
- Attempt to gain unauthorized access
- Use the service for illegal activities
- Resell or redistribute our services

## Account Responsibilities

### Registration
- You must provide accurate information
- You are responsible for account security
- You must be at least 13 years old
- One person or entity per account

### Account Security
- Keep your password confidential
- Notify us immediately of unauthorized access
- You are responsible for all account activity

## Service Availability

### Uptime
We strive for 99.9% uptime but do not guarantee uninterrupted service.

### Maintenance
We may perform scheduled maintenance with advance notice when possible.

### Service Changes
We reserve the right to modify or discontinue features with reasonable notice.

## Payment Terms

### Subscription Plans
- Billing occurs monthly or annually
- Prices are subject to change with notice
- No refunds for partial months

### Free Trial
- Free tier available with limitations
- Upgrade anytime to unlock features

### Payment Processing
Payments are processed securely through third-party providers.

## Data and Content

### Your Data
- You retain ownership of your data
- You grant us license to process and store data
- You are responsible for data legality

### Our Rights
- We own all platform intellectual property
- You may not copy or reverse engineer our service

## Prohibited Activities

You may not:
- Abuse or overload our systems
- Scrape or harvest data without permission
- Impersonate others or provide false information
- Interfere with other users'' access
- Use automated tools to access the service excessively

## Termination

### By You
You may cancel your account at any time through account settings.

### By Us
We may suspend or terminate accounts that:
- Violate these terms
- Engage in fraudulent activity
- Remain inactive for extended periods

## Disclaimers

### "As Is" Service
The service is provided "as is" without warranties of any kind.

### No Liability
We are not liable for:
- Service interruptions or data loss
- Third-party actions or content
- Indirect or consequential damages

## Limitation of Liability

Our total liability shall not exceed the amount you paid us in the past 12 months.

## Indemnification

You agree to indemnify and hold us harmless from claims arising from your use of the service or violation of these terms.

## Dispute Resolution

### Governing Law
These terms are governed by [Your Jurisdiction] law.

### Arbitration
Disputes will be resolved through binding arbitration, except where prohibited by law.

## Changes to Terms

We may modify these terms at any time. Continued use after changes constitutes acceptance.

## Contact Information

Questions about these Terms of Service?

- Email: legal@astrahook.com
- Address: [Your Company Address]

---

*Thank you for using AstraHook.*', 'Read AstraHook''s Terms of Service to understand the rules and guidelines for using our platform.', true, 3, '2025-10-29T19:33:12.025Z', '2025-10-29T19:33:12.025Z');

-- Table: doc_categories
DROP TABLE IF EXISTS doc_categories CASCADE;
CREATE TABLE IF NOT EXISTS doc_categories (
  id INTEGER DEFAULT nextval('doc_categories_id_seq'::regclass) NOT NULL,
  title CHARACTER VARYING(255) NOT NULL,
  slug CHARACTER VARYING(255) NOT NULL,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data for table: doc_categories
INSERT INTO doc_categories (id, title, slug, parent_id, sort_order, is_published, created_at, updated_at) VALUES (13, 'Getting Started', 'getting-started', NULL, 0, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_categories (id, title, slug, parent_id, sort_order, is_published, created_at, updated_at) VALUES (14, 'API Reference', 'api-reference', NULL, 1, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_categories (id, title, slug, parent_id, sort_order, is_published, created_at, updated_at) VALUES (15, 'Examples', 'examples', NULL, 2, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_categories (id, title, slug, parent_id, sort_order, is_published, created_at, updated_at) VALUES (16, 'Advanced', 'advanced', NULL, 3, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');

-- Table: doc_pages
DROP TABLE IF EXISTS doc_pages CASCADE;
CREATE TABLE IF NOT EXISTS doc_pages (
  id INTEGER DEFAULT nextval('doc_pages_id_seq'::regclass) NOT NULL,
  category_id INTEGER,
  title CHARACTER VARYING(255) NOT NULL,
  slug CHARACTER VARYING(255) NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data for table: doc_pages
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (5, 13, 'Introduction', 'introduction', '# Introduction

Welcome to AstraHook! This guide will help you get started with webhook management.

## What is AstraHook?

AstraHook is a powerful webhook management platform that allows you to:

- **Receive webhooks** from external applications
- **Monitor requests** in real-time
- **View detailed logs** of all incoming data
- **Secure your webhooks** with HMAC signatures

## Quick Start

1. Create an account
2. Generate your first webhook
3. Start receiving data

Let''s dive in!', 0, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (8, 14, 'Response Format', 'response-format', '# Response Format

## Success Response

Successful webhook requests return:

```json
{
  "received": true,
  "logId": 123,
  "timestamp": "2025-10-25T12:00:00.000Z"
}
```

## Error Responses

### 404 Not Found

```json
{
  "error": true,
  "message": "Webhook not found",
  "code": "WEBHOOK_NOT_FOUND"
}
```

### 400 Bad Request

```json
{
  "error": true,
  "message": "Invalid JSON payload",
  "code": "INVALID_PAYLOAD"
}
```

### 401 Unauthorized

```json
{
  "error": true,
  "message": "Invalid HMAC signature",
  "code": "INVALID_SIGNATURE"
}
```', 1, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (10, 15, 'GitHub Webhooks', 'github-webhooks', '# GitHub Webhooks

## Setup

1. Go to your GitHub repository settings
2. Navigate to Webhooks
3. Click "Add webhook"
4. Enter your AstraHook URL
5. Select events to trigger

## Payload Example

```json
{
  "action": "opened",
  "pull_request": {
    "title": "Add new feature",
    "user": {
      "login": "username"
    }
  },
  "repository": {
    "name": "my-repo",
    "full_name": "user/my-repo"
  }
}
```

## Processing Events

```javascript
// Check event type
const event = req.headers[''x-github-event''];

if (event === ''push'') {
  // Handle push event
} else if (event === ''pull_request'') {
  // Handle PR event
}
```', 1, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (6, 13, 'Creating Your First Webhook', 'creating-webhook', '# Creating Your First Webhook

## Step 1: Navigate to Dashboard

After logging in, go to your dashboard and click the **"Create Webhook"** button.

## Step 2: Configure Webhook

Fill in the following details:

- **Name**: A descriptive name for your webhook
- **Description**: Optional description of what this webhook is for

## Step 3: Get Your URL

After creation, you''ll receive a unique webhook URL:

```
http://localhost:3080/webhook/YOUR_WEBHOOK_KEY
```

## Step 4: Test It

You can test your webhook using cURL:

```bash
curl -X POST http://localhost:3080/webhook/YOUR_WEBHOOK_KEY \
  -H "Content-Type: application/json" \
  -d ''{"test": "data"}''
```

That''s it! Your webhook is ready to receive data.', 1, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (7, 14, 'Sending Requests', 'sending-requests', '# Sending Requests

## JavaScript (Fetch)

```javascript
await fetch("http://localhost:3080/webhook/YOUR_WEBHOOK_KEY", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    content: "Hello from external app",
    data: { key: "value" }
  })
});
```

## JavaScript (Axios)

```javascript
import axios from ''axios'';

axios.post("http://localhost:3080/webhook/YOUR_WEBHOOK_KEY", {
  content: "Hello from external app",
  data: { key: "value" }
});
```

## PHP (cURL)

```php
<?php
$ch = curl_init("http://localhost:3080/webhook/YOUR_WEBHOOK_KEY");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "content" => "Hello from PHP",
    "data" => ["key" => "value"]
]));
curl_setopt($ch, CURLOPT_HTTPHEADER, [''Content-Type: application/json'']);
curl_exec($ch);
curl_close($ch);
?>
```

## Python (Requests)

```python
import requests

response = requests.post(
    "http://localhost:3080/webhook/YOUR_WEBHOOK_KEY",
    json={
        "content": "Hello from Python",
        "data": {"key": "value"}
    }
)
```

## cURL (Command Line)

```bash
curl -X POST http://localhost:3080/webhook/YOUR_WEBHOOK_KEY \
  -H "Content-Type: application/json" \
  -d ''{"content":"Hello from cURL","data":{"key":"value"}}''
```', 0, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (12, 16, 'Rate Limiting', 'rate-limiting', '# Rate Limiting

## Overview

AstraHook implements rate limiting to prevent abuse.

## Limits

| Plan | Requests per Hour |
|------|-------------------|
| Free | 100 |
| Pro | 1,000 |
| Enterprise | Unlimited |

## Headers

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635724800
```

## Handling Rate Limits

```javascript
const response = await fetch(url, options);

if (response.status === 429) {
  const resetTime = response.headers.get(''X-RateLimit-Reset'');
  const waitTime = resetTime - Date.now() / 1000;
  
  console.log(`Rate limited. Retry after ${waitTime} seconds`);
}
```

## Tips

- Implement exponential backoff
- Cache responses when possible
- Batch requests together
- Monitor your usage', 1, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (9, 15, 'Discord Bot Integration', 'discord-bot', '# Discord Bot Integration

## Overview

Integrate AstraHook with your Discord bot to receive webhook notifications.

## Example Code

```javascript
const { Client, GatewayIntentBits } = require(''discord.js'');
const axios = require(''axios'');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

client.on(''messageCreate'', async (message) => {
  if (message.author.bot) return;
  
  // Send to webhook
  await axios.post(''http://localhost:3080/webhook/YOUR_KEY'', {
    content: message.content,
    author: message.author.tag,
    channel: message.channel.name
  });
});

client.login(''YOUR_BOT_TOKEN'');
```

## Use Cases

- Log all messages
- Track command usage
- Monitor server activity
- Backup important messages', 0, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (11, 16, 'HMAC Signature Verification', 'hmac-signature', '# HMAC Signature Verification

## Overview

For added security, verify webhook requests using HMAC signatures.

## Generating Signature

```javascript
const crypto = require(''crypto'');

const payload = JSON.stringify({ content: "Hello" });
const secret = "YOUR_WEBHOOK_SECRET";

const signature = crypto
  .createHmac(''sha256'', secret)
  .update(payload)
  .digest(''hex'');

fetch("http://localhost:3080/webhook/YOUR_KEY", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-Webhook-Signature": signature
  },
  body: payload
});
```

## Verifying Signature (Server-side)

```javascript
const crypto = require(''crypto'');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac(''sha256'', secret)
    .update(payload)
    .digest(''hex'');
    
  return signature === expectedSignature;
}
```

## Best Practices

- Always use HTTPS in production
- Rotate secrets regularly
- Store secrets securely
- Log failed verification attempts', 0, true, '2025-10-28T22:32:07.882Z', '2025-10-28T22:32:07.882Z');
INSERT INTO doc_pages (id, category_id, title, slug, content, sort_order, is_published, created_at, updated_at) VALUES (13, 14, 'File Uploads (Images & Videos)', 'file-uploads', '# Webhook File Upload Documentation

## Overview

AstraHook supports file uploads (images and videos) through webhook endpoints. Files are automatically stored on the server and accessible via URLs, making it efficient for handling media content.

## Supported File Types

### Images
- JPEG/JPG
- PNG
- GIF
- WebP
- SVG

### Videos
- MP4
- MPEG
- WebM
- OGG
- QuickTime (MOV)

## File Size Limits
- Maximum file size: **50MB** per file
- Maximum files per request: **10 files**

## API Endpoint

```
POST /webhook/{webhook_url_key}
```

### Headers
```
Content-Type: multipart/form-data
X-Webhook-Signature: {optional_hmac_signature}
```

## Usage Examples

### cURL (Command Line)

#### Single Image Upload
```bash
curl -X POST \
  -F "files=@/path/to/image.png" \
  -F "message=Screenshot captured" \
  -F "timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  http://localhost:3080/webhook/your-webhook-key
```

#### Multiple Files Upload
```bash
curl -X POST \
  -F "files=@/path/to/image1.png" \
  -F "files=@/path/to/image2.jpg" \
  -F "files=@/path/to/video.mp4" \
  -F "description=Multiple media files" \
  http://localhost:3080/webhook/your-webhook-key
```

### Python

#### Using requests library
```python
import requests
from datetime import datetime

webhook_url = "http://localhost:3080/webhook/your-webhook-key"

# Single file upload
with open(''/path/to/image.png'', ''rb'') as f:
    files = {''files'': f}
    data = {
        ''message'': ''Screenshot captured'',
        ''timestamp'': datetime.utcnow().isoformat(),
        ''user'': ''python_script''
    }
    response = requests.post(webhook_url, files=files, data=data)
    print(response.json())
```

#### Multiple files
```python
import requests

webhook_url = "http://localhost:3080/webhook/your-webhook-key"

files = [
    (''files'', open(''/path/to/image1.png'', ''rb'')),
    (''files'', open(''/path/to/image2.jpg'', ''rb'')),
    (''files'', open(''/path/to/video.mp4'', ''rb''))
]

data = {
    ''description'': ''Multiple media files'',
    ''category'': ''screenshots''
}

response = requests.post(webhook_url, files=files, data=data)
print(response.json())
```

### PHP

#### Single file upload
```php
<?php
$webhookUrl = ''http://localhost:3080/webhook/your-webhook-key'';

$filePath = ''/path/to/image.png'';
$cFile = new CURLFile($filePath, mime_content_type($filePath), basename($filePath));

$data = [
    ''files'' => $cFile,
    ''message'' => ''Screenshot captured'',
    ''timestamp'' => date(''c''),
    ''user'' => ''php_script''
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhookUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

#### Multiple files
```php
<?php
$webhookUrl = ''http://localhost:3080/webhook/your-webhook-key'';

$files = [
    ''/path/to/image1.png'',
    ''/path/to/image2.jpg'',
    ''/path/to/video.mp4''
];

$data = [
    ''description'' => ''Multiple media files'',
    ''category'' => ''screenshots''
];

foreach ($files as $index => $filePath) {
    $data["files[$index]"] = new CURLFile(
        $filePath,
        mime_content_type($filePath),
        basename($filePath)
    );
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $webhookUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```

### Node.js

#### Using axios and form-data
```javascript
const axios = require(''axios'');
const FormData = require(''form-data'');
const fs = require(''fs'');

const webhookUrl = ''http://localhost:3080/webhook/your-webhook-key'';

// Single file upload
const form = new FormData();
form.append(''files'', fs.createReadStream(''/path/to/image.png''));
form.append(''message'', ''Screenshot captured'');
form.append(''timestamp'', new Date().toISOString());

axios.post(webhookUrl, form, {
  headers: form.getHeaders()
})
.then(response => console.log(''Success:'', response.data))
.catch(error => console.error(''Error:'', error.message));
```

#### Multiple files
```javascript
const form = new FormData();
form.append(''files'', fs.createReadStream(''/path/to/image1.png''));
form.append(''files'', fs.createReadStream(''/path/to/image2.jpg''));
form.append(''files'', fs.createReadStream(''/path/to/video.mp4''));
form.append(''description'', ''Multiple media files'');

axios.post(webhookUrl, form, {
  headers: form.getHeaders()
})
.then(response => console.log(response.data));
```

### Go

```go
package main

import (
    "bytes"
    "io"
    "mime/multipart"
    "net/http"
    "os"
    "path/filepath"
)

func main() {
    webhookURL := "http://localhost:3080/webhook/your-webhook-key"
    filePath := "/path/to/image.png"

    body := &bytes.Buffer{}
    writer := multipart.NewWriter(body)

    file, _ := os.Open(filePath)
    defer file.Close()

    part, _ := writer.CreateFormFile("files", filepath.Base(filePath))
    io.Copy(part, file)

    writer.WriteField("message", "Screenshot captured")
    writer.Close()

    req, _ := http.NewRequest("POST", webhookURL, body)
    req.Header.Set("Content-Type", writer.FormDataContentType())

    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}
```

## Response Format

### Success Response
```json
{
  "received": true,
  "logId": 123,
  "timestamp": "2025-10-29T10:30:00.000Z",
  "filesUploaded": 2
}
```

### Error Response
```json
{
  "error": true,
  "message": "Invalid file type. Only images and videos are allowed.",
  "code": "INVALID_FILE_TYPE"
}
```

## File Storage

Uploaded files are stored on the server and accessible via URLs:

```
http://localhost:3080/uploads/webhooks/{filename}
```

Example:
```
http://localhost:3080/uploads/webhooks/a1b2c3d4e5f6-1698765432000.png
```

## Viewing Uploaded Files

1. Navigate to your webhook details page
2. Click the eye icon (👁️) on any log entry
3. Uploaded images and videos will be displayed in the "Uploaded Files" section
4. Videos include playback controls
5. File metadata (name, size) is shown below each file

## Best Practices

1. **File Size**: Keep files under 50MB for optimal performance
2. **File Names**: Use descriptive names for easier identification
3. **Compression**: Compress images before uploading to save bandwidth
4. **Video Format**: Use MP4 for best compatibility
5. **Error Handling**: Always check response status and handle errors
6. **Security**: Use HMAC signatures for sensitive webhooks

## Troubleshooting

### File Too Large
- Reduce file size or compress before uploading
- Maximum allowed: 50MB

### Invalid File Type
- Check supported formats
- Verify MIME type is correct

### Upload Failed
- Check network connectivity
- Verify webhook URL is correct
- Ensure proper Content-Type header (multipart/form-data)', NULL, true, '2025-10-29T01:34:17.620Z', '2025-10-29T08:26:31.565Z');

-- Table: logs
DROP TABLE IF EXISTS logs CASCADE;
CREATE TABLE IF NOT EXISTS logs (
  id INTEGER DEFAULT nextval('logs_id_seq'::regclass) NOT NULL,
  webhook_id INTEGER NOT NULL,
  payload JSONB,
  ip CHARACTER VARYING(45),
  status CHARACTER VARYING(50),
  attempts INTEGER DEFAULT 1,
  last_error TEXT,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: site_settings
DROP TABLE IF EXISTS site_settings CASCADE;
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER DEFAULT nextval('site_settings_id_seq'::regclass) NOT NULL,
  setting_key CHARACTER VARYING(100) NOT NULL,
  setting_value TEXT,
  setting_type CHARACTER VARYING(50) DEFAULT 'text'::character varying,
  category CHARACTER VARYING(50) DEFAULT 'general'::character varying,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data for table: site_settings
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (10, 'footer_text', '© 2025 AstraHook. All rights reserved.', 'text', 'general', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (11, 'enable_registration', 'true', 'boolean', 'general', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (12, 'maintenance_mode', 'false', 'boolean', 'general', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (1, 'site_title', 'AstraHook', 'text', 'general', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (2, 'site_description', 'Modern webhook management platform', 'textarea', 'general', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (3, 'site_logo', '/uploads/settings/logo-1761842506200.png', 'image', 'branding', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (24, 'site_logo_light', '/uploads/settings/logo-1761844267694.png', 'image', 'branding', '2025-10-30T14:03:28.337Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (23, 'site_logo_dark', '/uploads/settings/logo-1761844267708.png', 'image', 'branding', '2025-10-30T14:03:28.337Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (4, 'site_favicon', '/uploads/settings/favicon-1761855414566.png', 'image', 'branding', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (5, 'hero_title', 'Welcome to AstraHook', 'text', 'landing', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (6, 'hero_subtitle', 'Powerful webhook management made simple', 'text', 'landing', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (7, 'hero_cta_text', 'Get Started', 'text', 'landing', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (8, 'meta_keywords', 'webhook, api, integration, automation', 'text', 'seo', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (9, 'meta_author', 'AstraHook Team', 'text', 'seo', '2025-10-29T08:49:29.580Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (13, 'meta_description', 'AstraHook is a modern webhook management platform that makes API integration simple and powerful', 'textarea', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (14, 'og_title', 'AstraHook - Modern Webhook Management', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (15, 'og_description', 'Powerful webhook management made simple. Create, manage, and monitor webhooks with ease.', 'textarea', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (16, 'og_image', NULL, 'image', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (17, 'og_type', 'website', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (18, 'twitter_card', 'summary_large_image', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (19, 'twitter_site', '@astrahook', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (20, 'twitter_creator', '@astrahook', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (21, 'canonical_url', 'https://astrahook.com', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');
INSERT INTO site_settings (id, setting_key, setting_value, setting_type, category, created_at, updated_at) VALUES (22, 'robots', 'index, follow', 'text', 'seo', '2025-10-29T08:59:29.742Z', '2025-10-30T17:16:54.584Z');

-- Table: users
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER DEFAULT nextval('users_id_seq'::regclass) NOT NULL,
  email CHARACTER VARYING(255) NOT NULL,
  password_hash CHARACTER VARYING(255) NOT NULL,
  role CHARACTER VARYING(50) DEFAULT 'user'::character varying,
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  username CHARACTER VARYING(100),
  avatar_url CHARACTER VARYING(500)
);

-- Data for table: users
INSERT INTO users (id, email, password_hash, role, created_at, username, avatar_url) VALUES (1, 'admin@astrahook.com', '$2b$10$QHq2M5vurwEeo3J5Kdi7kO6Iwr/tnLN32IPVziCBw0GMQPjONlpiS', 'admin', '2025-10-25T10:36:45.986Z', 'admin', '/uploads/avatars/1-1761742327238.gif');

-- Table: webhooks
DROP TABLE IF EXISTS webhooks CASCADE;
CREATE TABLE IF NOT EXISTS webhooks (
  id INTEGER DEFAULT nextval('webhooks_id_seq'::regclass) NOT NULL,
  user_id INTEGER NOT NULL,
  url_key CHARACTER VARYING(255) NOT NULL,
  secret CHARACTER VARYING(255),
  created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Data for table: webhooks
INSERT INTO webhooks (id, user_id, url_key, secret, created_at) VALUES (9, 1, '70fedba571c2a1614b80b64037e2586c', '85c1076e14f200ae44dea14791fb01a63e0f758849edfe2683b6412d0de735e9', '2025-10-28T23:35:39.135Z');

-- Sequences
SELECT setval('users_id_seq', 3, true);
SELECT setval('webhooks_id_seq', 10, true);
SELECT setval('logs_id_seq', 26, true);
SELECT setval('doc_categories_id_seq', 17, true);
SELECT setval('doc_pages_id_seq', 14, true);
SELECT setval('site_settings_id_seq', 24, true);
SELECT setval('company_pages_id_seq', 3, true);
