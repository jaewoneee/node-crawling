import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserInfo } from "../api/index";
import {Character} from '../api/index'

export const User = () =>{
    const {username} = useParams<string>(); 
    const [info, setInfo] = useState<Character>();

    useEffect(() => {
         async function fetchAndSetUser(user:string){
            const { data } = await fetchUserInfo(user);
            setInfo(data);
         }
         fetchAndSetUser(username!);
    }, [username]);
    
    return(
        <div className="user-wrap">
            <div className="user-inner">
                <div className="default-info-box">
                    <h2>기본 정보</h2>
                    <ul>
                        <li>
                            {info?.character.username}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}