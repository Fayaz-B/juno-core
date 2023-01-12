import { FiEdit2 } from 'react-icons/fi'
import type { Location } from 'react-router-dom'

import * as global from 'constants/globalConstants'
import { getHeaderByRoute } from 'constants/labelMapConstant'
import RoutesConstants from 'constants/routesConstants'
import {
  QiCheckmarkDouble,
  QiCog,
  QiCompose,
  QiDiscard,
  QiFolderArchive,
  QiFolderTrash,
  QiInbox,
  QiToDo,
} from 'images/svgIcons/quillIcons'
import type { AppDispatch } from 'store/store'
import {
  archiveAllEmailCMDK,
  deleteAllEmailCMDK,
  discardAllEmailCMDK,
  navigateTo,
  selectAllEmailsCurrentInbox,
  selectAllEmailsSender,
  setActiveModal,
} from 'store/utilsSlice'

import type { IJsonStructure } from '../commandPaletteUtils'

export default function defaultItems({
  dispatch,
  isFlexibleFlowActive,
  location,
  currentEmailBoxHasEmails,
}: {
  dispatch: AppDispatch
  isFlexibleFlowActive: boolean
  location: Location
  currentEmailBoxHasEmails: boolean
}): IJsonStructure[] {
  const isEmailDetailPage = location.pathname.startsWith('/mail/')
  const isDraftsPage = location.pathname.startsWith('/drafts')
  return [
    {
      heading: 'Suggestions',
      id: 'suggestions',
      items: [
        !isDraftsPage && currentEmailBoxHasEmails && !isEmailDetailPage
          ? {
              id: 'archive-all-current-box',
              children: `Archive all loaded emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiFolderArchive />,
              onClick: () =>
                dispatch(selectAllEmailsSender(archiveAllEmailCMDK)),
            }
          : undefined,
        !isEmailDetailPage && currentEmailBoxHasEmails && !isDraftsPage
          ? {
              id: 'delete-all-current-box',
              children: `Delete all loaded emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiFolderTrash />,
              onClick: () =>
                dispatch(selectAllEmailsSender(deleteAllEmailCMDK)),
            }
          : undefined,
        location.pathname === RoutesConstants.DRAFTS && currentEmailBoxHasEmails
          ? {
              id: 'discard-all-current-box',
              children: `Discard all loaded emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiDiscard />,
              onClick: () =>
                dispatch(selectAllEmailsSender(discardAllEmailCMDK)),
            }
          : undefined,
        location.pathname !== RoutesConstants.TODO
          ? {
              id: 'to-do',
              children: 'To Do',
              icon: <QiToDo />,
              onClick: () => dispatch(navigateTo(RoutesConstants.TODO)),
              type: 'Link',
            }
          : undefined,
        isEmailDetailPage || !currentEmailBoxHasEmails
          ? undefined
          : {
              id: `select-all-current-box`,
              children: `Select all available emails of ${
                getHeaderByRoute[location.pathname]
              }`,
              icon: <QiCheckmarkDouble />,
              onClick: () => dispatch(selectAllEmailsCurrentInbox()),
            },
        location.pathname !== RoutesConstants.INBOX && isFlexibleFlowActive
          ? {
              id: 'inbox',
              children: 'Inbox',
              icon: <QiInbox />,
              onClick: () => dispatch(navigateTo(RoutesConstants.INBOX)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.DRAFTS
          ? {
              id: 'drafts',
              children: 'Drafts',
              icon: <FiEdit2 />,
              onClick: () => dispatch(navigateTo(RoutesConstants.DRAFTS)),
              type: 'Link',
            }
          : undefined,
        location.pathname !== RoutesConstants.COMPOSE_EMAIL
          ? {
              id: 'compose',
              children: 'Compose',
              icon: <QiCompose />,
              onClick: () =>
                dispatch(navigateTo(RoutesConstants.COMPOSE_EMAIL)),
              type: 'Link',
            }
          : undefined,
        {
          id: 'settings',
          children: 'Settings',
          icon: <QiCog />,
          onClick: () =>
            dispatch(setActiveModal(global.ACTIVE_MODAL_MAP.settings)),
          type: 'Link',
        },
      ],
    },
  ]
}
