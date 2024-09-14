import gsap from 'gsap';

export class TouchInteraction {
	public startY: number | null = null;
	public startHeight: number = 0;
	private maxHeight: number = 900;
	private minHeight: number = 270;
	private scrollThreshold: number = 400;

	constructor(
		public element: HTMLElement,
		private contentElement: HTMLElement
	) {}

	public enableTouchEvents = () => {
		this.element.addEventListener('touchstart', this.touchStart);
		this.element.addEventListener('touchmove', this.touchMove);
		this.element.addEventListener('touchend', this.touchEnd);
	};

	public disableTouchEvents = () => {
		this.element.removeEventListener('touchmove', this.touchMove);
		this.element.removeEventListener('touchstart', this.touchStart);
		this.element.removeEventListener('touchend', this.touchEnd);
	};

	private touchStart = (e: TouchEvent) => {
		if (this.isContentScrollable() && e.target === this.contentElement) {
			return; // Allow normal scroll behavior when content is scrollable
		}
		this.startY = e.touches[0].clientY;
		this.startHeight = parseInt(getComputedStyle(this.element).height, 10);
	};

	private touchMove = (event: TouchEvent) => {
		if (!this.startY) return;
		const touches = event.touches[0];
		const deltaY = this.startY - touches.clientY;
		const newHeight = Math.min(Math.max(this.startHeight + deltaY, this.minHeight), this.maxHeight);

		gsap.to(this.element, {
			height: newHeight,
			duration: 0.01,
			ease: 'power2.out',
			onUpdate: this.updateContentScrollability
		});
	};

	private touchEnd = () => {
		this.startY = null;
		const currentHeight = parseInt(getComputedStyle(this.element).height, 10);

		if (currentHeight < 100) {
			gsap.to(this.element, {
				height: this.minHeight,
				duration: 0.5,
				ease: 'elastic.out(1, 1)',
				onUpdate: this.updateContentScrollability
			});
		} else if (currentHeight > this.maxHeight - 100) {
			gsap.to(this.element, {
				height: this.maxHeight,
				duration: 0.5,
				ease: 'elastic.out(1, 1)',
				onUpdate: this.updateContentScrollability
			});
		}
	};

	private updateContentScrollability = () => {
		const currentHeight = parseInt(getComputedStyle(this.element).height, 10);
		if (currentHeight >= this.scrollThreshold) {
			this.contentElement.style.overflowY = 'auto';
		} else {
			this.contentElement.style.overflowY = 'hidden';
		}
	};

	private isContentScrollable = () => {
		return this.contentElement.scrollHeight > this.contentElement.clientHeight;
	};
}
