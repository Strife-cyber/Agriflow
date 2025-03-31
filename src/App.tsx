import Limits from './pages/dashboard/limit';
import Profile from './pages/settings/profile';
import LoginPage from './pages/auth/login-page';
import History from './pages/dashboard/history';
import Password from './pages/settings/password';
import Dashboard from './pages/dashboard/dashboard';
import { AuthProvider } from './context/auth-context';
import LandingPage from './pages/landing/landing-page';
import ResetPassword from './pages/auth/reset-password';
import ForgotPassword from './pages/auth/forgot-password';
import { LanguageProvider } from './context/language-context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/limit' element={<Limits/>}/>
            <Route path='/auth' element={<LoginPage/>}/>
            <Route path='/history' element={<History/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/settings/password' element={<Password/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/profile/edit' element={<Profile mustVerifyEmail={false}/>}/>
            <Route path='/settings/profile' element={<Profile mustVerifyEmail={false}/>}/>
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
