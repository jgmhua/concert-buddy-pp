import axios from "axios";
import { log } from "console";
import express from "express";
import querystring from "querystring";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;

router.post('/', async (req, res) => {
const { code, state } = req.body
  
  if (state === null || state !== state) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
  }

  if (!code) {
    console.error("No authorization code was received.");
    res.status(400).send("Authorization code is required.")
  }

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            code: code,
            redirect_uri: REDIRECT_URL,
            grant_type: 'authorization_code', 
        }).toString(),
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
              },
        }  
    );
    console.log('token response', response.data)
    res.json(response.data)
  } catch (error) {
    res.status(500).send(error.response?.data || error.message);
  }
  });

export default router;