<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Avatar from '@/components/ui/Avatar.vue'
import {
  Home, MessageSquare, HelpCircle, Bell,
  Calendar, Settings, LogOut, Trello
} from 'lucide-vue-next'

const router = useRouter()
const route  = useRoute()
const auth   = useAuthStore()

const navItems = [
  { icon: Home,          to: '/chat',    label: 'Home' },
  { icon: MessageSquare, to: '/chat',    label: 'Chat', badge: true },
  { icon: Trello,        to: '/tracker', label: 'Bug Tracker' },
  { icon: Bell,          to: null,       label: 'Notifications' },
  { icon: Calendar,      to: null,       label: 'Calendar' },
  { icon: Settings,      to: null,       label: 'Settings' },
]

const isActive = (item) => item.to && route.path.startsWith(item.to)
</script>

<template>
  <aside class="flex flex-col items-center w-16 h-full bg-sidebar py-5 gap-1.5 shrink-0">

    <!-- Logo -->
    <div class="w-9 h-9 bg-primary rounded-xl flex items-center justify-center mb-4 shrink-0">
      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    </div>

    <!-- Nav Items -->
    <nav class="flex flex-col gap-1 w-full items-center">
      <button
        v-for="item in navItems"
        :key="item.label"
        :title="item.label"
        :class="[
          'nav-icon',
          isActive(item) ? 'active' : ''
        ]"
        @click="item.to && router.push(item.to)"
      >
        <component
          :is="item.icon"
          :class="['w-4.5 h-4.5', isActive(item) ? 'text-primary' : 'text-white/40']"
          :stroke-width="1.8"
        />
        <span
          v-if="item.badge"
          class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-sidebar"
        />
      </button>
    </nav>

    <!-- Bottom: User + Logout -->
    <div class="mt-auto flex flex-col items-center gap-3">
      <button
        class="nav-icon"
        title="Logout"
        @click="auth.logout()"
      >
        <LogOut class="w-4.5 h-4.5 text-white/40" :stroke-width="1.8" />
      </button>

      <Avatar
        :name="auth.user?.name ?? 'User'"
        size="sm"
        :online="true"
        class="cursor-pointer"
        @click="router.push('/profile')"
      />
    </div>
  </aside>
</template>