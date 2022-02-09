import {Route, Routes} from 'react-router-dom'
// style
import './style/reset.scss';
import './style/style.scss';
// pages
import { Header } from './components/common/Header';
import { Main } from './pages/MainPage';
import { User }from './pages/UserPage';


function App() {
  return (
    <div className="App">
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
