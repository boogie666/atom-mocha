var process = require("child_process");

var testFiles = [__dirname + '\\simpleTest.js'];

var mocha = process.fork(__dirname + '/../lib/mocha/mocha-process.js', testFiles);

mocha.on("message", function(data){
    console.log(data);
});
