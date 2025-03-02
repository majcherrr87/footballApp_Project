import styled from 'styled-components'
import { Button } from '../../components/Button'
import { useState } from 'react'
import Players from '../Players/Players'
import { Teams } from '../Teams'
import { Competitions } from '../Competitions/Competitions'
import { Stats } from '../Stats/Stats'
import { RowCenterFlex } from '../../components/RowCenterFlex/RowCenterFlex'

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.textBackground};
`

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState('players')

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const renderTabContent = (tab: string) => {
    switch (tab) {
      case 'players':
        return <Players />
      case 'teams':
        return <Teams />
      case 'competitions':
        return <Competitions />
      case 'statistics':
        return <Stats />
      default:
        return null
    }
  }

  return (
    <MainDiv>
      <RowCenterFlex>
        <Button
          label="Baza graczy"
          onClick={() => handleTabChange('players')}
        />

        <Button label="Baza drużyn" onClick={() => handleTabChange('teams')} />

        <Button
          label="Baza rozgrywek"
          onClick={() => handleTabChange('competitions')}
        />

        <Button
          label="Statystyki"
          onClick={() => handleTabChange('statistics')}
        />
      </RowCenterFlex>

      {renderTabContent(activeTab)}
    </MainDiv>
  )
}
