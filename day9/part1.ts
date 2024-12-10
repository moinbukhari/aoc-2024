import fs from 'fs';
import { dot } from 'node:test/reporters';

//const input = fs.readFileSync('day9.txt', 'utf8');

const input = '2333133121414131402';

const expInput = input
	.trim()
	.split('')
	.map((x) => parseInt(x))
	.map((x, i) => {
		if (i % 2 === 0) {
			const newX = [] as number[];
			for (let j = 0; j < x; j++) {
				newX.push(i / 2);
			}
			return newX;
		} else {
			const newX = [] as number[];
			for (let j = 0; j < x; j++) {
				newX.push(-1);
			}
			return newX;
		}
	})
	.flatMap((x) => x)
	.map((x) => (x === -1 ? '.' : x.toString()));

const dotIndexes = expInput;

//console.log(dotIndexes.join(''));
let earliestBlank = 0;
for (let i = dotIndexes.length - 1; i >= 0; i--) {
	if (dotIndexes[i] === '.') continue;
	const newIndex = dotIndexes.indexOf('.', earliestBlank);
	earliestBlank = newIndex;
	if (newIndex === -1 || newIndex > i) break;
	dotIndexes[newIndex] = dotIndexes[i];
	dotIndexes[i] = '.';
}

console.log(
	dotIndexes
		.map((i, n) => (i === '.' ? 0 : Number(i) * n))
		.reduce((acc, x) => acc + x, 0)
);
