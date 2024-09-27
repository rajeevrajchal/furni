<script lang="ts">
	import Counter from '@comp/counter/counter.svelte';
	import Navbar from '@comp/navbar.svelte';
	import gsap from 'gsap';

	const alert_action = (node: HTMLElement) => {
		$effect(() => {
			gsap.set(node, { opacity: 0 });
		});

		gsap.to(node, {
			opacity: 1,
			duration: 1,
			delay: 1
		});

		return {
			update: (param: any) => {
				console.log('the update', param);
			},
			destroy: () => {
				gsap.set(node, { y: 0, opacity: 1 });
			}
		};
	};
</script>

<div class="home">
	<Navbar />
	<Counter />
	<div use:alert_action class="node">
		<p>use action</p>
	</div>

	<div use:alert_action class="node2">dse action 2.0</div>
</div>

<style lang="scss">
	.home {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.node,
	.node2 {
		background: red;
		height: 80px;
		width: 80px;
		border-radius: 50%;
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.node2 {
		background: green;
	}
</style>
