
import './App.css';
import { Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ChatHome from './pages/ChatHome'



function App() {
  return (
    <div className="App">
      
      <Route path="/" component={HomePage} exact/>
     <Route path="/chats" component={ChatHome} />
    </div>
  );
}

export default App;
