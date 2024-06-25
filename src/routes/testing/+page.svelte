<script>
	import { onMount } from 'svelte';

	let editor;
	let monaco;
	let sqlLint;
	let errorMessages = [];

	onMount(async () => {
		// Check if running in the browser
		if (typeof window !== 'undefined') {
			// Dynamic import for Monaco Editor
			monaco = await import('monaco-editor');

			// Create the Monaco Editor instance
			editor = monaco.editor.create(document.getElementById('editor'), {
				value: '',
				language: 'sql',
				theme: 'vs-dark',
				wordWrap: 'on',
				rulers: [] // Remove vertical rulers
			});

			// Dynamic import for sql-lint
			sqlLint = (await import('sql-lint')).default;

			// Set up listener for changes in the editor content
			editor.onDidChangeModelContent(() => {
				checkSQLSyntax(editor.getValue());
			});
		}
	});

	async function handleFileChange(event) {
		const file = event.target.files[0];
		console.log(file);

		if (file.name.slice(-3) === 'sql') {
			const fileContent = await readFileContent(file);
			editor.setValue(fileContent);
		} else {
			alert('Hanya file dengan ekstensi .sql yang diperbolehkan');
		}
	}

	async function readFileContent(file) {
		const reader = file.stream().getReader();
		const decoder = new TextDecoder('utf-8');
		let content = '';

		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				content += decoder.decode(value);
			}
		} catch (error) {
			console.error('Error reading file:', error);
		}

		return content;
	}

	function checkSQLSyntax(sql) {
		if (typeof monaco !== 'undefined' && typeof sqlLint !== 'undefined') {
			// Clear all previous markers
			monaco.editor.setModelMarkers(editor.getModel(), 'sql', []);

			// Run sql-lint on the SQL content
			const results = sqlLint({ sql });

			// Clear previous error messages
			errorMessages = [];

			// Create markers for each error
			const markers = results.map((result) => {
				// Add error message to errorMessages array
				errorMessages.push(result.message);

				return {
					startLineNumber: result.location.start.line,
					startColumn: result.location.start.column,
					endLineNumber: result.location.end.line,
					endColumn: result.location.end.column,
					message: result.message,
					severity: monaco.MarkerSeverity.Error
				};
			});

			// Set the markers on the model
			monaco.editor.setModelMarkers(editor.getModel(), 'sql', markers);
		}
	}
</script>

<div>
	<input type="file" id="file-input" accept=".sql" on:change={handleFileChange} />
	<div id="editor" style="width: 100%; height: 500px;"></div>
</div>

<div id="error-messages" style="margin-top: 10px; color: red;">
	{#each errorMessages as message}
		<div>{message}</div>
	{/each}
</div>

<style>
	#editor {
		border: 1px solid #ccc;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
</style>
