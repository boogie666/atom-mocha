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

var ErrorDisplay = (function (_PureComponent) {
    _inherits(ErrorDisplay, _PureComponent);

    function ErrorDisplay() {
        _classCallCheck(this, ErrorDisplay);

        _get(Object.getPrototypeOf(ErrorDisplay.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ErrorDisplay, [{
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
                        this.renderErrorTitle(error)
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
        key: "renderErrorTitle",
        value: function renderErrorTitle(error) {
            if (!error.name) {
                return _react2["default"].createElement(
                    "span",
                    { className: "text-error" },
                    error.message
                );
            }
            return _react2["default"].createElement(
                "span",
                { className: "text-error" },
                error.name,
                " : ",
                error.message
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

    return ErrorDisplay;
})(_utilsPureComponent2["default"]);

exports["default"] = ErrorDisplay;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvRXJyb3JEaXNwbGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7a0NBQ0Msd0JBQXdCOzs7O0lBRTdCLFlBQVk7Y0FBWixZQUFZOzthQUFaLFlBQVk7OEJBQVosWUFBWTs7bUNBQVosWUFBWTs7O2lCQUFaLFlBQVk7O2VBQ3ZCLGtCQUFFO3lCQUNvQixJQUFJLENBQUMsS0FBSztnQkFBM0IsS0FBSyxVQUFMLEtBQUs7Z0JBQUUsTUFBTSxVQUFOLE1BQU07O0FBQ3BCLG1CQUNJOztrQkFBWSxTQUFNLEtBQUs7Z0JBQ25COzs7b0JBQ0k7OzBCQUFLLFNBQVMsRUFBQyxlQUFlO3dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO3FCQUMzQjtvQkFDTjs7MEJBQUssU0FBUyxFQUFDLHFCQUFxQjt3QkFDL0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO3FCQUMxQztpQkFDSjthQUNHLENBQ2hCO1NBQ0o7OztlQUNlLDBCQUFDLEtBQUssRUFBQztBQUNuQixnQkFBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUM7QUFDWCx1QkFDSTs7c0JBQU0sU0FBUyxFQUFDLFlBQVk7b0JBQUUsS0FBSyxDQUFDLE9BQU87aUJBQVEsQ0FDckQ7YUFDTDtBQUNELG1CQUNJOztrQkFBTSxTQUFTLEVBQUMsWUFBWTtnQkFBRSxLQUFLLENBQUMsSUFBSTs7Z0JBQUssS0FBSyxDQUFDLE9BQU87YUFBUSxDQUNwRTtTQUNMOzs7ZUFDZ0IsMkJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztBQUM1QixnQkFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDLEVBQUs7QUFDeEMsdUJBQ0k7O3NCQUFJLEdBQUcsRUFBRSxDQUFDLEFBQUMsRUFBQyxTQUFTLEVBQUMsdUJBQXVCO29CQUN6Qzs7MEJBQUcsT0FBTyxFQUFFO3VDQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7NkJBQUEsQUFBQyxFQUFDLFNBQVMsRUFBQyxhQUFhO3dCQUFFLEtBQUssQ0FBQyxNQUFNO3FCQUFLO2lCQUN4RSxDQUNQO2FBQ0wsQ0FBQyxDQUFDO0FBQ0gsbUJBQ0k7O2tCQUFJLFNBQVMsRUFBQyxZQUFZO2dCQUNyQixXQUFXO2FBQ1gsQ0FDUDtTQUNMOzs7V0F2Q2dCLFlBQVk7OztxQkFBWixZQUFZIiwiZmlsZSI6ImNvbnRhaW5lcnMvRXJyb3JEaXNwbGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHVyZUNvbXBvbmVudCBmcm9tIFwiLi4vdXRpbHMvUHVyZUNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXJyb3JEaXNwbGF5IGV4dGVuZHMgUHVyZUNvbXBvbmVudHtcclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtlcnJvciwgYWN0aW9ufSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGF0b20tcGFuZWwgY2xhc3M9J3RvcCc+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJFcnJvclRpdGxlKGVycm9yKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHkgc2Nyb2xsLXhcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyU3RhY2tGcmFtZXMoZXJyb3Iuc3RhY2ssIGFjdGlvbil9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9hdG9tLXBhbmVsPlxyXG4gICAgICAgIClcclxuICAgIH1cclxuICAgIHJlbmRlckVycm9yVGl0bGUoZXJyb3Ipe1xyXG4gICAgICAgIGlmKCFlcnJvci5uYW1lKXtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZXJyb3JcIj57ZXJyb3IubWVzc2FnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZXJyb3JcIj57ZXJyb3IubmFtZX0gOiB7ZXJyb3IubWVzc2FnZX08L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclN0YWNrRnJhbWVzKHN0YWNrLCBhY3Rpb24pe1xyXG4gICAgICAgIGNvbnN0IHN0YWNrRnJhbWVzID0gc3RhY2subWFwKChmcmFtZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGxpIGtleT17aX0gY2xhc3NOYW1lPVwibGlzdC1pdGVtIHRleHQtc3VidGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGEgb25DbGljaz17KCk9PmFjdGlvbihmcmFtZSl9IGNsYXNzTmFtZT1cInRleHQtc3VidGxlXCI+e2ZyYW1lLnNvdXJjZX08L2E+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9J2xpc3QtZ3JvdXAnPlxyXG4gICAgICAgICAgICAgICAge3N0YWNrRnJhbWVzfVxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
