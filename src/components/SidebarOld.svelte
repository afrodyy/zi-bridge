<script>
	export let isOpen = false;
	export let menuItems = [
		{ name: 'Dashboard', href: '#' },
		{ name: 'Profile', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'Logout', href: '#' }
	];

	const closeSidebar = () => {
		isOpen = false;
	};
</script>

<div class="fixed inset-0 flex z-40" style="display: {isOpen ? 'block' : 'none'};">
	<div class="fixed inset-0 bg-gray-600 bg-opacity-75" on:click={closeSidebar}></div>
	<div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
		<div class="absolute top-0 right-0 -mr-12 pt-2">
			<button
				type="button"
				class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
				on:click={closeSidebar}
			>
				<span class="sr-only">Close sidebar</span>
				<svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
		<div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
			<div class="flex-shrink-0 flex items-center px-4">
				<h2 class="text-lg font-bold">Sidebar Title</h2>
			</div>
			<nav class="mt-5 px-2 space-y-1">
				{#each menuItems as item}
					<a
						href={item.href}
						class="group flex items-center px-2 py-2 text-base leading-6 font-medium text-gray-900 rounded-md hover:bg-gray-100 hover:text-gray-900"
					>
						{item.name}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
