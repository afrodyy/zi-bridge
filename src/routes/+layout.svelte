<script>
	// import { meta } from '$app/stores';
	import '../app.css';
	import { page } from '$app/stores';
	import Sidebar from '../components/Sidebar.svelte';
	import Header from '../components/Header.svelte';

	$: currentRoute = $page.url.pathname;

	// Set meta tags for the page
	// meta.set({
	// 	title: 'Admin Dashboard',
	// 	description: 'A simple admin dashboard template using Tailwind CSS and SvelteKit.'
	// });
</script>

{#if !currentRoute.startsWith('/auth')}
	<main class="bg-gray-100 min-h-screen">
		<div class="flex flex-col md:flex-row gap-4">
			<!-- Sidebar -->
			<Sidebar />

			<div class="flex-1">
				<!-- Header -->
				<Header />

				<!-- Main Content -->
				<div class="bg-white shadow rounded-lg md:flex-1">
					<slot></slot>
				</div>
			</div>
		</div>
	</main>

	<style>
		/* Add custom styles here if needed */
	</style>
{:else}
	<slot></slot>
{/if}
