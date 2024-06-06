<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
	let role;
	let grantAccess;

	const checkRole = () => {
		role = localStorage.getItem('role');

		if (role === 'admin' || role === 'dev' || role === 'qa') {
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
</script>

<h1 class="text-xl font-semibold p-4">Version Management</h1>

<div class="grid grid-cols-3 p-6 gap-5">
	{#each numbers as number}
		<button
			type="button"
			class="border rounded-md bg-gray-200 hover:bg-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 shadow-md transition duration-150 ease-in-out"
		>
			Lorem ipsum dolor sit.
		</button>
	{/each}
</div>
