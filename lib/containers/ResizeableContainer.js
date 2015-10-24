"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var ResizableContainer = (function (_Component) {
    _inherits(ResizableContainer, _Component);

    function ResizableContainer() {
        _classCallCheck(this, ResizableContainer);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(ResizableContainer.prototype), "constructor", this).apply(this, args);
        this.state = {
            resizeing: true,
            style: {
                width: 500
            }
        };
    }

    _createClass(ResizableContainer, [{
        key: "render",
        value: function render() {
            var _this = this;

            var children = this.props.children;
            var style = this.state.style;

            return _react2["default"].createElement(
                "div",
                { style: style, ref: "resizerDiv", className: "resizer" },
                _react2["default"].createElement("div", { ref: "resizeHandle",
                    className: "resize-handle",
                    onMouseDown: function (e) {
                        return _this.dragStart(e);
                    },
                    onMouseUp: function (e) {
                        return _this.dragStop(e);
                    },
                    onMouseMove: function (e) {
                        return _this.drag(e);
                    }
                }),
                children
            );
        }
    }, {
        key: "dragStart",
        value: function dragStart() {
            this.setProperty(["resizeing"], true);
        }
    }, {
        key: "dragStop",
        value: function dragStop() {
            this.setProperty(["resizeing"], false);
        }
    }, {
        key: "drag",
        value: function drag() {
            var resizeing = this.state.resizeing;

            if (!resizeing) {
                return;
            }
        }
    }, {
        key: "setProperty",
        value: function setProperty(names, value) {
            var newState = _extends({}, this.state);
            var lastName = names[names.length - 1];
            names.splice(names.length - 1, 1);
            var object = names.reduce(function (object, name) {
                return object[name];
            }, newState);
            object[lastName] = value;
            this.setState(newState);
        }
    }]);

    return ResizableContainer;
})(_react.Component);

exports["default"] = ResizableContainer;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lcnMvUmVzaXplYWJsZUNvbnRhaW5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQStCLE9BQU87Ozs7SUFFakIsa0JBQWtCO2NBQWxCLGtCQUFrQjs7QUFDeEIsYUFETSxrQkFBa0IsR0FDZjs4QkFESCxrQkFBa0I7OzBDQUNwQixJQUFJO0FBQUosZ0JBQUk7OztBQUNmLG1DQUZhLGtCQUFrQiw4Q0FFdEIsSUFBSSxFQUFFO0FBQ2YsWUFBSSxDQUFDLEtBQUssR0FBRztBQUNULHFCQUFTLEVBQUcsSUFBSTtBQUNoQixpQkFBSyxFQUFHO0FBQ0oscUJBQUssRUFBRyxHQUFHO2FBQ2Q7U0FDSixDQUFDO0tBQ0w7O2lCQVRnQixrQkFBa0I7O2VBVTdCLGtCQUFFOzs7Z0JBQ0csUUFBUSxHQUFJLElBQUksQ0FBQyxLQUFLLENBQXRCLFFBQVE7Z0JBQ1IsS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQW5CLEtBQUs7O0FBQ1osbUJBQ0k7O2tCQUFLLEtBQUssRUFBRSxLQUFLLEFBQUMsRUFBQyxHQUFHLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxTQUFTO2dCQUNuRCwwQ0FBSyxHQUFHLEVBQUMsY0FBYztBQUNuQiw2QkFBUyxFQUFDLGVBQWU7QUFDekIsK0JBQVcsRUFBRSxVQUFDLENBQUM7K0JBQUcsTUFBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO3FCQUFBLEFBQUM7QUFDcEMsNkJBQVMsRUFBRSxVQUFDLENBQUM7K0JBQUcsTUFBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUFBLEFBQUM7QUFDakMsK0JBQVcsRUFBRSxVQUFDLENBQUM7K0JBQUcsTUFBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUFBLEFBQUM7a0JBQ3hCO2dCQUNWLFFBQVE7YUFDUCxDQUNSO1NBQ0w7OztlQUVRLHFCQUFTO0FBQ2QsZ0JBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6Qzs7O2VBQ08sb0JBQUU7QUFDTixnQkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzFDOzs7ZUFFRyxnQkFBRTtnQkFDSyxTQUFTLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBdkIsU0FBUzs7QUFDaEIsZ0JBQUcsQ0FBQyxTQUFTLEVBQUM7QUFDVix1QkFBTzthQUNWO1NBRUo7OztlQUVVLHFCQUFDLEtBQUssRUFBRSxLQUFLLEVBQUM7QUFDckIsZ0JBQU0sUUFBUSxnQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakMsZ0JBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLGlCQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLGdCQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxFQUFFLElBQUk7dUJBQUssTUFBTSxDQUFDLElBQUksQ0FBQzthQUFBLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdEUsa0JBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDekIsZ0JBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0I7OztXQWhEZ0Isa0JBQWtCOzs7cUJBQWxCLGtCQUFrQiIsImZpbGUiOiJjb250YWluZXJzL1Jlc2l6ZWFibGVDb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzaXphYmxlQ29udGFpbmVyIGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgY29uc3RydWN0b3IoLi4uYXJncyl7XHJcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgcmVzaXplaW5nIDogdHJ1ZSxcclxuICAgICAgICAgICAgc3R5bGUgOiB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCA6IDUwMFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpe1xyXG4gICAgICAgIGNvbnN0IHtjaGlsZHJlbn0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIGNvbnN0IHtzdHlsZX0gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3N0eWxlfSByZWY9XCJyZXNpemVyRGl2XCIgY2xhc3NOYW1lPVwicmVzaXplclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiByZWY9XCJyZXNpemVIYW5kbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlc2l6ZS1oYW5kbGVcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsoZSk9PnRoaXMuZHJhZ1N0YXJ0KGUpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VVcD17KGUpPT50aGlzLmRyYWdTdG9wKGUpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXsoZSk9PnRoaXMuZHJhZyhlKX1cclxuICAgICAgICAgICAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZHJhZ1N0YXJ0KC4uLmFyZ3Mpe1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydHkoW1wicmVzaXplaW5nXCJdLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGRyYWdTdG9wKCl7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0eShbXCJyZXNpemVpbmdcIl0sIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFnKCl7XHJcbiAgICAgICAgY29uc3Qge3Jlc2l6ZWluZ30gPSB0aGlzLnN0YXRlO1xyXG4gICAgICAgIGlmKCFyZXNpemVpbmcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldFByb3BlcnR5KG5hbWVzLCB2YWx1ZSl7XHJcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB7Li4udGhpcy5zdGF0ZX07XHJcbiAgICAgICAgY29uc3QgbGFzdE5hbWUgPSBuYW1lc1tuYW1lcy5sZW5ndGggLSAxXTtcclxuICAgICAgICBuYW1lcy5zcGxpY2UobmFtZXMubGVuZ3RoLTEsIDEpO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdCA9IG5hbWVzLnJlZHVjZSgob2JqZWN0LCBuYW1lKSA9PiBvYmplY3RbbmFtZV0sIG5ld1N0YXRlKTtcclxuICAgICAgICBvYmplY3RbbGFzdE5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
