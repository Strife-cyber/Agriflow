import './App.css'
import { AuthProvider } from './context/auth-context'
import { LanguageProvider } from './context/language-context'

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <div>
        </div>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
