<script setup>
import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Plus } from 'lucide-vue-next'

const chat = useChatStore()
const auth = useAuthStore()

const search      = ref('')
const showNewRoom = ref(false)
const newRoomName = ref('')
const newRoomDesc = ref('')

const filtered = computed(() =>
  chat.rooms.filter(r =>
    r.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const formatTime = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const now = new Date()
  const diff = (now - d) / 1000
  if (diff < 60)   return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const handleCreate = async () => {
  if (!newRoomName.value.trim()) return
  await chat.createRoom(newRoomName.value, newRoomDesc.value)
  newRoomName.value = ''
  newRoomDesc.value = ''
  showNewRoom.value = false
}
</script>

<template>
  <div class="flex flex-col w-70 h-full bg-white border-r border-gray-100 shrink-0">

    <div class="px-4 pt-5 pb-3">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-[17px] font-semibold text-gray-900">Chats</h2>
        <Button size="sm" @click="showNewRoom = !showNewRoom">
          <Plus class="w-3.5 h-3.5" />
          New Chat
        </Button>
      </div>

      <transition name="slide-down">
        <div v-if="showNewRoom" class="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2">
          <input
            v-model="newRoomName"
            placeholder="Room name..."
            class="w-full text-sm px-3 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            @keyup.enter="handleCreate"
          />
          <input
            v-model="newRoomDesc"
            placeholder="Description (optional)"
            class="w-full text-sm px-3 py-1.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div class="flex gap-2">
            <Button size="sm" class="flex-1" @click="handleCreate">Create</Button>
            <Button size="sm" variant="outline" @click="showNewRoom = false">Cancel</Button>
          </div>
        </div>
      </transition>

      <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
        <Search class="w-3.5 h-3.5 text-gray-400 shrink-0" :stroke-width="2" />
        <input
          v-model="search"
          placeholder="Search..."
          class="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
        <span class="text-[10px] text-gray-400">Messages</span>
      </div>
    </div>

    <div class="px-4 pb-1.5">
      <span class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Recent Chats</span>
    </div>

    <div class="flex-1 overflow-y-auto">
      <div
        v-for="room in filtered"
        :key="room.id"
        :class="['chat-row', chat.activeRoom?.id === room.id ? 'active' : '']"
        @click="chat.joinRoom(room)"
      >
        <Avatar
          :name="room.name"
          size="md"
          :online="false"
        />

        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-0.5">
            <span class="text-[13px] font-medium text-gray-900 truncate">{{ room.name }}</span>
            <span class="text-[10px] text-gray-400 shrink-0 ml-1">{{ formatTime(room.last_message_at) }}</span>
          </div>
          <p class="text-[12px] text-gray-500 truncate">
            {{ room.last_message || 'No messages yet' }}
          </p>
          <div v-if="room.is_private" class="mt-1">
            <Badge variant="gray">Private</Badge>
          </div>
        </div>
      </div>

      <div v-if="filtered.length === 0" class="flex flex-col items-center justify-center h-40 text-center px-4">
        <MessageSquare class="w-8 h-8 text-gray-200 mb-2" />
        <p class="text-sm text-gray-400">No rooms yet</p>
        <p class="text-xs text-gray-300 mt-1">Create a new room to start chatting</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all .2s ease;
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>