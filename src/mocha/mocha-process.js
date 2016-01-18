import reporter from "./mocha-reporter";
import Mocha from "mocha";
import ErrorStackParser from "error-stack-parser";

const args = process.argv.concat();
args.splice(0, 2);
const compiler = args[0];
args.splice(0, 1);
const files = args;

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
if(compiler){
    require(compiler);
}
mocha.run();
