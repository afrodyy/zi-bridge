<script>
	import { onMount } from 'svelte';

	let sqlFileContent = '';

	async function fetchSqlFileContent() {
		try {
			const response = await fetch('http://localhost:3000/read-sql-file');
			if (!response.ok) {
				throw new Error('Failed to fetch file content');
			}

			const reader = response.body.getReader();
			const decoder = new TextDecoder();
			let result;

			while (!(result = await reader.read()).done) {
				sqlFileContent += decoder.decode(result.value, { stream: true });
			}
		} catch (error) {
			console.error('Error fetching file content:', error);
		}
	}

	onMount(() => {
		fetchSqlFileContent();
	});
</script>

<div>
	<h1>Content of SQL File</h1>
	<pre>{sqlFileContent}</pre>
</div>
