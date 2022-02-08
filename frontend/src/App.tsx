import { Main } from './pages/MainPage';
import { User }from './pages/UserPage';
import { Player } from './components/common/Player'

function App() {
  return (
    <div className="App">
      <Main />
      <Player />
      <User />
    </div>
  );
}

export default App;
