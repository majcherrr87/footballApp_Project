import { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'

interface ThemeSwitcherProps {
    theme: 'light' | 'dark'
    setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

export const ThemeSwitcher = ({ theme, setTheme }: ThemeSwitcherProps) => {
    const label =
        theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'

    const handleOnClick = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    return <Button label={label} onClick={handleOnClick} />
}
