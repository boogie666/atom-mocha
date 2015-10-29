"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _utilsProcessor = require("../utils/processor");

var _utilsProcessor2 = _interopRequireDefault(_utilsProcessor);

var _utilsMakeSuites = require("../utils/make-suites");

var _utilsMakeSuites2 = _interopRequireDefault(_utilsMakeSuites);

var _actions = require("../actions");

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _AbstractRuntime2 = require("../AbstractRuntime");

var _AbstractRuntime3 = _interopRequireDefault(_AbstractRuntime2);

var MochaRuntime = (function (_AbstractRuntime) {
    _inherits(MochaRuntime, _AbstractRuntime);

    function MochaRuntime(store) {
        _classCallCheck(this, MochaRuntime);

        _get(Object.getPrototypeOf(MochaRuntime.prototype), "constructor", this).call(this);
        this.store = store;
    }

    _createClass(MochaRuntime, [{
        key: "start",
        value: function start() {
            var store = this.store;
            var files = this.files;

            var mocha = _child_process2["default"].fork(__dirname + '/../../lib/mocha/mocha-process.js', this.files);

            (0, _actions.restart)(store);
            mocha.on("message", function (action) {
                if (action.message === "ERROR") {
                    throw action.error;
                }
                switch (action.message) {
                    case "BEGIN":
                        return (0, _actions.begin)(store, { data: (0, _utilsProcessor2["default"])([(0, _utilsMakeSuites2["default"])(action.data)]) });
                    case "END":
                        return (0, _actions.done)(store, { data: action.data });
                    case "START_TEST":
                        return (0, _actions.startTest)(store, { test: action.data });
                    case "END_TEST":
                        return (0, _actions.finishTest)(store, { test: action.data });
                    case "SUITE_END":
                        return (0, _actions.endSuite)(store, { suite: action.data });
                }
            });
        }
    }, {
        key: "clearFiles",
        value: function clearFiles() {
            this.files = [];
        }
    }, {
        key: "addFile",
        value: function addFile(filePath) {
            this.files.push(filePath);
        }
    }]);

    return MochaRuntime;
})(_AbstractRuntime3["default"]);

exports["default"] = MochaRuntime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7OEJBQ0gsb0JBQW9COzs7OytCQUNwQixzQkFBc0I7Ozs7dUJBQ3dCLFlBQVk7OzZCQUM1RCxlQUFlOzs7O2dDQUNQLG9CQUFvQjs7OztJQUUzQixZQUFZO2NBQVosWUFBWTs7QUFDbEIsYUFETSxZQUFZLENBQ2pCLEtBQUssRUFBQzs4QkFERCxZQUFZOztBQUV6QixtQ0FGYSxZQUFZLDZDQUVqQjtBQUNSLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOztpQkFKZ0IsWUFBWTs7ZUFLeEIsaUJBQUU7Z0JBQ0ksS0FBSyxHQUFZLElBQUksQ0FBckIsS0FBSztnQkFBRSxLQUFLLEdBQUssSUFBSSxDQUFkLEtBQUs7O0FBQ25CLGdCQUFNLEtBQUssR0FBRywyQkFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFeEYsa0NBQVEsS0FBSyxDQUFDLENBQUM7QUFDZixpQkFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBUyxNQUFNLEVBQUM7QUFDaEMsb0JBQUcsTUFBTSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUM7QUFDMUIsMEJBQU0sTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDdEI7QUFDRCx3QkFBTyxNQUFNLENBQUMsT0FBTztBQUNqQix5QkFBSyxPQUFPO0FBQ1IsK0JBQU8sb0JBQU0sS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLGlDQUFVLENBQUMsa0NBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFFLENBQUM7QUFBQSxBQUN4RSx5QkFBSyxLQUFLO0FBQ04sK0JBQU8sbUJBQUssS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDL0MseUJBQUssWUFBWTtBQUNiLCtCQUFPLHdCQUFVLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQ3BELHlCQUFLLFVBQVU7QUFDWCwrQkFBTyx5QkFBVyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxBQUNyRCx5QkFBSyxXQUFXO0FBQ1osK0JBQU8sdUJBQVMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsaUJBQ3ZEO2FBQ0osQ0FBQyxDQUFDO1NBQ047OztlQUNTLHNCQUFFO0FBQ1IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25COzs7ZUFDTSxpQkFBQyxRQUFRLEVBQUM7QUFDYixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7OztXQWpDZ0IsWUFBWTs7O3FCQUFaLFlBQVkiLCJmaWxlIjoibW9jaGEvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9jaGEgZnJvbSBcIm1vY2hhXCI7XHJcbmltcG9ydCBwcm9jZXNzb3IgZnJvbSBcIi4uL3V0aWxzL3Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5pbXBvcnQge2JlZ2luLCBkb25lLCBlbmRTdWl0ZSwgc3RhcnRUZXN0LCBmaW5pc2hUZXN0LCByZXN0YXJ0fSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5pbXBvcnQgQWJzdHJhY3RSdW50aW1lIGZyb20gXCIuLi9BYnN0cmFjdFJ1bnRpbWVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vY2hhUnVudGltZSBleHRlbmRzIEFic3RyYWN0UnVudGltZXtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JlKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuICAgIH1cclxuICAgIHN0YXJ0KCl7XHJcbiAgICAgICAgY29uc3Qge3N0b3JlLCBmaWxlc30gPSAgdGhpcztcclxuICAgICAgICBjb25zdCBtb2NoYSA9IHByb2Nlc3MuZm9yayhfX2Rpcm5hbWUgKyAnLy4uLy4uL2xpYi9tb2NoYS9tb2NoYS1wcm9jZXNzLmpzJywgdGhpcy5maWxlcyk7XHJcblxyXG4gICAgICAgIHJlc3RhcnQoc3RvcmUpO1xyXG4gICAgICAgIG1vY2hhLm9uKFwibWVzc2FnZVwiLCBmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgICAgICBpZihhY3Rpb24ubWVzc2FnZSA9PT0gXCJFUlJPUlwiKXtcclxuICAgICAgICAgICAgICAgIHRocm93IGFjdGlvbi5lcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzd2l0Y2goYWN0aW9uLm1lc3NhZ2Upe1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkJFR0lOXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZWdpbihzdG9yZSwgeyBkYXRhIDogcHJvY2Vzc29yKFttYWtlU3VpdGUoYWN0aW9uLmRhdGEpXSl9ICk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb25lKHN0b3JlLCB7IGRhdGEgOiBhY3Rpb24uZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJTVEFSVF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0VGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRU5EX1RFU1RcIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmluaXNoVGVzdChzdG9yZSwgeyB0ZXN0IDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1VJVEVfRU5EXCIgOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmRTdWl0ZShzdG9yZSwgeyBzdWl0ZSA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjbGVhckZpbGVzKCl7XHJcbiAgICAgICAgdGhpcy5maWxlcyA9IFtdO1xyXG4gICAgfVxyXG4gICAgYWRkRmlsZShmaWxlUGF0aCl7XHJcbiAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVQYXRoKTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
