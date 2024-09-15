<script lang="ts">
	import { AppRoute } from '@constants/app-route';
	import { cubicInOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';

	let animatedValue = tweened(1200);
	let show = $state(true);

	$effect(() => {
		animatedValue.set(0, {
			duration: 5000,
			easing: cubicInOut
		});
	});
</script>

<div class="container">
	<div class="content">
		<h1>Page</h1>
		<p>This is a page</p>
		<a href={AppRoute.template}> Template </a>
		<p>{Math.floor($animatedValue)}</p>
	</div>
	{#if show}
		<div class="drop" style="opacity: {$animatedValue / 1200};"></div>
	{/if}
</div>

<style lang="scss">
	.container {
		height: 75vh;
		width: 100%;
		padding: $md 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		@include pagePadding;
	}
	.drop {
		background: red;
		width: 100%;
		height: 75vh;
		position: absolute;
		top: 0;
		left: 0;
	}
	.content {
		z-index: 1;
		width: 100%;
		height: 100%;
	}
</style>
