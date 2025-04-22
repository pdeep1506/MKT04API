import express from 'express';
const app = express();
import 'dotenv/config'
import cors from 'cors'

import cookieParser from 'cookie-parser';

import productRoute from './routes/product.js'

const port = process.env.PORT || 8000

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


app.use('/api/product',productRoute)
app.listen(port,'127.0.0.1',()=>{
    console.log(`Listening on the port no ${port}`)
})



