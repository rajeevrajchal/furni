
export class CanvasClass {

    public setupCanvas = (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null => {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d') || null;
        ctx?.scale(dpr, dpr);
        return ctx;
    }

    public drawBuilding = (ctx: CanvasRenderingContext2D, option: {
        x: number, y: number, width: number, height: number, color: string
    }) => {
        ctx.fillStyle = option.color;
        ctx.fillRect(option.x, option.y, option.width, option.height);
    }

    public drawSmileyFace = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true);
        ctx.moveTo(110, 75);
        ctx.arc(75, 75, 35, 0, Math.PI, false);
        ctx.moveTo(65, 65);
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
        ctx.moveTo(95, 65);
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
        ctx.stroke();
    }
}