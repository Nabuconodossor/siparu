import { Routes, Route, Navigate } from 'react-router-dom'
import Splash from './pages/Splash'
import Login from './pages/auth/Login'
import UpdateScreen from './pages/UpdateScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update-screen" element={<UpdateScreen/>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
