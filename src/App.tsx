import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Tabs } from './pages/Tabs'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeSwitcher } from './component/ThemeSwitcher'
import { Paragraph } from './component/Paragraph'

const queryClient = new QueryClient()

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${(props) => props.theme.colors.background};
        display: flex;
        flex-direction: column;
    }`

function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark')

    const light = {
        colors: {
            primary: '#5f6d6d',
            secondary: '#5c5c5c',
            success: '#5cb85c',
            warning: '#f0ad4e',
            danger: '#d9534f',
            textPrimary: 'white',
            background: '#f9f9f9',
            textBackground: 'black',
            formBackground: '#f0f0f0',
        },
    }

    const dark = {
        colors: {
            primary: '#bfbfbf',
            secondary: '#2c5c5c',
            success: '#5cb85c',
            warning: '#f0ad4e',
            danger: '#d9534f',
            textPrimary: '#000000',
            background: '#1a1a1a',
            textBackground: '#bfbfbf',
            formBackground: '#333333',
        },
    }

    const StyledRow = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin: 2rem 0;
    `

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme === 'light' ? light : dark}>
                <GlobalStyle />

                <StyledRow>
                    <Paragraph>Football App</Paragraph>

                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                </StyledRow>

                <Tabs />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
