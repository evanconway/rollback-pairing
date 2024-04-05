const canvas = document.getElementById("gamescreen")! as HTMLCanvasElement;
const context = canvas.getContext('2d')!;

export type Player = 'p1' | 'p2';

const playerIds: string[] = [];

let frameNumber = 0;
let isPlayer1: boolean;
let p1Position = 50;
let isP1Moving = false;
let p2Position = 50;
let isP2Moving = false;

export const amPlayer1 = () => {
    return isPlayer1;
}

export const setPlayer = (player: Player) => {
    isPlayer1 = player === 'p1';
}

export const setPlayerMoving = (player: Player) => {
    if (player === 'p1') {
        isP1Moving = true;
        setTimeout(() => {
            isP1Moving = false;
            p1Position = 50;
        }, 5000)
    }
    if (player === 'p2') {
        isP2Moving = true;
        setTimeout(() => {
            isP2Moving = false;
            p2Position = 50;
        }, 5000)
    }
};

setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(p1Position, 30, 20, 0, 2*Math.PI);
    context.lineWidth = 5;
    context.strokeStyle = '#FF0000';
    context.stroke();

    context.beginPath();
    context.moveTo(p1Position, 0);
    context.lineTo(p1Position, 300);
    context.lineWidth = 1;
    context.strokeStyle = '#000000';
    context.stroke();
    
    context.beginPath();
    context.arc(p2Position, 100, 20, 0, 2*Math.PI);
    context.lineWidth = 5;
    context.strokeStyle = '#0000FF';
    context.stroke();

    context.beginPath();
    context.moveTo(p2Position, 0);
    context.lineTo(p2Position, 300);
    context.lineWidth = 1;
    context.strokeStyle = '#000000';
    context.stroke();

    if (isP1Moving) {
        p1Position += 1;
    }
    if (isP2Moving) {
        p2Position += 1;
    }
    frameNumber += 1;

    document.getElementById('player-distance')!.innerHTML = `Player distance: ${Math.abs(p1Position - p2Position)}`;
}, 1000/60);