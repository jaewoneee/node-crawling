import { Player } from './Player'

export const Header = () => {
return (
    <div className="header-wrap">
        <div className="header-inner">
            <header>
                <h1 id="logo">
                    <a href="/">홈으로</a>
                </h1>
                <Player />
            </header>
        </div>
    </div>
)
}