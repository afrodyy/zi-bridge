<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let role;
	let grantAccess;

	const checkRole = () => {
		role = localStorage.getItem('role');

		if (role === 'admin') {
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

<h1>Options</h1>
