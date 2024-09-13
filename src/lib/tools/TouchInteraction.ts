export class TouchInteraction {

    constructor(
        public element: HTMLElement,
    ) {
        console.log('hello touch events')
    }

    public onTouchMove: (delta: {
        x: number,
        y: number
    }) => void = () => { };

    public enableTouchEvents = () => {
        this.element.addEventListener('touchmove', this.touchMove)
    }

    private touchMove = (event: TouchEvent) => {
        const touchs = event.touches[0];

        console.log('on mousing touch move', {
            touchs
        })
    }
}