"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utilsPureComponent = require("../utils/PureComponent");

var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);

var _ErrorDisplay = require("./ErrorDisplay");

var _ErrorDisplay2 = _interopRequireDefault(_ErrorDisplay);

console.log(_react2["default"]);

var Test = (function (_PureComponent) {
    _inherits(Test, _PureComponent);

    function Test() {
        _classCallCheck(this, Test);

        _get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Test, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var testId = _props.testId;
            var byId = _props.byId;
            var action = _props.action;

            var test = byId("tests", testId);
            return _react2["default"].createElement(
                "li",
                { className: "list-item" },
                _react2["default"].createElement(
                    "div",
                    { className: this.getColor(test) },
                    test.title
                ),
                _react2["default"].createElement(
                    "div",
                    null,
                    this.getErrorInfo(test.error, action)
                )
            );
        }
    }, {
        key: "getErrorInfo",
        value: function getErrorInfo(error, action) {
            if (!error) {
                return null;
            }
            return _react2["default"].createElement(_ErrorDisplay2["default"], { error: error, action: action });
        }
    }, {
        key: "getColor",
        value: function getColor(_ref) {
            var status = _ref.status;

            if (status === "passed") {
                return "text-success icon-check";
            }
            if (status === "failed") {
                return "text-error icon-x";
            }
            return "text-subtle";
        }
    }]);

    return Test;
})(_utilsPureComponent2["default"]);

var Suite = (function (_PureComponent2) {
    _inherits(Suite, _PureComponent2);

    function Suite() {
        _classCallCheck(this, Suite);

        _get(Object.getPrototypeOf(Suite.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Suite, [{
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var suiteId = _props2.suiteId;
            var byId = _props2.byId;
            var toggleItem = _props2.toggleItem;
            var action = _props2.action;

            var suite = byId("suites", suiteId);
            var suites = suite.suites || [];
            var tests = suite.tests || [];
            return _react2["default"].createElement(
                "li",
                { className: "list-nested-item " + suite.toggleState },
                _react2["default"].createElement(
                    "div",
                    { onClick: function () {
                            return toggleItem(suiteId);
                        }, className: "list-item" },
                    _react2["default"].createElement(
                        "span",
                        { className: this.determineTitleColor(suite, tests, byId) },
                        suite.title
                    )
                ),
                _react2["default"].createElement(
                    "ul",
                    { className: "list-tree" },
                    tests.map(function (test) {
                        return _react2["default"].createElement(Test, { key: test, testId: test, byId: byId, action: action });
                    }),
                    suites.map(function (suite) {
                        return _react2["default"].createElement(Suite, { key: suite, suiteId: suite, byId: byId, toggleItem: toggleItem, action: action });
                    })
                )
            );
        }
    }, {
        key: "determineTitleColor",
        value: function determineTitleColor(suite) {
            if (suite.status === "partial") {
                return "text-warning icon-primitive-dot";
            }
            if (suite.status === "failed") {
                return "text-error icon-x";
            }
            if (suite.status === "passed") {
                return "text-success icon-check";
            }
            return "";
        }
    }]);

    return Suite;
})(_utilsPureComponent2["default"]);

exports["default"] = Suite;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QyxHQUFHLENBQUUsVUFBQSxLQUFLOytCQUFJLGlDQUFDLEtBQUssSUFBQyxHQUFHLEVBQUUsS0FBSyxBQUFDLEVBQUMsT0FBTyxFQUFFLEtBQUssQUFBQyxFQUFDLElBQUksRUFBRSxJQUFJLEFBQUMsRUFBQyxVQUFVLEVBQUUsVUFBVSxBQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQUFBQyxHQUFFO3FCQUFBLENBQUM7aUJBQy9HO2FBQ0osQ0FDUjtTQUNKOzs7ZUFFa0IsNkJBQUMsS0FBSyxFQUFDO0FBQ3RCLGdCQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDO0FBQzFCLHVCQUFPLGlDQUFpQyxDQUFDO2FBQzVDO0FBQ0QsZ0JBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7QUFDekIsdUJBQU8sbUJBQW1CLENBQUM7YUFDOUI7QUFDRCxnQkFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBQztBQUN6Qix1QkFBTyx5QkFBeUIsQ0FBQzthQUNwQztBQUNELG1CQUFPLEVBQUUsQ0FBQztTQUNiOzs7V0E5QmdCLEtBQUs7OztxQkFBTCxLQUFLIiwiZmlsZSI6ImNvbnRhaW5lcnMvU3VpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQdXJlQ29tcG9uZW50IGZyb20gXCIuLi91dGlscy9QdXJlQ29tcG9uZW50XCI7XHJcbmltcG9ydCBFcnJvckRpc3BsYXkgZnJvbSBcIi4vRXJyb3JEaXNwbGF5XCI7XHJcblxyXG5jb25zb2xlLmxvZyhSZWFjdCk7XHJcblxyXG5jbGFzcyBUZXN0IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHt0ZXN0SWQsIGJ5SWQsIGFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBieUlkKFwidGVzdHNcIiwgdGVzdElkKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDb2xvcih0ZXN0KX0+e3Rlc3QudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLmdldEVycm9ySW5mbyh0ZXN0LmVycm9yLCBhY3Rpb24pfTwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXRFcnJvckluZm8oZXJyb3IsIGFjdGlvbikge1xyXG4gICAgICAgIGlmKCFlcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPEVycm9yRGlzcGxheSBlcnJvcj17ZXJyb3J9IGFjdGlvbj17YWN0aW9ufS8+O1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sb3Ioe3N0YXR1c30pe1xyXG4gICAgICAgIGlmKHN0YXR1cyA9PT0gXCJwYXNzZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtc3VjY2VzcyBpY29uLWNoZWNrXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtZXJyb3IgaWNvbi14XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcInRleHQtc3VidGxlXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1aXRlIGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7c3VpdGVJZCwgYnlJZCwgdG9nZ2xlSXRlbSwgYWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlcyA9IHN1aXRlLnN1aXRlcyB8fCBbXTtcclxuICAgICAgICBjb25zdCB0ZXN0cyA9IHN1aXRlLnRlc3RzIHx8IFtdO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1wibGlzdC1uZXN0ZWQtaXRlbSBcIiArIHN1aXRlLnRvZ2dsZVN0YXRlfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgb25DbGljaz17KCk9PnRvZ2dsZUl0ZW0oc3VpdGVJZCl9IGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17dGhpcy5kZXRlcm1pbmVUaXRsZUNvbG9yKHN1aXRlLCB0ZXN0cywgYnlJZCl9PntzdWl0ZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LXRyZWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRlc3RzLm1hcCggdGVzdCA9PiA8VGVzdCBrZXk9e3Rlc3R9IHRlc3RJZD17dGVzdH0gYnlJZD17YnlJZH0gYWN0aW9uPXthY3Rpb259Lz4pIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHN1aXRlcy5tYXAoIHN1aXRlID0+IDxTdWl0ZSBrZXk9e3N1aXRlfSBzdWl0ZUlkPXtzdWl0ZX0gYnlJZD17YnlJZH0gdG9nZ2xlSXRlbT17dG9nZ2xlSXRlbX0gYWN0aW9uPXthY3Rpb259Lz4pIH1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGRldGVybWluZVRpdGxlQ29sb3Ioc3VpdGUpe1xyXG4gICAgICAgIGlmKHN1aXRlLnN0YXR1cyA9PT0gXCJwYXJ0aWFsXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXdhcm5pbmcgaWNvbi1wcmltaXRpdmUtZG90XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN1aXRlLnN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtZXJyb3IgaWNvbi14XCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN1aXRlLnN0YXR1cyA9PT0gXCJwYXNzZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtc3VjY2VzcyBpY29uLWNoZWNrXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
