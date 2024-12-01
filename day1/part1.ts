import fs from 'fs';

const input = fs.readFileSync('./part1.txt', 'utf8');

const transpose = (matrix: number[][]): number[][] => {
	return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

const lines = input
	.trim()
	.split('\n')
	.map((line) =>
		line
			.split(' ')
			.filter(Boolean)
			.map((x) => parseInt(x))
	);

const list = transpose(lines);

const orderedList = list.map((row) => row.sort((a, b) => a - b));

const diffList = orderedList[0].map((x, index) =>
	Math.abs(x - orderedList[1][index])
);

const totalDistance = diffList.reduce((acc, curr) => acc + curr, 0);
console.log('Total Distance:', totalDistance);
