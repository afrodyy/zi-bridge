<script>
	import { onMount } from 'svelte';
	import { Terminal } from '@xterm/xterm';

	let term;

	onMount(() => {
		term = new Terminal();
		term.open(document.getElementById('terminal-container'));
		term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
	});
</script>

<div id="terminal-container" class="terminal-container"></div>

<style>
	.terminal-container {
		width: 100%;
		height: 100%;
	}
</style>
