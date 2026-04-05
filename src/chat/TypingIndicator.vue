<script setup>
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'

const chat = useChatStore()

const label = computed( () => {
	const u = chat.typingUsers
	if ( u.length === 0 ) return ''
	if ( u.length === 1 ) return `${ u[ 0 ].userName } is typing...`
	if ( u.length === 2 ) return `${ u[ 0 ].userName } and ${ u[ 1 ].userName } are typing...`
	return 'Several people are typing...'
} )
</script>

<template>
	<transition name="fade">
		<div v-if=" chat.typingUsers.length > 0 " class="flex items-center gap-2 px-4 py-1.5">
			<div class="flex gap-1">
				<span class="typing-dot" />
				<span class="typing-dot" />
				<span class="typing-dot" />
			</div>
			<span class="text-[11px] text-gray-400">{{ label }}</span>
		</div>
	</transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity .2s, transform .2s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(4px);
}
</style>