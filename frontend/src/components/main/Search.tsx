import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const handleKeyPress = (e:any) => {
        if(e.key === 'Enter')  handleClick();        
    }
      
    function handleClick(){
        navigate(`/users/${username}`);
    }

    return (
        <div className="search-box">
            <h2>전투정보실</h2>
            <div className="search">
                <input placeholder="캐릭터명을 입력해 주세요"
                 onKeyPress={handleKeyPress}
                 onChange={(e) => setUsername(e.target.value)}/>
                <button onClick={handleClick}  type="button">검색하기</button>
            </div>
        </div>
    )
}