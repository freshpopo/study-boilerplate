import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from './hoc/auth';

function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);

  // TODO: 콘솔이 두번씩 찍히는 이유 확인 필요.

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLandingPage/>} />
        <Route path="/login" element={<NewLoginPage/>} />
        <Route path="/register" element={<NewRegisterPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
