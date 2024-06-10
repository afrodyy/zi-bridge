<script>
	import { goto } from '$app/navigation';
	import { sidebarOpen } from '$lib/store';
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import { fly } from 'svelte/transition';

	let isOpen = true;
	let showUserMenu = false;
	let name = '';

	const handleLogout = () => {
		localStorage.removeItem('name');
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

	function handleUserMenu() {
		if (showUserMenu === false) {
			showUserMenu = true;
		} else {
			showUserMenu = false;
		}
	}

	onMount(() => {
		sidebarOpen.set(isOpen);
		name = localStorage.getItem('name');
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

	<div
		class="flex items-center bg-blue-200 hover:bg-blue-300 transition ease-in-out duration-100 rounded-full"
	>
		<p class="pl-3 pr-2 font-medium text-gray-700">{name}</p>
		<button
			type="button"
			on:click={handleUserMenu}
			class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm"
			id="user-menu-button"
			aria-expanded="false"
			aria-haspopup="true"
		>
			<img
				class="h-10 w-10 rounded-full"
				src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				alt=""
			/>
		</button>
	</div>
	{#if showUserMenu}
		<ul
			class="absolute right-0 origin-top-right mr-4 mt-10 bg-white ring-1 ring-gray-200 rounded p-1 transition duration-100 ease-in-out"
			in:fly={{ y: -20, duration: 100 }}
			out:fly={{ y: -20, duration: 100 }}
		>
			<li class="rounded-md group">
				<button
					type="button"
					on:click={handleLogout}
					class="font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-100 rounded px-2 py-1"
					>Logout</button
				>
			</li>
		</ul>
	{/if}
</header>
