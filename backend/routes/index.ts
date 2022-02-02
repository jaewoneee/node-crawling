import express from "express";
import axios from 'axios';
import cheerio from 'cheerio';
const router = express.Router();

router.get('/:id', (req, res) => {
    const getInfo = async () => {
        const userName = encodeURI(req.params.id);
        try {
            return await axios.get(`https://lostark.game.onstove.com/Profile/Character/${userName}`)
        } catch (err) {
            console.error(err);
        }
    }

    getInfo().then(html => {
        const data = String(html?.data);
        const $ = cheerio.load(data);
        const slot = $('.profile-equipment__slot div');
        let newArray: string[] = [];

        slot.map((i, element) => {
            const src = $(element).find('img').attr('src');
            if (src !== undefined) {
                newArray.push(src);
            } else {
                newArray.push('undefined');
            }
        });
        console.log('되니');
        res.send(newArray);
    }).catch(err => console.error(err));


})

export default router;
