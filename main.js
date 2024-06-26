// @ts-check

const data = /** @type {number[]} */ (new Array(30000)).fill(0);
const code =
    "+++++++++++++++++++++++++++++++++.>++++++++++++++++++++++++++++++++++++++++++++++++++.<.";
let dp = 0;

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
            console.log(String.fromCharCode(data[dp]));
            break;
        default:
            continue;
    }
}
