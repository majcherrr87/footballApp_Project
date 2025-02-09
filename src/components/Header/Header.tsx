import React from 'react'
import styled from 'styled-components'

interface HeaderProps {
    children: React.ReactNode
    level: number
}

const StyledHeader = styled.h1`
    color: ${(props) => props.theme.colors.textBackground};
`

export const Header = ({ children, level }: HeaderProps) => {
    return <StyledHeader as={`h${level}`}>{children}</StyledHeader>
}
