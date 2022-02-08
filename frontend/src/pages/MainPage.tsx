import { useEffect, useState } from "react";
import {fetchUserInfo} from "../api/index"

export const Main = () =>{
    const [username, setUsername] = useState('');
    
    async function handleSubmit(){
        const { data } = await fetchUserInfo(username);
        console.log(data);
    }
    
    return(
        <div className="main-wrap">
            <div className="search-box">
                <input placeholder="캐릭터명을 입력해 주세요" onChange={(e) => {setUsername(e.target.value)}}/>
                <button onClick={handleSubmit}></button>
            </div>
        </div>
    )
}