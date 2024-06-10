<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { users } from '$lib/userStore';

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
					<th class="px-4 py-2 text-left border">#</th>
					<th class="px-4 py-2 text-left border">Nama</th>
					<th class="px-4 py-2 text-left border">Username</th>
					<th class="px-4 py-2 text-left border">Role</th>
					<th class="px-4 py-2 text-left border">Aksi</th>
				</tr>
			</thead>
			<tbody>
				{#each $users as user, index}
					<tr class="hover:bg-gray-100">
						<th class="px-4 py-2 border text-left">{index + 1}.</th>
						<td class="px-4 py-2 border">{user.name}</td>
						<td class="px-4 py-2 border">{user.username}</td>
						<td class="px-4 py-2 border">{user.role}</td>
						<td class="px-4 py-2 border">
							<button
								type="button"
								class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="size-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
									/>
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
