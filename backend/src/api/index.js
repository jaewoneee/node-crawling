import axios from 'axios';

// 로스트아크 전투정보실 페이지 크롤링
export const getUserInfo = async (userName) => {
    try {
        return await axios.get(`https://lostark.game.onstove.com/Profile/Character/${userName}`);
    } catch (err) {
        console.error(err);
    }
}