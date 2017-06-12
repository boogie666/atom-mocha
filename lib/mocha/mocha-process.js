"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mochaReporter = require("./mocha-reporter");

var _mochaReporter2 = _interopRequireDefault(_mochaReporter);

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _errorStackParser = require("error-stack-parser");

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

var args = process.argv.concat();
args.splice(0, 2);
var compiler = args[0];
args.splice(0, 1);
var files = args;

process.on('uncaughtException', function (e) {
    process.send({
        message: "ERROR",
        error: {
            message: e.message,
            name: e.name,
            stack: _errorStackParser2["default"].parse(e)
        }
    });
});

process.send = process.send || function (args) {
    console.log(JSON.stringify(args, null, "\t"));
};

var mocha = new _mocha2["default"]({ reporter: _mochaReporter2["default"] });
files.forEach(function (file) {
    return mocha.addFile(file);
});

process.send({
    messaege: "INIT",
    files: files
});
if (compiler) {
    require(compiler);
}
mocha.run();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXByb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs2QkFBcUIsa0JBQWtCOzs7O3FCQUNyQixPQUFPOzs7O2dDQUNJLG9CQUFvQjs7OztBQUVqRCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRW5CLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUc7QUFDakMsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxPQUFPO0FBQ2pCLGFBQUssRUFBRztBQUNKLG1CQUFPLEVBQUcsQ0FBQyxDQUFDLE9BQU87QUFDbkIsZ0JBQUksRUFBRyxDQUFDLENBQUMsSUFBSTtBQUNiLGlCQUFLLEVBQUcsOEJBQWlCLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDcEM7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7O0FBRUgsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLFVBQVMsSUFBSSxFQUFDO0FBQzNDLFdBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Q0FDL0MsQ0FBQzs7QUFFRixJQUFNLEtBQUssR0FBRyx1QkFBVSxFQUFFLFFBQVEsNEJBQUEsRUFBRSxDQUFDLENBQUM7QUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7V0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztDQUFBLENBQUMsQ0FBQzs7QUFFN0MsT0FBTyxDQUFDLElBQUksQ0FBQztBQUNULFlBQVEsRUFBRyxNQUFNO0FBQ2pCLFNBQUssRUFBRyxLQUFLO0NBQ2hCLENBQUMsQ0FBQztBQUNILElBQUcsUUFBUSxFQUFDO0FBQ1IsV0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ3JCO0FBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6Im1vY2hhL21vY2hhLXByb2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVwb3J0ZXIgZnJvbSBcIi4vbW9jaGEtcmVwb3J0ZXJcIjtcclxuaW1wb3J0IE1vY2hhIGZyb20gXCJtb2NoYVwiO1xyXG5pbXBvcnQgRXJyb3JTdGFja1BhcnNlciBmcm9tIFwiZXJyb3Itc3RhY2stcGFyc2VyXCI7XHJcblxyXG5jb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2LmNvbmNhdCgpO1xyXG5hcmdzLnNwbGljZSgwLCAyKTtcclxuY29uc3QgY29tcGlsZXIgPSBhcmdzWzBdO1xyXG5hcmdzLnNwbGljZSgwLCAxKTtcclxuY29uc3QgZmlsZXMgPSBhcmdzO1xyXG5cclxucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCAoZSk9PntcclxuICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IFwiRVJST1JcIixcclxuICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgbWVzc2FnZSA6IGUubWVzc2FnZSxcclxuICAgICAgICAgICAgbmFtZSA6IGUubmFtZSxcclxuICAgICAgICAgICAgc3RhY2sgOiBFcnJvclN0YWNrUGFyc2VyLnBhcnNlKGUpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxucHJvY2Vzcy5zZW5kID0gcHJvY2Vzcy5zZW5kIHx8IGZ1bmN0aW9uKGFyZ3Mpe1xyXG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZ3MsIG51bGwsIFwiXFx0XCIpKTtcclxufTtcclxuXHJcbmNvbnN0IG1vY2hhID0gbmV3IE1vY2hhKHsgcmVwb3J0ZXIgfSk7XHJcbmZpbGVzLmZvckVhY2goKGZpbGUpID0+IG1vY2hhLmFkZEZpbGUoZmlsZSkpO1xyXG5cclxucHJvY2Vzcy5zZW5kKHtcclxuICAgIG1lc3NhZWdlIDogXCJJTklUXCIsXHJcbiAgICBmaWxlcyA6IGZpbGVzXHJcbn0pO1xyXG5pZihjb21waWxlcil7XHJcbiAgICByZXF1aXJlKGNvbXBpbGVyKTtcclxufVxyXG5tb2NoYS5ydW4oKTtcclxuIl19
