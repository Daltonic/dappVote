let CometChat: any

if (typeof window !== 'undefined') {
  import('@cometchat-pro/chat').then((cometChatModule) => {
    CometChat = cometChatModule.CometChat
  })
  console.log('CometChat Loaded...')
}

const CONSTANTS = {
  APP_ID: process.env.NEXT_PUBLIC_COMET_CHAT_APP_ID,
  REGION: process.env.NEXT_PUBLIC_COMET_CHAT_REGION,
  Auth_Key: process.env.NEXT_PUBLIC_COMET_CHAT_AUTH_KEY,
}

const initCometChat = async () => {
  const appID = CONSTANTS.APP_ID
  const region = CONSTANTS.REGION

  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build()

  CometChat.init(appID, appSetting)
    .then(() => console.log('Initialization completed successfully'))
    .catch((error: any) => console.log(error))
}

const loginWithCometChat = async (UID: string) => {
  const authKey = CONSTANTS.Auth_Key

  return new Promise((resolve, reject) => {
    CometChat.login(UID, authKey)
      .then((user: any) => resolve(user))
      .catch((error: any) => reject(error))
  })
}

const signUpWithCometChat = async (UID: string) => {
  const authKey = CONSTANTS.Auth_Key
  const user = new CometChat.User(UID)

  user.setName(UID)
  return new Promise((resolve, reject) => {
    CometChat.createUser(user, authKey)
      .then((user: any) => resolve(user))
      .catch((error: any) => reject(error))
  })
}

const logOutWithCometChat = async () => {
  return new Promise((resolve, reject) => {
    CometChat.logout()
      .then(() => resolve(null))
      .catch((error: any) => reject(error))
  })
}

const checkAuthState = async () => {
  return new Promise((resolve, reject) => {
    CometChat.getLoggedinUser()
      .then((user: any) => resolve(user))
      .catch((error: any) => reject(error))
  })
}

const createNewGroup = async (GUID: string, groupName: string) => {
  const groupType = CometChat.GROUP_TYPE.PUBLIC
  const password = ''
  const group = new CometChat.Group(GUID, groupName, groupType, password)

  return new Promise((resolve, reject) => {
    CometChat.createGroup(group)
      .then((group: any) => resolve(group))
      .catch((error: any) => reject(error))
  })
}

const getGroup = async (GUID: string) => {
  return new Promise((resolve, reject) => {
    CometChat.getGroup(GUID)
      .then((group: any) => resolve(group))
      .catch((error: any) => reject(error))
  })
}

const joinGroup = async (GUID: string) => {
  const groupType = CometChat.GROUP_TYPE.PUBLIC
  const password = ''

  return new Promise((resolve, reject) => {
    CometChat.joinGroup(GUID, groupType, password)
      .then((group: any) => resolve(group))
      .catch((error: any) => reject(error))
  })
}

const getMessages = async (GUID: string) => {
  const limit = 30
  const messagesRequest = new CometChat.MessagesRequestBuilder()
    .setGUID(GUID)
    .setLimit(limit)
    .build()

  return new Promise((resolve, reject) => {
    messagesRequest
      .fetchPrevious()
      .then((messages: any[]) => resolve(messages.filter((msg) => msg.type === 'text')))
      .catch((error: any) => reject(error))
  })
}

const sendMessage = async (receiverID: string, messageText: string) => {
  const receiverType = CometChat.RECEIVER_TYPE.GROUP
  const textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType)
  return new Promise((resolve, reject) => {
    CometChat.sendMessage(textMessage)
      .then((message: any) => resolve(message))
      .catch((error: any) => reject(error))
  })
}

const listenForMessage = async (listenerID: string) => {
  return new Promise((resolve) => {
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (message: any) => resolve(message),
      })
    )
  })
}

export {
  initCometChat,
  loginWithCometChat,
  signUpWithCometChat,
  logOutWithCometChat,
  checkAuthState,
  createNewGroup,
  getGroup,
  getMessages,
  joinGroup,
  sendMessage,
  listenForMessage,
}
