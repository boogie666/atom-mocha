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

var _reactRedux = require("react-redux");

var Test = (function (_Component) {
    _inherits(Test, _Component);

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
                "div",
                { className: "test " + this.getColor(test) },
                test.title
            );
        }
    }, {
        key: "getColor",
        value: function getColor(test) {
            return test.status;
        }
    }]);

    return Test;
})(_react.Component);

var Suite = (function (_Component2) {
    _inherits(Suite, _Component2);

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

            var suite = byId("suites", suiteId);
            var suites = suite.suites || [];
            var tests = suite.tests || [];

            return _react2["default"].createElement(
                "div",
                { className: "suite" },
                _react2["default"].createElement(
                    "h4",
                    null,
                    suite.title
                ),
                _react2["default"].createElement(
                    "ul",
                    null,
                    tests.map(function (test) {
                        return _react2["default"].createElement(
                            "li",
                            { key: test },
                            _react2["default"].createElement(Test, { testId: test, byId: byId })
                        );
                    }),
                    suites.map(function (suite) {
                        return _react2["default"].createElement(
                            "li",
                            { key: suite },
                            _react2["default"].createElement(Suite, { suiteId: suite, byId: byId })
                        );
                    })
                )
            );
        }
    }]);

    return Suite;
})(_react.Component);

var Mocha = (function (_Component3) {
    _inherits(Mocha, _Component3);

    function Mocha() {
        _classCallCheck(this, Mocha);

        _get(Object.getPrototypeOf(Mocha.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Mocha, [{
        key: "render",
        value: function render() {
            var _props3 = this.props;
            var result = _props3.result;
            var entities = _props3.entities;
            var tests = entities.tests;

            var byId = function byId(type, id) {
                return entities[type][id];
            };
            return _react2["default"].createElement(
                "div",
                null,
                _react2["default"].createElement(
                    "div",
                    { className: "scroll-container tool-panel" },
                    _react2["default"].createElement(
                        "div",
                        { className: "scroll-panel" },
                        result.map(function (suite) {
                            return _react2["default"].createElement(Suite, { key: suite, suiteId: suite, byId: byId });
                        })
                    )
                ),
                _react2["default"].createElement(
                    "div",
                    { className: "results-panel" },
                    this.renderResult(tests, "Passed", "passed", this.getPassed),
                    this.renderResult(tests, "Failed", "failed", this.getFailed),
                    this.renderResult(tests, "Pending", "pending", this.getPending)
                )
            );
        }
    }, {
        key: "getPassed",
        value: function getPassed(test) {
            return test.status === "passed" ? 1 : 0;
        }
    }, {
        key: "getFailed",
        value: function getFailed(test) {
            return test.status === "failed" ? 1 : 0;
        }
    }, {
        key: "getPending",
        value: function getPending(test) {
            return test.status === "pending" ? 1 : 0;
        }
    }, {
        key: "renderResult",
        value: function renderResult(tests, label, color, valueCalculator) {
            var count = Object.keys(tests).reduce(function (total, key) {
                return total + valueCalculator(tests[key]);
            }, 0);
            return _react2["default"].createElement(
                "div",
                { className: "results " + color },
                _react2["default"].createElement(
                    "h4",
                    null,
                    label,
                    ": ",
                    count
                )
            );
        }
    }]);

    return Mocha;
})(_react.Component);

exports["default"] = (0, _reactRedux.connect)(function (state) {
    return state;
})(Mocha);
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,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QUFLO0NBQUEsQ0FBRSxDQUFDLEtBQUssQ0FBQyIsImZpbGUiOiJjb250YWluZXJzL01vY2hhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcclxuXHJcbmNsYXNzIFRlc3QgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgICByZW5kZXIoKXtcclxuICAgICAgICBjb25zdCB7dGVzdElkLCBieUlkfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IGJ5SWQoXCJ0ZXN0c1wiLCB0ZXN0SWQpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJ0ZXN0IFwiICsgdGhpcy5nZXRDb2xvcih0ZXN0KSB9Pnt0ZXN0LnRpdGxlfTwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXRDb2xvcih0ZXN0KXtcclxuICAgICAgICByZXR1cm4gdGVzdC5zdGF0dXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN1aXRlIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3N1aXRlSWQsIGJ5SWR9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCBzdWl0ZSA9IGJ5SWQoXCJzdWl0ZXNcIiwgc3VpdGVJZCk7XHJcbiAgICAgICAgY29uc3Qgc3VpdGVzID0gc3VpdGUuc3VpdGVzIHx8IFtdO1xyXG4gICAgICAgIGNvbnN0IHRlc3RzID0gc3VpdGUudGVzdHMgfHwgW107XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3VpdGVcIj5cclxuICAgICAgICAgICAgICAgIDxoND57c3VpdGUudGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgICAgICB7IHRlc3RzLm1hcCggdGVzdCA9PiA8bGkga2V5PXt0ZXN0fT48VGVzdCB0ZXN0SWQ9e3Rlc3R9IGJ5SWQ9e2J5SWR9Lz48L2xpPikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgc3VpdGVzLm1hcCggc3VpdGUgPT4gPGxpIGtleT17c3VpdGV9PjxTdWl0ZSBzdWl0ZUlkPXtzdWl0ZX0gYnlJZD17YnlJZH0vPjwvbGk+KSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIE1vY2hhIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgY29uc3Qge3Jlc3VsdCwgZW50aXRpZXN9ID0gdGhpcy5wcm9wcztcclxuICAgICAgICBjb25zdCB7dGVzdHN9ID0gZW50aXRpZXM7XHJcbiAgICAgICAgY29uc3QgYnlJZCA9ICh0eXBlLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gZW50aXRpZXNbdHlwZV1baWRdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsLWNvbnRhaW5lciB0b29sLXBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzY3JvbGwtcGFuZWxcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyByZXN1bHQubWFwKCBzdWl0ZSA9PiA8U3VpdGUga2V5PXtzdWl0ZX0gc3VpdGVJZD17c3VpdGV9IGJ5SWQ9eyBieUlkIH0vPiApIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzLXBhbmVsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnJlbmRlclJlc3VsdCh0ZXN0cywgXCJQYXNzZWRcIiwgXCJwYXNzZWRcIiwgdGhpcy5nZXRQYXNzZWQpIH1cclxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyUmVzdWx0KHRlc3RzLCBcIkZhaWxlZFwiLCBcImZhaWxlZFwiLCB0aGlzLmdldEZhaWxlZCkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJSZXN1bHQodGVzdHMsIFwiUGVuZGluZ1wiLCBcInBlbmRpbmdcIiwgdGhpcy5nZXRQZW5kaW5nKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBnZXRQYXNzZWQodGVzdCl7XHJcbiAgICAgICAgcmV0dXJuIHRlc3Quc3RhdHVzID09PSBcInBhc3NlZFwiICA/IDEgOiAwO1xyXG4gICAgfVxyXG4gICAgZ2V0RmFpbGVkKHRlc3Qpe1xyXG4gICAgICAgIHJldHVybiB0ZXN0LnN0YXR1cyA9PT0gXCJmYWlsZWRcIiA/IDEgOiAwO1xyXG4gICAgfVxyXG4gICAgZ2V0UGVuZGluZyh0ZXN0KXtcclxuICAgICAgICByZXR1cm4gdGVzdC5zdGF0dXMgPT09IFwicGVuZGluZ1wiID8gMSA6IDA7XHJcbiAgICB9XHJcbiAgICByZW5kZXJSZXN1bHQodGVzdHMsIGxhYmVsLCBjb2xvciwgdmFsdWVDYWxjdWxhdG9yKXtcclxuICAgICAgICBjb25zdCBjb3VudCA9IE9iamVjdC5rZXlzKHRlc3RzKS5yZWR1Y2UoKHRvdGFsLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgdmFsdWVDYWxjdWxhdG9yKHRlc3RzW2tleV0pO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJyZXN1bHRzIFwiICsgY29sb3J9PlxyXG4gICAgICAgICAgICAgICAgPGg0PntsYWJlbH06IHtjb3VudH08L2g0PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCggKHN0YXRlKT0+c3RhdGUgKShNb2NoYSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
