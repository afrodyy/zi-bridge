<div class="flex flex-col flex-wrap p-4">
	<h1 class="text-2xl font-semibold">Form Input Data Rumah Sakit</h1>

	<form class="mt-5">
		<div class="mb-4">
			<label for="name" class="block text-gray-700">Nama<span class="text-red-500">*</span></label>
			<input
				type="text"
				id="name"
				class="w-full border rounded px-2 py-1 focus:outline-blue-200"
				placeholder="Nama server"
				autocomplete="off"
			/>
		</div>
		<div class="mb-4">
			<label for="location" class="block text-gray-700"
				>Lokasi<span class="text-red-500">*</span></label
			>
			<input
				type="text"
				id="location"
				class="w-full border rounded px-2 py-1 focus:outline-blue-200"
				placeholder="Lokasi server"
				autocomplete="off"
			/>
		</div>
		<div class="mb-4">
			<label for="ip" class="block text-gray-700"
				>IP Address<span class="text-red-500">*</span></label
			>
			<input
				type="text"
				id="ip"
				class="w-full border rounded px-2 py-1 focus:outline-blue-200"
				placeholder="Ip address"
				autocomplete="off"
			/>
		</div>
		<div class="mb-4">
			<label for="branch" class="block text-gray-700 focus:outline-blue-200"
				>Branch<span class="text-red-500">*</span></label
			>
			<select
				name="branch"
				id="branch"
				class="w-full border rounded px-2 py-1 focus:outline-blue-200"
			>
				<option value="">-- Pilih Branch --</option>
				<option value="admin">admin</option>
				<option value="dev">dev</option>
				<option value="qa">qa</option>
				<option value="master-data">master-data</option>
				<option value="guest">guest</option>
			</select>
		</div>
		<div class="mb-4">
			<label for="db" class="block text-gray-700 focus:outline-blue-200"
				>DB<span class="text-red-500">*</span></label
			>
			<select name="db" id="db" class="w-full border rounded px-2 py-1 focus:outline-blue-200">
				<option value="">-- Pilih Database --</option>
				<option value="admin">admin</option>
				<option value="dev">dev</option>
				<option value="qa">qa</option>
				<option value="master-data">master-data</option>
				<option value="guest">guest</option>
			</select>
		</div>
		<div class="flex items-center justify-between">
			<button
				type="button"
				class="px-4 py-2 rounded text-white bg-emerald-500 hover:bg-emerald-600 transition ease-in-out duration-100"
				>Simpan</button
			>
			<a
				href="/masterdata/hospitals"
				class="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition ease-in-out duration-100"
				>Kembali</a
			>
		</div>
	</form>
</div>
