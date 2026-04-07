import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
	{ path: '/', redirect: '/chat' },
	{ path: '/login', name: 'Login', component: () => import( "@/views/LoginView.vue" ), meta: { guest: true } },
	{ path: '/register', name: 'Register', component: () => import( '@/views/RegisterView.vue' ), meta: { guest: true } },
	{ path: '/chat', name: 'Chat', component: () => import( '@/views/ChatView.vue' ), meta: { requiresAuth: true } },
	{ path: '/profile', name: 'Profile', component: () => import( '@/views/ProfileView.vue' ), meta: { requiresAuth: true } },
	{ path: '/tracker', name: 'Tracker', component: () => import( '@/views/TrackerView.vue' ), meta: { requiresAuth: true } },
	{ path: '/:pathMatch(.*)*', redirect: '/chat' }
]

const router = createRouter( {
	history: createWebHistory(),
	routes
} )

router.beforeEach( async ( to ) => {
	const authStore = useAuthStore()

	if ( to.meta.requiresAuth ) {
		if ( !authStore.token ) return '/login'

		if ( !authStore.user ) {
			await authStore.fetchMe()
			if ( !authStore.user ) return '/login'
		}
		return
	}

	if ( to.meta.guest && authStore.token ) {
		return '/chat'
	}
} )

export default router