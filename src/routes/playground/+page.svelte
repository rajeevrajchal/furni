<script>
	import Canvas from '@comp/canvas/canvas.svelte';
	let height = 500;
	let width = 500;
</script>

<div class="playground">
	<Canvas />
	<script>
		let height = 500;
		let width = 500;
	</script>

	<div class="home">
		<svg {width} {height} version="1.1">
			<g>
				<rect width="100" height="50" x="200" y="5" rx="8" ry="8" fill="blue" />
				<line x1="250" y1="55" x2="250" y2="150" style="stroke:red;stroke-width:2" />
			</g>
			<polygon
				points="250,150 200,200 250,200 300,200"
				style="fill:lime;stroke:purple;stroke-width:3"
			/>
		</svg>
	</div>

	<style lang="scss">
		.home {
			min-height: 100vh;
			display: flex;
			flex-direction: column;
			svg {
				background: hsla(300, 11%, 98%, 1);
			}
		}
	</style>
</div>

<style lang="scss">
	.playground {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}
</style>
