import {fetchUserInfo} from "../../api/index"
import { useState } from 'react';

export const Search = () => {
    const [username, setUsername] = useState('');

    async function handleSubmit(e:any){
        const { data } = await fetchUserInfo(username);
        e.preventDefault();
        console.log(data);
    }

    return (
        <div className="search-box">
            <h2>전투정보실</h2>
            <div className="search">
                <input placeholder="캐릭터명을 입력해 주세요" onChange={(e) => setUsername(e.target.value)}/>
                <button onClick={(e) => handleSubmit(e)} type="submit">검색하기</button>
            </div>
        </div>
    )
}