<script>
	export let type = 'button';
	export let color = 'blue';
	export let text = 'Click me';
</script>

<button
	{type}
	class={`bg-${color}-500 hover:bg-${color}-600 text-white font-semibold py-2 px-4 rounded transition duration-100 ease-in-out`}
>
	{text}
</button>
