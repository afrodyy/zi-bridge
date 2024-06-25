<script>
	import { logs } from '$lib/logStore';
	import { sidebarHeight, headerHeight } from '$lib/index';
</script>

<div
	class="bg-white flex flex-wrap shadow-md"
	style="height: calc({$sidebarHeight}px - {$headerHeight}px - 32px);"
>
	<div class="w-full p-4">
		<h1 class="text-2xl font-semibold mb-4">Logs</h1>

		<table class="w-full">
			<thead>
				<tr>
					<th class="px-4 py-2 border text-left">#</th>
					<th class="px-4 py-2 border text-left">User</th>
					<th class="px-4 py-2 border text-left">Aksi</th>
					<th class="px-4 py-2 border text-left">Tanggal</th>
					<th class="px-4 py-2 border text-left">Waktu</th>
					<th class="px-4 py-2 border text-left">OS</th>
					<th class="px-4 py-2 border text-left">Browser</th>
					<th class="px-4 py-2 border text-left">IP Address</th>
				</tr>
			</thead>
			<tbody>
				{#each $logs as log, index}
					<tr class="hover:bg-gray-100">
						<th class="px-4 py-2 border text-left">{index + 1}.</th>
						<td class="px-4 py-2 border">{log.user}</td>
						<td class="px-4 py-2 border">{log.action}</td>
						<td class="px-4 py-2 border">{log.date}</td>
						<td class="px-4 py-2 border">{log.time}</td>
						<td class="px-4 py-2 border">{log.os}</td>
						<td class="px-4 py-2 border">{log.browser}</td>
						<td class="px-4 py-2 border">{log.ip}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
