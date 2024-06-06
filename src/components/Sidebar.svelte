<script>
	import { onMount } from 'svelte';
	import { sidebarOpen } from '$lib/store';
	import { fly } from 'svelte/transition';

	$: role = '';

	let isOpen;
	let isMasterDataOpen = false; // State untuk dropdown Master Data
	let isGeneratorOpen = false; // State untuk dropdown Master Data

	sidebarOpen.subscribe((value) => {
		isOpen = value;
	});

	onMount(() => {
		role = localStorage.getItem('role');
	});

	function toggleMasterData() {
		isMasterDataOpen = !isMasterDataOpen;
	}

	function toggleGenerator() {
		isGeneratorOpen = !isGeneratorOpen;
	}
</script>

{#if isOpen}
	<aside class="bg-blue-500 shadow w-1/5 h-screen transition-all duration-300 ease-in-out">
		<div class="bg-black">
			<h1 class="text-white">Icon</h1>
		</div>

		<nav class="p-6">
			<ul>
				<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
					<a href="/dashboard" class="font-medium text-gray-200 group-hover:text-blue-500"
						>Dashboard</a
					>
				</li>
				{#if role == 'admin' || role == 'dev' || role == 'qa'}
					<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
						<a
							href="/version-management"
							class="font-medium text-gray-200 group-hover:text-blue-500">Version Management</a
						>
					</li>
				{/if}
				{#if role == 'admin' || role == 'dev'}
					<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
						<a
							href="/database-management"
							class="font-medium text-gray-200 group-hover:text-blue-500">Database Management</a
						>
					</li>
				{/if}
				{#if role == 'admin'}
					<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
						<button
							class="flex items-center justify-between w-full cursor-pointer focus:outline-none"
							on:click={toggleMasterData}
							on:keydown={(event) => event.key === 'Enter' && toggleMasterData()}
							aria-expanded={isMasterDataOpen}
						>
							<span class="font-medium text-gray-200 group-hover:text-blue-500">Master Data</span>
							<svg
								class="w-4 h-4 text-gray-200 group-hover:text-blue-500 transition-transform duration-300 transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d={isMasterDataOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
								></path>
							</svg>
						</button>
						{#if isMasterDataOpen}
							<ul
								class="ml-4 mt-2 transition duration-100 ease-in-out"
								in:fly={{ y: -20, duration: 100 }}
								out:fly={{ y: -20, duration: 100 }}
							>
								<li class="py-1 hover:bg-gray-200 rounded-md group">
									<a
										href="/master-data/hospitals"
										class="font-medium text-blue-500 hover:text-blue-600">Hospitals</a
									>
								</li>
								<li class="py-1 hover:bg-gray-200 rounded-md group">
									<a
										href="/master-data/options"
										class="font-medium text-blue-500 hover:text-blue-600">Options</a
									>
								</li>
							</ul>
						{/if}
					</li>
				{/if}
				{#if role == 'admin'}
					<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
						<a href="/user-management" class="font-medium text-gray-200 group-hover:text-blue-500"
							>User Management</a
						>
					</li>
				{/if}
				{#if role == 'admin' || role == 'dev' || role == 'masterdata'}
					<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
						<button
							class="flex items-center justify-between w-full cursor-pointer focus:outline-none"
							on:click={toggleGenerator}
							on:keydown={(event) => event.key === 'Enter' && toggleGenerator()}
							aria-expanded={isGeneratorOpen}
						>
							<span class="font-medium text-gray-200 group-hover:text-blue-500">Generator</span>
							<svg
								class="w-4 h-4 text-gray-200 group-hover:text-blue-500 transition-transform duration-300 transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d={isGeneratorOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
								></path>
							</svg>
						</button>
						{#if isGeneratorOpen}
							<ul
								class="ml-4 mt-2 transition duration-100 ease-in-out"
								in:fly={{ y: -20, duration: 100 }}
								out:fly={{ y: -20, duration: 100 }}
							>
								<li class="py-1 hover:bg-gray-200 rounded-md group">
									<a href="/generator/json" class="font-medium text-blue-500 hover:text-blue-600"
										>JSON Beautify</a
									>
								</li>
							</ul>
						{/if}
					</li>
				{/if}
				<li class="py-2 px-4 my-2 hover:bg-gray-200 rounded-md group">
					<a href="/logs" class="font-medium text-gray-200 group-hover:text-blue-500">Logs</a>
				</li>
			</ul>
		</nav>
	</aside>
{/if}
