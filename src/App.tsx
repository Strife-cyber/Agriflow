import './App.css'
import AppName from './components/app-name'
import { AuthProvider } from './context/auth-context'
import { LanguageProvider } from './context/language-context'

function App() {

  return (
    <AuthProvider>
      <LanguageProvider>
        <div>
          <AppName/>
        </div>
      </LanguageProvider>
    </AuthProvider>
  )
}

export default App
