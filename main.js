const fs = require("fs");

const number = n => {
    if (n <= 0) return '+[]';
    if (n < 10) return Array.from({length: n}, () => '+!![]').join('');
    return a = `+(${Array.from(n.toString(), n => `[${number(+n)}]`).join('+')})`;
}

const character = {};
let _function = null;

const fromString = s => s.split('').map(c => {
    if (c in character) return character[c];
    const n = c.charCodeAt(0);
    if (n < 0x10000) return `(${_function}(${fromString(`return '\\u${n.toString(16).padStart(4, "0")}'`)})())`;
    return `(${_function}(${fromString(`return '\\u{${n.toString(16)}'}`)})())`;
}).join('+');

character.f = `(![]+[])[${number(0)}]`;
character.a = `(![]+[])[${number(1)}]`;
character.l = `(![]+[])[${number(2)}]`;
character.s = `(![]+[])[${number(3)}]`;
character.e = `(![]+[])[${number(4)}]`;
character.d = `([][[]]+[])[${number(2)}]`;
character.i = `([][[]]+[])[${number(5)}]`;
character.n = `([][[]]+[])[${number(1)}]`;
character.u = `([][[]]+[])[${number(0)}]`;
character.t = `(!![]+[])[${number(0)}]`;
character.r = `(!![]+[])[${number(1)}]`;
character.c = `([][${fromString("flat")}]+[])[${number(3)}]`;
character.o = `([][${fromString("flat")}]+[])[${number(6)}]`;
character[" "] = `([][${fromString("flat")}]+[])[${number(8)}]`;
character["("] = `([][${fromString("flat")}]+[])[${number(13)}]`;
character[")"] = `([][${fromString("flat")}]+[])[${number(14)}]`;
character["{"] = `([][${fromString("flat")}]+[])[${number(16)}]`;
character["}"] = `([][${fromString("flat")}]+[])[${number(32)}]`; // TODO: obtain using ([true]+[]["flat"])["slice"]("-1")
character["["] = `([][${fromString("entries")}]()+[])[${number(0)}]`;
character["]"] = `([][${fromString("entries")}]()+[])[${number(22)}]`;
character.A = `([][${fromString("entries")}]()+[])[${number(8)}]`;
character.y = `([][${fromString("entries")}]()+[])[${number(12)}]`;
character.I = `([][${fromString("entries")}]()+[])[${number(14)}]`;
character.F = `([][${fromString("flat")}][${fromString("constructor")}]+[])[${number(9)}]`;
character.N = `(+[][[]]+[])[${number(0)}]`;
character.m = `((+[])[${fromString("constructor")}]+[])[${number(11)}]`;
character.b = `((+[])[${fromString("constructor")}]+[])[${number(12)}]`;
character.S = `(([]+[])[${fromString("constructor")}]+[])[${number(9)}]`;
character.g = `(([]+[])[${fromString("constructor")}]+[])[${number(14)}]`;
character["."] = `(+((${number(11)})+${fromString("e")}+(${number(20)}))+[])[${number(1)}]`;
character["+"] = `(+((${number(11)})+${fromString("e")}+(${number(20)}))+[])[${number(4)}]`;
"hjkpqvwxz".split("").forEach(c => character[c] = `(${number(c.charCodeAt(0) - 96 + 9)})[${fromString("toString")}](${number(c.charCodeAt(0) - 96 + 10)})`);
"0123456789".split("").forEach(c => character[c] = `((${number(c.charCodeAt(0) - "0".charCodeAt(0))})+[])`)

_function = `[][${fromString("flat")}][${fromString("constructor")}]`;

character.R = `(${_function}(${fromString("try{String().normalize(false)}catch(f){return f}")})()+[])[${number(0)}]`;
character.E = `(${_function}(${fromString("try{String().normalize(false)}catch(f){return f}")})()+[])[${number(5)}]`;
character["/"] = `(${_function}(${fromString("return RegExp")})()()+[])[${number(0)}]`;
character["\\"] = `(${_function}(${fromString("return RegExp")})()(${fromString("/")})+[${number(1)}])[${number(1)}]`;
character["\'"] = `(${_function}(${fromString("try{Function([[]].concat([[]])+[])()}catch(f){return f}")})()+[])[${number(30)}]`;

/* debug
const val = [
    character.R,
    character["\\"],
    fromString("\""),
];
val.forEach(v => console.log(`${v} ->> ${eval(v)}`));
*/

// can be changed to read from file and/or write to file
console.log("Reading file");
const source = fs.readFileSync("input.js", "utf8");
console.log("Transpiling");
const output = `${_function}(${fromString(source)})()`;
console.log("Writing to file");
fs.writeFileSync("out.js", output);
console.log("Done");
