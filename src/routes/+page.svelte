<script lang="ts">
	import Card from '@comp/card.svelte';
	import Container from '@comp/container.svelte';
	import Navbar from '@comp/navbar.svelte';
</script>

<main id="home">
	<Navbar />
	<Container />
	<Card>
		<h2>Card Title</h2>
		<p>
			This is a longer text content for the card. It demonstrates how the card can contain more
			information and still be draggable. The card's content can overflow, and users can drag it up
			to reveal more.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
			hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
			porttitor. Ut in nulla enim.
		</p>
		<p>
			Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum
			feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit
			odio. Proin quis tortor orci.
		</p>
		<p>
			Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus
			condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus
			eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
		</p>

		<h2>main</h2>
		<p>
			This is a longer text content for the card. It demonstrates how the card can contain more
			information and still be draggable. The card's content can overflow, and users can drag it up
			to reveal more.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
			hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
			porttitor. Ut in nulla enim.
		</p>
		<p>
			Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum
			feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit
			odio. Proin quis tortor orci.
		</p>
		<p>
			Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus
			condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus
			eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
		</p>

		<h2>main 2</h2>
		<p>
			This is a longer text content for the card. It demonstrates how the card can contain more
			information and still be draggable. The card's content can overflow, and users can drag it up
			to reveal more.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
			hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh
			porttitor. Ut in nulla enim.
		</p>
		<p>
			Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum
			feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit
			odio. Proin quis tortor orci.
		</p>
		<p>
			Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus
			condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus
			eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.
		</p>
	</Card>
</main>

<style lang="scss">
	main {
		height: 100vh;
		width: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-items: start;
		background: lightsalmon;
	}

	:global(body) {
		overflow: hidden;
	}
</style>
