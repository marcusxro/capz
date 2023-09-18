import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import Home from './pages/Home';
import SignUp from './comps/SIgnUp';
import HomePage from './pages/HomePage';
import ResetPw from './comps/ResetPw';
import SignUpPage from './pages/SignUpPage';
import NotFound from './pages/NotFound';
import Sneak from './pages/Sneak';

function App() {


  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/SignUp" element={<SignUpPage />} /> 
          <Route path="/Homepage" element={<HomePage />} /> 
          <Route path="/ResetPassword" element={<ResetPw />} /> 
          <Route path="/NotAllowed" element={<Sneak />} /> 
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
