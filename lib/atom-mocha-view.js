"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _containersMocha = require("./containers/Mocha");

var _containersMocha2 = _interopRequireDefault(_containersMocha);

var _reactRedux = require('react-redux');

var AtomMochaView = (function () {
    function AtomMochaView(state, store) {
        _classCallCheck(this, AtomMochaView);

        this.element = document.createElement('div');
        this.element.classList.add('atom-mocha');
        _react2["default"].render(_react2["default"].createElement(
            _reactRedux.Provider,
            { store: store },
            function () {
                return _react2["default"].createElement(_containersMocha2["default"], null);
            }
        ), this.element);
    }

    _createClass(AtomMochaView, [{
        key: "serialize",
        value: function serialize() {}
    }, {
        key: "destroy",
        value: function destroy() {
            return this.element.remove();
        }
    }, {
        key: "getElement",
        value: function getElement() {
            return this.element;
        }
    }]);

    return AtomMochaView;
})();

exports["default"] = AtomMochaView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7K0JBQ1Asb0JBQW9COzs7OzBCQUNiLGFBQWE7O0lBRWpCLGFBQWE7QUFDbkIsYUFETSxhQUFhLENBQ2xCLEtBQUssRUFBRSxLQUFLLEVBQUM7OEJBRFIsYUFBYTs7QUFFMUIsWUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLFlBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QywyQkFBTSxNQUFNLENBQ1I7O2NBQVUsS0FBSyxFQUFFLEtBQUssQUFBQztZQUNsQjt1QkFBTSxvRUFBUzthQUFBO1NBQ1QsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEM7O2lCQVJnQixhQUFhOztlQVNyQixxQkFBRSxFQUFFOzs7ZUFDTixtQkFBRztBQUNOLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7OztlQUNTLHNCQUFFO0FBQ1IsbUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUN2Qjs7O1dBZmdCLGFBQWE7OztxQkFBYixhQUFhIiwiZmlsZSI6ImF0b20tbW9jaGEtdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBNb2NoYSBmcm9tIFwiLi9jb250YWluZXJzL01vY2hhXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXRvbU1vY2hhVmlld3tcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSwgc3RvcmUpe1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2F0b20tbW9jaGEnKTtcbiAgICAgICAgUmVhY3QucmVuZGVyKFxuICAgICAgICAgICAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgICAgICAgICAgICAgeygpID0+IDxNb2NoYSAvPn1cbiAgICAgICAgICAgIDwvUHJvdmlkZXI+LCB0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgICBzZXJpYWxpemUoKXt9XG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gICAgZ2V0RWxlbWVudCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50O1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
