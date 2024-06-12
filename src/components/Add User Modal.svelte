<script>
	import { fly } from 'svelte/transition';

	export let showAddUserModal;

	const handleSubmit = () => {
		console.log('Handle submit');
	};
</script>

{#if showAddUserModal}
	<div
		class="fixed z-10 inset-0 overflow-y-auto transition"
		in:fly={{ y: -20, duration: 100 }}
		out:fly={{ y: -20, duration: 100 }}
	>
		<div
			class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
		>
			<div class="fixed inset-0 transition-opacity" aria-hidden="true">
				<div class="absolute inset-0 bg-gray-500 opacity-75"></div>
			</div>
			<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
				>&#8203;</span
			>
			<div
				class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
			>
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mt-3 w-full text-center sm:mt-0 sm:ml-1 sm:text-left">
							<h3 class="text-2xl leading-6 font-medium text-gray-900" id="modal-title">
								Tambah User
							</h3>
							<div class="mt-5">
								<form>
									<div class="mb-4">
										<label for="name" class="block text-gray-700"
											>Nama<span class="text-red-500">*</span></label
										>
										<input
											type="text"
											id="name"
											class="w-full border rounded px-2 py-1 focus:outline-blue-200"
											placeholder="Nama lengkap pengguna"
											autocomplete="off"
										/>
									</div>
									<div class="mb-4">
										<label for="username" class="block text-gray-700"
											>Username<span class="text-red-500">*</span></label
										>
										<input
											type="text"
											id="username"
											class="w-full border rounded px-2 py-1 focus:outline-blue-200"
											placeholder="Nama pengguna aplikasi"
											autocomplete="off"
										/>
									</div>
									<div class="mb-4">
										<label for="password" class="block text-gray-700"
											>Password<span class="text-red-500">*</span></label
										>
										<input
											type="password"
											id="password"
											class="w-full border rounded px-2 py-1 focus:outline-blue-200"
											placeholder="Kata sandi"
											autocomplete="off"
										/>
									</div>
									<div class="mb-4">
										<label for="role" class="block text-gray-700 focus:outline-blue-200"
											>Role Pengguna<span class="text-red-500">*</span></label
										>
										<select
											name="role"
											id="role"
											class="w-full border rounded px-2 py-1 focus:outline-blue-200"
										>
											<option value="">-- Pilih Role Pengguna --</option>
											<option value="admin">admin</option>
											<option value="dev">dev</option>
											<option value="qa">qa</option>
											<option value="master-data">master-data</option>
											<option value="guest">guest</option>
										</select>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-between bg-gray-50 pl-4 pr-6 py-3">
					<button
						type="button"
						class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 transition ease-in-out duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={handleSubmit}
					>
						Simpan
					</button>
					<button
						type="button"
						class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 transition ease-in-out duration-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:w-auto sm:text-sm"
						on:click={() => (showAddUserModal = false)}
					>
						Batal
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
