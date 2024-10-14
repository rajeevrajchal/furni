<script lang="ts">
	import { Application, Container, Graphics } from 'pixi.js';
	import { onMount } from 'svelte';

	import FpsCounter from '@comp/fps/fps-counter.svelte';

	let mainRef: HTMLElement | null = $state(null);
	const app = new Application();

	const drawAppCanvas = async () => {
		if (!app || !mainRef) return;
		let frame = new Graphics({
			x: 320 - 104,
			y: 180 - 104
		})
			.rect(0, 0, 208, 208)
			.fill(0x666666)
			.stroke({ color: 0xffffff, width: 4, alignment: 0 });
		app.stage.addChild(frame);

		let mask = new Graphics().rect(0, 0, 200, 200).fill(0xffffff);
		let maskContainer = new Container();
		maskContainer.mask = mask;
		maskContainer.addChild(mask);
		maskContainer.position.set(4, 4);
		frame.addChild(maskContainer);
	};

	const setUpPixi = async () => {
		if (!mainRef) return;
		await app.init({
			resizeTo: window,
			backgroundColor: 0xffffff,
			antialias: true
		});
		globalThis.__PIXI_APP__ = app;
		mainRef.appendChild(app.canvas);
		drawAppCanvas();
	};

	onMount(() => {
		setUpPixi();
	});
</script>

<div bind:this={mainRef}></div>
<FpsCounter />
