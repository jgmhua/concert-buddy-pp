import axios from "axios";
import { log } from "console";
import express from "express";
import querystring from "querystring";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;

//helper functions?
async function getUserData(credentials) {
  const { access_token, refresh_token, token_type, scope, expires_in } = credentials;
  console.log(credentials,"credentials");

  try {
    const userData = await axios.get('https://api.spotify.com/v1/me',
        {
            headers: {
                'Authorization': 'Bearer ' + {access_token}
              },
        }  
    );
    console.log(userData.data, "user's profile data");
    res.status(200).send(userData.data);
  } catch (error) {
    console.error('Error fetching profile');
    res.status(500).send('Failed to fetch profile.');
  }

}


router.get('/', async (req, res) => {
let code = req.query.code || null;
  let state = req.query.state || null;

  
  if (state === null || state !== state) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
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
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
              },
        }  
    );

    getUserData(response.data);

    // res.send({ access_token, refresh_token, token_type, scope, expires_in })

  } catch (error) {
    console.error('Error fetching token');
    res.status(500).send('Failed to exchange code for tokens.');
  }
  });

export default router;