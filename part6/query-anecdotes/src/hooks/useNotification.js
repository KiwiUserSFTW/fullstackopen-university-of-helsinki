import { useContext, useRef } from 'react'

import NotificationContext from '../context/notificationContext'

export const useNotification = () => {
  const { notification, notificationDispatch } = useContext(NotificationContext)
  const timeoutRef = useRef(null)

  const setNotification = (message, delay = 5) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    notificationDispatch({ type: 'setNotification', payload: message })

    timeoutRef.current = setTimeout(() => {
      notificationDispatch({ type: 'removeNotification' })
    }, delay * 1000)
  }

  return { notification, setNotification }
}
