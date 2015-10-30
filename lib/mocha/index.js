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

            var mochaPath = __dirname + '/../../lib/mocha/mocha-process.js';
            var mocha = _child_process2["default"].fork(mochaPath, this.files, {
                slient: true
            }, {
                error: function error(err) {
                    console.trace(err);
                }
            });
            (0, _actions.restart)(store);
            mocha.on("uncaughtException", function () {
                console.log('error');
            });
            mocha.on("message", function (action) {
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
                    case "ERROR":
                        return (0, _actions.handleError)(store, { error: action.error });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBQWtCLE9BQU87Ozs7OEJBQ0gsb0JBQW9COzs7OytCQUNwQixzQkFBc0I7Ozs7dUJBQ3FDLFlBQVk7OzZCQUN6RSxlQUFlOzs7O2dDQUNQLG9CQUFvQjs7OztJQUUzQixZQUFZO2NBQVosWUFBWTs7QUFDbEIsYUFETSxZQUFZLENBQ2pCLEtBQUssRUFBQzs4QkFERCxZQUFZOztBQUV6QixtQ0FGYSxZQUFZLDZDQUVqQjtBQUNSLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0tBQ3RCOztpQkFKZ0IsWUFBWTs7ZUFLeEIsaUJBQUU7Z0JBQ0ksS0FBSyxHQUFZLElBQUksQ0FBckIsS0FBSztnQkFBRSxLQUFLLEdBQUssSUFBSSxDQUFkLEtBQUs7O0FBQ25CLGdCQUFNLFNBQVMsR0FBRyxTQUFTLEdBQUcsbUNBQW1DLENBQUM7QUFDbEUsZ0JBQU0sS0FBSyxHQUFJLDJCQUFRLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUMvQyxzQkFBTSxFQUFHLElBQUk7YUFDaEIsRUFBRTtBQUNDLHFCQUFLLEVBQUcsZUFBUyxHQUFHLEVBQUM7QUFDakIsMkJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3RCO2FBQ0osQ0FBQyxDQUFDO0FBQ0gsa0NBQVEsS0FBSyxDQUFDLENBQUM7QUFDZixpQkFBSyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxZQUFVO0FBQ3BDLHVCQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hCLENBQUMsQ0FBQztBQUNILGlCQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFTLE1BQU0sRUFBQztBQUNoQyx3QkFBTyxNQUFNLENBQUMsT0FBTztBQUNqQix5QkFBSyxPQUFPO0FBQ1IsK0JBQU8sb0JBQU0sS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLGlDQUFVLENBQUMsa0NBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFFLENBQUM7QUFBQSxBQUN4RSx5QkFBSyxLQUFLO0FBQ04sK0JBQU8sbUJBQUssS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDL0MseUJBQUssWUFBWTtBQUNiLCtCQUFPLHdCQUFVLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQ3BELHlCQUFLLFVBQVU7QUFDWCwrQkFBTyx5QkFBVyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxBQUNyRCx5QkFBSyxXQUFXO0FBQ1osK0JBQU8sdUJBQVMsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDcEQseUJBQUssT0FBTztBQUNSLCtCQUFPLDBCQUFZLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUFBLGlCQUMzRDthQUNKLENBQUMsQ0FBQztTQUNOOzs7ZUFDUyxzQkFBRTtBQUNSLGdCQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjs7O2VBQ00saUJBQUMsUUFBUSxFQUFDO0FBQ2IsZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdCOzs7V0F6Q2dCLFlBQVk7OztxQkFBWixZQUFZIiwiZmlsZSI6Im1vY2hhL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vY2hhIGZyb20gXCJtb2NoYVwiO1xyXG5pbXBvcnQgcHJvY2Vzc29yIGZyb20gXCIuLi91dGlscy9wcm9jZXNzb3JcIjtcclxuaW1wb3J0IG1ha2VTdWl0ZSBmcm9tIFwiLi4vdXRpbHMvbWFrZS1zdWl0ZXNcIjtcclxuaW1wb3J0IHtiZWdpbiwgZG9uZSwgZW5kU3VpdGUsIHN0YXJ0VGVzdCwgZmluaXNoVGVzdCwgcmVzdGFydCwgaGFuZGxlRXJyb3J9IGZyb20gXCIuLi9hY3Rpb25zXCI7XHJcbmltcG9ydCBwcm9jZXNzIGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcbmltcG9ydCBBYnN0cmFjdFJ1bnRpbWUgZnJvbSBcIi4uL0Fic3RyYWN0UnVudGltZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9jaGFSdW50aW1lIGV4dGVuZHMgQWJzdHJhY3RSdW50aW1le1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmUpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICBjb25zdCB7c3RvcmUsIGZpbGVzfSA9ICB0aGlzO1xyXG4gICAgICAgIGNvbnN0IG1vY2hhUGF0aCA9IF9fZGlybmFtZSArICcvLi4vLi4vbGliL21vY2hhL21vY2hhLXByb2Nlc3MuanMnO1xyXG4gICAgICAgIGNvbnN0IG1vY2hhID0gIHByb2Nlc3MuZm9yayhtb2NoYVBhdGgsIHRoaXMuZmlsZXMsIHtcclxuICAgICAgICAgICAgc2xpZW50IDogdHJ1ZVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgZXJyb3IgOiBmdW5jdGlvbihlcnIpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS50cmFjZShlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmVzdGFydChzdG9yZSk7XHJcbiAgICAgICAgbW9jaGEub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBtb2NoYS5vbihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oYWN0aW9uKXtcclxuICAgICAgICAgICAgc3dpdGNoKGFjdGlvbi5tZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCRUdJTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVnaW4oc3RvcmUsIHsgZGF0YSA6IHByb2Nlc3NvcihbbWFrZVN1aXRlKGFjdGlvbi5kYXRhKV0pfSApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShzdG9yZSwgeyBkYXRhIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RBUlRfVEVTVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlNVSVRFX0VORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kU3VpdGUoc3RvcmUsIHsgc3VpdGUgOiBhY3Rpb24uZGF0YSB9KTtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJFUlJPUlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlRXJyb3Ioc3RvcmUsIHsgZXJyb3IgOiBhY3Rpb24uZXJyb3IgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNsZWFyRmlsZXMoKXtcclxuICAgICAgICB0aGlzLmZpbGVzID0gW107XHJcbiAgICB9XHJcbiAgICBhZGRGaWxlKGZpbGVQYXRoKXtcclxuICAgICAgICB0aGlzLmZpbGVzLnB1c2goZmlsZVBhdGgpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
