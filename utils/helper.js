import { Permissions, Notifications } from 'expo'
import { getStorage, setStorage } from './api'

export const askPermissionNotification = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    return status
}

export const setLocalNotifiation = async () => {
  const status = await askPermissionNotification()
  if (status !== "granted") {
    console.warn('Sem permissões para usar as notificações',status)
    return
  }

  await Notifications.cancelAllScheduledNotificationsAsync()
  const future = (new Date()).getTime() + 24 * 60 * 60 * 1000

  return await Notifications.scheduleLocalNotificationAsync(
    quizNotification,
    {
      time: future,
      repeat: 'day'
    }
  )
}

export const fetchDecks = async () => {
  return await getStorage()
}

export const deleteDeck = async (key) => {
  const storage  = await getStorage()
  delete storage[key]
  await setStorage(storage)
}

export const saveDeck = async (deck) =>{
    const storage = await getStorage()
    const newState = {
      ...storage,
      [deck.name]: deck
    }
    await setStorage(newState)
}

export const startStorage = async () => {
  const INITICAL_STATE = {}
  await setStorage(INITICAL_STATE)
}

export const isStorageNotNull = async () => {
  
  const storage = await getStorage()
  
  return storage !== null
}

