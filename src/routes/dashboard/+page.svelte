<script>
	import Button from '../../components/Button.svelte';
	import Card from '../../components/Card.svelte';
	import { count } from '$lib/store';
	import { sidebarHeight, headerHeight } from '$lib/store';
</script>

<!-- Content Area -->
<div
	class="bg-white p-4 shadow-md"
	style="height: calc({$sidebarHeight}px - {$headerHeight}px - 32px);"
>
	<!-- Page Title -->
	<h1 class="text-xl font-semibold">Dashboard Page</h1>

	<!-- Content -->
	<p class="font-medium mb-3">Buttons:</p>

	<Button type={'button'} color={'blue'} text={'Button blue'} />
	<Button type={'button'} color={'green'} text={'Button green'} />
	<Button type={'button'} color={'red'} text={'Button red'} />
	<Button type={'button'} color={'yellow'} text={'Button yellow'} />

	<div class="flex flex-wrap">
		<div class="w-full my-4">
			<h1 class="text-2xl">Test Flexbox Layout</h1>
		</div>
		<div class="w-full md:w-1/2 lg:w-1/12 px-2 bg-red-500">
			<!-- Column content -->
			Col 1/12
		</div>
		<div class="w-full md:w-1/2 lg:w-4/12 px-2 bg-blue-500">
			<!-- Column content -->
			Col 4/12
		</div>
		<div class="w-full md:w-1/2 lg:w-7/12 px-2 bg-green-500">
			<!-- Column content -->
			Col 7/12
		</div>
	</div>

	<div class="flex flex-wrap">
		<div class="w-full">
			<!-- <Card /> -->
			<div class="max-w-sm rounded overflow-hidden shadow-lg">
				<div class="px-6 py-4">
					<div class="font-bold text-2xl mb-2">Card Title</div>
					<p class="text-gray-700 text-base">Card content</p>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-wrap">
		<div class="w-full">
			<h1 class="text-2xl font-semibold my-8">Test State Management</h1>

			<button
				type="button"
				on:click={() => $count++}
				class="px-2 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600">Increment</button
			>
			<p>Count: {$count}</p>
		</div>
	</div>
</div>
