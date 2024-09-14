<script lang="ts">
	import { browser } from '$app/environment';
	import { TouchInteraction } from '@tools/TouchInteraction';
	import gsap from 'gsap';
	import { onMount, type Snippet } from 'svelte';

	let cardElement: HTMLElement;
	let contentElement: HTMLElement;

	let {
		children,
		fullscreen
	}: {
		children: Snippet;
		fullscreen?: boolean;
	} = $props();

	$effect(() => {
		if (!fullscreen) return;
		gsap.fromTo(
			cardElement,
			{
				height: window.innerHeight
			},
			{
				height: 900,
				duration: 0.01,
				ease: 'power2.out'
			}
		);
	});

	onMount(() => {
		if (browser && cardElement && contentElement && !fullscreen) {
			const touchInteraction = new TouchInteraction(cardElement, contentElement);
			touchInteraction.enableTouchEvents();
			return () => {
				touchInteraction.disableTouchEvents();
			};
		}
	});
</script>

<div class="card" bind:this={cardElement}>
	{#if !fullscreen}
		<div class="card-handle"></div>
	{/if}
	<div class="card-content" bind:this={contentElement}>
		{@render children()}
	</div>
</div>

<style lang="scss">
	.card {
		background: $primary-color;
		color: $text-white;
		border-radius: $md $md 0 0;
		width: 100%;
		height: 25vh;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		transition: height 0.3s ease;
		overflow: hidden;
	}

	.card-handle {
		height: 20px;
		width: 100%;
		background: darken($primary-color, 10%);
		cursor: grab;
	}

	.card-content {
		height: calc(100% - 20px);
		padding: $md;
		overflow-y: hidden;
	}
</style>
