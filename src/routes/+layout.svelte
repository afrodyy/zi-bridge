<script>
	import '../app.css';
	import { page } from '$app/stores';
	import Sidebar from '../components/Sidebar.svelte';
	import Header from '../components/Header.svelte';
	import Terminal from '../components/Terminal.svelte';

	$: currentRoute = $page.url.pathname;
</script>

{#if !currentRoute.startsWith('/auth')}
	<main class="bg-gray-100 h-screen w-screen">
		<div class="grid gap-4 h-screen w-screen" style="grid-template-columns:1fr 4fr">
			<!-- <div class="grid gap-4" style="grid-template-columns:1fr 4fr"> -->
			<!-- Sidebar -->
			<Sidebar />

			<div class="grid grid-cols-1 gap-4">
				<!-- Header -->
				<Header />

				<!-- Main Content -->
				<div class="rounded-xl">
					<slot></slot>
				</div>

				{#if currentRoute.startsWith('/version-management') || currentRoute.startsWith('/database-management')}
					<Terminal />
				{/if}
			</div>
		</div>
	</main>
{:else}
	<slot></slot>
{/if}
