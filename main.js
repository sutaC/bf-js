// @ts-check
import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const code =
    "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.";

const data = /** @type {number[]} */ (new Array(30000)).fill(0);
let dp = 0;

const sBrackets = /** @type {number[]} */ [];
const eBrackets = /** @type {number[]} */ [];

for (let i = 0; i < code.length; i++) {
    switch (code[i]) {
        case "+":
            data[dp]++;
            break;
        case "-":
            data[dp]++;
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
            // TODO
            break;
        case "]":
            // TODO
            break;
        default:
            continue;
    }
}

rl.close();
