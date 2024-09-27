<script>
	import { counter } from '@stores/counter.svelte';
</script>

<div class="counter">
	<button class="btn" type="button" onclick={counter.increase}>Increase</button>
	<h4>{counter.count}</h4>
	<button class="btn" type="button" onclick={counter.decrease} disabled={counter.count === 0}
		>Decrease</button
	>
</div>

<style lang="scss">
	.counter {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
