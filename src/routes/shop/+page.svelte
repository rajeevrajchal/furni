<script lang="ts">
	import { type $FIX_ME } from '$lib/types/fix_me';
	import Counter from '@comp/counter/counter.svelte';

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
			update: (param: $FIX_ME) => {
				console.log('the update', param);
			},
			destroy: () => {
				gsap.set(node, { y: 0, opacity: 1 });
			}
		};
	};
</script>

<div>
	<h3>Counter 2</h3>
	<Counter />
	<div use:alert_action class="node">
		<p>use action</p>
	</div>

	<div use:alert_action class="node2">dse action 2.0</div>
</div>

<style lang="scss">
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
