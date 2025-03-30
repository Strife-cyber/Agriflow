import './App.css'
import { AuthProvider } from './context/auth-context'
import LandingPage from './pages/landing/landing-page'
import { LanguageProvider } from './context/language-context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/login-page';
import Dashboard from './pages/dashboard/dashboard';

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/auth' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
