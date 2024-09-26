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

	const makeHouse = () => {
		ctx.lineWidth = 10;

		// Wall
		ctx.strokeRect(75, 140, 150, 110);

		// Door
		ctx.fillRect(160, 190, 40, 60);

		// Roof
		ctx.beginPath();
		ctx.moveTo(50, 140);
		ctx.lineTo(150, 60);
		ctx.lineTo(250, 140);
		ctx.closePath();
		ctx.stroke();
	};

	const line = () => {
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(280, 190);
		ctx.lineTo(380, 250);
		ctx.stroke();
	};

	$effect(() => {
		if (!browser || !canvas) return;
		ctx = setupCanvas(canvas);

		makeHouse();
		line();
		// createBlock('green', 0, 0);
		// createBlock('red', 40, 40);
		// createBlock('blue', 0, 200);
	});
</script>

<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

<style lang="scss">
	.canvas {
		height: 100vh;
		width: 100%;
	}
</style>
