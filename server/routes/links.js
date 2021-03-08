import express from 'express';
//import { shortenLink } from '../../client/src/api/index.js';
import {getLinks,
        getLink,
        createLink,
        updateLink,
        starLink,
        deleteLink,
        shortenLink} from '../controllers/links.js';

const router =express.Router();

router.get('/', getLinks);
router.post('/', createLink);
router.get('/:id', getLink);
router.patch('/:id', updateLink);
router.delete('/:id', deleteLink);
router.patch('/:id/starLink', starLink);
router.get('/:shortUrl', shortenLink);
export default router;