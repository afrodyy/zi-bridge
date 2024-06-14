<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	// import Terminal from '../../components/Terminal.svelte';

	let role;
	let grantAccess;

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

	function handleFiles(selectedFiles) {
		for (let i = 0; i < selectedFiles.length; i++) {
			if (selectedFiles[i].name.slice(-3) === 'sql') {
				files = [...files, selectedFiles[i]];
				readFileContent(selectedFiles[i]);
			} else {
				alert('Hanya file dengan ekstensi.sql yang diperbolehkan');
			}
		}
	}

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
		currentPage = page;
	}
</script>

<div class="flex flex-wrap">
	<div class="w-full p-4">
		<h1 class="text-xl font-medium mb-4">Database Management</h1>

		{#if fileContents.length < 1}
			<div class="my-6">
				<button
					type="button"
					class="dropzone w-full {isDragging ? 'dragover' : ''}"
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
			{#each fileContents as file, index}
				{#if index + 1 === currentPage}
					<div class="mt-4">
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
						<pre
							class="bg-gray-100 p-4 rounded text-wrap max-h-64 overflow-y-auto border border-blue-300">
							{file.content}
						</pre>
					</div>
				{/if}
			{/each}
		{/if}

		<!-- Pagination -->
		{#if fileContents.length > 1}
			<div class="grid grid-cols-1 gap-2 items-center justify-center mt-4 bg-white">
				<div>
					<p class="text-sm text-gray-700">
						File ke
						<span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
						dari
						<span class="font-medium">{fileContents.length}</span>
						File
					</p>
				</div>
				<div>
					<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
						<button
							type="button"
							class="{currentPage === 1
								? 'cursor-not-allowed'
								: ''} relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							on:click={() => goToPage(currentPage - 1)}
							disabled={currentPage === 1}
						>
							<span class="sr-only">Previous</span>
							<!-- Previous button icon -->
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

						<button
							type="button"
							class="{currentPage === fileContents.length
								? 'cursor-not-allowed'
								: ''} relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
							on:click={() => goToPage(currentPage + 1)}
							disabled={currentPage === fileContents.length}
						>
							<span class="sr-only">Next</span>
							<!-- Next button icon -->
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
									d="m8.25 4.5 7.5 7.5-7.5 7.5"
								/>
							</svg>
						</button>
					</nav>
				</div>
			</div>
		{/if}
		<!-- End of Pagination -->

		{#if fileContents.length > 0}
			<!-- <textarea
				name=""
				id=""
				class="mt-5 fixed bottom-0 w-full bg-gray-800 text-gray-100 rounded p-1">Test</textarea
			> -->
			<pre
				class="mt-5 fixed bottom-0 max-w-full bg-gray-800 text-gray-100 rounded p-1 text-wrap overflow-y-auto max-h-20 pl-1 pr-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem at itaque officia fugiat repellendus? Maiores et aspernatur saepe maxime vero quasi magnam dolorum quis consequatur, adipisci doloremque ipsam asperiores sunt nihil modi porro alias corporis obcaecati quidem optio voluptatem. Odit facere dolorum molestias consequatur tenetur tempora voluptates blanditiis pariatur, aperiam culpa numquam quis repellendus veniam possimus iste expedita dolorem ea accusantium quaerat nulla. Rerum mollitia consectetur eaque eveniet ut nesciunt nobis delectus illum assumenda debitis error cumque cupiditate dicta aut at ipsum aliquid beatae veritatis, quaerat neque sit enim? Nihil, impedit iste repellat nemo accusantium adipisci vitae cupiditate pariatur, totam, dicta ullam molestiae aspernatur quo tenetur dolorem delectus distinctio inventore cum deleniti libero. Animi, eum voluptates in sapiente facilis nam aliquid mollitia obcaecati possimus, ab commodi eius necessitatibus fugit perspiciatis minus tempora quisquam ipsum quia laudantium quae. Alias laudantium earum reiciendis similique commodi quibusdam dolore dignissimos maxime. Autem rem ab itaque, sit ducimus quam nihil, cupiditate deleniti nemo quia odio ex dicta, eligendi consectetur praesentium accusamus maiores? Reprehenderit, unde? Est vel quos sit corrupti iste voluptates dignissimos aut dicta aliquam tenetur, sed libero voluptatibus debitis quisquam consequuntur dolore ex in earum ducimus id tempora sint assumenda! Accusamus alias natus assumenda!</pre>
		{/if}
	</div>
</div>

<style>
	.dropzone {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		border: 2px dashed #ccc;
		border-radius: 10px;
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
