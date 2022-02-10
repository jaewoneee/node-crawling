import {Route, Routes, useLocation} from 'react-router-dom'
// style
import './style/reset.scss';
import './style/style.scss';
// pages
import { Main } from './pages/MainPage';
import { User }from './pages/UserPage';
import { Header } from './components/common/Header';
//video
import trailer from './assets/video/trailer.mp4';

function App() {
  const location = useLocation().pathname;
  
  return (
    <div className={location === '/' ? 'App' : 'App sub'}>
      {
        location === '/'
        ? <video src={trailer} autoPlay muted loop></video> 
        : null
      }
      
      <div className="inner">
        <Header />
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/users/:username' element={<User/>}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
