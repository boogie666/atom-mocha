"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mochaReporter = require("./mocha-reporter");

var _mochaReporter2 = _interopRequireDefault(_mochaReporter);

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var files = process.argv.concat();
files.splice(0, 2);

var mocha = new _mocha2["default"]({ reporter: _mochaReporter2["default"] });
files.forEach(function (file) {
    return mocha.addFile(file);
});

process.on("uncaughtException", function (error) {
    process.send({
        messaege: "ERROR",
        error: error.message
    });
});

process.send({
    messaege: "INIT",
    files: files
});
require("babel/register");
mocha.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXByb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs2QkFDcUIsa0JBQWtCOzs7O3FCQUNyQixPQUFPOzs7O0FBRXpCLElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRW5CLElBQU0sS0FBSyxHQUFHLHVCQUFVLEVBQUUsUUFBUSw0QkFBQSxFQUFFLENBQUMsQ0FBQztBQUN0QyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtXQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQUEsQ0FBQyxDQUFDOztBQUU3QyxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQVMsS0FBSyxFQUFDO0FBQzNDLFdBQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxnQkFBUSxFQUFHLE9BQU87QUFDbEIsYUFBSyxFQUFHLEtBQUssQ0FBQyxPQUFPO0tBQ3hCLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7QUFFSCxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsWUFBUSxFQUFHLE1BQU07QUFDakIsU0FBSyxFQUFHLEtBQUs7Q0FDaEIsQ0FBQyxDQUFBO0FBQ0YsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6Im1vY2hhL21vY2hhLXByb2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHJlcG9ydGVyIGZyb20gXCIuL21vY2hhLXJlcG9ydGVyXCI7XHJcbmltcG9ydCBNb2NoYSBmcm9tIFwibW9jaGFcIjtcclxuXHJcbmNvbnN0IGZpbGVzID0gcHJvY2Vzcy5hcmd2LmNvbmNhdCgpO1xyXG5maWxlcy5zcGxpY2UoMCwgMik7XHJcblxyXG5jb25zdCBtb2NoYSA9IG5ldyBNb2NoYSh7IHJlcG9ydGVyIH0pO1xyXG5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiBtb2NoYS5hZGRGaWxlKGZpbGUpKTtcclxuXHJcbnByb2Nlc3Mub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiLCBmdW5jdGlvbihlcnJvcil7XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZWdlIDogXCJFUlJPUlwiLFxyXG4gICAgICAgIGVycm9yIDogZXJyb3IubWVzc2FnZVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxucHJvY2Vzcy5zZW5kKHtcclxuICAgIG1lc3NhZWdlIDogXCJJTklUXCIsXHJcbiAgICBmaWxlcyA6IGZpbGVzXHJcbn0pXHJcbnJlcXVpcmUoXCJiYWJlbC9yZWdpc3RlclwiKTtcclxubW9jaGEucnVuKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
