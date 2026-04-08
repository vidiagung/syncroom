import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Message {
  id: string
  roomId: string
  userId: string
  content: string
  createdAt: string
}

interface Room {
  id: string
  name: string
  description?: string
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const rooms = ref<Room[]>([])
  const currentRoom = ref<Room | null>(null)
  let socket: WebSocket | null = null

  async function fetchRooms() {
    // TODO: ganti dengan API call ke backend kamu
    rooms.value = [
      { id: '1', name: 'General' },
      { id: '2', name: 'Random' },
    ]
  }

  function connectSocket() {
    console.log('Socket connected')
  }

  function disconnectSocket() {
    socket?.close()
    socket = null
    console.log('Socket disconnected')
  }

  return { messages, rooms, currentRoom, fetchRooms, connectSocket, disconnectSocket }
})