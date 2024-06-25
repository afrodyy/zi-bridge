import { writable } from 'svelte/store';

export const sidebarOpen = writable(true);
export const count = writable(0);
export const sidebarHeight = writable();
export const sidebarWidth = writable();
export const headerHeight = writable();
export const headerWidth = writable();
export const terminalHeight = writable();
