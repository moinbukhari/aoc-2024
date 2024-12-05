import fs from 'fs';

// const input = `
// 47|53
// 97|13
// 97|61
// 97|47
// 75|29
// 61|13
// 75|53
// 29|13
// 97|29
// 53|29
// 61|53
// 97|53
// 61|29
// 47|13
// 75|47
// 97|75
// 47|61
// 75|61
// 47|29
// 75|13
// 53|13

// 75,47,61,53,29
// 97,61,53,29,13
// 75,29,13
// 75,97,47,61,53
// 61,13,29
// 97,13,75,29,47`;

const input = fs.readFileSync('./day5.txt', 'utf-8');
const [rules, updates] = input.trim().split('\n\n');

const ruleLines = rules.split('\n').map((line) => line.split('|').map(Number));
const orderedRuleLines = ruleLines.sort((a, b) => a[0] - b[0]);
const ruleMap = new Map() as Map<number, number[]>;

for (const [index, line] of orderedRuleLines.entries()) {
	ruleMap.set(line[0], [...(ruleMap.get(line[0]) || []), line[1]]);
}
const updateLines = updates
	.split('\n')
	.map((line) => line.split(',').map(Number));

//const validLines = [] as number[][];

const isLineValid = (line: number[]) => {
	let validLine = true;
	for (let i = 0; i < line.length; i++) {
		const number = line[i];
		const rule = ruleMap.get(number);
		if (rule) {
			const checkList = [...line].slice(0, i);
			validLine = checkList.every((checkNumber) => !rule.includes(checkNumber));
			if (!validLine) break;
		}
	}
	return validLine;
};

const invalidLines = updateLines.filter((line) => !isLineValid(line));

const customSort = (a: number, b: number): number => {
	const aRules = ruleMap.get(a) || [];
	const bRules = ruleMap.get(b) || [];

	if (aRules.includes(b)) {
		return -1; // a should come after b
	}
	if (bRules.includes(a)) {
		return 1; // b should come after a
	}
	return 0; // no specific order
};

invalidLines.map((line) => line.sort(customSort));

const middlePages = [...invalidLines].map(
	(line) => line[Math.floor(line.length / 2)]
);

console.log(middlePages.reduce((a, b) => a + b, 0));
