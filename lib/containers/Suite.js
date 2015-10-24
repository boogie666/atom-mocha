"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utilsPureComponent = require("../utils/PureComponent");

var _utilsPureComponent2 = _interopRequireDefault(_utilsPureComponent);

var TestError = (function (_PureComponent) {
    _inherits(TestError, _PureComponent);

    function TestError() {
        _classCallCheck(this, TestError);

        _get(Object.getPrototypeOf(TestError.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TestError, [{
        key: "render",
        value: function render() {
            var _props = this.props;
            var error = _props.error;
            var action = _props.action;

            return _react2["default"].createElement(
                "atom-panel",
                { "class": "top" },
                _react2["default"].createElement(
                    "div",
                    null,
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-heading" },
                        _react2["default"].createElement(
                            "span",
                            { className: "text-error" },
                            error.message
                        )
                    ),
                    _react2["default"].createElement(
                        "div",
                        { className: "panel-body scroll-x" },
                        this.renderStackFrames(error.stack, action)
                    )
                )
            );
        }
    }, {
        key: "renderStackFrames",
        value: function renderStackFrames(stack, action) {
            var stackFrames = stack.map(function (frame, i) {
                return _react2["default"].createElement(
                    "li",
                    { key: i, className: "list-item text-subtle" },
                    _react2["default"].createElement(
                        "a",
                        { onClick: function () {
                                return action(frame);
                            }, className: "text-subtle" },
                        frame.source
                    )
                );
            });
            return _react2["default"].createElement(
                "ul",
                { className: "list-group" },
                stackFrames
            );
        }
    }]);

    return TestError;
})(_utilsPureComponent2["default"]);

var Test = (function (_PureComponent2) {
    _inherits(Test, _PureComponent2);

    function Test() {
        _classCallCheck(this, Test);

        _get(Object.getPrototypeOf(Test.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Test, [{
        key: "render",
        value: function render() {
            var _props2 = this.props;
            var testId = _props2.testId;
            var byId = _props2.byId;
            var action = _props2.action;

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
            return _react2["default"].createElement(TestError, { error: error, action: action });
        }
    }, {
        key: "getColor",
        value: function getColor(_ref) {
            var status = _ref.status;

            if (status === "passed") {
                return "text-success";
            }
            if (status === "failed") {
                return "text-error";
            }
            return "text-subtle";
        }
    }]);

    return Test;
})(_utilsPureComponent2["default"]);

var Suite = (function (_PureComponent3) {
    _inherits(Suite, _PureComponent3);

    function Suite() {
        _classCallCheck(this, Suite);

        _get(Object.getPrototypeOf(Suite.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Suite, [{
        key: "render",
        value: function render() {
            var _props3 = this.props;
            var suiteId = _props3.suiteId;
            var byId = _props3.byId;
            var toggleItem = _props3.toggleItem;
            var action = _props3.action;

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
                return "text-warning";
            }
            if (suite.status === "failed") {
                return "text-error";
            }
            if (suite.status === "passed") {
                return "text-success";
            }
            return "";
        }
    }]);

    return Suite;
})(_utilsPureComponent2["default"]);

exports["default"] = Suite;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QztpQkFDL0c7YUFDSixDQUNSO1NBQ0o7OztlQUVrQiw2QkFBQyxLQUFLLEVBQUM7QUFDdEIsZ0JBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUM7QUFDMUIsdUJBQU8sY0FBYyxDQUFDO2FBQ3pCO0FBQ0QsZ0JBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7QUFDekIsdUJBQU8sWUFBWSxDQUFDO2FBQ3ZCO0FBQ0QsZ0JBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7QUFDekIsdUJBQU8sY0FBYyxDQUFDO2FBQ3pCO0FBQ0QsbUJBQU8sRUFBRSxDQUFDO1NBQ2I7OztXQTlCZ0IsS0FBSzs7O3FCQUFMLEtBQUsiLCJmaWxlIjoiY29udGFpbmVycy9TdWl0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFB1cmVDb21wb25lbnQgZnJvbSBcIi4uL3V0aWxzL1B1cmVDb21wb25lbnRcIjtcclxuXHJcbmNsYXNzIFRlc3RFcnJvciBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7ZXJyb3IsIGFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhdG9tLXBhbmVsIGNsYXNzPSd0b3AnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZXJyb3JcIj57ZXJyb3IubWVzc2FnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5IHNjcm9sbC14XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YWNrRnJhbWVzKGVycm9yLnN0YWNrLCBhY3Rpb24pfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvYXRvbS1wYW5lbD5cclxuICAgICAgICApXHJcbiAgICB9XHJcbiAgICByZW5kZXJTdGFja0ZyYW1lcyhzdGFjaywgYWN0aW9uKXtcclxuICAgICAgICBjb25zdCBzdGFja0ZyYW1lcyA9IHN0YWNrLm1hcCgoZnJhbWUsIGkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT1cImxpc3QtaXRlbSB0ZXh0LXN1YnRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxhIG9uQ2xpY2s9eygpPT5hY3Rpb24oZnJhbWUpfSBjbGFzc05hbWU9XCJ0ZXh0LXN1YnRsZVwiPntmcmFtZS5zb3VyY2V9PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPSdsaXN0LWdyb3VwJz5cclxuICAgICAgICAgICAgICAgIHtzdGFja0ZyYW1lc31cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUZXN0IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHt0ZXN0SWQsIGJ5SWQsIGFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHRlc3QgPSBieUlkKFwidGVzdHNcIiwgdGVzdElkKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDb2xvcih0ZXN0KX0+e3Rlc3QudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLmdldEVycm9ySW5mbyh0ZXN0LmVycm9yLCBhY3Rpb24pfTwvZGl2PlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXRFcnJvckluZm8oZXJyb3IsIGFjdGlvbikge1xyXG4gICAgICAgIGlmKCFlcnJvcil7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPFRlc3RFcnJvciBlcnJvcj17ZXJyb3J9IGFjdGlvbj17YWN0aW9ufS8+O1xyXG4gICAgfVxyXG4gICAgZ2V0Q29sb3Ioe3N0YXR1c30pe1xyXG4gICAgICAgIGlmKHN0YXR1cyA9PT0gXCJwYXNzZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtc3VjY2Vzc1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0dXMgPT09IFwiZmFpbGVkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LWVycm9yXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcInRleHQtc3VidGxlXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1aXRlIGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCB7c3VpdGVJZCwgYnlJZCwgdG9nZ2xlSXRlbSwgYWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgc3VpdGUgPSBieUlkKFwic3VpdGVzXCIsIHN1aXRlSWQpO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlcyA9IHN1aXRlLnN1aXRlcyB8fCBbXTtcclxuICAgICAgICBjb25zdCB0ZXN0cyA9IHN1aXRlLnRlc3RzIHx8IFtdO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e1wibGlzdC1uZXN0ZWQtaXRlbSBcIiArIHN1aXRlLnRvZ2dsZVN0YXRlfT5cclxuICAgICAgICAgICAgICAgIDxkaXYgb25DbGljaz17KCk9PnRvZ2dsZUl0ZW0oc3VpdGVJZCl9IGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17dGhpcy5kZXRlcm1pbmVUaXRsZUNvbG9yKHN1aXRlLCB0ZXN0cywgYnlJZCl9PntzdWl0ZS50aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LXRyZWVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IHRlc3RzLm1hcCggdGVzdCA9PiA8VGVzdCBrZXk9e3Rlc3R9IHRlc3RJZD17dGVzdH0gYnlJZD17YnlJZH0gYWN0aW9uPXthY3Rpb259Lz4pIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHN1aXRlcy5tYXAoIHN1aXRlID0+IDxTdWl0ZSBrZXk9e3N1aXRlfSBzdWl0ZUlkPXtzdWl0ZX0gYnlJZD17YnlJZH0gdG9nZ2xlSXRlbT17dG9nZ2xlSXRlbX0gYWN0aW9uPXthY3Rpb259Lz4pIH1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGRldGVybWluZVRpdGxlQ29sb3Ioc3VpdGUpe1xyXG4gICAgICAgIGlmKHN1aXRlLnN0YXR1cyA9PT0gXCJwYXJ0aWFsXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXdhcm5pbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3VpdGUuc3RhdHVzID09PSBcImZhaWxlZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC1lcnJvclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFzc2VkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1Y2Nlc3NcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
