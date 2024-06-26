// @ts-check
import readline from "node:readline/promises";
import fs from "node:fs/promises";
import path from "node:path";

// Reads file
const file = "./hello.bf";
const ext = path.extname(file);
if (ext !== ".bf") {
    throw new Error(`Cannot resolve files that are not in ".bf" extension`);
}
try {
    await fs.access(file);
} catch (err) {
    throw new Error(`Could not access given path file:\n${err}`);
}
const code = (await fs.readFile(file)).toString();
// Setup std I/O
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Interpreter setup
const data = /** @type {number[]} */ new Array(30000).fill(0);
const sBrackets = /** @type {number[]} */ [];
const eBrackets = /** @type {number[]} */ [];
let dp = 0;

// Interpreter run
for (let i = 0; i < code.length; i++) {
    switch (code[i]) {
        case "+":
            data[dp]++;
            break;
        case "-":
            data[dp]--;
            break;
        case ">":
            dp++;
            break;
        case "<":
            dp--;
            break;
        case ".":
            rl.write(String.fromCharCode(data[dp]));
            break;
        case ",":
            let res = "";
            do {
                res = await rl.question(": ");
            } while (res.length === 0);
            data[dp] = res.charCodeAt(0);
            break;
        case "[":
            sBrackets.push(i);
            if (data[dp] !== 0) break;

            for (let j = i + 1; j < code.length; j++) {
                if (code[j] === "[") {
                    sBrackets.push(j);
                } else if (code[j] === "]") {
                    eBrackets.push(j);
                }
                if (sBrackets.length === eBrackets.length) break;
            }

            if (sBrackets.length !== eBrackets.length)
                throw new Error(
                    `Could not find ending bracket for starting bracket on ${i}`
                );

            sBrackets.pop();
            i = /** @type {number} */ (eBrackets.pop());
            break;
        case "]":
            if (sBrackets.length === 0)
                throw new Error(
                    `Could not find starting bracket for end bracket on ${i}`
                );
            const lastBr = /** @type {number} */ (sBrackets.pop());
            i = lastBr - 1;
            break;

        default:
            break;
    }
}

// Cleanup
rl.close();
