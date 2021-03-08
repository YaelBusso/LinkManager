import express from 'express';
import mongoose from 'mongoose';
import Link from '../models/link.js';

const router = express.Router();

export const getLinks= async (req, res) => {
    try{
        const links= await Link.find();
        res.status(200).json(links);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const getLink = async (req, res) => { 
    const { id } = req.params;

    try {
        const link = await Link.findById(id);
        
        res.status(200).json(link);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLink= async (req, res) =>{
    const {full, title, tags} = req.body;
    const newLink=new Link({full, title, tags});
    try{
        await newLink.save();
        res.status(201).json(newLink);
   } catch(error){
        res.status(409).json({message:error.message});
   }
}

export const updateLink=async (req, res) => {
    const {id}=req.params;
    const {full, title, tags}=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No link with id: ${id}`);
    const updatedLink= {full, title, tags, _id: id};
    await Link.findByIdAndUpdate(id, updatedLink, {new: true});  
    res.json(updatedLink);  
}

export const deleteLink= async (req, res) => {
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send(`No link with id: ${id}`);
    await Link.findByIdAndRemove(id);
    res.json({message: 'Link deleted successfully.'});
};

export const starLink = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
     return res.status(404).send(`No link with id: ${id}`);
    
    const link = await Link.findById(id);

    const updatedLink = await Link.findByIdAndUpdate(id, { star: !link.star }, { new: true });
    
    res.json(updatedLink);
}

export const shortenLink = async (req, res) => {
    const shortUrl = await Link.findOne({ short: req.params.shortUrl });
    if (shortUrl == null) 
        return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
        console.log(shortUrl.full);
        res.redirect(shortUrl.full);
}

export default router;