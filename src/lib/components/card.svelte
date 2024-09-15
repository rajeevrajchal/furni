<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { TouchInteraction } from '@tools/TouchInteraction';
	import gsap from 'gsap';
	import { onMount, type Snippet } from 'svelte';

	let cardElement: HTMLElement;
	let contentElement: HTMLElement;
	let maxHeight: number = 900;

	let animationPromise: Promise<void> | null = null;

	let {
		children,
		fullscreen
	}: {
		children: Snippet;
		fullscreen?: boolean;
	} = $props();

	beforeNavigate(async () => {
		if (animationPromise) {
			await animationPromise;
			animationPromise = null;
		}
		animationPromise = new Promise<void>((resolve) => {
			gsap.to(cardElement, {
				height: 0,
				duration: 2,
				ease: 'power2.out',
				onComplete: resolve
			});
		});

		return animationPromise;
	});

	afterNavigate(async () => {
		if (animationPromise) {
			await animationPromise;
			animationPromise = null;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));

		gsap.fromTo(
			cardElement,
			{ height: 0 }, // Start from height 0
			{
				height: !fullscreen ? 270 : maxHeight,
				duration: 0.5,
				ease: 'power2.out'
			}
		);
	});

	onMount(() => {
		if (browser && cardElement && contentElement && !fullscreen) {
			const touchInteraction = new TouchInteraction(cardElement, contentElement, maxHeight);
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
		z-index: 2;
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
