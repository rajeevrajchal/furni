<script lang="ts">
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D;

	const createBlock = (color: string, x: number, y: number) => {
		ctx.fillStyle = color;
		ctx.fillRect(x, y, 100, 100);
	};

	function setupCanvas(canvas: HTMLCanvasElement) {
		var dpr = window.devicePixelRatio || 1;
		var rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		let ctx: any = canvas.getContext('2d');
		ctx?.scale(dpr, dpr);
		return ctx;
	}

	$effect(() => {
		if (!browser || !canvas) return;
		ctx = setupCanvas(canvas);
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(100, 100);
		ctx.lineTo(200, 200);
		ctx.stroke();

		createBlock('green', 0, 0);
		createBlock('red', 40, 40);
		createBlock('blue', 0, 200);
	});
</script>

<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

<style lang="scss">
	.canvas {
		height: 100vh;
		width: 100%;
	}
</style>
