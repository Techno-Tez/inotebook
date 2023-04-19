import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { About } from './component/About';
import NoteState from './context/Small notes/NotesState';
import Signup from './component/Signup';
import Login from './component/Login';

function App() {
  return (
    <>
      <Router>
      <Navbar/>
      <NoteState>
        <div className="container">
          <Routes> 
            <Route exact path="/" element={<Home/>}> </Route>
            <Route exact path="/about" element={<About />}> </Route>
            <Route exact path="/login" element={<Login />}> </Route>
            <Route exact path="/signup" element={<Signup />}> </Route>
          </Routes>
        </div>
      </NoteState>
      </Router>
    </>

  );
}

export default App;