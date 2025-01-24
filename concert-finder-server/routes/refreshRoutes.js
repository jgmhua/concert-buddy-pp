import axios from "axios";
import express from "express";
import querystring from "querystring";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;


router.get('/', async (req, res) => {
let refreshToken = req.query.refreshToken || null;

    try {
        const response = axios.post('https://accounts.spotify.com/api/token', {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            }
        } 
        )
        res.send(response.data)
    } catch (error) {
        console.error('Error fetching token');
        res.status(500).send('Failed to refresh token');
    }
  });

export default router;