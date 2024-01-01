import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from './components/registrationValidation/Register';
import RegisterForm from "./components/RegisterForm";
import Login from "./components/login/Login";
import HomePage from "./pages/HomePage";
import Timeline from "./pages/Timeline";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import Messenger from "./components/messenger/Messenger";
import { LoggedUser } from "./components/context/LoggedUser";
import { ProfileUser } from "./components/context/ProfileUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <Register/> */}

        <LoggedUser>
          <ProfileUser>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/message" element={<Messenger />} />
            </Routes>
          </ProfileUser>
        </LoggedUser>
      </div>
    </BrowserRouter>
  );
}

export default App;
