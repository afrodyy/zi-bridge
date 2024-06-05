<script>
	import { onMount } from 'svelte';

	$: role = '';

	onMount(() => {
		role = localStorage.getItem('role');
	});
</script>

<aside class="bg-blue-500 shadow md:w-1/5 h-screen">
	<div class="bg-black">
		<h1 class="text-white">Icon</h1>
	</div>

	<!-- Sidebar Content -->
	<nav class="bg-red-500 p-6">
		<!-- Sidebar Links -->
		<ul>
			<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
				<a href="/dashboard">Dashboard</a>
			</li>
			{#if role == 'admin' || role == 'dev' || role == 'qa'}
				<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
					<a href="/version-management">Version Management</a>
				</li>
			{/if}
			{#if role == 'admin' || role == 'dev'}
				<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
					<a href="/database-management">Database Management</a>
				</li>
			{/if}
			{#if role == 'admin'}
				<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
					<a href="/master-data">Master Data</a>
				</li>
			{/if}
			{#if role == 'admin'}
				<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
					<a href="/user-management">User Management</a>
				</li>
			{/if}
			{#if role == 'admin' || role == 'dev' || role == 'master-data'}
				<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
					<a href="/generator">Generator</a>
				</li>
			{/if}
			<li class="py-3 px-4 my-2 bg-green-500 hover:bg-green-800 rounded-full">
				<a href="/logs">Logs</a>
			</li>
		</ul>
	</nav>
</aside>
