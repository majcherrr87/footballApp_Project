import styled from 'styled-components'
import { Button } from '../../../components/Button'
import { useState } from 'react'
import { AddCompetitionForm } from './AddCompetitionForm'

const StyledWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`

export const Actions = () => {
    const [formToShow, setFormToShow] = useState<'add' | ''>('')

    const handleShowForm = (typeOfForm: 'add') => {
        setFormToShow(typeOfForm)
    }

    return (
        <div>
            <StyledWrapper>
                <Button
                    label="Add Competition"
                    variant="success"
                    onClick={() => handleShowForm('add')}
                />
            </StyledWrapper>

            {formToShow === 'add' && <AddCompetitionForm />}
        </div>
    )
}
