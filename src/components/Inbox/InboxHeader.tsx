import format from 'date-fns/format'
import Navigation from '../MainHeader/Navigation/Navigation'
import InboxSortOption from './InboxSortOption'
import InboxRefreshOption from './InboxRefreshOption'
import * as S from '../MainHeader/HeaderStyles'
import * as InboxS from './InboxHeaderStyles'
import * as GS from '../../styles/globalStyles'
import { useAppSelector } from '../../store/hooks'
import { selectIsFlexibleFlowActive } from '../../store/utilsSlice'
import { selectEmailList,selectActiveEmailListIndex } from '../../store/emailListSlice'

const INBOX_HEADER = 'Inbox'

const InboxHeader = () => {
  const emailList = useAppSelector(selectEmailList)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)
  const timeStamp = emailList[activeEmailListIndex]?.timestamp 
  let unixTimeStamp
  if (timeStamp !== undefined){
  unixTimeStamp = format(timeStamp,"dd mm yyyy")
  }
  return (
    <GS.OuterContainer>
      <S.NavContainer>
        <S.HeaderCenter>
          <S.PageTitle title={unixTimeStamp}>{INBOX_HEADER}</S.PageTitle>
        </S.HeaderCenter>
        <Navigation />
      </S.NavContainer>
      <InboxS.OptionsContainer>
        <div />
        <InboxS.SortOptionWrapper>
          <InboxSortOption />
        </InboxS.SortOptionWrapper>
        <InboxS.RefreshOptionWrapper>
          <InboxRefreshOption />
        </InboxS.RefreshOptionWrapper>
      </InboxS.OptionsContainer>
    </GS.OuterContainer>
  )
}


export default InboxHeader
