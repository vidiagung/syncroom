<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
	Home, MessageSquare, Bell,
	Calendar, Settings, LogOut, Trello
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const navItems = [
	{ icon: Home, to: '/chat', label: 'Home' },
	{ icon: MessageSquare, to: '/chat', label: 'Chat'},
	{ icon: Trello, to: '/tracker', label: 'Bug Tracker' },
	{ icon: Bell, to: null, label: 'Notifications' },
	{ icon: Calendar, to: null, label: 'Calendar' },
	{ icon: Settings, to: null, label: 'Settings' },
]

const isActive = ( item ) => item.to && route.path.startsWith( item.to )
</script>

<template>
	<aside class="flex flex-col items-center w-15 h-full bg-white border-r border-gray-100 py-4 gap-1 shrink-0">
		<div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-6 shrink-0">
			<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
				<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
			</svg>
		</div>

		<!-- Nav Items -->
		<nav class="flex flex-col gap-1 w-full items-center px-2">
			<button v-for=" item in navItems " :key="item.label" :title="item.label" :class="[
				'relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-150',
				isActive( item )
					? 'bg-blue-50 text-blue-500'
					: 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
			]" @click="item.to && router.push( item.to )">
				<component :is="item.icon" class="w-4.5 h-4.5" :stroke-width="isActive( item ) ? 2.2 : 1.8" />
				<!-- Active indicator -->
				<span v-if=" isActive( item ) "
					class="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 bg-blue-500 rounded-r-full" />
				<!-- Badge -->
				<span v-if=" item.badge " class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
			</button>
		</nav>

		<!-- Bottom -->
		<div class="mt-auto flex flex-col items-center gap-2 px-2">
			<!-- Logout -->
			<button title="Logout"
				class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150"
				@click="auth.logout()">
				<LogOut class="w-4.5 h-4.5" :stroke-width="1.8" />
			</button>

			<!-- Avatar -->
			<div class="relative cursor-pointer" title="Profile" @click="router.push( '/profile' )">
				<Avatar class="w-8 h-8 ring-2 ring-gray-100 hover:ring-blue-200 transition-all">
					<AvatarImage v-if=" auth.user?.avatar " :src="auth.user.avatar" :alt="auth.user?.name" />
					<AvatarFallback class="text-xs bg-blue-100 text-blue-600 font-medium">
						{{ ( auth.user?.name ?? 'U' ).slice( 0, 2 ).toUpperCase() }}
					</AvatarFallback>
				</Avatar>
				<span class="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-white" />
			</div>
		</div>
	</aside>
</template>