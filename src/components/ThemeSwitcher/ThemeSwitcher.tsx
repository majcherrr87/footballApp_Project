import { Dispatch, SetStateAction } from 'react'
import { Button } from '../Button'

interface ThemeSwitcherProps {
  theme: 'light' | 'dark'
  setTheme: Dispatch<SetStateAction<'light' | 'dark'>>
}

export const ThemeSwitcher = ({ theme, setTheme }: ThemeSwitcherProps) => {
  const label = theme === 'light' ? 'Ciemny motyw' : 'Jasny motyw'

  const handleOnClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return <Button label={label} onClick={handleOnClick} />
}
