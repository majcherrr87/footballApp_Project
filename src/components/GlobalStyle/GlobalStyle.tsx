import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        width: 100vw;
        height: 100vh;
        background-color: ${(props) => props.theme.colors.background};
        display: flex;
        flex-direction: column;
    }`
