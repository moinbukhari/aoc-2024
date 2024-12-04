import fs from 'fs';

const input = fs.readFileSync('./day3.txt', 'utf8');

// const input =
// 	"xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const parsedInput = input.match(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g);

const validMultPairs = [] as [number, number][];
let enabled = true;

parsedInput?.forEach((x) => {
	if (x === "don't()") {
		enabled = false;
	} else if (x === 'do()') {
		enabled = true;
	} else if (enabled) {
		const [a, b] = x
			.match(/\d{1,3},\d{1,3}/g)
			?.map((y) => y.split(','))
			.flatMap(([a, b]) => [parseInt(a), parseInt(b)]) as [number, number];
		validMultPairs.push([a, b]);
	}
});

const multSum = validMultPairs
	?.map(([a, b]) => a * b)
	.reduce((acc, curr) => acc + curr);

console.log(multSum);
