<script>
	import { onMount } from 'svelte';

	let editor;
	let monaco;

	onMount(async () => {
		if (typeof window !== 'undefined') {
			monaco = await import('monaco-editor');

			editor = monaco.editor.create(document.getElementById('editor'), {
				value: '{ "name": "John", "age": 30 }', // Example JSON content
				language: 'json',
				theme: 'vs-dark',
				wordWrap: 'on',
				rulers: [] // Remove vertical rulers
			});

			editor.onDidChangeModelContent(() => {
				displayErrors();
			});

			// Initial error display
			displayErrors();
		}
	});

	function displayErrors() {
		const model = editor.getModel();
		const markers = monaco.editor.getModelMarkers({ resource: model.uri });

		const errorMessages = markers.map((marker) => marker.message);

		document.getElementById('error-messages').innerHTML = errorMessages
			.map((msg) => `<div>${msg}</div>`)
			.join('');
	}
</script>

<div>
	<div id="editor" style="width: 100%; height: 500px;"></div>
</div>

<div id="error-messages" style="margin-top: 10px; color: red;"></div>

<style>
	#editor {
		border: 1px solid #ccc;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
</style>
