import fs from 'fs';

const input = fs.readFileSync('./day2.txt', 'utf8');

// const input = `
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
// `;

const checkIncrease = (list: number[]): boolean => {
	for (let i = 0; i < list.length - 1; i++) {
		const diff = list[i + 1] - list[i];
		if (diff < 1 || diff > 3) {
			return false;
		}
	}
	return true;
};

const verifyLine = (line: number[]): boolean => {
	if (checkIncrease([...line]) || checkIncrease([...line].reverse())) {
		return true;
	} else {
		const foundValid = line.some((x, index) => {
			const filteredLine = line.filter((_, i) => i !== index);
			if (
				checkIncrease([...filteredLine]) ||
				checkIncrease([...filteredLine].reverse())
			) {
				return true;
			}
			return false;
		});
		return foundValid;
	}
};

const lines = input
	.trim()
	.split('\n')
	.map((line) => line.split(' ').map(Number));

const safeLines = lines.map((line) => verifyLine(line)).filter(Boolean).length;

console.log(safeLines);
