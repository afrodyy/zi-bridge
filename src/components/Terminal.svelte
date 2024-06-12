<script>
	import { onMount } from 'svelte';
	import { Terminal } from '@xterm/xterm';
	// import 'xterm/css/xterm.css';

	let term;

	onMount(() => {
		term = new Terminal();
		term.open(document.getElementById('terminal-container'));
		term.write('zinfinite$ ');

		let command = '';
		let cursorPosition = 0;

		// Enable user input
		term.onKey(({ key, domEvent }) => {
			console.log(key);
			const char = key;
			const printable =
				domEvent.key !== 'Backspace' && domEvent.key !== 'Delete' && domEvent.key !== 'Enter';

			if (domEvent.key === 'Enter') {
				term.write('\r\nzinfinite$ ');
				command = ''; // Reset command
				cursorPosition = 0;
			} else if (domEvent.key === 'Backspace') {
				// Do not delete the prompt
				if (cursorPosition > 0) {
					term.write('\b \b');
					command = command.slice(0, cursorPosition - 1) + command.slice(cursorPosition);
					cursorPosition--;
				}
			} else if (domEvent.key === 'Delete') {
				if (cursorPosition < command.length) {
					term.write('\b \b'); // Move the cursor left, write a space to "delete" the character, then move the cursor back
					command = command.slice(0, cursorPosition) + command.slice(cursorPosition + 1);
				}
			} else if (printable) {
				term.write(char);
				command = command.slice(0, cursorPosition) + char + command.slice(cursorPosition);
				cursorPosition++;
			}
		});
	});
</script>

<div id="terminal-container" class="terminal-container"></div>

<style>
	.terminal-container {
		width: 100%;
		height: 100%;
	}
</style>
