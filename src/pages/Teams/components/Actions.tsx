import { Button } from '../../../components/Button'
import { useState } from 'react'
import { AddTeamForm } from './AddTeamForm'
import { RowCenterFlex } from '../../../components/RowCenterFlex/RowCenterFlex'

export const Actions = () => {
  const [formToShow, setFormToShow] = useState(false)

  return (
    <div>
      <RowCenterFlex>
        <Button
          label={formToShow ? 'Anuluj' : 'Dodaj drużynę'}
          variant="success"
          onClick={() => setFormToShow((prev) => !prev)}
        />
      </RowCenterFlex>

      {formToShow && <AddTeamForm cloceAddTeam={() => setFormToShow(false)} />}
    </div>
  )
}
