<script>
	import { onMount } from "svelte";

	import BreedsSearchComponent from "./components/BreedsSearchComponent.svelte";

	let data = getBreeds();

	async function getBreeds() {
		const response = await fetch("https://7c07wecc95.execute-api.eu-north-1.amazonaws.com/prod/c-pr2");
		const json = await response.json();
		
		if (response.ok) {
			return json;
		} else {
			throw new Error(json);
		}
	}
</script>

{#await data}
	<!-- promise is pending -->
{:then list}
	<BreedsSearchComponent list={list.breedData}/>
{:catch error}
	<!-- promise was rejected -->
	<p>Something went wrong: {error.message}</p>
{/await}
