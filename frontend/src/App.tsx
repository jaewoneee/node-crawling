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
      <div className='bg'></div>
      <div className="inner">
        <Header />
        <Main />
        <User />
      </div>
    </div>
  );
}

export default App;
