<script>
	import Card from '@comp/card.svelte';
	import { AppRoute } from '@constants/app-route';
</script>

<Card fullscreen>
	<div>
		<a href={AppRoute.home}> Home </a>
		<p>I am template</p>
	</div>
</Card>
