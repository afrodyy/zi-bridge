import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@xterm/xterm': '@xterm/xterm/lib/xterm.js',
			'xterm/css/xterm.css': '@xterm/xterm/css/xterm.css',
			'monaco-editor': 'monaco-editor/esm/vs/editor/editor.main.js'
		}
	},
	optimizeDeps: {
		include: ['@xterm/xterm']
	}
});
