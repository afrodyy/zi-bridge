import { writable } from 'svelte/store';

export const users = writable([
	{
		id: 1,
		name: 'Herdian Afrody',
		username: 'admin',
		password: '123456',
		role: 'admin'
	},
	{
		id: 2,
		name: 'Developer',
		username: 'dev',
		password: '123456',
		role: 'dev'
	},
	{
		id: 3,
		name: 'Quality Assurance',
		username: 'qa',
		password: '123456',
		role: 'qa'
	},
	{
		id: 4,
		name: 'Master Data',
		username: 'masterdata',
		password: '123456',
		role: 'master-data'
	},
	{
		id: 5,
		name: 'App Guest',
		username: 'guest',
		password: '123456',
		role: 'guest'
	}
]);
