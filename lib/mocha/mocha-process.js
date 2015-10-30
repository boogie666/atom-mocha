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
/**
console.log(e.message);                // "missing ; before statement"
  console.log(e.name);                   // "SyntaxError"
  console.log(e.fileName);               // "Scratchpad/1"
  console.log(e.lineNumber);             // 1
  console.log(e.columnNumber);           // 4
  console.log(e.stack);
*/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXByb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs2QkFBcUIsa0JBQWtCOzs7O3FCQUNyQixPQUFPOzs7O2dDQUNJLG9CQUFvQjs7OztBQUVqRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7QUFTbkIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxVQUFDLENBQUMsRUFBRztBQUNqQyxXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLE9BQU87QUFDakIsYUFBSyxFQUFHO0FBQ0osbUJBQU8sRUFBRyxDQUFDLENBQUMsT0FBTztBQUNuQixnQkFBSSxFQUFHLENBQUMsQ0FBQyxJQUFJO0FBQ2IsaUJBQUssRUFBRyw4QkFBaUIsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNwQztLQUNKLENBQUMsQ0FBQztDQUNOLENBQUMsQ0FBQzs7QUFFSCxJQUFNLEtBQUssR0FBRyx1QkFBVSxFQUFFLFFBQVEsNEJBQUEsRUFBRSxDQUFDLENBQUM7QUFDdEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7V0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztDQUFBLENBQUMsQ0FBQzs7QUFFN0MsT0FBTyxDQUFDLElBQUksQ0FBQztBQUNULFlBQVEsRUFBRyxNQUFNO0FBQ2pCLFNBQUssRUFBRyxLQUFLO0NBQ2hCLENBQUMsQ0FBQztBQUNILE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFCLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJtb2NoYS9tb2NoYS1wcm9jZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcG9ydGVyIGZyb20gXCIuL21vY2hhLXJlcG9ydGVyXCI7XHJcbmltcG9ydCBNb2NoYSBmcm9tIFwibW9jaGFcIjtcclxuaW1wb3J0IEVycm9yU3RhY2tQYXJzZXIgZnJvbSBcImVycm9yLXN0YWNrLXBhcnNlclwiO1xyXG5cclxuY29uc3QgZmlsZXMgPSBwcm9jZXNzLmFyZ3YuY29uY2F0KCk7XHJcbmZpbGVzLnNwbGljZSgwLCAyKTtcclxuLyoqXHJcbmNvbnNvbGUubG9nKGUubWVzc2FnZSk7ICAgICAgICAgICAgICAgIC8vIFwibWlzc2luZyA7IGJlZm9yZSBzdGF0ZW1lbnRcIlxyXG4gIGNvbnNvbGUubG9nKGUubmFtZSk7ICAgICAgICAgICAgICAgICAgIC8vIFwiU3ludGF4RXJyb3JcIlxyXG4gIGNvbnNvbGUubG9nKGUuZmlsZU5hbWUpOyAgICAgICAgICAgICAgIC8vIFwiU2NyYXRjaHBhZC8xXCJcclxuICBjb25zb2xlLmxvZyhlLmxpbmVOdW1iZXIpOyAgICAgICAgICAgICAvLyAxXHJcbiAgY29uc29sZS5sb2coZS5jb2x1bW5OdW1iZXIpOyAgICAgICAgICAgLy8gNFxyXG4gIGNvbnNvbGUubG9nKGUuc3RhY2spO1xyXG4qL1xyXG5wcm9jZXNzLm9uKCd1bmNhdWdodEV4Y2VwdGlvbicsIChlKT0+e1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJFUlJPUlwiLFxyXG4gICAgICAgIGVycm9yIDoge1xyXG4gICAgICAgICAgICBtZXNzYWdlIDogZS5tZXNzYWdlLFxyXG4gICAgICAgICAgICBuYW1lIDogZS5uYW1lLFxyXG4gICAgICAgICAgICBzdGFjayA6IEVycm9yU3RhY2tQYXJzZXIucGFyc2UoZSlcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5jb25zdCBtb2NoYSA9IG5ldyBNb2NoYSh7IHJlcG9ydGVyIH0pO1xyXG5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiBtb2NoYS5hZGRGaWxlKGZpbGUpKTtcclxuXHJcbnByb2Nlc3Muc2VuZCh7XHJcbiAgICBtZXNzYWVnZSA6IFwiSU5JVFwiLFxyXG4gICAgZmlsZXMgOiBmaWxlc1xyXG59KTtcclxucmVxdWlyZShcImJhYmVsL3JlZ2lzdGVyXCIpO1xyXG5tb2NoYS5ydW4oKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
