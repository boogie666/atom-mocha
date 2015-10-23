
import reporter from "./mocha-reporter";
import Mocha from "mocha";

const files = process.argv.concat();
files.splice(0, 2);

const mocha = new Mocha({ reporter });
files.forEach((file) => mocha.addFile(file));

process.on("uncaughtException", function(error){
    process.send({
        messaege : "ERROR",
        error : error.message
    });
});

process.send({
    messaege : "INIT",
    files : files
});
require("babel/register");
mocha.run();
