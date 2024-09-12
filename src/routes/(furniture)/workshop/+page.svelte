<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { blur } from 'svelte/transition';

	import { cubicOut, cubicInOut, quintOut } from 'svelte/easing';

	let show = false;

	let animatedValue = tweened(500);

	const size = tweened(1, {
		duration: 300,
		easing: cubicInOut
	});

	function handleClick() {
		$size += 1;
	}

	function swipeBackground(node: HTMLElement) {
		return {
			delay: 4,
			duration: 500,
			easing: cubicOut,
			css: (t: number) => {
				let background;
				if (t > 0.5) {
					const u = t - 0.5;
					const percentage = u * 200;
					background = `background: linear-gradient(123deg, hsla(257, 100%, 63%, 1) ${percentage - 10}%, hsla(266, 41%, 13%, 1) ${percentage}%);`;
				} else {
					const percentage = t * 200;
					background = `background: linear-gradient(123deg, rgba(117, 64, 255, 0.6) ${percentage - 10}%, rgba(117, 64, 255, 0.6) ${percentage}%);`;
				}
				return background;
			}
		};
	}

	$effect(() => {
		animatedValue.set(0, { duration: 4000, easing: quintOut });
	});
</script>

<h1>Animation</h1>
<div transition:blur|global={{ amount: 10 }}>fades in and out</div>

<button
	class="btn:default"
	onclick={handleClick}
	style="transform: scale({$size}); transform-origin: 0 0"
>
	embiggen
</button>

<button onclick={() => (show = !show)}> {show ? 'hide' : 'show'} box transition </button>
{#if show}
	<div class="box" transition:swipeBackground>
		<p>I am Box</p>
	</div>
	<div transition:blur={{ amount: 10 }}>fades in and out</div>
{/if}

<style lang="scss">
	.box {
		width: 200px;
		height: 200px;
		border-radius: 20%;
		display: grid;
		place-content: center;
		border: 1px solid black;
		color: $primary-color;
		background: linear-gradient(123deg, hsla(257, 100%, 63%, 1) -180%, hsla(266, 41%, 13%, 1) 99%);
	}
</style>
