<script>
	import { goto } from '$app/navigation';
	import { sidebarOpen } from '$lib/store';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';

	let isOpen = true;

	const handleLogout = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('role');
		goto('/auth/login');
	};

	const handleToggleSidebar = () => {
		if (isOpen) {
			isOpen = false;
			sidebarOpen.set(isOpen);
		} else {
			isOpen = true;
			sidebarOpen.set(isOpen);
		}
	};

	onMount(() => {
		sidebarOpen.set(isOpen);
	});
</script>

<header class="bg-white shadow p-4 mb-4 flex justify-between">
	<button
		type="button"
		on:click={handleToggleSidebar}
		class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition duration-150 ease-in-out"
	>
		<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</button>
	<!-- <h1 class="text-xl font-semibold">Nanti disini ada foto profile user</h1> -->
	<button
		type="button"
		on:click={handleLogout}
		class="px-4 py-2 rounded text-white font-medium bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-200 transition duration-100 ease-in-out"
		>Logout</button
	>
</header>
