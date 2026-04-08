<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface Chat {
	id: string
	name: string
	avatar?: string
	lastMessage: string
	time: string
	unread: number
	online: boolean
}

const searchQuery = ref( '' )
const activeChat = ref<Chat | null>( null )

const chats = ref<Chat[]>( [
	{ id: '1', name: 'Alice Johnson', lastMessage: 'Hey, are you available for a quick call?', time: '2m', unread: 2, online: true },
	{ id: '2', name: 'Bob Smith', lastMessage: 'The report has been sent.', time: '15m', unread: 0, online: false },
	{ id: '3', name: 'Design Team', lastMessage: 'New mockups uploaded to Figma', time: '1h', unread: 5, online: true },
	{ id: '4', name: 'Carol White', lastMessage: 'Thanks for the update!', time: '3h', unread: 0, online: false },
] )

const filteredChats = computed( () => {
	if ( !searchQuery.value ) return chats.value
	return chats.value.filter( chat =>
		chat.name.toLowerCase().includes( searchQuery.value.toLowerCase() )
	)
} )

const selectChat = ( chat: Chat ) => {
	activeChat.value = chat
}
</script>

<template>
	<div class="flex flex-col h-full">
		<!-- Header -->
		<div class="px-4 py-3 border-b border-border">
			<h2 class="text-sm font-semibold text-foreground">Messages</h2>
		</div>
		<!-- Search -->
		<div class="px-3 py-2">
			<div class="relative">
				<Search class="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
				<input v-model="searchQuery" type="text" placeholder="Search chats..."
					class="w-full pl-8 pr-3 py-1.5 text-sm bg-muted rounded-md outline-none focus:ring-1 focus:ring-ring" />
			</div>
		</div>
		<!-- Chat List -->
		<div class="flex-1 overflow-y-auto">
			<div v-for=" chat in filteredChats " :key="chat.id" @click="selectChat( chat )" :class="[
				'flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-accent transition-colors',
				activeChat?.id === chat.id ? 'bg-accent' : ''
			]">
				<!-- Avatar -->
				<div class="relative shrink-0">
					<Avatar class="w-8 h-8">
						<AvatarImage v-if=" chat.avatar " :src="chat.avatar" :alt="chat.name" />
						<AvatarFallback>{{ chat.name.slice( 0, 2 ).toUpperCase() }}</AvatarFallback>
					</Avatar>
					<span v-if=" chat.online "
						class="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-background" />
				</div>
				<!-- Info -->
				<div class="flex-1 min-w-0">
					<div class="flex justify-between items-center">
						<span class="text-sm font-medium text-foreground truncate">{{ chat.name }}</span>
						<span class="text-xs text-muted-foreground shrink-0">{{ chat.time }}</span>
					</div>
					<div class="flex justify-between items-center mt-0.5">
						<p class="text-xs text-muted-foreground truncate">{{ chat.lastMessage }}</p>
						<span v-if=" chat.unread > 0 "
							class="ml-1 shrink-0 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center">
							{{ chat.unread }}
						</span>
					</div>
				</div>
			</div>
			<!-- Empty state -->
			<div v-if=" filteredChats.length === 0 " class="px-4 py-8 text-center text-sm text-muted-foreground">
				No chats found
			</div>
		</div>
	</div>
</template>