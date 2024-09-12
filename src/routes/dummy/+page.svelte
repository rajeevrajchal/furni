<script lang="ts">
	import { tweened } from 'svelte/motion';

	// amount  = 1200
	let animatedValue = tweened(1200);
	let show = $state(false);

	function getGradientFromValue(value: number, maxValue: number): string {
		const ratio = value / maxValue;

		const startColor = 'hsla(266, 41%, 13%, 1)'; // Dark color
		const endColor = 'hsla(257, 100%, 63%, 1)'; // Light color

		const red = Math.floor(255 * ratio);
		const green = Math.floor(255 * ratio);
		const blue = Math.floor(255 * ratio);

		return `linear-gradient(90deg, ${startColor} 0%,  rgba(${red}, ${green}, ${blue}, 0.1) ${ratio * 80}%, ${endColor} 100%)`;
	}

	function getDarkerGradientFromValue(value: number, maxValue: number): string {
		const ratio = value / maxValue;

		const startColor = 'hsla(266, 41%, 13%, 1)'; // Dark color

		const endColor = `hsla(257, 30%, ${Math.max(43 - ratio * 20, 0)}%, 1)`; // Darker blue

		return `linear-gradient(123deg, ${startColor} 0%, ${endColor} 100%)`;
	}

	$effect(() => {
		animatedValue.set(0, { duration: 2000 });
		show = true;
	});
</script>

<div class="container">
	<p>Animated</p>
	{#if show}
		<div class="box" style={`background: ${getGradientFromValue($animatedValue, 1200)}`}>
			<p>Showing animated Values</p>
			<p>{Math.floor($animatedValue)}</p>
		</div>
	{/if}
</div>

<style>
	.container {
		padding: 4rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}
	.box {
		padding: 1rem;
		border-radius: 0.5rem;
	}
</style>
