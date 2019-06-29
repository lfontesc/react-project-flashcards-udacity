import { AsyncStorage } from 'react-native'
const STORE_KEY = 'flash-cards-mobile'

export const getStorage = async () => {
    try {
      const storage = await AsyncStorage.getItem(STORE_KEY)
      return JSON.parse(storage)
    } catch (e) {
      console.error('Error getting state:', e)
      return null
    }
}

export const setStorage = async (state) => {
  const storage = JSON.stringify(state)
  return await AsyncStorage.setItem(
    STORE_KEY,
    storage
  )
}