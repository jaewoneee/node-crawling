import express from "express";
import cheerio from 'cheerio';
import {getUserInfo} from "../api/index"
import {setTotalInfo} from "../utils/index";

const router = express.Router();

router.get('/:id', (req, res) => {
    const userName = encodeURI(req.params.id);  // 유저의 캐릭터명

    getUserInfo(userName).then(html => {
        const $ = cheerio.load(html.data, { xmlMode: false });
        const $totalInfo = setTotalInfo($('script:not([src])')[0].children[0].data);  // 캐릭터 전체정보
        const $etcInfo = $('.game-info div:not(:last-child) span:nth-child(2)'); // 기타 정보(칭호, 길드, pvp)
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
        const $equipImgSlot =  $('.profile-equipment__slot div'); // 장비 이미지
        const $spEquipImgSlot = $('.special-info__slot>li>div') // 특수장비 이미지
        console.log($equipImgSlot);
        // 캐릭터 정보
        let character = {
            strData:{
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
                etc:[],
                engrave:[],
                equipments:[]
            },
            srcData:{
                equipImg:[]
            }
        };
        // function setEquipImg(){
        //     $('.profile-equipment__slot div').map((i, el) => {
        //         const arr = [];
        //         const src = $(el).children('img').attr('src');
        //         if (src !== undefined){
        //             arr.push(src);
        //         }
        //         return arr;
        //     });
        // }
        /**
         * case 1. Success
         * case 2. [code 0] : 존재하지 않는 캐릭터 
         * case 3. [code 1] : 캐릭터는 존재하지만, 데이터 부족.
         */
        if (typeof $totalInfo === 'object'){
            // 전체 정보 
            Object.keys($totalInfo).forEach(obj => {
                const target = character.strData;
                switch (obj){
                    case 'Engrave':
                        Object.keys($totalInfo[obj]).forEach(i => {
                            const engraveName = $totalInfo[obj][i]['Element_000']['value'];  // 각인명
                            target.engrave.push(engraveName);
                        });
                        break;
                    case 'Equip':
                        Object.keys($totalInfo[obj]).forEach((i, n) => {
                            if(i.indexOf('Gem') === -1 && $totalInfo[obj][i].hasOwnProperty('AvatarAttribute') === false){
                                // ex ) "<P ALIGN='CENTER'><FONT COLOR='#00B0FA'>시간의 반지</FONT></P>"
                                let equipName = $totalInfo[obj][i]['Element_000']['value']; // 장비명
                                let equipRank = $totalInfo[obj][i]['Element_001']['value']['leftStr0'];
                                let equipTier = $totalInfo[obj][i]['Element_001']['value']['leftStr2'];
                                // let equipImg = 
                                const equipment = {};

                                equipName = equipName.slice(40).replace("</FONT></P>","");
                                equipRank = equipRank.slice(41).replace("</FONT></FONT>","");
                                equipTier = equipTier.slice(16, 24);
                                
                                equipment.equipName = equipName;
                                equipment.equipRank = equipRank;
                                equipment.equipTier = equipTier;
                                equipment.equipImg = "sdf";

                                target.equipments.push(equipment);
                            }
                        })
                        break;
                }
            });

            // 게임 내 정보
            $etcInfo.map(el=>{
                const target = character.strData.etc;
                const text = $(el).text();
                target.push(text);
            })

            //  장비 이미지 
            
            
            console.log(character);
            res.status(202).send($totalInfo);
        }else if($totalInfo === 0){
            res.status(403).json({msg:'User does not exist.'});
        }else{
            res.status(202).send(character);
        }

    }).catch(err => console.error(err));

})

export default router;
