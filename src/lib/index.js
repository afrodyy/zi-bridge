// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';

export const sidebarHeight = writable();
export const sidebarWidth = writable();
export const headerHeight = writable();
export const headerWidth = writable();
