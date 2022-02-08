import { useEffect, useState } from "react";
import {fetchUserInfo} from "../api/index"

export const Main = () =>{
    const [username, setUsername] = useState('');
    useEffect(() => {

    
      return () => {

      };
    }, []);
    async function handleSubmit(){
        const { data } = await fetchUserInfo(username);
        console.log(data);
    }
    
    return(
        <div className="main-wrap">
            <input onChange={(e) => {setUsername(e.target.value)}}/>
            <button onClick={handleSubmit}>send</button>
        </div>
    )
}