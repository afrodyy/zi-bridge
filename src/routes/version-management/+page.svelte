<script>
	let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
</script>

<h1 class="text-xl font-semibold p-4">Version Management</h1>

<div class="grid grid-cols-3 p-6 gap-4">
	{#each numbers as number}
		<div
			class="border rounded-md bg-gray-200 hover:bg-gray-300 px-4 py-2 focus:outline-green-500 shadow-md"
		>
			Lorem ipsum dolor sit.
		</div>
	{/each}
</div>
