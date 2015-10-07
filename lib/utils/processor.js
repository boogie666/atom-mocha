"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _normalizr = require('normalizr');

var test = new _normalizr.Schema("tests");
var suite = new _normalizr.Schema("suites");

suite.define({
    tests: (0, _normalizr.arrayOf)(test),
    suites: (0, _normalizr.arrayOf)(suite)
});

exports["default"] = function (data) {
    return (0, _normalizr.normalize)(data, (0, _normalizr.arrayOf)(suite));
};

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL3Byb2Nlc3Nvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7eUJBQTJDLFdBQVc7O0FBRXRELElBQU0sSUFBSSxHQUFHLHNCQUFXLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLElBQU0sS0FBSyxHQUFHLHNCQUFXLFFBQVEsQ0FBQyxDQUFDOztBQUVuQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ1QsU0FBSyxFQUFHLHdCQUFRLElBQUksQ0FBQztBQUNyQixVQUFNLEVBQUcsd0JBQVEsS0FBSyxDQUFDO0NBQzFCLENBQUMsQ0FBQzs7cUJBRVksVUFBUyxJQUFJLEVBQUM7QUFDekIsV0FBTywwQkFBVSxJQUFJLEVBQUUsd0JBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQztDQUMxQyIsImZpbGUiOiJ1dGlscy9wcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBub3JtYWxpemUsIFNjaGVtYSwgYXJyYXlPZiB9IGZyb20gJ25vcm1hbGl6cic7XHJcblxyXG5jb25zdCB0ZXN0ID0gbmV3IFNjaGVtYShcInRlc3RzXCIpO1xyXG5jb25zdCBzdWl0ZSA9IG5ldyBTY2hlbWEoXCJzdWl0ZXNcIik7XHJcblxyXG5zdWl0ZS5kZWZpbmUoe1xyXG4gICAgdGVzdHMgOiBhcnJheU9mKHRlc3QpLFxyXG4gICAgc3VpdGVzIDogYXJyYXlPZihzdWl0ZSlcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkYXRhKXtcclxuICAgIHJldHVybiBub3JtYWxpemUoZGF0YSwgYXJyYXlPZihzdWl0ZSkpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
