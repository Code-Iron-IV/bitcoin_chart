import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </ThemeProvider>
)
