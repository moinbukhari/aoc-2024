import fs from 'fs';

const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

//const input = fs.readFileSync('./day4.txt', 'utf8');

const findNumOfXMAS = (line: string) => {
	return line.match(/XMAS/g)?.length ?? 0;
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
		const masDiagonal = diagonal.match(/MAS/g);
		if (diagonal.length >= 4 && masDiagonal) {
			console.log(diagonal);
			console.log(masDiagonal);

			diagonals.push(diagonal);
		}
	}

	return diagonals;
};

const lines = input
	.trim()
	.split('\n')
	.map((line) => line.split(''));

const diagonalLines = getDiagonalLines([...lines]);

const find = (lines: string[]) => {
	let total = 0;
	lines.forEach((line) => {
		total += findNumOfXMAS(line);
		total += findNumOfXMAS([...line].reverse().join(''));
	});
	return total;
};
