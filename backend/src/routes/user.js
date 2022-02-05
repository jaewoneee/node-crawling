import express from "express";
import cheerio from 'cheerio';
import {getUserInfo} from "../api/index"

const router = express.Router();

router.get('/:id', (req, res) => {
    const userName = encodeURI(req.params.id);  // 유저의 캐릭터명

    getUserInfo(userName).then(html => {
        const $ = cheerio.load(html?.data, { xmlMode: false });
        const totalInfo = JSON.parse(($('script:not([src])')[0].children[0].data).slice(14).replace(/;/gi, ""));  // 캐릭터 전체정보
        const classes = $('.profile-character-info__img').attr('alt');  // 캐릭터 직업
        const server = $('.profile-character-info__server').text() // 서버명
        const battleLevel = $('.profile-character-info__lv').text(); // 캐릭터 레벨(전투레벨) 
        const expedLevel = $('.level-info__expedition span:nth-child(2)').text() // 원정대 레벨
        const equipLevel = $('.level-info2__expedition span:nth-child(2)').text(); // 장비레벨
        const etcInfo = $('.game-info div:not(:last-child) span:nth-child(2)'); // 기타 정보(칭호, 길드, pvp)
        const territory = $('.game-info__wisdom span:not(:first-child)').text(); // 영지 정보
        const equipImgSlot = $('.profile-equipment__slot div'); // 장비 이미지 Element
        const specialEqip = $('.special-info__slot>li') // 특수장비
        const basicAbility = $('.profile-ability-basic>ul>li')  // 기본 특성
        const battleAbility = $('.profile-ability-battle>ul>li') // 전투 특성
        const engraving = $('.profile-ability-engrave ul.swiper-slide li');  // 각인 효과

        console.log(specialEqip);
        const textTypeData= {
            engrave: [],
            equipment: [],
        };
        const imgTypeData = {
            equipImg:[]
        }
        
        // 전체정보 
        Object.keys(totalInfo).forEach(obj => {
            if(obj === 'Engrave'){  // 각인
                Object.keys(totalInfo[obj]).forEach(i => {
                    const engraveName = totalInfo[obj][i]['Element_000']['value'];
                    textTypeData['engrave'].push(engraveName);
                })
            } else if (obj === 'Equip'){    // 장비
                Object.keys(totalInfo[obj]).forEach(i => {
                    if(i.indexOf('Gem') === -1 && totalInfo[obj][i].hasOwnProperty('AvatarAttribute') === false){
                        // 예시 ) "<P ALIGN='CENTER'><FONT COLOR='#00B0FA'>시간의 반지</FONT></P>"
                         let equipName = totalInfo[obj][i]['Element_000']['value'];
                         equipName = equipName.slice(40).replace("</FONT></P>","");
                         textTypeData['equipment'].push(equipName);
                    }
                })
            }
           
        });

        // 게임 내 정보
        let etcInfoArray = [];
        etcInfo?.map((i, element)=>{
            const text = $(element).text();
            etcInfoArray.push(text);
       })

        //  장비 이미지 
        equipImgSlot.map((i, element) => {
            const src = $(element).children('img').attr('src');
            if (src !== undefined) {
                imgTypeData['equipImg'].push(src);
            } else {
                imgTypeData['equipImg'].push('none');
            }
        });

        console.log(textTypeData, imgTypeData);
       res.send(totalInfo);
    }).catch(err => console.error(err));

})

export default router;
