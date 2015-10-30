"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _mochaReporter = require("./mocha-reporter");

var _mochaReporter2 = _interopRequireDefault(_mochaReporter);

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _errorStackParser = require("error-stack-parser");

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

var files = process.argv.concat();
files.splice(0, 2);

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

var mocha = new _mocha2["default"]({ reporter: _mochaReporter2["default"] });
files.forEach(function (file) {
    return mocha.addFile(file);
});

process.send({
    messaege: "INIT",
    files: files
});
require("babel/register");
mocha.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXByb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs2QkFBcUIsa0JBQWtCOzs7O3FCQUNyQixPQUFPOzs7O2dDQUNJLG9CQUFvQjs7OztBQUVqRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUVuQixPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQUMsQ0FBQyxFQUFHO0FBQ2pDLFdBQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxlQUFPLEVBQUcsT0FBTztBQUNqQixhQUFLLEVBQUc7QUFDSixtQkFBTyxFQUFHLENBQUMsQ0FBQyxPQUFPO0FBQ25CLGdCQUFJLEVBQUcsQ0FBQyxDQUFDLElBQUk7QUFDYixpQkFBSyxFQUFHLDhCQUFpQixLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0tBQ0osQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDOztBQUVILElBQU0sS0FBSyxHQUFHLHVCQUFVLEVBQUUsUUFBUSw0QkFBQSxFQUFFLENBQUMsQ0FBQztBQUN0QyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtXQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0NBQUEsQ0FBQyxDQUFDOztBQUU3QyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsWUFBUSxFQUFHLE1BQU07QUFDakIsU0FBSyxFQUFHLEtBQUs7Q0FDaEIsQ0FBQyxDQUFDO0FBQ0gsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUIsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6Im1vY2hhL21vY2hhLXByb2Nlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcmVwb3J0ZXIgZnJvbSBcIi4vbW9jaGEtcmVwb3J0ZXJcIjtcclxuaW1wb3J0IE1vY2hhIGZyb20gXCJtb2NoYVwiO1xyXG5pbXBvcnQgRXJyb3JTdGFja1BhcnNlciBmcm9tIFwiZXJyb3Itc3RhY2stcGFyc2VyXCI7XHJcblxyXG5jb25zdCBmaWxlcyA9IHByb2Nlc3MuYXJndi5jb25jYXQoKTtcclxuZmlsZXMuc3BsaWNlKDAsIDIpO1xyXG5cclxucHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCAoZSk9PntcclxuICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IFwiRVJST1JcIixcclxuICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgbWVzc2FnZSA6IGUubWVzc2FnZSxcclxuICAgICAgICAgICAgbmFtZSA6IGUubmFtZSxcclxuICAgICAgICAgICAgc3RhY2sgOiBFcnJvclN0YWNrUGFyc2VyLnBhcnNlKGUpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuY29uc3QgbW9jaGEgPSBuZXcgTW9jaGEoeyByZXBvcnRlciB9KTtcclxuZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4gbW9jaGEuYWRkRmlsZShmaWxlKSk7XHJcblxyXG5wcm9jZXNzLnNlbmQoe1xyXG4gICAgbWVzc2FlZ2UgOiBcIklOSVRcIixcclxuICAgIGZpbGVzIDogZmlsZXNcclxufSk7XHJcbnJlcXVpcmUoXCJiYWJlbC9yZWdpc3RlclwiKTtcclxubW9jaGEucnVuKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
