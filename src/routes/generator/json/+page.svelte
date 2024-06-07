<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let role;
	let grantAccess;

	const checkRole = () => {
		role = localStorage.getItem('role');

		if (role === 'admin' || role === 'dev' || role === 'master-data') {
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

<div class="flex flex-col flex-wrap px-4">
	<h1 class="w-full text-2xl font-semibold my-3">JSON Beautify</h1>
	<div class="grid grid-cols-2 gap-x-12 mb-4">
		<textarea class="w-full bg-gray-900 rounded p-2 text-blue-300" rows="18"
			>Place your JSON Here</textarea
		>
		<textarea class="w-full bg-gray-900 rounded p-2 text-blue-300">Place your JSON Here</textarea>
	</div>
</div>
