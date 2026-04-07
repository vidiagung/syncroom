<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useChatStore } from '@/stores/chat'
import SideNav from '@/components/layout/SideNav.vue'
import ChatList from '@/components/layout/ChatList.vue'
import ChatMain from '@/components/layout/ChatMain.vue'
import RightPanel from '@/components/layout/RightPanel.vue'
	
const chat = useChatStore()

onMounted( async () => {
	chat.connectSocket()
	await chat.fetchRooms()
} )

onUnmounted( () => {
	chat.disconnectSocket()
} )
</script>

<template>
	<div class="flex h-screen w-screen overflow-hidden bg-[#F0F2FA]">
		<SideNav />
		<div class="flex flex-1 m-3 ml-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
			<ChatList />
			<ChatMain />
			<RightPanel />
		</div>
	</div>
</template>