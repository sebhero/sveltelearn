<script context="module">
	export async function load({ page }) {
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
		return { props: { pokemon: loadedPokemon } };
	}
</script>

<script lang="ts">
	import PokemanCard from '../components/pokemanCard.svelte';
	import type { Pokemans } from '../stores/pokestore';

	export let pokemon;
	let searchTerm = '';
	let filteredPokemon: Pokemans = [];

	$: {
		if (searchTerm) {
			//searchterm
			filteredPokemon = pokemon.filter((pokeman) =>
				pokeman.name.includes(searchTerm.toLocaleLowerCase())
			);
		} else {
			//reset filterd
			filteredPokemon = [...pokemon];
		}
	}
</script>

<svelte:head>
	<title>Svelte Kit Pokedex</title>
</svelte:head>

<h1 class="text-4xl text-center bg-blue-100">Svelte Kit Pokedex</h1>

<input
	type="text"
	placeholder="Search Pokemon"
	class="w-full rounded-md text-lg
p-4 border-2 border-gray-200
"
	bind:value={searchTerm}
/>

<div class="py-4 grid gap-4  md:grid-cols-2 grid-cols-1">
	{#each filteredPokemon as pokeman}
		<PokemanCard {pokeman} />
	{/each}
</div>

<style>
</style>
