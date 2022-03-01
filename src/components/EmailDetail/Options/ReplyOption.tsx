import { FiCornerUpLeft } from 'react-icons/fi'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import isReplyingListener from '../../EmailOptions/IsReplyingListener'
import { useAppDispatch } from '../../../Store/hooks'

interface IEmailDetailOptions {
  threadDetail: IEmailListThreadItem
}

const messageIndex = 0

const ReplyOption = ({ threadDetail }: IEmailDetailOptions) => {
  const dispatch = useAppDispatch()

  const clickHandeler = () => {
    if (threadDetail.messages) {
      return isReplyingListener({
        messageIndex,
        dispatch,
      })
    }
    return null
  }

  return (
    <CustomButton
      icon={<FiCornerUpLeft />}
      label={local.BUTTON_REPLY}
      onClick={clickHandeler}
      suppressed
    />
  )
}

export default ReplyOption
