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
//# sourceMappingURL=data:application/json;base64,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QyxLQUFLLElBQUMsR0FBRyxFQUFFLEtBQUssQUFBQyxFQUFDLE9BQU8sRUFBRSxLQUFLLEFBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxBQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsQUFBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEFBQUMsR0FBRTtxQkFBQSxDQUFDO2lCQUMvRzthQUNKLENBQ1I7U0FDSjs7O2VBRWtCLDZCQUFDLEtBQUssRUFBQztBQUN0QixnQkFBRyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQztBQUMxQix1QkFBTyxpQ0FBaUMsQ0FBQzthQUM1QztBQUNELGdCQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFDO0FBQ3pCLHVCQUFPLG1CQUFtQixDQUFDO2FBQzlCO0FBQ0QsZ0JBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7QUFDekIsdUJBQU8seUJBQXlCLENBQUM7YUFDcEM7QUFDRCxtQkFBTyxFQUFFLENBQUM7U0FDYjs7O1dBOUJnQixLQUFLOzs7cUJBQUwsS0FBSyIsImZpbGUiOiJjb250YWluZXJzL1N1aXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHVyZUNvbXBvbmVudCBmcm9tIFwiLi4vdXRpbHMvUHVyZUNvbXBvbmVudFwiO1xyXG5pbXBvcnQgRXJyb3JEaXNwbGF5IGZyb20gXCIuL0Vycm9yRGlzcGxheVwiO1xyXG5cclxuY2xhc3MgVGVzdCBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dGVzdElkLCBieUlkLCBhY3Rpb259ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB0ZXN0ID0gYnlJZChcInRlc3RzXCIsIHRlc3RJZCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImxpc3QtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q29sb3IodGVzdCl9Pnt0ZXN0LnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5nZXRFcnJvckluZm8odGVzdC5lcnJvciwgYWN0aW9uKX08L2Rpdj5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZ2V0RXJyb3JJbmZvKGVycm9yLCBhY3Rpb24pIHtcclxuICAgICAgICBpZighZXJyb3Ipe1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxFcnJvckRpc3BsYXkgZXJyb3I9e2Vycm9yfSBhY3Rpb249e2FjdGlvbn0vPjtcclxuICAgIH1cclxuICAgIGdldENvbG9yKHtzdGF0dXN9KXtcclxuICAgICAgICBpZihzdGF0dXMgPT09IFwicGFzc2VkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1Y2Nlc3MgaWNvbi1jaGVja1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGF0dXMgPT09IFwiZmFpbGVkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LWVycm9yIGljb24teFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1YnRsZVwiO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWl0ZSBleHRlbmRzIFB1cmVDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlSWQsIGJ5SWQsIHRvZ2dsZUl0ZW0sIGFjdGlvbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHN1aXRlID0gYnlJZChcInN1aXRlc1wiLCBzdWl0ZUlkKTtcclxuICAgICAgICBjb25zdCBzdWl0ZXMgPSBzdWl0ZS5zdWl0ZXMgfHwgW107XHJcbiAgICAgICAgY29uc3QgdGVzdHMgPSBzdWl0ZS50ZXN0cyB8fCBbXTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXtcImxpc3QtbmVzdGVkLWl0ZW0gXCIgKyBzdWl0ZS50b2dnbGVTdGF0ZX0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9eygpPT50b2dnbGVJdGVtKHN1aXRlSWQpfSBjbGFzc05hbWU9XCJsaXN0LWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e3RoaXMuZGV0ZXJtaW5lVGl0bGVDb2xvcihzdWl0ZSwgdGVzdHMsIGJ5SWQpfT57c3VpdGUudGl0bGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibGlzdC10cmVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXN0cy5tYXAoIHRlc3QgPT4gPFRlc3Qga2V5PXt0ZXN0fSB0ZXN0SWQ9e3Rlc3R9IGJ5SWQ9e2J5SWR9IGFjdGlvbj17YWN0aW9ufS8+KSB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyBzdWl0ZXMubWFwKCBzdWl0ZSA9PiA8U3VpdGUga2V5PXtzdWl0ZX0gc3VpdGVJZD17c3VpdGV9IGJ5SWQ9e2J5SWR9IHRvZ2dsZUl0ZW09e3RvZ2dsZUl0ZW19IGFjdGlvbj17YWN0aW9ufS8+KSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuXHJcbiAgICBkZXRlcm1pbmVUaXRsZUNvbG9yKHN1aXRlKXtcclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFydGlhbFwiKXtcclxuICAgICAgICAgICAgcmV0dXJuIFwidGV4dC13YXJuaW5nIGljb24tcHJpbWl0aXZlLWRvdFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwiZmFpbGVkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LWVycm9yIGljb24teFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdWl0ZS5zdGF0dXMgPT09IFwicGFzc2VkXCIpe1xyXG4gICAgICAgICAgICByZXR1cm4gXCJ0ZXh0LXN1Y2Nlc3MgaWNvbi1jaGVja1wiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
