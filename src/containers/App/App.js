import './App.css';
import Router from './Router';
import {BrowserRouter} from 'react-router-dom'
// import { createBrowserHistory } from "history";
function App(props) {
  return (
    <BrowserRouter >
        <Router />
    </BrowserRouter>
  );
}

export default App;
