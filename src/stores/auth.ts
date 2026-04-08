import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore( 'auth', () => {
	const router = useRouter()

	const user = ref<{ email: string; name: string } | null>( null )
	const token = ref<string | null>( localStorage.getItem( 'token' ) )
	const error = ref<string | null>( null )
	const loading = ref( false )

	async function login( email: string, password: string ) {
		loading.value = true
		error.value = null
		try {
			if ( email === 'test@example.com' && password === 'password' ) {
				token.value = 'dummy-token'
				localStorage.setItem( 'token', 'dummy-token' )
				user.value = { email, name: 'Test User' }
				router.push( '/chat' )
			} else {
				error.value = 'Email atau password salah.'
			}
		} catch ( e ) {
			error.value = 'Terjadi kesalahan. Coba lagi.'
		} finally {
			loading.value = false
		}
	}

	async function fetchMe() {
		if ( token.value ) {
			user.value = { email: 'test@example.com', name: 'Test User' }
		}
	}

	function logout() {
		user.value = null
		token.value = null
		localStorage.removeItem( 'token' )
		router.push( '/login' )
	}

	return { user, token, error, loading, login, fetchMe, logout }
} )