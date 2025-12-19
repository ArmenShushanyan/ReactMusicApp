import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())

app.get('/spotify-token', async (req, res) => {
    const auth = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64')

    const response = await fetch (
        'https://accounts.spotify.com/api/token',
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        }
    )

    const data = await response.json()
    console.log('Token response', data)
    res.json(data)
})

app.get('/', (req, res) => {
  res.send('API running');
});


app.listen(8000, () => {
    console.log('8000')
})