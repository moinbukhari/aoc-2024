import fs from 'fs';

// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`;

const input = fs.readFileSync('./day4.txt', 'utf8');

const findNumOfXMAS = (line: string) => {
	return line.match(/XMAS/g)?.length ?? 0;
};

const transpose = (matrix: string[][]): string[][] => {
	return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

const getDiagonalLines = (matrix: string[][]): string[] => {
	const diagonals: string[] = [];
	const size = matrix.length;

	// Get main diagonals (top-left to bottom-right)
	for (let k = -size + 4; k < size - 3; k++) {
		let diagonal = '';
		for (let i = 0; i < size; i++) {
			const j = i + k;

			if (j >= 0 && j < size) {
				diagonal += matrix[i][j];
			}
		}
		if (diagonal.length >= 4) {
			diagonals.push(diagonal);
		}
	}

	// Get anti-diagonals (top-right to bottom-left)
	for (let k = 3; k < size * 2 - 4; k++) {
		let diagonal = '';
		for (let i = 0; i < size; i++) {
			const j = k - i;
			if (j >= 0 && j < size) {
				diagonal += matrix[i][j];
			}
		}
		if (diagonal.length >= 4) {
			diagonals.push(diagonal);
		}
	}

	return diagonals;
};

const lines = input
	.trim()
	.split('\n')
	.map((line) => line.split(''));

const horizontalLines = [...lines].map((line) => line.join(''));
const verticalLines = transpose([...lines]).map((line) => line.join(''));
const diagonalLines = getDiagonalLines([...lines]);

const find = (lines: string[]) => {
	let total = 0;
	lines.forEach((line) => {
		total += findNumOfXMAS(line);
		total += findNumOfXMAS([...line].reverse().join(''));
	});
	return total;
};

console.log(find([...horizontalLines, ...verticalLines, ...diagonalLines]));
