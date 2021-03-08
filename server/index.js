import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import linkRoutes from './routes/links.js';
import Link from './models/link.js';

const app = express();
dotenv.config();
//?? to shorten link
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json( {limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

//routes
app.use('/links', linkRoutes);

/*app.use('/:try', async (req, res) => {
    console.log("in try:)");
    const shortUrl = await Link.findOne({ short: req.params.try })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full)
  } 
)*/

const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.CONECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}`)))
    .catch((err)=>console.log(err.message));

mongoose.set('useFindAndModify', false);
