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

var TestError = (function (_Component) {
    _inherits(TestError, _Component);

    function TestError() {
        _classCallCheck(this, TestError);

        _get(Object.getPrototypeOf(TestError.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TestError, [{
        key: "render",
        value: function render() {
            var error = this.props.error;

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
                        this.renderStackFrames(error.stack)
                    )
                )
            );
        }
    }, {
        key: "renderStackFrames",
        value: function renderStackFrames(stack) {
            var stackFrames = stack.map(function (frame, i) {
                return _react2["default"].createElement(
                    "li",
                    { key: i, className: "list-item" },
                    frame.source
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
})(_react.Component);

var Test = (function (_Component2) {
    _inherits(Test, _Component2);

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

            var test = byId("tests", testId);
            return _react2["default"].createElement(
                "li",
                { className: "list-item " + this.getColor(test) },
                _react2["default"].createElement(
                    "div",
                    null,
                    test.title
                ),
                _react2["default"].createElement(
                    "div",
                    null,
                    this.getErrorInfo(test.error)
                )
            );
        }
    }, {
        key: "getErrorInfo",
        value: function getErrorInfo(error) {
            if (!error) {
                return null;
            }
            return _react2["default"].createElement(TestError, { error: error });
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
})(_react.Component);

var Suite = (function (_Component3) {
    _inherits(Suite, _Component3);

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
                        return _react2["default"].createElement(Test, { key: test, testId: test, byId: byId });
                    }),
                    suites.map(function (suite) {
                        return _react2["default"].createElement(Suite, { key: suite, suiteId: suite, byId: byId, toggleItem: toggleItem });
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
})(_react.Component);

exports["default"] = Suite;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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OztxQkFBTCxLQUFLIiwiZmlsZSI6ImNvbnRhaW5lcnMvU3VpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuXHJcbmNsYXNzIFRlc3RFcnJvciBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtlcnJvcn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxhdG9tLXBhbmVsIGNsYXNzPSd0b3AnPlxyXG4gICAgICAgICAgICAgICAgPGRpdiA+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZXJyb3JcIj57ZXJyb3IubWVzc2FnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1ib2R5IHNjcm9sbC14XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclN0YWNrRnJhbWVzKGVycm9yLnN0YWNrKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2F0b20tcGFuZWw+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyU3RhY2tGcmFtZXMoc3RhY2spe1xyXG4gICAgICAgIGNvbnN0IHN0YWNrRnJhbWVzID0gc3RhY2subWFwKChmcmFtZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gPGxpIGtleT17aX0gY2xhc3NOYW1lPVwibGlzdC1pdGVtXCI+e2ZyYW1lLnNvdXJjZX08L2xpPlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J2xpc3QtZ3JvdXAnPlxyXG4gICAgICAgICAgICAgICAge3N0YWNrRnJhbWVzfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dGVzdElkLCBieUlkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0SWQpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9eyBcImxpc3QtaXRlbSBcIiArIHRoaXMuZ2V0Q29sb3IodGVzdCkgfT5cclxuICAgICAgICAgICAgICAgIDxkaXY+e3Rlc3QudGl0bGV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLmdldEVycm9ySW5mbyh0ZXN0LmVycm9yKX08L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0RXJyb3JJbmZvKGVycm9yKSB7XHJcbiAgICAgICAgaWYoIWVycm9yKXtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8VGVzdEVycm9yIGVycm9yPXtlcnJvcn0gLz47XHJcbiAgICB9XHJcbiAgICBnZXRDb2xvcih7c3RhdHVzfSl7XHJcbiAgICAgICAgaWYoc3RhdHVzID09PSBcInBhc3NlZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC1zdWNjZXNzXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0YXR1cyA9PT0gXCJmYWlsZWRcIil7XHJcbiAgICAgICAgICAgIHJldHVybiBcInRleHQtZXJyb3JcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwidGV4dC1zdWJ0bGVcIjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3VpdGUgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlSWQsIGJ5SWQsIHRvZ2dsZUl0ZW19ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBzdWl0ZSA9IGJ5SWQoXCJzdWl0ZXNcIiwgc3VpdGVJZCk7XHJcbiAgICAgICAgY29uc3Qgc3VpdGVzID0gc3VpdGUuc3VpdGVzIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IHRlc3RzID0gc3VpdGUudGVzdHMgfHwgW107XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT17XCJsaXN0LW5lc3RlZC1pdGVtIFwiICsgc3VpdGUudG9nZ2xlU3RhdGV9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXsoKT0+dG9nZ2xlSXRlbShzdWl0ZUlkKX0gY2xhc3NOYW1lPVwibGlzdC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXt0aGlzLmRldGVybWluZVRpdGxlQ29sb3Ioc3VpdGUsIHRlc3RzLCBieUlkKX0+e3N1aXRlLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtdHJlZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGVzdHMubWFwKCB0ZXN0ID0+IDxUZXN0IGtleT17dGVzdH0gdGVzdElkPXt0ZXN0fSBieUlkPXtieUlkfS8+KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdWl0ZXMubWFwKCBzdWl0ZSA9PiA8U3VpdGUga2V5PXtzdWl0ZX0gc3VpdGVJZD17c3VpdGV9IGJ5SWQ9e2J5SWR9IHRvZ2dsZUl0ZW09e3RvZ2dsZUl0ZW19Lz4pIH1cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGRldGVybWluZVRpdGxlQ29sb3Ioc3VpdGUpe1xyXG4gICAgICAgIGlmKHN1aXRlLnN0YXR1cyA9PT0gXCJwYXJ0aWFsXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXdhcm5pbmdcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3VpdGUuc3RhdHVzID09PSBcImZhaWxlZFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC1lcnJvclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFzc2VkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1Y2Nlc3NcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
