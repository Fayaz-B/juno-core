export interface ISelectedEmail {
  labelIds: string[]
  selectedIds: string[]
}

export interface ISelectedEmailAction {
  event: 'add' | 'remove'
  id: string
  labelIds: string[]
}

export interface IEmailMessageHeaders {
  date: string
  from: string
  subject: string
  to: string
  cc: string
  bcc: string
}

export interface IEmailMessagePayloadRaw {
  partId: string
  mimeType: string
  filename: string
  headers: IEmailMessageHeaders
  body: {
    data?: string
    attachmentId?: string
    size: number
  }
  parts?: IEmailMessagePayloadRaw[]
}

export interface IEmailMessagePayloadConverted {
  mimeType: string
  headers: IEmailMessageHeaders
  files?: undefined | IEmailMessagePayloadRaw[]
  body?: {
    emailFileHTML: any[]
    emailHTML: string
    removedTrackers: string[]
  }
  parts?: IEmailMessagePayloadRaw[]
}

export interface IEmailMessage {
  id: string
  threadId: string
  labelIds: string[]
  snippet: string
  payload: IEmailMessagePayloadConverted
  sizeEstimate: number
  historyId: string
  internalDate: string
}

export interface IEmailListThreadItem {
  id: string
  historyId: string
  messages: IEmailMessage[]
}

export interface IEmailListObject {
  labels: string[]
  threads: IEmailListThreadItem[]
  nextPageToken: string | null | undefined
  resultSizeEstimate?: number
  timestamp?: number
  q?: string
}

export interface IEmailListState {
  activeEmailListIndex: number
  emailList: IEmailListObject[]
  isFetching: boolean
  searchList: IEmailListObject | null
  selectedEmails: ISelectedEmail
}

export type TBaseEmailList = {
  labels: string[]
  nextPageToken: null
  threads: []
}[]
