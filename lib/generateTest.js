"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateTest = generateTest;
exports.createTestFiles = createTestFiles;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var dataForTest = [];

function storeState(action, stateBefore, stateAfter) {
    dataForTest.push({ action: action, stateBefore: stateBefore, stateAfter: stateAfter });
}

function generateTest(_ref) {
    var getState = _ref.getState;

    return function (next) {
        return function (action) {
            var currentState = getState();
            var returnValue = next(action);
            var nextState = getState();
            if (currentState !== nextState) {
                storeState(action, currentState, nextState);
            }
            return returnValue;
        };
    };
}

function writeFile(file, data) {
    _fs2["default"].writeFile(__dirname + "\\test-data\\" + file, JSON.stringify(data, null, "\t"), function (err) {
        if (err) console.error(file, err.stack);
    });
}

var id = (function () {
    var i = 0;
    return function () {
        return i++;
    };
})();

function createTestFiles() {
    dataForTest.forEach(function (item) {
        var action = item.action;
        var stateBefore = item.stateBefore;
        var stateAfter = item.stateAfter;

        var fileName = action.type + "_" + id() + ".json";
        writeFile(fileName, {
            action: action,
            input: stateBefore,
            expected: stateAfter
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdlbmVyYXRlVGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQUFlLElBQUk7Ozs7QUFFbkIsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUV2QixTQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBQztBQUNoRCxlQUFXLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFOLE1BQU0sRUFBRSxXQUFXLEVBQVgsV0FBVyxFQUFFLFVBQVUsRUFBVixVQUFVLEVBQUMsQ0FBQyxDQUFDO0NBQ3ZEOztBQUVNLFNBQVMsWUFBWSxDQUFDLElBQVUsRUFBQztRQUFWLFFBQVEsR0FBVCxJQUFVLENBQVQsUUFBUTs7QUFDbEMsV0FBTyxVQUFDLElBQUk7ZUFBSyxVQUFDLE1BQU0sRUFBSztBQUN6QixnQkFBTSxZQUFZLEdBQUcsUUFBUSxFQUFFLENBQUM7QUFDaEMsZ0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixnQkFBTSxTQUFTLEdBQUcsUUFBUSxFQUFFLENBQUM7QUFDN0IsZ0JBQUcsWUFBWSxLQUFLLFNBQVMsRUFBQztBQUMxQiwwQkFBVSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDL0M7QUFDRCxtQkFBTyxXQUFXLENBQUM7U0FDeEI7S0FBQSxDQUFDO0NBQ0g7O0FBRUQsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBQztBQUMxQixvQkFBRyxTQUFTLENBQUMsU0FBUyxHQUFHLGVBQWUsR0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLFVBQUMsR0FBRyxFQUFLO0FBQ3hGLFlBQUcsR0FBRyxFQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN0QyxDQUFDLENBQUM7Q0FDTjs7QUFFRCxJQUFNLEVBQUUsR0FBSSxDQUFBLFlBQVU7QUFDbEIsUUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ1YsV0FBTyxZQUFNO0FBQ1QsZUFBTyxDQUFDLEVBQUUsQ0FBQztLQUNkLENBQUE7Q0FDSixDQUFBLEVBQUUsQUFBQyxDQUFDOztBQUNFLFNBQVMsZUFBZSxHQUFFO0FBQzdCLGVBQVcsQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJLEVBQUM7WUFDdkIsTUFBTSxHQUE2QixJQUFJLENBQXZDLE1BQU07WUFBRSxXQUFXLEdBQWdCLElBQUksQ0FBL0IsV0FBVztZQUFFLFVBQVUsR0FBSSxJQUFJLENBQWxCLFVBQVU7O0FBQ3RDLFlBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxHQUFFLE9BQU8sQ0FBQztBQUNuRCxpQkFBUyxDQUFDLFFBQVEsRUFBRTtBQUNoQixrQkFBTSxFQUFOLE1BQU07QUFDTixpQkFBSyxFQUFHLFdBQVc7QUFDbkIsb0JBQVEsRUFBRyxVQUFVO1NBQ3hCLENBQUMsQ0FBQztLQUVOLENBQUMsQ0FBQztDQUNOIiwiZmlsZSI6ImdlbmVyYXRlVGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuXHJcbmNvbnN0IGRhdGFGb3JUZXN0ID0gW107XHJcblxyXG5mdW5jdGlvbiBzdG9yZVN0YXRlKGFjdGlvbiwgc3RhdGVCZWZvcmUsIHN0YXRlQWZ0ZXIpe1xyXG4gICAgZGF0YUZvclRlc3QucHVzaCh7YWN0aW9uLCBzdGF0ZUJlZm9yZSwgc3RhdGVBZnRlcn0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVUZXN0KHtnZXRTdGF0ZX0pe1xyXG4gICAgcmV0dXJuIChuZXh0KSA9PiAoYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFN0YXRlID0gZ2V0U3RhdGUoKTtcclxuICAgICAgICBsZXQgcmV0dXJuVmFsdWUgPSBuZXh0KGFjdGlvbik7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gZ2V0U3RhdGUoKTtcclxuICAgICAgICBpZihjdXJyZW50U3RhdGUgIT09IG5leHRTdGF0ZSl7XHJcbiAgICAgICAgICAgIHN0b3JlU3RhdGUoYWN0aW9uLCBjdXJyZW50U3RhdGUsIG5leHRTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcclxuICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZUZpbGUoZmlsZSwgZGF0YSl7XHJcbiAgICBmcy53cml0ZUZpbGUoX19kaXJuYW1lICsgXCJcXFxcdGVzdC1kYXRhXFxcXFwiICsgZmlsZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgXCJcXHRcIiksIChlcnIpID0+IHtcclxuICAgICAgICBpZihlcnIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZmlsZSwgZXJyLnN0YWNrKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBpZCA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICByZXR1cm4gaSsrO1xyXG4gICAgfVxyXG59KCkpO1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVGVzdEZpbGVzKCl7XHJcbiAgICBkYXRhRm9yVGVzdC5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGNvbnN0IHthY3Rpb24sIHN0YXRlQmVmb3JlLCBzdGF0ZUFmdGVyfSA9IGl0ZW07XHJcbiAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBhY3Rpb24udHlwZSArIFwiX1wiICsgaWQoKSsgXCIuanNvblwiO1xyXG4gICAgICAgIHdyaXRlRmlsZShmaWxlTmFtZSwge1xyXG4gICAgICAgICAgICBhY3Rpb24sXHJcbiAgICAgICAgICAgIGlucHV0IDogc3RhdGVCZWZvcmUsXHJcbiAgICAgICAgICAgIGV4cGVjdGVkIDogc3RhdGVBZnRlclxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
