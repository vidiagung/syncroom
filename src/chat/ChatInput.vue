<script setup>
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat'
import { Send, Paperclip, Smile } from 'lucide-vue-next'

const chat = useChatStore()
const message = ref( '' )

const send = () => {
	if ( !message.value.trim() || !chat.activeRoom ) return
	chat.sendMessage( message.value )
	message.value = ''
}

const onInput = () => {
	chat.startTyping()
}

const onKeydown = ( e ) => {
	if ( e.key === 'Enter' && !e.shiftKey ) {
		e.preventDefault()
		send()
	}
}
</script>

<template>
	<div class="px-5 py-3 bg-white border-t border-gray-100">
		<div class="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-100">
			<button class="text-gray-400 hover:text-gray-600 transition shrink-0">
				<Smile class="w-4.5 h-4.5" :stroke-width="1.8" />
			</button>

			<!-- Input -->
			<input v-model="message" placeholder="Type a message..."
				class="flex-1 bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
				@input="onInput" @keydown="onKeydown" />

			<!-- Attach btn -->
			<button class="text-gray-400 hover:text-gray-600 transition shrink-0">
				<Paperclip class="w-4.25 h-4.25" :stroke-width="1.8" />
			</button>

			<!-- Send btn -->
			<button :class="[
				'w-8 h-8 rounded-full flex items-center justify-center transition shrink-0',
				message.trim() ? 'bg-primary hover:bg-primary-600' : 'bg-gray-200 cursor-not-allowed'
			]" :disabled="!message.trim()" @click="send">
				<Send class="w-3.5 h-3.5 text-white" :stroke-width="2" />
			</button>
		</div>
	</div>
</template>