<script lang="ts">
	import { browser } from '$app/environment';
	import { onDestroy, onMount } from 'svelte';

	let canvas: HTMLCanvasElement | null = $state(null);
	let ctx: CanvasRenderingContext2D | null = $state(null);
	let backgroundBuilding: {
		x: number;
		width: number;
		height: number;
	}[] = $state([]);
	let mainBuilding: {
		x: number;
		width: number;
		height: number;
		lightsOn: boolean[];
	}[] = $state([]);

	const getRandomLights = () => {
		const lightsOn = [];
		const lightsCount = 30;
		for (let i = 0; i < lightsCount; i++) {
			lightsOn.push(Math.random() > 0.5);
		}
		return lightsOn;
	};

	const setUpBuilding = (index: number, buildingWidth: number, type: 'background' | 'main') => {
		const previousBuilding =
			type === 'background' ? backgroundBuilding[index - 1] : mainBuilding[index - 1];
		let minHeight: number = type === 'background' ? 120 : 80;
		let maxHeight: number =
			type === 'background' ? window.innerHeight / 2 + 20 : window.innerHeight / 2;

		const x = previousBuilding
			? previousBuilding.x + previousBuilding.width + 4
			: type === 'background'
				? -40
				: 0;
		const height = minHeight + Math.random() * (maxHeight - minHeight);
		if (type === 'background') {
			backgroundBuilding.push({ x, width: buildingWidth, height });
		} else {
			mainBuilding.push({
				x,
				width: buildingWidth,
				height,
				lightsOn: getRandomLights()
			});
		}
	};

	const generateBuildings = (type: 'background' | 'main') => {
		let minWidth: number = type === 'background' ? 50 : 90;
		let widthBreaker = type === 'background' ? 12 : 10;
		let maxWidth: number = window.innerWidth / widthBreaker;

		let screenWidth = window.innerWidth;
		if (minWidth > maxWidth || screenWidth <= 0 || minWidth <= 0) {
			throw new Error('Invalid input parameters');
		}

		let totalWidth = 0;
		let buildingsCount = 0;

		while (totalWidth + minWidth <= screenWidth) {
			const buildingWidth = Math.random() * (maxWidth - minWidth) + minWidth;
			setUpBuilding(buildingsCount, buildingWidth, type);
			if (totalWidth + buildingWidth > screenWidth) {
				break;
			}
			totalWidth += buildingWidth;
			buildingsCount++;
		}
	};

	const drawBackground = () => {
		if (ctx === null) return;

		// sky
		const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
		gradient.addColorStop(0, 'hsl(210, 100%, 10%)');
		gradient.addColorStop(1, 'hsl(210, 100%, 20%)');

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

		// moon
		ctx.beginPath();
		ctx.arc(100, window.innerHeight - 80, 50, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
		ctx.fill();
	};

	const drawGorillaBody = () => {
		if (ctx === null) return;
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(0, 25);
		ctx.lineTo(-17, 0);
		ctx.lineTo(-30, 0);
		ctx.lineTo(-27, 28);
		ctx.lineTo(-30, 54);

		ctx.lineTo(-21, 87);
		ctx.lineTo(0, 94);
		ctx.lineTo(21, 87);

		ctx.lineTo(30, 54);
		ctx.lineTo(27, 28);
		ctx.lineTo(30, 0);
		ctx.lineTo(17, 0);
		ctx.fill();
	};

	const drawGorillaLeftArm = (player: number) => {
		if (ctx === null) return;
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 16;

		ctx.beginPath();
		ctx.moveTo(-24, 60);

		ctx.quadraticCurveTo(-54, 55, -38, 22);

		ctx.stroke();
	};

	const drawGorillaRightArm = (player: number) => {
		if (ctx === null) return;
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 16;

		ctx.beginPath();
		ctx.moveTo(+24, 60);

		ctx.quadraticCurveTo(+54, 55, +38, 22);

		ctx.stroke();
	};

	const drawGorilla = (player: number) => {
		const building = player === 1 ? mainBuilding.at(1) : mainBuilding.at(-2);

		if (building && building.x) {
			console.log('property', {
				x: building.x + building.width / 2,
				y: building.height
			});
			ctx?.save();
			ctx?.translate(building.x + building.width / 2, building.height);

			drawGorillaBody();
			drawGorillaLeftArm(1);
			drawGorillaRightArm(1);
			ctx?.restore();
		}
	};

	const drawBackgroundBuilding = () => {
		backgroundBuilding.forEach((building: any) => {
			if (ctx === null) return;
			ctx.fillStyle = '#947285';
			ctx.fillRect(building.x, 0, building.width, building.height);
		});
	};

	const drawMainBuilding = () => {
		mainBuilding.forEach((building: any, index: number) => {
			if (ctx === null) return;
			const height =
				index === 1 || index === mainBuilding.length - 2 ? building.height - 40 : building.height;
			ctx.fillStyle = '#4A3C68';
			ctx.fillRect(building.x, 0, building.width, building.height);

			// drawing windows
			const windowWidth = 10;
			const windowHeight = 16;
			const gap = 20;

			const numberOfFloors = Math.ceil((building.height - gap) / (windowHeight + gap));
			const numberOfRoomsPerFloor = Math.floor((building.width - gap) / (windowWidth + gap));

			for (let floor = 0; floor < numberOfFloors; floor++) {
				for (let room = 0; room < numberOfRoomsPerFloor; room++) {
					if (building.lightsOn[floor * numberOfRoomsPerFloor + room]) {
						ctx.save();
						ctx.translate(building.x + gap, building.height - gap);
						ctx.scale(1, -1);

						const x = room * (windowWidth + gap);
						const y = floor * (windowHeight + gap);

						ctx.fillStyle = 'yellow';
						ctx.fillRect(x, y, windowWidth, windowHeight);

						ctx.restore();
					}
				}
			}
		});
	};

	const setUpCanvas = () => {
		if (canvas === null) return;
		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();

		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		ctx = canvas.getContext('2d') || null;
		ctx?.scale(dpr, dpr);

		ctx?.save();

		ctx?.translate(0, canvas.height / dpr);
		ctx?.scale(1, -1);

		drawBackground();
		drawBackgroundBuilding();
		drawMainBuilding();
		drawGorilla(1);
		drawGorilla(2);

		ctx?.restore();
	};

	const handleResize = () => {
		setUpCanvas();
	};

	$effect(() => {
		if (!browser || !canvas) return;
		setUpCanvas();
	});

	onMount(() => {
		if (!browser) return;
		generateBuildings('background');
		generateBuildings('main');
		window.addEventListener('resize', handleResize);
	});

	onDestroy(() => {
		if (!browser) return;

		window.removeEventListener('resize', handleResize);
	});
</script>

<canvas id="canvas" class="canvas" bind:this={canvas}></canvas>

<style lang="scss">
	.canvas {
		height: 100vh;
		width: 100%;
		overflow: hidden;
	}
</style>
