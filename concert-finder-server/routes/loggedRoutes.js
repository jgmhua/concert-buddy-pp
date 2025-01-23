import axios from "axios";
import { log } from "console";
import express from "express";
import querystring from "querystring";
const router = express.Router();

const { CLIENT_ID, REDIRECT_URL, CLIENT_SECRET, BASE_URL, PORT } = process.env;

// helper functions?
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
    return(userData.data);
  } catch (error) {
    console.error('Error fetching profile');
    return('Failed to fetch profile.');
  }

}


router.get('/', async (req, res) => {
let code = req.query.code || null;
let state = req.query.state || null;
console.log("state:", state, "code:", code)

  
  if (state === null || state !== state) {
    return res.redirect('/#' + querystring.stringify({ error: 'state_mismatch' }));
  }

  // try {
    const response = await axios.post('https://accounts.spotify.com/api/token',
        new URLSearchParams({
            code: code,
            redirect_uri: REDIRECT_URL,
            grant_type: 'authorization_code',
        }).toString(),
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
              },
        }  
    );

    // const profileData = getUserData(response.data);
    // res.status(200).send(profileData);
    console.log(response)
    res.send(response.data)

  // } catch (error) {
  //   console.error('Error fetching token');
  //   res.status(500).send('Failed to exchange code for tokens.');
  // }
  });

export default router;