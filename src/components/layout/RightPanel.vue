<script setup>
import { useChatStore } from '@/stores/chat'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import { Phone, Video, MoreHorizontal, FileText, Image } from 'lucide-vue-next'

const chat = useChatStore()

const fileIcon = ( name ) => name?.match( /\.(png|jpg|jpeg|gif|webp)$/i ) ? Image : FileText
</script>

<template>
	<div class="flex flex-col w-60 h-full bg-white border-l border-gray-100 shrink-0 overflow-y-auto">

		<template v-if=" chat.activeRoom ">
			<div class="flex flex-col items-center px-4 py-5 border-b border-gray-100 text-center">
				<Avatar :name="chat.activeRoom.name" size="xl" :online="true" class="mb-3" />
				<p class="text-[15px] font-semibold text-gray-900"># {{ chat.activeRoom.name }}</p>
				<p class="text-[12px] text-gray-400 mt-0.5">{{ chat.activeRoom.description || 'No description' }}</p>

				<div class="flex gap-2 mt-3">
					<button
						class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition">
						<Phone class="w-3.5 h-3.5 text-gray-500" :stroke-width="1.8" />
					</button>
					<button
						class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition">
						<Video class="w-3.5 h-3.5 text-gray-500" :stroke-width="1.8" />
					</button>
					<button
						class="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition">
						<MoreHorizontal class="w-3.5 h-3.5 text-gray-500" :stroke-width="1.8" />
					</button>
				</div>
			</div>

			<div class="px-4 py-4 border-b border-gray-100">
				<p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">
					Members ({{ chat.members.length }})
				</p>
				<div class="flex flex-col gap-2.5">
					<div v-for=" member in chat.members " :key="member.id" class="flex items-center gap-2.5">
						<Avatar :name="member.name" size="xs" :online="member.is_online" />
						<div class="min-w-0">
							<p class="text-[12px] font-medium text-gray-800 truncate">{{ member.name }}</p>
							<p class="text-[10px] text-gray-400">
								{{ member.is_online ? 'Active now' : 'Offline' }}
							</p>
						</div>
						<Badge v-if=" member.role === 'admin' " variant="default" class="ml-auto shrink-0">
							Admin
						</Badge>
					</div>

					<div v-if=" chat.members.length === 0 " class="text-[12px] text-gray-400 text-center py-2">
						No members
					</div>
				</div>
			</div>

			<div class="px-4 py-4">
				<p class="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Shared Files</p>
				<div class="flex flex-col gap-2">
					<div v-for=" i in 2 " :key="i"
						class="flex items-center gap-2.5 p-2 rounded-lg bg-gray-50 border border-gray-100">
						<div class="w-7 h-7 rounded-md bg-primary-50 flex items-center justify-center shrink-0">
							<FileText class="w-3.5 h-3.5 text-primary" :stroke-width="1.8" />
						</div>
						<div class="min-w-0">
							<p class="text-[11px] font-medium text-gray-700 truncate">document_{{ i }}.pdf</p>
							<p class="text-[10px] text-gray-400">2.{{ i }} MB</p>
						</div>
					</div>
				</div>
			</div>
		</template>

		<div v-else class="flex-1 flex items-center justify-center">
			<p class="text-sm text-gray-300 text-center px-4">Select a room to see details</p>
		</div>
	</div>
</template>