require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
// routers
const leagueRouter = require('./routes/league')

// middleware
app.set('trust proxy', 1)
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // limit each IP to 100 requests per windowMs
	})
)
app.use(express.json())
app.use(helmet())
app.use(cors())

// routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})
app.use('/api/leagues', leagueRouter)

const port = process.env.PORT || 5000

const start = async () => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI)
		app.listen(port, () => console.log(`Server is listening port ${port}...`))
	} catch (error) {
		console.log(error)
	}
}

start()
