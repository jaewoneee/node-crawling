import express from "express";
import axios from 'axios';
import cheerio from 'cheerio';
import { text } from "cheerio/lib/api/manipulation";
const router = express.Router();

router.get('/:id', (req, res) => {
    const getUserInfo = async () => {
        const userName = encodeURI(req.params.id);  // 유저의 캐릭터명
        try {
            return await axios.get(`https://lostark.game.onstove.com/Profile/Character/${userName}`);
        } catch (err) {
            console.error(err);
        }
    }

    getUserInfo().then(html => {
        const $ = cheerio.load(html?.data, { xmlMode: false });
        const slot = $('.profile-equipment__slot div'); // 장비 이미지 Element
        const totalInfo = $('script:not([src])')[0];  // 캐릭터의 전체정보
        const result = totalInfo.children[0].data;
        let textTypeData= {
            EngraveName: [],
            EquipName: []
        };
        let newArray = [];

        //  장비 이미지 
        slot.map((i, element) => {
            const src = $(element).children('img').attr('src');
            if (src !== undefined) {
                newArray.push(src);
            } else {
                newArray.push('undefined');
            }
        });

        // 전체 데이터
        let infoData = result?.slice(14).replace(/;/gi, ""); // validate
        let preTest = JSON.parse(infoData);
        let test = [preTest.Engrave, preTest.Equip];
        let final = [];

        Object.keys(test[1]).forEach(i => {
            if (i.indexOf('Gem') === -1 && test[1][i].hasOwnProperty('AvatarAttribute') === false) {
                final.push(test[1][i]['Element_000']['value']);
            }
        });
        textTypeData.EquipName = [...final];
        console.log(textTypeData);
        res.send(textTypeData);
    }).catch(err => console.error(err));


})

export default router;
