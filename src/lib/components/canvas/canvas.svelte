<script lang="ts">
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement | null = null;
	let ctx: CanvasRenderingContext2D;

	function setupCanvas(canvas: HTMLCanvasElement) {
		var dpr = window.devicePixelRatio || 1;
		var rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		let ctx: any = canvas.getContext('2d');
		ctx?.scale(dpr, dpr);
		return ctx;
	}

	// const makeHouse = () => {
	// 	ctx.lineWidth = 10;

	// 	// Wall
	// 	ctx.strokeRect(75, 140, 150, 110);

	// 	// Door
	// 	ctx.fillRect(160, 190, 40, 60);

	// 	// Roof
	// 	ctx.beginPath();
	// 	ctx.moveTo(50, 140);
	// 	ctx.lineTo(150, 60);
	// 	ctx.lineTo(250, 140);
	// 	ctx.closePath();
	// 	ctx.stroke();
	// };

	// const createBlock = (color: string, x: number, y: number) => {
	// 	ctx.fillStyle = color;
	// 	ctx.fillRect(x, y, 100, 100);
	// };

	// const line = () => {
	// 	ctx.lineWidth = 5;
	// 	ctx.beginPath();
	// 	ctx.moveTo(280, 190);
	// 	ctx.lineTo(380, 250);
	// 	ctx.stroke();
	// };

	const makeSmiley = () => {
		ctx.beginPath();
		ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
		ctx.moveTo(110, 75);
		ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
		ctx.moveTo(65, 65);
		ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
		ctx.moveTo(95, 65);
		ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
		ctx.stroke();
	};

	const simpleDraw = () => {
		ctx.fillRect(25, 25, 100, 100);
		ctx.fillStyle = 'red';
		ctx.clearRect(45, 45, 60, 60);
		ctx.strokeRect(50, 50, 50, 50);
	};

	const line = () => {
		ctx.lineWidth = 5;
		ctx.beginPath();
		ctx.moveTo(10, 10);
		ctx.lineTo(100, 10);
		ctx.lineTo(100, 80);
		ctx.lineTo(10, 80);
		ctx.lineTo(10, 10);
		ctx.closePath();
		ctx.stroke();
	};

	$effect(() => {
		if (!browser || !canvas) return;
		ctx = setupCanvas(canvas);
		line();
		simpleDraw();
		makeSmiley();
	});
</script>

<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

<style lang="scss">
	.canvas {
		height: 100vh;
		width: 100%;
	}
</style>
