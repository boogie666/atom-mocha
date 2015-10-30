import reporter from "./mocha-reporter";
import Mocha from "mocha";
import ErrorStackParser from "error-stack-parser";

const files = process.argv.concat();
files.splice(0, 2);

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
