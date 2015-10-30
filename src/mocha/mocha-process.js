import reporter from "./mocha-reporter";
import Mocha from "mocha";
import ErrorStackParser from "error-stack-parser";

const files = process.argv.concat();
files.splice(0, 2);
/**
console.log(e.message);                // "missing ; before statement"
  console.log(e.name);                   // "SyntaxError"
  console.log(e.fileName);               // "Scratchpad/1"
  console.log(e.lineNumber);             // 1
  console.log(e.columnNumber);           // 4
  console.log(e.stack);
*/
process.on('uncaughtException', (e)=>{
    process.send({
        message : "ERROR",
        error : {
            message : e.message,
            name : e.name,
            stack : ErrorStackParser.parse(e)
        }
    });
});

const mocha = new Mocha({ reporter });
files.forEach((file) => mocha.addFile(file));

process.send({
    messaege : "INIT",
    files : files
});
require("babel/register");
mocha.run();
