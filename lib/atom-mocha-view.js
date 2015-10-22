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
    }]);

    return AtomMochaView;
})();

exports["default"] = AtomMochaView;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0b20tbW9jaGEtdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7K0JBQ1Asb0JBQW9COzs7OzBCQUNiLGFBQWE7O0lBRWpCLGFBQWE7QUFDbkIsYUFETSxhQUFhLENBQ2xCLEtBQUssRUFBRSxLQUFLLEVBQUM7OEJBRFIsYUFBYTs7QUFFMUIsWUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzdDLFlBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QywyQkFBTSxNQUFNLENBQ1I7O2NBQVUsS0FBSyxFQUFFLEtBQUssQUFBQztZQUNsQjt1QkFBTSxvRUFBUzthQUFBO1NBQ1QsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDbEM7O2lCQVJnQixhQUFhOztlQVNyQixxQkFBRSxFQUFFOzs7ZUFDTixtQkFBRztBQUNOLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEM7OztXQVpnQixhQUFhOzs7cUJBQWIsYUFBYSIsImZpbGUiOiJhdG9tLW1vY2hhLXZpZXcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgTW9jaGEgZnJvbSBcIi4vY29udGFpbmVycy9Nb2NoYVwiO1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF0b21Nb2NoYVZpZXd7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUsIHN0b3JlKXtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhdG9tLW1vY2hhJyk7XG4gICAgICAgIFJlYWN0LnJlbmRlcihcbiAgICAgICAgICAgIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgICAgICAgICAgICAgIHsoKSA9PiA8TW9jaGEgLz59XG4gICAgICAgICAgICA8L1Byb3ZpZGVyPiwgdGhpcy5lbGVtZW50KTtcbiAgICB9XG4gICAgc2VyaWFsaXplKCl7fVxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
