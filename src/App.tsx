import './App.css'
import { AuthProvider } from './context/auth-context'
import { LanguageProvider } from './context/language-context'
import LandingPage from './pages/landing/landing-page'

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <div>
          <LandingPage/>
        </div>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
