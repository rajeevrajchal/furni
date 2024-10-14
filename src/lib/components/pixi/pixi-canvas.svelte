<script lang="ts">
	import FpsCounter from '@comp/fps/fps-counter.svelte';
	import { Application, Assets, Container, Sprite } from 'pixi.js';
	import { onMount } from 'svelte';

	let mainRef: HTMLElement | null = $state(null);
	const app = new Application();

	const drawAppCanvas = async () => {
		if (!app || !mainRef) return;
		const container = new Container({
			x: app.screen.width / 2,
			y: app.screen.height / 2
		});
		app.stage.addChild(container);

		Assets.add({ alias: 'bunny', src: 'https://pixijs.com/assets/bunny.png' });
		Assets.add({ alias: 'flower', src: 'https://pixijs.com/assets/flowerTop.png' });
		Assets.add({ alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' });
		const texture: any = Assets.load(['bunny', 'flower', 'eggHead']);

		texture.then((res: any) => {
			const flower = Sprite.from(res.flower);
			flower.anchor.set(0.5);
			flower.x = app.screen.width * 0.25;
			flower.y = app.screen.height / 2;
			app.stage.addChild(flower);

			const bunny = Sprite.from(res.bunny);
			bunny.anchor.set(0.5);
			bunny.scale.set(4);
			bunny.x = app.screen.width * 0.5;
			bunny.y = app.screen.height / 2;
			app.stage.addChild(bunny);

			const egg = Sprite.from(res.eggHead);
			egg.anchor.set(0.5);
			egg.x = app.screen.width * 0.75;
			egg.y = app.screen.height / 2;
			app.stage.addChild(egg);
		});
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
	console.log('App: initialized');

	onMount(() => {
		console.log('App: mounted');
		setUpPixi();
	});
</script>

<div bind:this={mainRef}></div>
<FpsCounter />
