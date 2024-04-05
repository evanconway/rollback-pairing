const canvas = document.getElementById("gamescreen")! as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

const playerIds: string[] = [];

let frameNumber = 0;
let p1Color = "#FF0000";
let p2Color = "#0000FF";

export const setPlayerColor = (player: 'p1' | 'p2', color: string) => {
    if (player === 'p1') p1Color = color;
    if (player === 'p2') p2Color = color;
};

setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(50, 50, 20, 0, 2*Math.PI);
    context.lineWidth = 5;
    context.strokeStyle = p1Color;
    context.stroke();
    
    context.beginPath();
    context.arc(200, 50, 20, 0, 2*Math.PI);
    context.lineWidth = 5;
    context.strokeStyle = p2Color;
    context.stroke();

    frameNumber += 1;
}, 1000/60);