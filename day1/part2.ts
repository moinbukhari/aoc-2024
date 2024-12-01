import fs from 'fs';
import { get } from 'http';

const input = fs.readFileSync('./day1.txt', 'utf8');

const transpose = (matrix: number[][]): number[][] => {
	return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

const getNumberOfInstances = (list: number[], value: number): number => {
	let count = 0;
	for (let i = 0; i < list.length; i++) {
		if (list[i] > value) {
			break;
		}
		if (list[i] === value) {
			count++;
		}
	}
	return count;
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

const listOfInstances = orderedList[0].map((x) =>
	getNumberOfInstances(orderedList[1], x)
);

const similarityScoreArray = orderedList[0].map(
	(x, index) => x * listOfInstances[index]
);

const similarityScore = similarityScoreArray.reduce(
	(acc, curr) => acc + curr,
	0
);
console.log(similarityScore);
