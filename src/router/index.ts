import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
	{ path: '/', redirect: '/chat' },
	{
		path: '/login',
		name: 'Login',
		component: () => import( '@/views/LoginView.vue' ),
		meta: { guest: true }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import( '@/views/RegisterView.vue' ),
		meta: { guest: true }
	},
	{
		path: '/chat',
		name: 'Chat',
		component: () => import( '@/views/ChatView.vue' ),
		meta: { requiresAuth: true }
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import( '@/views/ProfileView.vue' ),
		meta: { requiresAuth: true }
	},
	{
		path: '/tracker',
		name: 'Tracker',
		component: () => import( '@/views/TrackerView.vue' ),
		meta: { requiresAuth: true }
	},
	{ path: '/:pathMatch(.*)*', redirect: '/chat' }
]

const router = createRouter( {
	history: createWebHistory(),
	routes
} )

router.beforeEach( async ( to, from, next ) => {
	const authStore = useAuthStore()

	if ( to.meta.requiresAuth ) {
		if ( !authStore.token ) return next( '/login' )
		if ( !authStore.user ) {
			await authStore.fetchMe()
			if ( !authStore.user ) return next( '/login' )
		}
		return next()
	}

	if ( to.meta.guest && authStore.token ) return next( '/chat' )

	next()
} )

export default router