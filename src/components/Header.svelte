<script>
	import { goto } from '$app/navigation';

	const handleLogout = () => {
		localStorage.removeItem('username');
		localStorage.removeItem('role');
		goto('/auth/login');
	};
</script>

<header class="bg-white shadow p-4 mb-4 flex justify-between">
	<h1 class="text-xl font-semibold">Nanti disini ada toggle sidebar</h1>
	<!-- <h1 class="text-xl font-semibold">Nanti disini ada foto profile user</h1> -->
	<button
		type="button"
		on:click={handleLogout}
		class="px-4 py-2 rounded text-white bg-blue-400 hover:bg-blue-500">Logout</button
	>
</header>
