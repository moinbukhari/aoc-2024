import fs from 'fs';
// const input = `
// ....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...
// `;

const input = fs.readFileSync('./day6.txt', 'utf-8');

type Position = {
	row: number;
	col: number;
};

function isValidPosition(pos: Position): boolean {
	return pos.row >= 0 && pos.row < ROWS && pos.col >= 0 && pos.col < COLS;
}

function getNextPos(
	currPos: [number, number],
	direction: string
): [number, number] | null {
	const [row, col] = currPos;
	let nextPos = currPos;
	switch (direction) {
		case '^':
			nextPos = [row - 1, col];
			break;
		case 'v':
			nextPos = [row + 1, col];
			break;
		case '<':
			nextPos = [row, col - 1];
			break;
		case '>':
			nextPos = [row, col + 1];
			break;
		default:
			return null;
	}

	if (isValidPosition({ row: nextPos[0], col: nextPos[1] })) {
		return nextPos;
	} else {
		return null;
	}
}

function rotateChar(char: string): string {
	switch (char) {
		case '^':
			return '>';
		case '>':
			return 'v';
		case 'v':
			return '<';
		case '<':
			return '^';
		default:
			return char;
	}
}

function flatGridToPosition(flatPos: number): number[] {
	const row = Math.floor(flatPos / COLS);
	const col = flatPos % COLS;
	return [row, col];
}

function getStartPosition(flatGrid: string[]): number[] {
	let startPos = flatGrid.indexOf('^');
	if (startPos === -1) {
		startPos = flatGrid.indexOf('v');
	} else if (startPos === -1) {
		startPos = flatGrid.indexOf('<');
	} else if (startPos === -1) {
		startPos = flatGrid.indexOf('>');
	}
	return flatGridToPosition(startPos);
}

const grid = input
	.trim()
	.split('\n')
	.map((line) => line.split(''));

const ROWS = grid.length;
const COLS = grid[0].length;

const flatGrid = grid.flat();
const startPos = getStartPosition(flatGrid);

console.log(startPos);

let currentPos = startPos;
let currentChar = grid[currentPos[0]][currentPos[1]];

while (isValidPosition({ row: currentPos[0], col: currentPos[1] })) {
	let nextPos = getNextPos([currentPos[0], currentPos[1]], currentChar);

	if (!nextPos) {
		grid[currentPos[0]][currentPos[1]] = 'X';
		break;
	}
	if (grid[nextPos[0]][nextPos[1]] === '#') {
		currentChar = rotateChar(currentChar);
	} else {
		grid[currentPos[0]][currentPos[1]] = 'X';
		currentPos = nextPos;
	}
}

const distinctX = grid.flat().filter((char) => char === 'X').length;

console.log(distinctX);
