'use client'

import { useState, useEffect } from 'react'

type Notification = {
  id: string
  type: 'message' | 'appointment' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  link?: string
}

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchNotifications = async () => {
    try {
      // Fetch unread messages
      const messagesResponse = await fetch('/api/messages?status=unread')
      const { messages: unreadMessages } = await messagesResponse.json()

      // Fetch appointments (you'll need to create this endpoint)
      // For now, we'll just use messages as notifications
      
      const notificationsData: Notification[] = unreadMessages.map((msg: any) => ({
        id: msg.id,
        type: 'message' as const,
        title: `New message from ${msg.name}`,
        message: msg.message.substring(0, 100) + (msg.message.length > 100 ? '...' : ''),
        timestamp: msg.created_at,
        read: false,
        link: '/admin?tab=messages'
      }))

      setNotifications(notificationsData)
      setUnreadCount(notificationsData.length)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  useEffect(() => {
    fetchNotifications()
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-cream hover:bg-white/10 rounded-full transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-gold text-green-deep text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="bg-green-deep text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-dm-sans font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-dm-sans hover:text-gold transition-colors"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-72">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🔔</div>
                  <p className="font-dm-sans text-text-mid text-sm">
                    No new notifications
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      !notification.read ? 'bg-gold/10' : ''
                    }`}
                    onClick={() => {
                      markAsRead(notification.id)
                      if (notification.link) {
                        window.location.href = notification.link
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {notification.type === 'message' && (
                          <span className="text-2xl">💬</span>
                        )}
                        {notification.type === 'appointment' && (
                          <span className="text-2xl">📅</span>
                        )}
                        {notification.type === 'system' && (
                          <span className="text-2xl">⚙️</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-dm-sans font-semibold text-green-deep text-sm mb-1">
                          {notification.title}
                        </h4>
                        <p className="font-dm-sans text-text-mid text-xs line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="font-dm-sans text-text-mid text-xs mt-1">
                          {formatTime(notification.timestamp)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="flex-shrink-0 w-2 h-2 bg-gold rounded-full mt-2" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => {
                    setIsOpen(false)
                    window.location.href = '/admin?tab=messages'
                  }}
                  className="w-full text-center font-dm-sans text-sm text-green-deep hover:text-green-mid transition-colors"
                >
                  View all messages
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
