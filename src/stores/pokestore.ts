// const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export interface Pokeman {
	name: string;
	id: number;
	image: string;
	height: number;
	weight: number;
	sprites: string;
	types: [
		{
			type: { name: string; url: string };
		}
	];
}
export type Pokemans = Pokeman[];

export const pokemon: Writable<Pokemans> = writable([]);

const fetchPokemon = async () => {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
	const res = await fetch(url);
	const data = await res.json();
	const loadedPokemon = data.results.map((data, index) => ({
		name: data.name,
		id: index + 1,
		image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
			index + 1
		}.png`
	}));

	pokemon.set(loadedPokemon);
};
fetchPokemon();
