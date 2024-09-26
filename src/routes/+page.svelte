<script lang="ts">
	import Navbar from '@comp/navbar.svelte';
	import { CounterStore } from '@stores/counter.svelte';
	let counter = new CounterStore();
</script>

<div class="home">
	<Navbar />
	<div class="counter">
		<button class="btn" type="button" onclick={counter.increase}>Increase</button>
		<h4>{counter.count}</h4>
		<button class="btn" type="button" onclick={counter.decrease} disabled={counter.count === 0}
			>Decrease</button
		>
	</div>
</div>

<style lang="scss">
	.home {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.counter {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
