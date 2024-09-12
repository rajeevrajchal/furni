<script lang="ts">
	import Navbar from '@comp/navbar.svelte';
</script>

<main id="home">
	<Navbar />
	<div class="container">
		<h1>Page</h1>
		<p>This is a page</p>
	</div>
</main>

<style lang="scss">
	main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: start;
		background: red;
	}

	.container {
		background: 'red';
		flex: 1;
		@include pagePadding;
	}
</style>
