<script>
	import { onMount } from 'svelte';
	import 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/mode-sql';
	import 'ace-builds/src-noconflict/theme-dreamweaver';

	let editor;
	let fileContents = '';

	onMount(() => {
		editor = ace.edit('editor');
		editor.setTheme('ace/theme/dreamweaver');
		editor.session.setMode('ace/mode/sql');
		editor.setReadOnly(true); // Membuat editor menjadi readonly

		// Memuat konten file dari server saat komponen dimuat
		loadSQLFile();
	});

	async function loadSQLFile() {
		try {
			const response = await fetch(
				'http://localhost:3000/api/file/Sample-SQL-File-100000-Rows.sql'
			); // Ganti dengan URL endpoint Anda
			if (!response.ok) {
				throw new Error('Failed to load SQL file');
			}
			fileContents = await response.text();
			editor.setValue(fileContents);
		} catch (error) {
			console.error('Error loading SQL file:', error);
			alert('Gagal memuat file SQL');
		}
	}
</script>

<div>
	<div id="editor" style="width: 100%; height: 500px;"></div>
</div>

<style>
	#editor {
		border: 1px solid #ccc;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
</style>
