import { writable } from 'svelte/store';

export const logs = writable([
	{
		user: 'Herdian',
		action: 'pull request',
		date: '2024-06-10',
		time: '11:29:00',
		os: 'Windows 10 Pro',
		browser: 'Chrome',
		ip: '10.10.100.179'
	},
	{
		user: 'Afrody',
		action: 'merge',
		date: '2024-06-11',
		time: '11:55:00',
		os: 'Windows 10 Pro',
		browser: 'Chrome',
		ip: '10.10.100.179'
	}
]);
