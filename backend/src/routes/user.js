import express from "express";
import cheerio from 'cheerio';
import {getUserInfo} from "../api/index"
import {setTotalInfo, setAbility} from "../utils/index";

const router = express.Router();

router.get('/:id', (req, res) => {
    const userName = encodeURI(req.params.id);  // 유저의 캐릭터명

    getUserInfo(userName).then(html => {
        const $ = cheerio.load(html.data, { xmlMode: false });
        const $totalInfo = setTotalInfo($('script:not([src])')[0].children[0].data);  // 캐릭터 전체정보
        const $etcInfo = $('.game-info div:not(:last-child)'); // 기타 정보(칭호, 길드, pvp)
        const $classes = $('.profile-character-info__img').attr('alt');  // 캐릭터 직업
        const $server = $('.profile-character-info__server').text() // 서버명
        const $territoryName = $('.game-info__wisdom span:nth-child(3)').text(); // 영지명
        const $battleLevel = $('.profile-character-info__lv').text(); // 캐릭터 레벨(전투레벨) 
        const $expedLevel = $('.level-info__expedition span:nth-child(2)').text() // 원정대 레벨
        const $equipLevel = $('.level-info2__expedition span:nth-child(2)').text(); // 장비레벨
        const $territoryLevel = $('.game-info__wisdom span:nth-child(2)').text(); // 영지레벨
        const $basicAbility = $('.profile-ability-basic>ul>li')  // 기본 특성
        const $battleAbility = $('.profile-ability-battle>ul>li') // 전투 특성
        const $engraving = $('.profile-ability-engrave ul.swiper-slide li');  // 각인 효과
        const $engraveImgSlot = $('.profile-equipment__slot div:nth-child(n+14):nth-child(-n+15)');  // 직업 각인 이미지

        // 캐릭터 정보
        const info = {
            character:{
                username:decodeURI(userName),
                server:$server,
                class:$classes,
                territory:$territoryName,
                level:{
                    battleLevel:$battleLevel,
                    expedLevel:$expedLevel,
                    equipLevel:$equipLevel,
                    territoryLevel:$territoryLevel,
                },
                etc:setAbility($etcInfo, $),
                engrave:[],
                equipments:[],
                spEquipments:[],
                basicAbility:setAbility($basicAbility, $),
                battleAbility:setAbility($battleAbility, $),
                engraving:setAbility($engraving, $)
            }
        };
           
        /**
         * case 1. Success
         * case 2. [code 0] : 존재하지 않는 캐릭터 
         * case 3. [code 1] : 캐릭터는 존재하지만, 데이터 부족.
         */
        if (typeof $totalInfo === 'object'){
            // 전체 정보 
            Object.keys($totalInfo).forEach(obj => {
                const target = info.character;
                switch (obj){
                    case 'Engrave':
                        Object.keys($totalInfo[obj]).forEach((p, i)=> {
                            const engrave = {};
                            const engraveName = $totalInfo[obj][p]['Element_000']['value'];  // 직업 각인명
                            const engraveImg = $engraveImgSlot[i].children[0]['attribs'].src;   // 직업 각인 이미지
                            
                            engrave.engraveName = engraveName;
                            engrave.engraveImg = engraveImg;

                            target.engrave.push(engrave);
                        });
                        break;

                    case 'Equip':
                        Object.keys($totalInfo[obj]).forEach((p, i) => {
                            if(p.indexOf('Gem') === -1 && $totalInfo[obj][p].hasOwnProperty('AvatarAttribute') === false){
                                let equipName = $totalInfo[obj][p]['Element_000']['value']; // 장비명
                                let equipRank = $totalInfo[obj][p]['Element_001']['value']['leftStr0']; // 장비 등급
                                let equipTier = $totalInfo[obj][p]['Element_001']['value']['leftStr2']; // 장비 티어
                                let equipImg = $totalInfo[obj][p]['Element_001']['value']['slotData']['iconPath']; // 장비 이미지
                                const equipment = {};
                               
                                equipName = equipName.slice(40).replace("</FONT></P>","");
                                equipRank = equipRank.slice(38).replace("</FONT></FONT>","");
                                equipTier = equipTier.slice(16).replace("</FONT>","");
                                
                                equipment.equipName = equipName;
                                equipment.equipRank = equipRank;
                                equipment.equipTier = equipTier;
                                equipment.equipImg = `https://cdn-lostark.game.onstove.com/${equipImg}`;

                                equipName.indexOf('나침반') === -1 && equipName.indexOf('부적') === -1 
                                ? target.equipments.push(equipment)
                                : target.spEquipments.push(equipment);
                            }
                        })
                        break;
                }
            });
            res.status(202).send(info);
        }else if($totalInfo === 0){
            res.status(403).json({msg:'User does not exist.'});
        }else{
            res.status(202).send(info);
        }

    }).catch(err => console.error(err));

})

export default router;
