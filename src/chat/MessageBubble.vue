<script setup>
import Avatar from '@/components/ui/Avatar.vue'

const props = defineProps({
  message:     { type: Object, required: true },
  isSent:      { type: Boolean, default: false },
  showAvatar:  { type: Boolean, default: true },
})

const formatTime = (iso) => {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div :class="['flex gap-2.5 animate-fade-in', isSent ? 'flex-row-reverse' : 'flex-row']">
    <Avatar
      v-if="showAvatar"
      :name="message.user_name ?? 'User'"
      size="sm"
      class="shrink-0 self-end mb-1"
    />
    <div v-else class="w-8 shrink-0" />

    <!-- Bubbles -->
    <div :class="['flex flex-col gap-1 max-w-[65%]', isSent ? 'items-end' : 'items-start']">
      <!-- Name (only recv) -->
      <span v-if="!isSent && showAvatar" class="text-[11px] text-gray-400 px-1">
        {{ message.user_name }}
      </span>

      <div :class="isSent ? 'bubble-sent' : 'bubble-recv'">
        {{ message.content }}
      </div>

      <!-- Time + read receipt -->
      <div :class="['flex items-center gap-1 px-1', isSent ? 'flex-row-reverse' : '']">
        <span class="text-[10px] text-gray-400">{{ formatTime(message.created_at) }}</span>
        <span v-if="isSent" class="text-[10px] text-primary font-medium">✓✓</span>
      </div>
    </div>
  </div>
</template>