<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import SideNav from '@/components/layout/SideNav.vue'
import { ArrowLeft, User, Mail, Camera } from 'lucide-vue-next'

const auth   = useAuthStore()
const router = useRouter()
const name   = ref(auth.user?.name ?? '')
</script>

<template>
  <div class="flex h-screen w-screen overflow-hidden bg-[#F0F2FA]">
    <SideNav />
    <div class="flex flex-1 m-3 ml-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
      <div class="flex-1 p-8 max-w-lg mx-auto">
        <button class="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6 transition" @click="router.push('/chat')">
          <ArrowLeft class="w-4 h-4" /> Back to chat
        </button>

        <h1 class="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h1>

        <div class="flex flex-col items-center mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div class="relative mb-3">
            <div class="w-14 h-14 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-xl">
              {{ auth.user?.name?.charAt(0).toUpperCase() }}
            </div>
            <button class="absolute bottom-0 right-0 w-7 h-7 bg-[#4F6EF7] rounded-full flex items-center justify-center border-2 border-white">
              <Camera class="w-3.5 h-3.5 text-white" :stroke-width="2" />
            </button>
          </div>
          <p class="text-[15px] font-semibold text-gray-900">{{ auth.user?.name }}</p>
          <p class="text-sm text-gray-400">{{ auth.user?.email }}</p>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1.5">Full Name</label>
            <div class="relative">
              <User class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" :stroke-width="1.8" />
              <input v-model="name" type="text"
                class="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition" />
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-500 mb-1.5">Email</label>
            <div class="relative">
              <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" :stroke-width="1.8" />
              <input :value="auth.user?.email" type="email" disabled
                class="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed" />
            </div>
            <p class="text-[11px] text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          <button class="w-full bg-[#4F6EF7] hover:bg-[#3353F5] text-white font-medium py-2.5 rounded-lg text-sm transition-all mt-2">
            Save Changes
          </button>

          <div class="pt-4 border-t border-gray-100">
            <button class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg text-sm transition-all" @click="auth.logout()">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
