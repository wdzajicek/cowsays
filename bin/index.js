#! /usr/bin/env node

const pipe = (x0, ...funcs) => funcs.reduce(
  (x, f) => f(x),
  x0
);

// This one is self-explanatory
const addCow = text => `${text}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;

// Return the longest item from an array
function findLongest(array) {
  let longestWord = "";

  array.forEach(word => {
    if(word.length > longestWord.length) {
      longestWord = word;
    }
  });

  return longestWord;
}

// Array.map() function to wrap text in a bubble parts
function bubbleMapper(line, i, ar) {
  const longestLength = bubbleMapper.longestLength;
  let thisLine = line;
  if (line.length < longestLength) {
    const dif = longestLength - line.length;

    for (let i = 0, len = dif; i < len; i++) {
      thisLine += ' ';
    }
  }

  if (i === 0) {
    return `/ ${thisLine} \\`;
  } else if (i + 1 === ar.length) {
    return `\\ ${thisLine} /`;
  } else {
    return `| ${thisLine} |`;
  }
}

// Return string consisting of a space + N-hyphens (where N=length)
// i.e. for length=5 returns ` -----`
function createCaps(length) {
  let str = ' ';

  for (let i = 0, len = length; i < len; i++) {
    str += '-';
  }
  return str;
}

// Wrap text in the parts that makeup the speech bubble
function wrapText(text) {
  // The original cowsay strips newline chars and then limits each line by a certain length
  // I opted to maintain any newline chars and not chop-down lines by a certain length instead
  const lineArray = text.split('\n');

  if (lineArray.length === 1) {
    // Handle single line input
    const length = text.length + 2;
    const cap = createCaps(length);

    return (`${cap}
< ${text} >
${cap}`);
  } else if (lineArray.length >= 2) {
    // Handle input of 2 or more lines
    const longestLength = findLongest(lineArray).length;
    const length = longestLength + 2;
    const cap = createCaps(length);

    bubbleMapper.longestLength = longestLength;

    const map = lineArray.map(bubbleMapper);

    return (`${cap}
${map.join('\n')}
${cap}`);
  }
}

// Construct our cow parts
const haveACow = text => pipe(
  text,
  wrapText,
  addCow
);

if (process.stdin.isTTY) {
  // Handle command arguments:
  // e.g. `cowsays "hello"`
  if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
  }

  const input = process.argv[2];

  console.log(haveACow(input));
} else {
  // Handle piped data:
  // e.g. `echo "hello" | cowsays`
  let data = "";

  async function processInput() {
    for await (const chunk of process.stdin) data += chunk;

    // process all the data and write it back to stdout
    console.log(haveACow(data.replace(/\n$/, '')));
  }

  processInput();
}
