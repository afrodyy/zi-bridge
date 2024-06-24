<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { hospitals } from '$lib/hospitalStore';

	let role;
	let grantAccess;
	let showDetailServerBar = false;
	let detailServer = {
		name: 'Server name',
		branch: 'Active branch',
		db: 'Active database',
		ip: 'IP Address'
	};
	let connectedServer = [];
	let filteredData = [...$hospitals, ...$hospitals];

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

	const showDetailServer = (index) => {
		for (let i = 0; i < $hospitals.length; i++) {
			if (i === index) {
				detailServer = $hospitals[i];
			}
		}

		detailServer.id = index;
		showDetailServerBar = true;
	};

	const connectToServer = (id) => {
		if (confirm('Anda ingin membuat koneksi dengan server ini?')) {
			for (let i = 0; i < $hospitals.length; i++) {
				if (i === id) {
					connectedServer = $hospitals[i];
				}
			}
		}
	};

	const disconnectFromServer = () => {
		if (confirm('Anda ingin memutus koneksi dengan server ini?')) {
			connectedServer = [];
		}
	};

	onMount(() => {
		checkRole();
		checkAccess();
	});
</script>

<div class="bg-white overflow-y-scroll flex flex-wrap h-[calc(641px-72px-72px-32px)]">
	<div class={showDetailServerBar ? 'w-9/12' : 'w-12/12'}>
		<div>
			<!-- Main Content -->
			<div class="grid grid-cols-3 p-6 gap-5">
				{#each filteredData as hospital, index}
					{#if hospital.name !== connectedServer.name}
						<button
							type="button"
							on:click={() => showDetailServer(index)}
							class="border rounded-md bg-gray-200 hover:bg-gray-300 px-2 py-2 text-left focus:outline-none focus:ring focus:ring-blue-200 shadow-md transition duration-50 ease-in-out"
						>
							<div class="flex items-center p-0">
								<div class="bg-blue-500 text-white p-1 rounded-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
										/>
									</svg>
								</div>

								<div class="ml-2">
									<p>{hospital.name}</p>
									<p class="text-sm">{hospital.branch} {hospital.db}</p>
								</div>
							</div>
						</button>
					{:else}
						<button
							type="button"
							on:click={() => showDetailServer(index)}
							class="border rounded-md bg-green-200 hover:bg-green-300 px-2 py-2 text-left focus:outline-none focus:ring focus:ring-gray-200 shadow-md transition duration-50 ease-in-out"
						>
							<div class="flex items-center p-0">
								<div class="bg-gray-500 text-white p-1 rounded-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z"
										/>
									</svg>
								</div>

								<div class="ml-2">
									<p>{hospital.name}</p>
									<p class="text-sm">{hospital.branch} {hospital.db}</p>
								</div>
							</div>
						</button>
					{/if}
				{/each}
			</div>
			<!-- End of Main Content -->

			<!-- Terminal -->
			<!-- {#if connectedServer.length !== 0}
				<div class="fixed bottom-0 w-7/12">
					<pre
						class="w-full h-20 bg-gray-800 p-1 text-gray-200 text-wrap rounded overflow-y-auto">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui aspernatur magnam laborum facere ut quae vel maxime eaque vero beatae, atque quibusdam a aliquid nesciunt saepe inventore dolorum delectus alias dolor dolores cum? Molestias explicabo facilis tenetur doloremque architecto optio dolore error ea, reiciendis repellendus accusamus recusandae expedita aspernatur dolor eius nobis asperiores quae minima totam repellat vel! Incidunt veniam repudiandae repellendus eaque nobis. Deleniti repudiandae dolor soluta distinctio quas voluptatem esse voluptatum corrupti eligendi, tempore quis at nihil repellendus neque accusantium reiciendis eos amet obcaecati harum sunt nisi voluptatibus libero ipsa. Doloribus porro blanditiis natus, nulla sapiente, aperiam ipsum ratione accusantium sit quisquam laboriosam assumenda culpa fuga reiciendis dolor eius dolorem ut quis dolore. Quaerat tempora ad quasi necessitatibus a iste quo at deserunt? Consequatur soluta nobis sint atque excepturi neque ipsa dolor corporis dolorum doloribus quas in, dolorem quod qui dolore, aspernatur necessitatibus nisi fuga totam accusantium dignissimos. Nulla delectus blanditiis pariatur, magni recusandae atque, modi, nisi laboriosam nihil inventore quibusdam reprehenderit. Mollitia nemo quia soluta sunt, odio aperiam saepe reprehenderit maiores quo quidem nihil blanditiis quos sapiente corporis molestiae veniam quas? Perferendis sed beatae amet commodi dolorum molestias reiciendis ipsa! Quaerat quo laboriosam molestiae nemo, explicabo commodi?</pre>
				</div>
			{/if} -->
			<!-- End of Terminal -->
		</div>
	</div>

	<!-- Detail Server Bar -->
	{#if showDetailServerBar}
		<div
			class="w-3/12 bg-gradient-to-l from-blue-600 to-cyan-600 min-h-screen"
			in:fade={{ y: -20, duration: 100 }}
			out:fade={{ y: -20, duration: 100 }}
		>
			<div class="flex items-center justify-between">
				<h1 class="text-xl text-gray-100 font-semibold p-4">Host Details</h1>
				{#if connectedServer.name === detailServer.name}
					<p class="text-sm text-gray-100 font-semibold mr-4 px-2 bg-green-500 rounded-full">
						Connected
					</p>
				{:else}
					<p class="text-sm text-gray-100 font-semibold mr-4 px-2 bg-red-500 rounded-full">
						Disconnected
					</p>
				{/if}
			</div>

			<div class="grid grid-cols-1 p-4">
				<div class="bg-white rounded p-2">
					<p class="text-sm font-medium">Address</p>
					<div class="flex mt-1">
						<p class="text-sm border rounded w-full px-2 py-1">127.0.0.1</p>
					</div>
				</div>

				<div class="bg-white rounded p-2 mt-4">
					<p class="text-sm font-medium">General</p>
					<div class="flex flex-wrap mt-1">
						<p class="text-sm border rounded w-full px-2 py-1">{detailServer.name}</p>
						<p class="text-sm border rounded w-full px-2 py-1 mt-2">{detailServer.branch}</p>
						<p class="text-sm border rounded w-full px-2 py-1 mt-2">{detailServer.db}</p>
						<p class="text-sm border rounded w-full px-2 py-1 mt-2">{detailServer.ip}</p>
					</div>
				</div>

				{#if detailServer.name === connectedServer.name}
					<div class="bg-white rounded p-2 mt-4">
						<p class="text-sm font-medium">Save Update On:</p>
						<div class="flex flex-wrap mt-1">
							<select
								name="branch"
								id="branch"
								class="px-2 py-1 border rounded w-full focus:outline-none focus:ring focus:ring-blue-400"
							>
								<option value="">-- Pilih branch --</option>
								<option value="main">main</option>
								<option value="feature">feature</option>
								<option value="bugfix">bugfix</option>
								<option value="hotfix">hotfix</option>
								<option value="refactor">refactor</option>
								<option value="release">release</option>
								<option value="experiment">experiment</option>
							</select>

							<select
								name="db"
								id="db"
								class="px-2 py-1 mt-2 border rounded w-full focus:outline-none focus:ring focus:ring-blue-400"
							>
								<option value="">-- Pilih database --</option>
								<option value="db_1">db_1</option>
								<option value="db_2">db_2</option>
								<option value="db_3">db_3</option>
								<option value="db_4">db_4</option>
							</select>
						</div>
					</div>
				{/if}

				{#if detailServer.name !== connectedServer.name}
					<button
						type="button"
						on:click={() => connectToServer(detailServer.id)}
						class="mt-4 rounded-md bg-green-400 hover:bg-green-500 transition ease-in-out duration-100 text-white font-semibold py-2"
						>Connect</button
					>
				{:else}
					<button
						type="button"
						on:click={() => disconnectFromServer()}
						class="mt-4 rounded-md bg-red-400 hover:bg-red-500 transition ease-in-out duration-100 text-white font-semibold py-2"
						>Disconnect</button
					>
					<button
						type="button"
						class="mt-4 rounded-md bg-blue-400 hover:bg-blue-500 transition ease-in-out duration-100 text-white font-semibold py-2"
						>Pull</button
					>
					<button
						type="button"
						class="mt-4 rounded-md bg-green-400 hover:bg-green-500 transition ease-in-out duration-100 text-white font-semibold py-2"
						>Update</button
					>
				{/if}
			</div>
		</div>
	{/if}
	<!-- End of Detail Server Bar -->
</div>
