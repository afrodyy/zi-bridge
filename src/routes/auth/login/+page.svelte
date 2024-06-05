<script>
	import '../../../app.css';

	let formData = {
		username: '',
		password: ''
	};

	const handleLogin = async () => {
		console.log(formData);
	};
</script>

<div class="container min-w-full min-h-full mx-auto">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-2 h-screen bg-gradient-to-b from-blue-600 to-cyan-500">
			<div class="flex justify-center">
				<h1 class="mt-64 text-white text-5xl font-bold">CareConnect.</h1>
			</div>
		</div>
		<div class="my-auto px-20 rounded-2xl border-red-500">
			<h1 class="text-gray-800 text-4xl font-bold">Hello Again!</h1>
			<h4 class="text-gray-800 text-xl">Welcome Back</h4>

			<form on:submit|preventDefault={handleLogin} class="mt-12" method="post">
				<div class="mb-3">
					<input
						type="text"
						name="username"
						id="username"
						bind:value={formData.username}
						class="w-full border border-blue-300 rounded-full px-4 py-3 focus:outline-blue-600"
						placeholder="Nama pengguna"
						autocomplete="off"
					/>
				</div>
				<div class="mb-3">
					<input
						type="password"
						name="password"
						id="password"
						bind:value={formData.password}
						class="w-full border border-blue-300 rounded-full px-4 py-3 focus:outline-blue-600"
						placeholder="Kata sandi"
						autocomplete="off"
					/>
				</div>
				<div class="mb-3">
					<button
						type="submit"
						class="w-full px-4 py-3 text-white border rounded-full bg-blue-600 hover:bg-blue-700"
						>Login</button
					>
				</div>
			</form>
		</div>
	</div>
</div>
