class StorageService {
	set(key: string, value: string | object) {
		const payload = typeof value === 'string' ? value : JSON.stringify(value)

		localStorage.setItem(key, payload)
	}
	get(key: string) {
		const payload = localStorage.getItem(key)

		return payload ? JSON.parse(payload) : null
	}
	delete(key: string) {
		localStorage.removeItem(key)
	}
	clear() {
		localStorage.clear()
	}
}

export const storageService = new StorageService()
