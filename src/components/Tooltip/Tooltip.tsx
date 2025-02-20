import styled from 'styled-components'

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`

const TooltipText = styled.span`
  visibility: hidden;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  text-align: center;
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  position: absolute;
  bottom: 70%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
  z-index: 20;

  ${TooltipWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`

export const Tooltip = ({
  text,
  children,
}: {
  text?: string
  children: React.ReactNode
}) => (
  <TooltipWrapper>
    {children}
    {text && <TooltipText>{text}</TooltipText>}
  </TooltipWrapper>
)
