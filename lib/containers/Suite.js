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
//# sourceMappingURL=data:application/json;base64,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LENBQUM7aUJBQy9HO2FBQ0osQ0FDUjtTQUNKOzs7ZUFFa0IsNkJBQUMsS0FBSyxFQUFDO0FBQ3RCLGdCQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFDO0FBQzFCLHVCQUFPLGlDQUFpQyxDQUFDO2FBQzVDO0FBQ0QsZ0JBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7QUFDekIsdUJBQU8sbUJBQW1CLENBQUM7YUFDOUI7QUFDRCxnQkFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBQztBQUN6Qix1QkFBTyx5QkFBeUIsQ0FBQzthQUNwQztBQUNELG1CQUFPLEVBQUUsQ0FBQztTQUNiOzs7V0E5QmdCLEtBQUs7OztxQkFBTCxLQUFLIiwiZmlsZSI6ImNvbnRhaW5lcnMvU3VpdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQdXJlQ29tcG9uZW50IGZyb20gXCIuLi91dGlscy9QdXJlQ29tcG9uZW50XCI7XHJcblxyXG5jbGFzcyBUZXN0RXJyb3IgZXh0ZW5kcyBQdXJlQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge2Vycm9yLCBhY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8YXRvbS1wYW5lbCBjbGFzcz0ndG9wJz5cclxuICAgICAgICAgICAgICAgIDxkaXYgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVycm9yXCI+e2Vycm9yLm1lc3NhZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtYm9keSBzY3JvbGwteFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJTdGFja0ZyYW1lcyhlcnJvci5zdGFjaywgYWN0aW9uKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2F0b20tcGFuZWw+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyU3RhY2tGcmFtZXMoc3RhY2ssIGFjdGlvbil7XHJcbiAgICAgICAgY29uc3Qgc3RhY2tGcmFtZXMgPSBzdGFjay5tYXAoKGZyYW1lLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtpfSBjbGFzc05hbWU9XCJsaXN0LWl0ZW0gdGV4dC1zdWJ0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8YSBvbkNsaWNrPXsoKT0+YWN0aW9uKGZyYW1lKX0gY2xhc3NOYW1lPVwidGV4dC1zdWJ0bGVcIj57ZnJhbWUuc291cmNlfTwvYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT0nbGlzdC1ncm91cCc+XHJcbiAgICAgICAgICAgICAgICB7c3RhY2tGcmFtZXN9XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGVzdCBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dGVzdElkLCBieUlkLCBhY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB0ZXN0ID0gYnlJZChcInRlc3RzXCIsIHRlc3RJZCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q29sb3IodGVzdCl9Pnt0ZXN0LnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5nZXRFcnJvckluZm8odGVzdC5lcnJvciwgYWN0aW9uKX08L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0RXJyb3JJbmZvKGVycm9yLCBhY3Rpb24pIHtcclxuICAgICAgICBpZighZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxUZXN0RXJyb3IgZXJyb3I9e2Vycm9yfSBhY3Rpb249e2FjdGlvbn0vPjtcclxuICAgIH1cclxuICAgIGdldENvbG9yKHtzdGF0dXN9KXtcclxuICAgICAgICBpZihzdGF0dXMgPT09IFwicGFzc2VkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1Y2Nlc3MgaWNvbi1jaGVja1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0dXMgPT09IFwiZmFpbGVkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LWVycm9yIGljb24teFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1YnRsZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWl0ZSBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlSWQsIGJ5SWQsIHRvZ2dsZUl0ZW0sIGFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlID0gYnlJZChcInN1aXRlc1wiLCBzdWl0ZUlkKTtcclxuICAgICAgICBjb25zdCBzdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMgfHwgW107XHJcbiAgICAgICAgY29uc3QgdGVzdHMgPSBzdWl0ZS50ZXN0cyB8fCBbXTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcImxpc3QtbmVzdGVkLWl0ZW0gXCIgKyBzdWl0ZS50b2dnbGVTdGF0ZX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eygpPT50b2dnbGVJdGVtKHN1aXRlSWQpfSBjbGFzc05hbWU9XCJsaXN0LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3RoaXMuZGV0ZXJtaW5lVGl0bGVDb2xvcihzdWl0ZSwgdGVzdHMsIGJ5SWQpfT57c3VpdGUudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC10cmVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXN0cy5tYXAoIHRlc3QgPT4gPFRlc3Qga2V5PXt0ZXN0fSB0ZXN0SWQ9e3Rlc3R9IGJ5SWQ9e2J5SWR9IGFjdGlvbj17YWN0aW9ufS8+KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdWl0ZXMubWFwKCBzdWl0ZSA9PiA8U3VpdGUga2V5PXtzdWl0ZX0gc3VpdGVJZD17c3VpdGV9IGJ5SWQ9e2J5SWR9IHRvZ2dsZUl0ZW09e3RvZ2dsZUl0ZW19IGFjdGlvbj17YWN0aW9ufS8+KSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBkZXRlcm1pbmVUaXRsZUNvbG9yKHN1aXRlKXtcclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFydGlhbFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC13YXJuaW5nIGljb24tcHJpbWl0aXZlLWRvdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwiZmFpbGVkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LWVycm9yIGljb24teFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFzc2VkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1Y2Nlc3MgaWNvbi1jaGVja1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
