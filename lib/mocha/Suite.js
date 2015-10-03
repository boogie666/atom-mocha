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

var _Test = require("./Test");

var _Test2 = _interopRequireDefault(_Test);

function makeSuite(suite) {
    return _react2["default"].createElement(Suite, { suite: suite });
}
function makeTest(test) {
    return _react2["default"].createElement(_Test2["default"], { test: test });
}

var Suite = (function (_Component) {
    _inherits(Suite, _Component);

    function Suite() {
        _classCallCheck(this, Suite);

        _get(Object.getPrototypeOf(Suite.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(Suite, [{
        key: "render",
        value: function render() {
            var _props$suite = this.props.suite;
            var suites = _props$suite.suites;
            var tests = _props$suite.tests;
            var title = _props$suite.title;

            return _react2["default"].createElement(
                "div",
                { className: "mocha-suite" },
                _react2["default"].createElement(
                    "span",
                    { className: "mocha-suite-title" },
                    title
                ),
                _react2["default"].createElement(
                    "ul",
                    null,
                    tests.map(function (test) {
                        return _react2["default"].createElement(
                            "li",
                            null,
                            makeTest(test)
                        );
                    }),
                    suites.map(function (suite) {
                        return _react2["default"].createElement(
                            "li",
                            null,
                            makeSuite(suite)
                        );
                    })
                )
            );
        }
    }]);

    return Suite;
})(_react.Component);

exports["default"] = Suite;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL1N1aXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQytCLE9BQU87Ozs7b0JBQ3JCLFFBQVE7Ozs7QUFFekIsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFDO0FBQ3JCLFdBQU8saUNBQUMsS0FBSyxJQUFDLEtBQUssRUFBRSxLQUFLLEFBQUMsR0FBRSxDQUFDO0NBQ2pDO0FBQ0QsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFDO0FBQ25CLFdBQU8sc0RBQU0sSUFBSSxFQUFFLElBQUksQUFBQyxHQUFFLENBQUM7Q0FDOUI7O0lBRW9CLEtBQUs7Y0FBTCxLQUFLOzthQUFMLEtBQUs7OEJBQUwsS0FBSzs7bUNBQUwsS0FBSzs7O2lCQUFMLEtBQUs7O2VBQ2hCLGtCQUFFOytCQUMyQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQXhDLE1BQU0sZ0JBQU4sTUFBTTtnQkFBRSxLQUFLLGdCQUFMLEtBQUs7Z0JBQUUsS0FBSyxnQkFBTCxLQUFLOztBQUUzQixtQkFDSTs7a0JBQUssU0FBUyxFQUFDLGFBQWE7Z0JBQ3hCOztzQkFBTSxTQUFTLEVBQUMsbUJBQW1CO29CQUFFLEtBQUs7aUJBQVE7Z0JBQ2xEOzs7b0JBQ0ssS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFBLElBQUk7K0JBQUk7Ozs0QkFBSyxRQUFRLENBQUMsSUFBSSxDQUFDO3lCQUFNO3FCQUFBLENBQUU7b0JBQzlDLE1BQU0sQ0FBQyxHQUFHLENBQUUsVUFBQSxLQUFLOytCQUFJOzs7NEJBQUssU0FBUyxDQUFDLEtBQUssQ0FBQzt5QkFBTTtxQkFBQSxDQUFFO2lCQUNsRDthQUNILENBQ1I7U0FDTDs7O1dBYmdCLEtBQUs7OztxQkFBTCxLQUFLIiwiZmlsZSI6Im1vY2hhL1N1aXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBUZXN0IGZyb20gXCIuL1Rlc3RcIjtcclxuXHJcbmZ1bmN0aW9uIG1ha2VTdWl0ZShzdWl0ZSl7XHJcbiAgICByZXR1cm4gPFN1aXRlIHN1aXRlPXtzdWl0ZX0vPjtcclxufVxyXG5mdW5jdGlvbiBtYWtlVGVzdCh0ZXN0KXtcclxuICAgIHJldHVybiA8VGVzdCB0ZXN0PXt0ZXN0fS8+O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWl0ZSBleHRlbmRzIENvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtzdWl0ZXMsIHRlc3RzLCB0aXRsZX0gPSB0aGlzLnByb3BzLnN1aXRlO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vY2hhLXN1aXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2NoYS1zdWl0ZS10aXRsZVwiPnt0aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICAgICAge3Rlc3RzLm1hcCggdGVzdCA9PiA8bGk+e21ha2VUZXN0KHRlc3QpfTwvbGk+ICkgfVxyXG4gICAgICAgICAgICAgICAgICAgIHtzdWl0ZXMubWFwKCBzdWl0ZSA9PiA8bGk+e21ha2VTdWl0ZShzdWl0ZSl9PC9saT4gKSB9XHJcbiAgICAgICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
