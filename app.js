import express from 'express';
const app = express();
import 'dotenv/config'
import cors from 'cors'

import cookieParser from 'cookie-parser';

import productRoute from './routes/product.js'

const port = process.env.PORT || 3000


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Hello from Node.js on Azure!');
  });
  app.get('/health', (req, res) => {
    res.send('API is healthy!');
});

  
app.use('/api/product',productRoute)
app.listen(port,()=>{
    console.log(`Listening on the port no ${port}`)
})



