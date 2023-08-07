import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import LoginPage from "./Pages/LoginPage/LoginPage"
import RegisterPage from "./Pages/RegisterPage/RegisterPage"
import ProtectedPage from './Components/ProtectedPage';
import Spinner from './Components/Spinner';
import {useSelector} from 'react-redux'
import Profile from './Pages/ProfilePage/ProfilePage';


const App = () => {
  const {loading}=useSelector(state=>state.loader)
  return (
    <div>
      {loading && <Spinner/>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>}/>
          <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;