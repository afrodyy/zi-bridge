<script>
	import '../app.css';
	import { page } from '$app/stores';

	$: currentRoute = $page.url.pathname;

	export let isOpen = true;
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

<!-- Sidebar -->
<div class="grid grid-cols-2">
	<div>
		<div class="fixed inset-0 flex z-40" style="display: {isOpen ? 'block' : 'none'};">
			<!-- Script untuk hide sidebar dengan klik dimana saja -->
			<!-- <div class="fixed inset-0 bg-opacity-75" on:click={closeSidebar}></div> -->

			<div class="relative flex-1 flex flex-col max-w-xs w-full bg-blue-500 h-screen">
				<!-- Toggle Sidebar -->
				<div class="absolute top-0 right-0 -mr-12 pt-2">
					<button
						type="button"
						class="ml-1 flex items-center justify-center h-10 w-10 rounded-2xl bg-gray-400 focus:outline-none focus:bg-gray-600"
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
				<!-- End of Toggle Sidebar -->

				<div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
					<div class="flex-shrink-0 flex items-center px-4">
						<h2 class="text-lg font-bold text-white">CareConnect.</h2>
					</div>
					<nav class="mt-5 px-2 space-y-1">
						{#each menuItems as item}
							<a
								href={item.href}
								class="group flex items-center px-2 py-2 text-base leading-6 font-medium text-white rounded-md hover:bg-gray-100 hover:text-gray-900"
							>
								{item.name}
							</a>
						{/each}
					</nav>
				</div>
			</div>
		</div>
	</div>
	<div>
		<!-- Header -->
		<div class="flex">
			<div class="w-full bg-red-500">X</div>
		</div>
		<!-- End of Header -->

		<!-- Content -->
		<div class="flex">
			<div class="w-full bg-green-500 h-screen">
				<slot></slot>
			</div>
		</div>
		<!-- End of Content -->
	</div>
</div>

<!-- End of Sidebar -->
