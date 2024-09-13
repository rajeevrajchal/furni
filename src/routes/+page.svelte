<script lang="ts">
	import { TouchInteraction } from '$lib/tools/TouchInteraction';
	import Navbar from '@comp/navbar.svelte';

	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	if (browser) {
		const touchInteraction = new TouchInteraction(document.getElementById('home') || document.body);

		onMount(() => {
			touchInteraction.enableTouchEvents();
		});
	}
</script>

<main id="home">
	<Navbar />
	<div class="container">
		<h1>Page</h1>
		<p>This is a page</p>
	</div>
	<div class="box">
		<p>I am box, moving up and down</p>
	</div>
</main>

<style lang="scss">
	main {
		height: 100vh;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: start;
		@include pagePadding;
	}

	.container {
		flex: 1;
		width: 100%;
		padding: $md 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.box {
		background: $primary-color;
		color: $text-white;
		height: 20vh;
		width: 100%;
	}
</style>
