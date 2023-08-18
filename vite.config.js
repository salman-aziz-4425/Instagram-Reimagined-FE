import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss]

	// server:{
	// 	host:true,
	// 	strictPort:true,
	// 	port:3001
	// }

})
