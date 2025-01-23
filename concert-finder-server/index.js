import express from 'express'
import cors from 'cors';
import 'dotenv/config';

import authRoutes from "./routes/authRoutes.js";
import loggedRoutes from "./routes/loggedRoutes.js";


const app = express();
const { CORS_ORIGIN } = process.env

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 5050;

app.use("/login", authRoutes);
app.use("/callback", loggedRoutes);

app.get("/", (_req, res) => {
    res.send("hello")
});

// app.get('/cheese', async (req, res) => {
//     console.log(access_token)
//     try {
//         const response = await axios.get('https://api.spotify.com/v1/me',
//             {
//                 headers: {
//                     'Authorization': 'Bearer ' + 'BQDztAQdNzrCFZXISaLmzTRmrC-g_edfxrvLPiLbspQvDzWaeWYz-X4nREGC5DE1VcWGaFvbE8fBRXrskdkK1c5o1QGOaUShp0IXeCqVFW2SMzDSNBtiBZBF0CB5i7DQdoA-PEahTyvXnG2gW7F6fHNvoDGg749tYvcDnDRkqIjV2B3vcr6gaHojDb6Yfyq-CE40YAX7GbTeMM96bDdKtQx2YK-7XA'
//                   },
//             }  
//         );
//         const data = await response.data;
//         res.send(data)
//       } catch (error) {
//         console.error('Error fetching profile');
//         res.status(500).send('Failed to fetch profile.');
//       }
// })



app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
  });