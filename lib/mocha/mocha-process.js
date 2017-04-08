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

process.send = process.send || function () {
    console.log.apply(console, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL21vY2hhLXByb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs2QkFBcUIsa0JBQWtCOzs7O3FCQUNyQixPQUFPOzs7O2dDQUNJLG9CQUFvQjs7OztBQUVqRCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNsQixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRW5CLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsVUFBQyxDQUFDLEVBQUc7QUFDakMsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxPQUFPO0FBQ2pCLGFBQUssRUFBRztBQUNKLG1CQUFPLEVBQUcsQ0FBQyxDQUFDLE9BQU87QUFDbkIsZ0JBQUksRUFBRyxDQUFDLENBQUMsSUFBSTtBQUNiLGlCQUFLLEVBQUcsOEJBQWlCLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDcEM7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLENBQUM7O0FBRUgsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLFlBQVU7QUFDdkMsV0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3ZDLENBQUM7O0FBRUYsSUFBTSxLQUFLLEdBQUcsdUJBQVUsRUFBRSxRQUFRLDRCQUFBLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1dBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Q0FBQSxDQUFDLENBQUM7O0FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxZQUFRLEVBQUcsTUFBTTtBQUNqQixTQUFLLEVBQUcsS0FBSztDQUNoQixDQUFDLENBQUM7QUFDSCxJQUFHLFFBQVEsRUFBQztBQUNSLFdBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNyQjtBQUNELEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJtb2NoYS9tb2NoYS1wcm9jZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcG9ydGVyIGZyb20gXCIuL21vY2hhLXJlcG9ydGVyXCI7XHJcbmltcG9ydCBNb2NoYSBmcm9tIFwibW9jaGFcIjtcclxuaW1wb3J0IEVycm9yU3RhY2tQYXJzZXIgZnJvbSBcImVycm9yLXN0YWNrLXBhcnNlclwiO1xyXG5cclxuY29uc3QgYXJncyA9IHByb2Nlc3MuYXJndi5jb25jYXQoKTtcclxuYXJncy5zcGxpY2UoMCwgMik7XHJcbmNvbnN0IGNvbXBpbGVyID0gYXJnc1swXTtcclxuYXJncy5zcGxpY2UoMCwgMSk7XHJcbmNvbnN0IGZpbGVzID0gYXJncztcclxuXHJcbnByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgKGUpPT57XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZ2UgOiBcIkVSUk9SXCIsXHJcbiAgICAgICAgZXJyb3IgOiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBlLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIG5hbWUgOiBlLm5hbWUsXHJcbiAgICAgICAgICAgIHN0YWNrIDogRXJyb3JTdGFja1BhcnNlci5wYXJzZShlKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbnByb2Nlc3Muc2VuZCA9IHByb2Nlc3Muc2VuZCB8fCBmdW5jdGlvbigpe1xyXG4gIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XHJcbn07XHJcblxyXG5jb25zdCBtb2NoYSA9IG5ldyBNb2NoYSh7IHJlcG9ydGVyIH0pO1xyXG5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiBtb2NoYS5hZGRGaWxlKGZpbGUpKTtcclxuXHJcbnByb2Nlc3Muc2VuZCh7XHJcbiAgICBtZXNzYWVnZSA6IFwiSU5JVFwiLFxyXG4gICAgZmlsZXMgOiBmaWxlc1xyXG59KTtcclxuaWYoY29tcGlsZXIpe1xyXG4gICAgcmVxdWlyZShjb21waWxlcik7XHJcbn1cclxubW9jaGEucnVuKCk7XHJcbiJdfQ==
