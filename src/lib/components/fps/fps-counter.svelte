<script lang="ts">
	import { onMount } from 'svelte';

	let fps = $state(0);
	let frameCount = 0;
	let lastTime = performance.now();

	function updateFPS(currentTime: number) {
		frameCount++;

		if (currentTime - lastTime >= 1000) {
			fps = frameCount;
			frameCount = 0;
			lastTime = currentTime;
		}

		requestAnimationFrame(updateFPS);
	}

	onMount(() => {
		requestAnimationFrame(updateFPS);
	});
</script>

<div class="fps-display">
	<h2>FPS Counter</h2>
	<p>Current FPS: {fps}</p>
</div>

<style>
	.fps-display {
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 10px;
		border-radius: 5px;
		position: fixed;
		top: 10px;
		left: 10px;
	}

	h2 {
		margin: 0 0 5px 0;
		font-size: 1.2em;
	}

	p {
		margin: 0;
		font-size: 1em;
	}
</style>
