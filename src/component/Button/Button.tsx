import styled from 'styled-components'

interface ButtonProps {
    label: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    variant?: 'success' | 'warning' | 'danger'
    isLoading?: boolean
    isDisabled?: boolean
}

const StyledButton = styled.button<{
    variant?: 'success' | 'warning' | 'danger'
}>`
    color: ${(props) => props.theme.colors.textPrimary};
    background-color: ${(props) => {
        switch (props.variant) {
            case 'success':
                return props.theme.colors.success
            case 'warning':
                return props.theme.colors.warning
            case 'danger':
                return props.theme.colors.danger
            default:
                return props.theme.colors.primary
        }
    }};
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
`

export const Button = ({
    label,
    onClick,
    variant,
    isLoading,
    isDisabled,
}: ButtonProps) => {
    return (
        <StyledButton
            onClick={onClick}
            variant={variant}
            disabled={isDisabled || isLoading}
        >
            {isLoading ? 'Loading...' : label}
        </StyledButton>
    )
}
