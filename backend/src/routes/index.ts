import express from "express";
import axios from 'axios';
import cheerio from 'cheerio';
const router = express.Router();

router.get('/:id', (req, res) => {
    const getUserInfo = async () => {
        const userName = encodeURI(req.params.id);  // 유저명
        try {
            return await axios.get(`https://lostark.game.onstove.com/Profile/Character/${userName}`);
        } catch (err) {
            console.error(err);
        }
    }

    getUserInfo().then(html => {
        const $ = cheerio.load(html?.data, { xmlMode: false });
        const slot = $('.profile-equipment__slot div'); // 장비 이미지
        const totalInfo = $('script:not([src])')[0] as cheerio.TagElement;  // 유저의 모든 정보
        const result = totalInfo.children[0].data as string;
        let newArray: string[] = [];

        slot.map((i, element) => {
            const src = $(element).children('img').attr('src');
            if (src !== undefined) {
                newArray.push(src);
            } else {
                newArray.push('undefined');
            }
        });


        let infoData = result?.slice(14).replace(/;/gi, ""); // validate
        infoData = JSON.parse(infoData);
        res.json(infoData);
    }).catch(err => console.error(err));


})

export default router;
