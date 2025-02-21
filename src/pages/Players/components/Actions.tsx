import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useState } from 'react'
import { AddForm } from './AddForm'

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const Actions = () => {
  const [formToShow, setFormToShow] = useState(false)

  return (
    <div>
      <StyledWrapper>
        <Button
          label={formToShow ? 'Anuluj' : 'Dodaj gracza'}
          variant="success"
          onClick={() => setFormToShow((prev) => !prev)}
        />
      </StyledWrapper>

      {formToShow && <AddForm cloceAddForm={() => setFormToShow(false)} />}
    </div>
  )
}
