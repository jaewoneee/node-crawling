import { Link } from 'react-router-dom'
import { Player } from './Player'

export const Header = () => {
return (
    <div className="header-wrap">
        <div className="header-inner">
            <header>
                <h1 id="logo">
                    <Link to='/' />
                </h1>
                <Player />
            </header>
        </div>
    </div>
)
}