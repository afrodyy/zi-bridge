<script>
	import '../app.css';
	import { page } from '$app/stores';
	import { sidebarOpen } from '$lib/store';
	import Sidebar from '../components/Sidebar.svelte';
	import Header from '../components/Header.svelte';
	import Terminal from '../components/Terminal.svelte';

	$: currentRoute = $page.url.pathname;
	let sidebarOpened;

	sidebarOpen.subscribe((value) => {
		sidebarOpened = value;
	});
</script>

{#if !currentRoute.startsWith('/auth')}
	<main class="bg-gray-100">
		<div
			class="grid gap-4 h-screen w-screen"
			style={sidebarOpened ? 'grid-template-columns: 1fr 4fr' : ''}
		>
			<!-- Sidebar -->
			<Sidebar />

			<div class="grid grid-cols-1 gap-4">
				<!-- Header -->
				<Header />

				<!-- Main Content -->
				<slot></slot>

				{#if currentRoute.startsWith('/version-management') || currentRoute.startsWith('/database-management')}
					<Terminal />
				{/if}
			</div>
		</div>
	</main>
{:else}
	<slot></slot>
{/if}
