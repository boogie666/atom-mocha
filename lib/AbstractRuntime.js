"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notImplement(methodName) {
    throw new Error(methodName + " is not implemented!");
}

var AbstractRuntime = (function () {
    function AbstractRuntime() {
        _classCallCheck(this, AbstractRuntime);

        this.files = [];
    }

    _createClass(AbstractRuntime, [{
        key: "start",
        value: function start() {
            notImplement("start");
        }
    }, {
        key: "kill",
        value: function kill() {
            notImplement("kill");
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

    return AbstractRuntime;
})();

exports["default"] = AbstractRuntime;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFic3RyYWN0UnVudGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxZQUFZLENBQUMsVUFBVSxFQUFDO0FBQzdCLFVBQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLHNCQUFzQixDQUFDLENBQUM7Q0FDeEQ7O0lBRW9CLGVBQWU7QUFDckIsYUFETSxlQUFlLEdBQ25COzhCQURJLGVBQWU7O0FBRTVCLFlBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ25COztpQkFIZ0IsZUFBZTs7ZUFLM0IsaUJBQUU7QUFDSCx3QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3pCOzs7ZUFFRyxnQkFBRTtBQUNGLHdCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEI7OztlQUNTLHNCQUFFO0FBQ1IsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ25COzs7ZUFDTSxpQkFBQyxRQUFRLEVBQUM7QUFDYixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDN0I7OztXQWpCZ0IsZUFBZTs7O3FCQUFmLGVBQWUiLCJmaWxlIjoiQWJzdHJhY3RSdW50aW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gbm90SW1wbGVtZW50KG1ldGhvZE5hbWUpe1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKG1ldGhvZE5hbWUgKyBcIiBpcyBub3QgaW1wbGVtZW50ZWQhXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBYnN0cmFjdFJ1bnRpbWV7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIG5vdEltcGxlbWVudChcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGtpbGwoKXtcclxuICAgICAgICBub3RJbXBsZW1lbnQoXCJraWxsXCIpO1xyXG4gICAgfVxyXG4gICAgY2xlYXJGaWxlcygpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZEZpbGUoZmlsZVBhdGgpe1xyXG4gICAgICAgIHRoaXMuZmlsZXMucHVzaChmaWxlUGF0aCk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
