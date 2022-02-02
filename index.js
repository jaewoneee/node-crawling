import axios from 'axios';
import cheerio from 'cheerio';

const getInfo = async() =>{
    let userName = '아니근데솔직히진짜';
    userName = encodeURI(userName);
    try {
        return await axios.get(`https://lostark.game.onstove.com/Profile/Character/${userName}`)
    } catch (err) {
        console.error(err);
    }
}

getInfo().then(html => {
    const $ =  cheerio.load(html.data);
    const test = $('.level-info__expedition').children('span').text();
    console.log(test);
}).catch(err => console.error(err));

getInfo();