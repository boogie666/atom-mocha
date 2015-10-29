"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mocha = require("mocha");

var _mocha2 = _interopRequireDefault(_mocha);

var _utilsProcessor = require("../utils/processor");

var _utilsProcessor2 = _interopRequireDefault(_utilsProcessor);

var _utilsMakeSuites = require("../utils/make-suites");

var _utilsMakeSuites2 = _interopRequireDefault(_utilsMakeSuites);

var _actions = require("../actions");

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var MochaRuntime = (function () {
    function MochaRuntime(store) {
        _classCallCheck(this, MochaRuntime);

        this.store = store;
        this.files = [];
    }

    _createClass(MochaRuntime, [{
        key: "start",
        value: function start() {
            var store = this.store;
            var files = this.files;

            var mocha = _child_process2["default"].fork(__dirname + '/../lib/mocha/mocha-process.js', this.files);

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
})();

exports["default"] = MochaRuntime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3FCQUFrQixPQUFPOzs7OzhCQUNILG9CQUFvQjs7OzsrQkFDcEIsc0JBQXNCOzs7O3VCQUN3QixZQUFZOzs2QkFDNUQsZUFBZTs7OztJQUVkLFlBQVk7QUFDbEIsYUFETSxZQUFZLENBQ2pCLEtBQUssRUFBQzs4QkFERCxZQUFZOztBQUV6QixZQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixZQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztLQUNuQjs7aUJBSmdCLFlBQVk7O2VBS3hCLGlCQUFFO2dCQUNJLEtBQUssR0FBWSxJQUFJLENBQXJCLEtBQUs7Z0JBQUUsS0FBSyxHQUFLLElBQUksQ0FBZCxLQUFLOztBQUNuQixnQkFBTSxLQUFLLEdBQUcsMkJBQVEsSUFBSSxDQUFDLFNBQVMsR0FBRyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRXJGLGtDQUFRLEtBQUssQ0FBQyxDQUFDO0FBQ2YsaUJBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVMsTUFBTSxFQUFDO0FBQ2hDLG9CQUFHLE1BQU0sQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFDO0FBQzFCLDBCQUFNLE1BQU0sQ0FBQyxLQUFLLENBQUM7aUJBQ3RCO0FBQ0Qsd0JBQU8sTUFBTSxDQUFDLE9BQU87QUFDakIseUJBQUssT0FBTztBQUNSLCtCQUFPLG9CQUFNLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRyxpQ0FBVSxDQUFDLGtDQUFVLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBRSxDQUFDO0FBQUEsQUFDeEUseUJBQUssS0FBSztBQUNOLCtCQUFPLG1CQUFLLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBLEFBQy9DLHlCQUFLLFlBQVk7QUFDYiwrQkFBTyx3QkFBVSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFBQSxBQUNwRCx5QkFBSyxVQUFVO0FBQ1gsK0JBQU8seUJBQVcsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQUEsQUFDckQseUJBQUssV0FBVztBQUNaLCtCQUFPLHVCQUFTLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUFBLGlCQUN2RDthQUNKLENBQUMsQ0FBQztTQUNOOzs7ZUFDUyxzQkFBRTtBQUNSLGdCQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjs7O2VBQ00saUJBQUMsUUFBUSxFQUFDO0FBQ2IsZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzdCOzs7V0FqQ2dCLFlBQVk7OztxQkFBWixZQUFZIiwiZmlsZSI6Im1vY2hhL3J1bnRpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTW9jaGEgZnJvbSBcIm1vY2hhXCI7XHJcbmltcG9ydCBwcm9jZXNzb3IgZnJvbSBcIi4uL3V0aWxzL3Byb2Nlc3NvclwiO1xyXG5pbXBvcnQgbWFrZVN1aXRlIGZyb20gXCIuLi91dGlscy9tYWtlLXN1aXRlc1wiO1xyXG5pbXBvcnQge2JlZ2luLCBkb25lLCBlbmRTdWl0ZSwgc3RhcnRUZXN0LCBmaW5pc2hUZXN0LCByZXN0YXJ0fSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xyXG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9jaGFSdW50aW1le1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmUpe1xyXG4gICAgICAgIHRoaXMuc3RvcmUgPSBzdG9yZTtcclxuICAgICAgICB0aGlzLmZpbGVzID0gW107XHJcbiAgICB9XHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIGNvbnN0IHtzdG9yZSwgZmlsZXN9ID0gIHRoaXM7XHJcbiAgICAgICAgY29uc3QgbW9jaGEgPSBwcm9jZXNzLmZvcmsoX19kaXJuYW1lICsgJy8uLi9saWIvbW9jaGEvbW9jaGEtcHJvY2Vzcy5qcycsIHRoaXMuZmlsZXMpO1xyXG5cclxuICAgICAgICByZXN0YXJ0KHN0b3JlKTtcclxuICAgICAgICBtb2NoYS5vbihcIm1lc3NhZ2VcIiwgZnVuY3Rpb24oYWN0aW9uKXtcclxuICAgICAgICAgICAgaWYoYWN0aW9uLm1lc3NhZ2UgPT09IFwiRVJST1JcIil7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBhY3Rpb24uZXJyb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3dpdGNoKGFjdGlvbi5tZXNzYWdlKXtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJCRUdJTlwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmVnaW4oc3RvcmUsIHsgZGF0YSA6IHByb2Nlc3NvcihbbWFrZVN1aXRlKGFjdGlvbi5kYXRhKV0pfSApO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9uZShzdG9yZSwgeyBkYXRhIDogYWN0aW9uLmRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiU1RBUlRfVEVTVFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFydFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVORF9URVNUXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbmlzaFRlc3Qoc3RvcmUsIHsgdGVzdCA6IGFjdGlvbi5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIlNVSVRFX0VORFwiIDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZW5kU3VpdGUoc3RvcmUsIHsgc3VpdGUgOiBhY3Rpb24uZGF0YSB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2xlYXJGaWxlcygpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZEZpbGUoZmlsZVBhdGgpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlUGF0aCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
