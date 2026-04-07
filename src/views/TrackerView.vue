<script setup lang="ts">
import { useRouter } from 'vue-router'
import SideNav from '@/components/layout/SideNav.vue'
import { Trello, ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-[#F0F2FA]">
    <SideNav />
    <div class="flex flex-1 m-3 ml-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trello class="w-8 h-8 text-[#4F6EF7]" :stroke-width="1.5" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900">Bug Tracker</h2>
        <p class="text-sm text-gray-400 mt-2 mb-6">Coming in Phase 5 — Kanban board & ticket management</p>
        <button class="flex items-center gap-2 text-sm text-[#4F6EF7] hover:text-blue-600 transition mx-auto" @click="router.push('/chat')">
          <ArrowLeft class="w-4 h-4" /> Back to Chat
        </button>
      </div>
    </div>
  </div>
</template>
