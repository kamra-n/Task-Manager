import './App.css';
import Home from './TaskManager'
import { store } from './store';
import { Provider } from 'react-redux'

function App() {

  return (
    <div className='app'>
      <Provider store={store}>

        <Home />
      </Provider>
    </div>
  );
}

export default App;
