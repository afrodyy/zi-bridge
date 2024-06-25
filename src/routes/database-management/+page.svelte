<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { sidebarHeight, headerHeight } from '$lib/store';
	import 'ace-builds/src-noconflict/ace';
	import 'ace-builds/src-noconflict/mode-sql';
	import 'ace-builds/src-noconflict/theme-dreamweaver';

	let role;
	let grantAccess;
	let sqlPreviews;

	$: files = [];
	$: fileContents = [];

	let isDragging = false;
	const itemsPerPage = 1;
	let currentPage = 1;

	const checkRole = () => {
		role = localStorage.getItem('role');

		if (role === 'admin' || role === 'dev') {
			grantAccess = true;
		} else {
			grantAccess = false;
		}
	};

	const checkAccess = () => {
		if (!grantAccess) {
			alert('Anda tidak memiliki akses ke modul ini');
			goto('/dashboard');
		}
	};

	onMount(() => {
		checkRole();
		checkAccess();
	});

	function handleDragOver(event) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = true;
	}

	function handleDragLeave(event) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;
	}

	function handleDrop(event) {
		event.preventDefault();
		event.stopPropagation();
		const selectedFiles = event.dataTransfer.files;
		handleFiles(selectedFiles);
		isDragging = false;
	}

	function handleFiles(selectedFiles) {
		for (let i = 0; i < selectedFiles.length; i++) {
			if (selectedFiles[i].name.slice(-3) === 'sql') {
				files = [...files, selectedFiles[i]];
				readFileContent(selectedFiles[i]);
			} else {
				return alert('Hanya file dengan ekstensi.sql yang diperbolehkan');
			}
		}
	}

	function handleFileChange(event) {
		if (event === 'refresh') {
			const selectedFiles = files;
			files = [];
			fileContents = [];
			currentPage = 1;
			handleFiles(selectedFiles);
		} else {
			const selectedFiles = event.target.files;
			handleFiles(selectedFiles);
		}
	}

	function readFileContent(file) {
		const reader = new FileReader();
		reader.onload = (e) => {
			fileContents = [...fileContents, { name: file.name, content: e.target.result }];

			sqlPreviews = ace.edit('sqlPreviews');
			sqlPreviews.setTheme('ace/theme/dreamweaver');
			sqlPreviews.session.setMode('ace/mode/sql');
			sqlPreviews.session.setOption('wrap', true);
			sqlPreviews.setOption('printMargin', false);
			sqlPreviews.setOption('fontSize', 13);
			sqlPreviews.setReadOnly(true);
			sqlPreviews.setValue(fileContents[0].content, -1);
		};
		reader.readAsText(file);
	}

	function removeFile(index) {
		if (confirm('Anda ingin menghapus file ini?')) {
			fileContents.splice(index, 1);
			files.splice(index, 1);
			handleFileChange('refresh');
		}
	}

	function removeFiles() {
		if (confirm('Anda ingin menghapus semua file yang sudah diupload?')) {
			fileContents = [];
			files = [];
			currentPage = 1;
		}
	}

	function goToPage(page) {
		const index = page - 1;
		sqlPreviews.setValue(fileContents[index].content, -1);
		currentPage = page;
	}
</script>

<!-- h-[calc(641px-64px-64px-32px)] -->
<div
	class="bg-white shadow-md rounded-tl-md rounded-bl-md overflow-y-auto flex flex-wrap"
	style="height: calc({$sidebarHeight}px - {$headerHeight}px - {$headerHeight}px - 32px);"
>
	<div class="w-full">
		{#if fileContents.length < 1}
			<div class="h-full p-5">
				<button
					type="button"
					class="dropzone w-full h-full rounded-l {isDragging ? 'dragover' : ''}"
					on:dragover={handleDragOver}
					on:dragleave={handleDragLeave}
					on:drop={handleDrop}
					on:click={() => document.getElementById('file-input').click()}
				>
					Drag and drop .sql files here or click to upload
				</button>
				<input type="file" id="file-input" multiple class="hidden" on:change={handleFileChange} />
			</div>
		{:else}
			<!-- Loop file content -->
			{#each fileContents as file, index}
				{#if index + 1 === currentPage}
					<div class="p-5">
						<div class="flex justify-between items-center mb-2">
							<h2 class="text-lg font-semibold">Preview: {file.name}</h2>
							<div class="flex flex-nowrap gap-1">
								<button
									type="button"
									on:click={() => removeFile(index)}
									class="px-2 py-1 rounded text-white bg-lime-500 hover:bg-lime-600 transition ease-in-out duration-100"
									>Remove</button
								>
								<button
									type="button"
									class="px-2 py-1 rounded text-white bg-lime-500 hover:bg-lime-600 transition ease-in-out duration-100"
									>Execute</button
								>
								<button
									type="button"
									on:click={() => removeFiles()}
									class="px-2 py-1 rounded text-white bg-red-500 hover:bg-red-600 transition ease-in-out duration-100"
									>Remove All</button
								>
								<button
									type="button"
									class="px-2 py-1 rounded text-white bg-red-500 hover:bg-red-600 transition ease-in-out duration-100"
									>Execute All</button
								>
							</div>
						</div>
					</div>
				{/if}
			{/each}
			<!-- End of Loop file content -->
		{/if}

		<!-- SQL Preview -->
		<div id="sqlPreviews" style="width: 100%; height: 300px;"></div>

		<!-- Pagination -->
		{#if fileContents.length > 1}
			<div class="grid grid-cols-1 gap-1 justify-center px-5 pt-4">
				<p class="text-sm text-gray-700">
					File ke
					<span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
					dari
					<span class="font-medium">{fileContents.length}</span>
					File
				</p>
				<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
					<!-- Previous button icon -->
					<button
						type="button"
						class="{currentPage === 1
							? 'cursor-not-allowed'
							: ''} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						on:click={() => goToPage(currentPage - 1)}
						disabled={currentPage === 1}
					>
						<span class="sr-only">Previous</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 19.5 8.25 12l7.5-7.5"
							/>
						</svg>
					</button>

					<!-- Pagination buttons -->
					{#each Array.from({ length: Math.ceil(fileContents.length / itemsPerPage) }, (_, i) => i + 1) as page}
						<button
							type="button"
							class="relative inline-flex items-center px-4 py-2 text-sm font-semibold {currentPage ===
							page
								? 'bg-blue-500 text-white hover:bg-blue-600'
								: 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200'} focus:z-20 focus:outline-offset-0 transition ease-in-out duration-50"
							on:click={() => goToPage(page)}
						>
							{page}
						</button>
					{/each}

					<!-- Next button icon -->
					<button
						type="button"
						class="{currentPage === fileContents.length
							? 'cursor-not-allowed'
							: ''} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						on:click={() => goToPage(currentPage + 1)}
						disabled={currentPage === fileContents.length}
					>
						<span class="sr-only">Next</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-4"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
						</svg>
					</button>
				</nav>
			</div>
		{/if}
		<!-- End of Pagination -->
	</div>
</div>

<style>
	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		border: 2px dashed #ccc;
		cursor: pointer;
		transition: border-color 0.3s;
	}

	.dropzone:hover {
		border-color: #aaa;
	}

	.dropzone.dragover {
		border-color: #333;
	}
</style>
