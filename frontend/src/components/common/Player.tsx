import { useState, useCallback, useRef } from "react";
import {playList} from "../../data/playlist";

export const Player = () =>{
    const [track, setTrack] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const handlePlayer = useCallback((type:string) => {
        switch (type) {
            case 'play':
                audioRef.current?.play();
                break;
            case 'pause':
                audioRef.current?.pause();
                break;
            case 'next':
                if(track < playList.length - 1){
                    setTrack(track + 1);
                }else if (track === playList.length - 1){
                    setTrack(0);
                }
                autoPlay();
                break;
            case 'prev':
                if(track > 0) setTrack(track - 1);
                autoPlay();
                break;
        }
       }, [track]);
    
    function autoPlay(){
        setTimeout(() => {
            audioRef.current?.play();
        }, 500);
        
    }   

    return(
        <div className="player-wrap">
            <p>{playList[track].title}</p>
            <button onClick={() => handlePlayer('play')}>play</button>
            <button onClick={() => handlePlayer('pause')}>pause</button>
            <button onClick={() => handlePlayer('next')}>next</button>
            <button onClick={() => handlePlayer('prev')}>prev</button>
            <audio controls src={playList[track].value} ref={audioRef} onEnded={()=>{handlePlayer('next')}}></audio>
        </div>
    )
}