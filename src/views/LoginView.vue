<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

const auth = useAuthStore()
const email = ref( '' )
const password = ref( '' )
const showPass = ref( false )

const submit = () => auth.login( email.value, password.value )
</script>

<template>
	<div
		class="min-h-screen bg-linear-to-br from-slate-900 via-[#1a1f35] to-slate-900 flex items-center justify-center px-4">
		<div class="w-full max-w-md">
			<div class="flex flex-col items-center mb-8">
				<div class="w-12 h-12 bg-[#4F6EF7] rounded-2xl flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" stroke-width="2"
						viewBox="0 0 24 24">
						<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
					</svg>
				</div>
				<h1 class="text-2xl font-semibold text-white tracking-tight">SyncRoom</h1>
				<p class="text-sm text-slate-400 mt-1">Real-time team collaboration</p>
			</div>

			<div class="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl">
				<h2 class="text-lg font-semibold text-white mb-1">Welcome back</h2>
				<p class="text-sm text-slate-400 mb-6">Sign in to your account</p>

				<div v-if=" auth.error " class="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg">
					<p class="text-sm text-red-400">{{ auth.error }}</p>
				</div>

				<div class="space-y-4">
					<div>
						<label class="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
						<div class="relative">
							<Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
								:stroke-width="1.8" />
							<input v-model="email" type="email" placeholder="you@example.com"
								class="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition"
								@keyup.enter="submit" />
						</div>
					</div>

					<div>
						<label class="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
						<div class="relative">
							<Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
								:stroke-width="1.8" />
							<input v-model="password" :type="showPass ? 'text' : 'password'" placeholder="••••••••"
								class="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-transparent transition"
								@keyup.enter="submit" />
							<button type="button"
								class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
								@click="showPass = !showPass">
								<component :is="showPass ? EyeOff : Eye" class="w-4 h-4" :stroke-width="1.8" />
							</button>
						</div>
					</div>

					<button type="button"
						class="w-full bg-[#4F6EF7] hover:bg-[#3353F5] active:scale-[0.98] text-white font-medium py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60"
						:disabled="auth.loading" @click="submit">
						<span v-if=" auth.loading " class="flex gap-1">
							<span class="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
								style="animation-delay:-0.3s" />
							<span class="w-1.5 h-1.5 rounded-full bg-white animate-bounce"
								style="animation-delay:-0.15s" />
							<span class="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
						</span>
						<span v-else>Sign in</span>
					</button>
				</div>

				<p class="text-center text-sm text-slate-500 mt-6">
					Don't have an account?
					<router-link to="/register" class="text-[#4F6EF7] hover:text-blue-400 font-medium transition">Create
						one</router-link>
				</p>
			</div>
		</div>
	</div>
</template>