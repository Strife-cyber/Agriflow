import './App.css'
import { AuthProvider } from './context/auth-context'
import LandingPage from './pages/landing/landing-page'
import { LanguageProvider } from './context/language-context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/settings/profile';

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/auth' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/profile/edit' element={<Profile mustVerifyEmail={false}/>}/>
            <Route path='/settings/profile' element={<Profile mustVerifyEmail={false}/>}/>
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
