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

<div class="flex flex-wrap p-4">
	<div class="w-full">
		<h1 class="font-medium text-xl">User Management</h1>

		<table class="border rounded w-full my-4">
			<thead>
				<tr>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
					<td class="px-4 py-2 border">X</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
