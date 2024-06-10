<script>
	import '../../../app.css';
	import { goto } from '$app/navigation';
	import { users } from '$lib/userStore';

	let formData = {
		username: '',
		password: ''
	};

	const handleLogin = async () => {
		for (let i = 0; i < $users.length; i++) {
			if ($users[i].username === formData.username && $users[i].password === formData.password) {
				localStorage.setItem('name', $users[i].name);
				localStorage.setItem('username', $users[i].username);
				localStorage.setItem('role', $users[i].role);
				goto('/dashboard');
			}
		}
	};
</script>

<div class="container min-w-full min-h-full mx-auto">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-2 h-screen bg-gradient-to-b from-blue-600 to-cyan-500">
			<div
				class="col-span-2 h-screen bg-gradient-to-b from-blue-600 to-cyan-500 flex flex-col justify-center items-center"
			>
				<h1 class="text-white text-5xl font-bold">Zi.Bridge</h1>
				<h1 class="text-white text-xl">Bridging you to your apps</h1>
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
						required
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
						required
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
