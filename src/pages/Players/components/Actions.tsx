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
    const [formToShow, setFormToShow] = useState<
        'add' | 'delete' | 'edit' | ''
    >('')

    const handleShowForm = (typeOfForm: 'add' | 'edit' | 'delete') => {
        setFormToShow(typeOfForm)
    }

    return (
        <div>
            <StyledWrapper>
                <Button
                    label="Add player"
                    variant="success"
                    onClick={() => handleShowForm('add')}
                />
            </StyledWrapper>

            {formToShow === 'add' && <AddForm />}
        </div>
    )
}
