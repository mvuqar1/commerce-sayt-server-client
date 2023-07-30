import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home"
import LoginPage from "./Pages/LoginPage/LoginPage"
import RegisterPage from "./Pages/RegisterPage/RegisterPage"
import ProtectedPage from './Components/ProtectedPage';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/register" element={<RegisterPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;