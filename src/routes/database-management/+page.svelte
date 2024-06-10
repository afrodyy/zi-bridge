<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Terminal from '../../components/Terminal.svelte';

	let role;
	let grantAccess;

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
</script>

<div class="flex flex-wrap">
	<div class="w-full p-4">
		<h1 class="text-xl font-medium">Database Management</h1>

		<Terminal />
	</div>
</div>
