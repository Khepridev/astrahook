import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3080

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
