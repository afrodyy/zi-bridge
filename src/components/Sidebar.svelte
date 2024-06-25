<script>
	import { onMount } from 'svelte';
	import { sidebarOpen, sidebarHeight, sidebarWidth } from '$lib/store';
	import { fade, fly } from 'svelte/transition';

	$: role = '';
	$: isLinkActive = '';

	let isOpen;
	let isMasterDataOpen = false;
	let isGeneratorOpen = false;
	let divElement;
	let height;
	let width;

	sidebarOpen.subscribe((value) => {
		isOpen = value;
	});

	onMount(() => {
		role = localStorage.getItem('role');
		height = divElement.getBoundingClientRect().height;
		width = divElement.getBoundingClientRect().width;
		sidebarHeight.set(height);
		sidebarWidth.set(width);
		console.log(`Sidebar Height: ${$sidebarHeight}px`);
		console.log(`Sidebar Width: ${$sidebarWidth}px`);
		checkUrl();
	});

	const checkUrl = (url) => {
		if (url === 'dashboard') {
			isLinkActive = 'dashboard';
		} else if (url === 'version-management') {
			isLinkActive = 'version-management';
		} else if (url === 'database-management') {
			isLinkActive = 'database-management';
		} else if (url === 'user-management') {
			isLinkActive = 'user-management';
		} else if (url === 'logs') {
			isLinkActive = 'logs';
		} else {
			isLinkActive = null;
		}
	};

	const handleKeyPressUrl = (event, url) => {
		if (event.key === 'Enter' || event.key === ' ') {
			checkUrl(url);
		}
	};

	function toggleMasterData() {
		isMasterDataOpen = !isMasterDataOpen;
	}

	function toggleGenerator() {
		isGeneratorOpen = !isGeneratorOpen;
	}
</script>

{#if isOpen}
	<aside
		bind:this={divElement}
		class="bg-gradient-to-r from-blue-600 to-cyan-600 shadow"
		in:fade={{ y: -20, duration: 50 }}
		out:fade={{ y: -20, duration: 50 }}
	>
		<div class="bg-white">
			<img
				src="https://res.cloudinary.com/dgpqcti71/image/upload/v1717649691/ptvmkacakv0rfn7apkgr.png"
				alt="Zi.Care"
				class="px-10 py-1"
			/>
		</div>

		<nav class="p-3">
			<ul>
				<li
					class="flex items-center py-2 px-4 my-2 hover:bg-gray-200 rounded-md group cursor-pointer {isLinkActive ===
					'dashboard'
						? 'bg-gray-200'
						: ''}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 {isLinkActive === 'dashboard'
							? 'text-blue-500'
							: 'text-gray-200'}  group-hover:text-blue-500 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
					<a
						on:click={() => checkUrl('dashboard')}
						on:keypress={() => handleKeyPressUrl('dashboard')}
						tabindex="0"
						role="button"
						href="/dashboard"
						class="font-medium {isLinkActive === 'dashboard'
							? 'text-blue-500'
							: 'text-gray-200'}  group-hover:text-blue-500"
					>
						Dashboard
					</a>
				</li>

				{#if role == 'admin' || role == 'dev' || role == 'qa'}
					<li
						class="flex items-center py-2 px-4 my-2 hover:bg-gray-200 rounded-md group cursor-pointer {isLinkActive ===
						'version-management'
							? 'bg-gray-200'
							: ''}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 {isLinkActive === 'version-management'
								? 'text-blue-500'
								: 'text-gray-200'}  group-hover:text-blue-500 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
							/>
						</svg>
						<a
							on:click={() => checkUrl('version-management')}
							on:keypress={() => handleKeyPressUrl('version-management')}
							tabindex="0"
							role="button"
							href="/version-management"
							class="font-medium {isLinkActive === 'version-management'
								? 'text-blue-500'
								: 'text-gray-200'}  group-hover:text-blue-500"
						>
							Version Management
						</a>
					</li>
				{/if}

				{#if role == 'admin' || role == 'dev'}
					<li
						class="{isLinkActive === 'database-management'
							? 'bg-gray-200'
							: ''} flex items-center py-2 px-4 my-2 hover:bg-gray-200 rounded-md group cursor-pointer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 {isLinkActive === 'database-management'
								? 'text-blue-500'
								: 'text-gray-200'} group-hover:text-blue-500 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
							/>
						</svg>

						<a
							on:click={() => checkUrl('database-management')}
							on:keypress={() => handleKeyPressUrl('database-management')}
							tabindex="0"
							role="button"
							href="/database-management"
							class="font-medium {isLinkActive === 'database-management'
								? 'text-blue-500'
								: 'text-gray-200'}  group-hover:text-blue-500"
						>
							Database Management
						</a>
					</li>
				{/if}

				{#if role == 'admin'}
					<li
						class="py-2 px-4 my-2 hover:bg-gray-200 {isMasterDataOpen
							? 'bg-gray-200'
							: ''} rounded-md group cursor-pointer"
					>
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6 {isMasterDataOpen
									? 'text-blue-500'
									: 'text-gray-200 group-hover:text-blue-500'} mr-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
								/>
							</svg>

							<button
								class="flex items-center justify-between w-full cursor-pointer focus:outline-none"
								on:click={toggleMasterData}
								on:keydown={(event) => event.key === 'Enter' && toggleMasterData()}
								aria-expanded={isMasterDataOpen}
							>
								<span
									class="font-medium {isMasterDataOpen
										? 'text-blue-500'
										: 'text-gray-200 group-hover:text-blue-500'}">Master Data</span
								>
								<svg
									class="w-4 h-4 {isMasterDataOpen
										? 'text-blue-500'
										: 'text-gray-200 group-hover:text-blue-500'}  transition-transform duration-300 transform"
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
						</div>
						{#if isMasterDataOpen}
							<ul
								class="ml-4 mt-2 transition duration-100 ease-in-out"
								in:fly={{ y: -20, duration: 100 }}
								out:fly={{ y: -20, duration: 100 }}
							>
								<li class="py-1 hover:bg-gray-200 rounded-md group">
									<a
										href="/masterdata/hospitals"
										class="font-medium text-blue-500 hover:text-blue-600">Hospitals</a
									>
								</li>
								<li class="py-1 hover:bg-gray-200 rounded-md group">
									<a
										href="/masterdata/options"
										class="font-medium text-blue-500 hover:text-blue-600">Options</a
									>
								</li>
							</ul>
						{/if}
					</li>
				{/if}

				{#if role == 'admin'}
					<li
						class="{isLinkActive === 'user-management'
							? 'bg-gray-200'
							: ''} flex items-center py-2 px-4 my-2 hover:bg-gray-200 rounded-md group"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6 {isLinkActive === 'user-management'
								? 'text-blue-500'
								: 'text-gray-200'} group-hover:text-blue-500 mr-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
							/>
						</svg>

						<a
							on:click={() => checkUrl('user-management')}
							on:keypress={() => handleKeyPressUrl('user-management')}
							tabindex="0"
							role="button"
							href="/user-management"
							class="font-medium {isLinkActive === 'user-management'
								? 'text-blue-500'
								: 'text-gray-200'}  group-hover:text-blue-500">User Management</a
						>
					</li>
				{/if}

				{#if role == 'admin' || role == 'dev' || role == 'master-data'}
					<li
						class="py-2 px-4 my-2 {isGeneratorOpen
							? 'bg-gray-200'
							: ''} hover:bg-gray-200 rounded-md group"
					>
						<div class="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6 {isGeneratorOpen
									? 'text-blue-500'
									: 'text-gray-200 group-hover:text-blue-500'} mr-2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
								/>
							</svg>
							<button
								class="flex items-center justify-between w-full cursor-pointer focus:outline-none"
								on:click={toggleGenerator}
								on:keydown={(event) => event.key === 'Enter' && toggleGenerator()}
								aria-expanded={isGeneratorOpen}
							>
								<span
									class="font-medium {isGeneratorOpen
										? 'text-blue-500'
										: 'text-gray-200'}  group-hover:text-blue-500">Generator</span
								>
								<svg
									class="w-4 h-4 {isGeneratorOpen
										? 'text-blue-500'
										: 'text-gray-200'}  group-hover:text-blue-500 transition-transform duration-300 transform"
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
						</div>
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

				<li
					class="{isLinkActive === 'logs'
						? 'bg-gray-200'
						: ''} flex items-center py-2 px-4 my-2 hover:bg-gray-200 rounded-md group"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6 {isLinkActive === 'logs'
							? 'text-blue-500'
							: 'text-gray-200'} group-hover:text-blue-500 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>

					<a
						on:click={() => checkUrl('logs')}
						on:keypress={() => handleKeyPressUrl('logs')}
						tabindex="0"
						role="button"
						href="/logs"
						class="font-medium {isLinkActive === 'logs'
							? 'text-blue-500'
							: 'text-gray-200'}  group-hover:text-blue-500">Logs</a
					>
				</li>
			</ul>
		</nav>
	</aside>
{/if}
