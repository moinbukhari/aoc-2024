import fs from 'fs';

const input = fs.readFileSync('./day3.txt', 'utf8');

// const input =
// 	'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

const parsedInput = input.match(/mul\(\d{1,3},\d{1,3}\)/g);
const multPairs = parsedInput?.map((x) =>
	x
		.match(/\d{1,3},\d{1,3}/g)
		?.map((y) => y.split(','))
		.flatMap(([a, b]) => [parseInt(a), parseInt(b)])
) as [number, number][];

const multSum = multPairs
	?.map(([a, b]) => a * b)
	.reduce((acc, curr) => acc + curr);

console.log(multSum);
