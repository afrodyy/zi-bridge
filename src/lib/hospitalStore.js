import { writable } from 'svelte/store';

export const hospitals = writable([
	{
		name: 'RS Sakinah Mawaddah Warahmah',
		location: 'Mojokerto',
		ip: '192.168.30.10',
		branch: 'main',
		db: 'db_rs_sakinah'
	},
	{
		name: 'RS Majalengka',
		location: 'Majalengka',
		ip: '192.168.40.41',
		branch: 'main',
		db: 'db_rs_majalengka'
	},
	{
		name: 'RS Puri Cinere',
		location: 'Jakarta Selatan',
		ip: '192.168.20.5',
		branch: 'main',
		db: 'db_rs_puri_cinere'
	},
	{
		name: 'RS Fatmawati',
		location: 'Jakarta Selatan',
		ip: '192.168.20.6',
		branch: 'main',
		db: 'db_rs_fatmawati'
	},
	{
		name: 'RS Prikasih',
		location: 'Jakarta Selatan',
		ip: '192.168.20.7',
		branch: 'main',
		db: 'db_rs_prikasih'
	},
	{
		name: 'RS Permata Sawangan',
		location: 'Depok',
		ip: '192.168.10.60',
		branch: 'main',
		db: 'db_rs_permata_sawangan'
	},
	{
		name: 'RS Aminah Ciledug',
		location: 'Tangerang',
		ip: '192.168.120.120',
		branch: 'main',
		db: 'db_rs_aminah'
	},
	{
		name: 'RS Cipto Mangunkusumo',
		location: 'Jakarta Pusat',
		ip: '192.168.57.55',
		branch: 'main',
		db: 'db_rs_cm'
	},
	{
		name: 'RS Harapan Kita',
		location: 'Jakarta Barat',
		ip: '192.168.99.1',
		branch: 'main',
		db: 'db_rs_harkit'
	},
	{
		name: 'RS Mitra Keluarga',
		location: 'Tangerang Selatan',
		ip: '192.168.44.40',
		branch: 'main',
		db: 'db_rs_mk_pamulang'
	},
	{
		name: 'RSUD Pasar Minggu',
		location: 'Jakarta Selatan',
		ip: '192.168.20.8',
		branch: 'main',
		db: 'db_rs_ud_pasming'
	},
	{
		name: 'RS Setia Mitra',
		location: 'Jakarta Selatan',
		ip: '192.168.20.9',
		branch: 'main',
		db: 'db_rs_setia_mitra'
	},
	{
		name: 'RS Haji',
		location: 'Jakarta Timur',
		ip: '192.168.30.10',
		branch: 'main',
		db: 'db_rs_sakinah'
	},
	{
		name: 'RS Harum Sisma Medika',
		location: 'Bekasi',
		ip: '192.168.80.87',
		branch: 'main',
		db: 'db_rs_harum'
	}
]);
