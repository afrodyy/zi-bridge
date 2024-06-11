<script>
	import { hospitals } from '$lib/hospitalStore';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let role;
	let grantAccess;
	let hospitalData = [];

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

	const fetchData = async () => {
		hospitalData = $hospitals;
	};

	onMount(() => {
		checkRole();
		checkAccess();
		fetchData();
	});
</script>

<div class="flex flex-col flex-wrap p-4">
	<div class="flex flex-wrap items-center justify-between mb-4">
		<h1 class="text-2xl font-semibold my-3">Master Data Hospitals</h1>
		<button
			class="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition ease-in-out duration-100"
		>
			Tambah Data
		</button>
	</div>

	<!-- Table Section -->
	<table class="w-full">
		<thead>
			<tr>
				<th class="px-4 py-2 border text-left">#</th>
				<th class="px-4 py-2 border text-left">Nama</th>
				<th class="px-4 py-2 border text-left">Lokasi</th>
				<th class="px-4 py-2 border text-left">IP Address</th>
				<th class="px-4 py-2 border text-left">Branch Aktif</th>
				<th class="px-4 py-2 border text-left">DB Aktif</th>
				<th class="px-4 py-2 border text-left">Aksi</th>
			</tr>
		</thead>
		<tbody>
			{#each hospitalData as hospital, index}
				<tr class="hover:bg-gray-100">
					<th class="px-4 py-2 border text-left">{index + 1}.</th>
					<td class="px-4 py-2 border">{hospital.name}</td>
					<td class="px-4 py-2 border">{hospital.location}</td>
					<td class="px-4 py-2 border">{hospital.ip}</td>
					<td class="px-4 py-2 border">{hospital.branch}</td>
					<td class="px-4 py-2 border">{hospital.db}</td>
					<td class="px-4 py-2 border">
						<button
							type="button"
							class="px-2 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-100"
							>Ubah</button
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
