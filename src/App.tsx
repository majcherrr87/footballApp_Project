import { ThemeProvider } from 'styled-components'
import { Tabs } from './pages/Tabs'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Paragraph } from './components/Paragraph'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { GlobalStyle } from './components/GlobalStyle/GlobalStyle'
import { RowCenterFlex } from './components/RowCenterFlex/RowCenterFlex'

const queryClient = new QueryClient()

export const App = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  const light = {
    colors: {
      primary: '#3B5998',
      secondary: '#8E8E8E',
      success: '#4CAF50',
      warning: '#FF9800',
      danger: '#E53935',
      textPrimary: '#2C2C2C',
      background: '#FAFAFA',
      textBackground: '#404040',
      formBackground: '#EEEEEE',
    },
  }

  const dark = {
    colors: {
      primary: '#4C8BF5',
      secondary: '#6D6D6D',
      success: '#66BB6A',
      warning: '#FFA726',
      danger: '#EF5350',
      textPrimary: '#F1F1F1',
      background: '#181818',
      textBackground: '#D1D1D1',
      formBackground: '#282828',
    },
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <GlobalStyle />

        <RowCenterFlex>
          <Paragraph>Football App</Paragraph>

          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </RowCenterFlex>

        <Tabs />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
