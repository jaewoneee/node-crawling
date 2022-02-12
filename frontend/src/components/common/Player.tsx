import { useState, useCallback, useRef } from "react";
import {playList} from "../../data/playlist";

export const Player = () =>{
    const [track, setTrack] = useState(0);  // 트랙
    const [play, setPlayState] = useState(false);   // 재생상태
    const audioRef = useRef<HTMLAudioElement>(null);    // dheldh 
    const handlePlayer = useCallback((type:string) => {
        switch (type) {
            case 'play':
                playMusic();
                break;
            case 'pause':
                audioRef.current?.pause();
                setPlayState(false);
                break;
            case 'next':
                if(track < playList.length - 1){
                    setTrack(track + 1);
                }else if (track === playList.length - 1){
                    setTrack(0);
                }
                playMusic();
                break;
            case 'prev':
                if(track > 0) {
                    setTrack(track - 1)
                }else if (track === 0){
                    setTrack(playList.length-1)
                }
                playMusic();
                break;
        }
       }, [track]);
    
    function playMusic(){
        setPlayState(true);
        setTimeout(() => {
            audioRef.current?.play();
        }, 500);
    }   

    return(
        <div className="player-wrap">
            <div className="song-title-box">
                <i></i><p>{playList[track].title}</p>
            </div>
            <div className="control-box">
                <button onClick={() => handlePlayer('prev')}>이전 곡</button>
                <button 
                className={play === false ?"play-btn" :"pause-btn"}
                onClick={() => play === false ? handlePlayer('play') : handlePlayer('pause')}>
                    {
                        play === false
                        ? '재생'
                        : '일시정지'
                    }
                </button>
                <button onClick={() => handlePlayer('next')}>다음 곡</button>
                
            </div>
            <audio controls src={playList[track].value} ref={audioRef} onEnded={()=>{handlePlayer('next')}}></audio>
        </div>
    )
}