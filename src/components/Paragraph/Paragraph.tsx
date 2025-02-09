import { ReactNode } from 'react'
import styled from 'styled-components'

interface ParagraphProps {
    children: ReactNode
}

const StyledParagraph = styled.p`
    color: ${(props) => props.theme.colors.textBackground};
`

export const Paragraph = ({ children }: ParagraphProps) => {
    return <StyledParagraph>{children}</StyledParagraph>
}
