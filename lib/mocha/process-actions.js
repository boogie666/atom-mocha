"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.begin = begin;
exports.suiteEnd = suiteEnd;
exports.startTest = startTest;
exports.passTest = passTest;
exports.failTest = failTest;
exports.done = done;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _errorStackParser = require("error-stack-parser");

var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

function begin(data) {
    process.send({
        message: "BEGIN",
        data: data
    });
}

function suiteEnd(suite) {
    process.send({
        message: "SUITE_END",
        data: {
            id: suite.id
        }
    });
}

function startTest(test) {
    process.send({
        message: "START_TEST",
        data: {
            id: test.id
        }
    });
}

function passTest(test) {
    process.send({
        message: "END_TEST",
        data: {
            id: test.id,
            state: test.state
        }
    });
}

function failTest(test, error) {
    if (test.type === "hook") {
        //TODO find a better way to check hook type
        var hookType;
        if (test.title === "\"after all\" hook") {
            hookType = "AFTER_ALL";
        } else if (test.title === "\"before all\" hook") {
            hookType = "BEFORE_ALL";
        } else if (test.title.indexOf("\"after each\"") > -1) {
            hookType = "AFTER_EACH";
        } else if (test.title.indexOf("\"before each\"") > -1) {
            hookType = "BEFORE_EACH";
        }
        process.send({
            message: hookType,
            data: {
                hookType: hookType,
                suiteId: test.parent.id,
                state: test.state,
                title: test.title,
                error: {
                    message: error.message,
                    stack: _errorStackParser2["default"].parse(error)
                }
            }
        });
    } else {
        process.send({
            message: "END_TEST",
            data: {
                id: test.id,
                state: test.state,
                error: {
                    message: error.message,
                    stack: _errorStackParser2["default"].parse(error)
                }
            }
        });
    }
}

function done(data) {
    process.send({
        message: "END",
        data: {
            stats: data.stats
        }
    });
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL3Byb2Nlc3MtYWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztnQ0FBNkIsb0JBQW9COzs7O0FBRTFDLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBQztBQUN2QixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLE9BQU87QUFDakIsWUFBSSxFQUFHLElBQUk7S0FDZCxDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUM7QUFDM0IsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxXQUFXO0FBQ3JCLFlBQUksRUFBRztBQUNILGNBQUUsRUFBRyxLQUFLLENBQUMsRUFBRTtTQUNoQjtLQUNKLENBQUMsQ0FBQTtDQUNMOztBQUVNLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBQztBQUMzQixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLFlBQVk7QUFDdEIsWUFBSSxFQUFHO0FBQ0gsY0FBRSxFQUFHLElBQUksQ0FBQyxFQUFFO1NBQ2Y7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUM7QUFDMUIsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxVQUFVO0FBQ3BCLFlBQUksRUFBRztBQUNILGNBQUUsRUFBRyxJQUFJLENBQUMsRUFBRTtBQUNaLGlCQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUs7U0FDckI7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFHTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDO0FBQ2pDLFFBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUM7O0FBRXRCLFlBQUksUUFBUSxDQUFDO0FBQ2IsWUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLG9CQUFvQixFQUFDO0FBQ3JDLG9CQUFRLEdBQUcsV0FBVyxDQUFDO1NBQ3hCLE1BQUssSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLHFCQUFxQixFQUFDO0FBQzVDLG9CQUFRLEdBQUcsWUFBWSxDQUFDO1NBQ3pCLE1BQUssSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO0FBQ2pELG9CQUFRLEdBQUcsWUFBWSxDQUFDO1NBQ3pCLE1BQUssSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO0FBQ2xELG9CQUFRLEdBQUcsYUFBYSxDQUFDO1NBQzFCO0FBQ0QsZUFBTyxDQUFDLElBQUksQ0FBQztBQUNYLG1CQUFPLEVBQUcsUUFBUTtBQUNsQixnQkFBSSxFQUFHO0FBQ0wsd0JBQVEsRUFBRyxRQUFRO0FBQ25CLHVCQUFPLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3hCLHFCQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUs7QUFDbEIscUJBQUssRUFBRyxJQUFJLENBQUMsS0FBSztBQUNsQixxQkFBSyxFQUFHO0FBQ04sMkJBQU8sRUFBRyxLQUFLLENBQUMsT0FBTztBQUN2Qix5QkFBSyxFQUFHLDhCQUFpQixLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUN0QzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0tBQ0osTUFBSTtBQUNILGVBQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxtQkFBTyxFQUFHLFVBQVU7QUFDcEIsZ0JBQUksRUFBRztBQUNILGtCQUFFLEVBQUcsSUFBSSxDQUFDLEVBQUU7QUFDWixxQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO0FBQ2xCLHFCQUFLLEVBQUc7QUFDSiwyQkFBTyxFQUFHLEtBQUssQ0FBQyxPQUFPO0FBQ3ZCLHlCQUFLLEVBQUcsOEJBQWlCLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3hDO2FBQ0o7U0FDSixDQUFDLENBQUM7S0FDSjtDQUNKOztBQUVNLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBQztBQUN0QixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLEtBQUs7QUFDZixZQUFJLEVBQUc7QUFDSCxpQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0NBQ04iLCJmaWxlIjoibW9jaGEvcHJvY2Vzcy1hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yU3RhY2tQYXJzZXIgZnJvbSBcImVycm9yLXN0YWNrLXBhcnNlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJlZ2luKGRhdGEpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJCRUdJTlwiLFxyXG4gICAgICAgIGRhdGEgOiBkYXRhXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN1aXRlRW5kKHN1aXRlKXtcclxuICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IFwiU1VJVEVfRU5EXCIsXHJcbiAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgaWQgOiBzdWl0ZS5pZFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFRlc3QodGVzdCl7XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZ2UgOiBcIlNUQVJUX1RFU1RcIixcclxuICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICBpZCA6IHRlc3QuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhc3NUZXN0KHRlc3Qpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJFTkRfVEVTVFwiLFxyXG4gICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgIGlkIDogdGVzdC5pZCxcclxuICAgICAgICAgICAgc3RhdGUgOiB0ZXN0LnN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmFpbFRlc3QodGVzdCwgZXJyb3Ipe1xyXG4gICAgaWYodGVzdC50eXBlID09PSBcImhvb2tcIil7XHJcbiAgICAgIC8vVE9ETyBmaW5kIGEgYmV0dGVyIHdheSB0byBjaGVjayBob29rIHR5cGVcclxuICAgICAgdmFyIGhvb2tUeXBlO1xyXG4gICAgICBpZih0ZXN0LnRpdGxlID09PSBcIlxcXCJhZnRlciBhbGxcXFwiIGhvb2tcIil7XHJcbiAgICAgICAgaG9va1R5cGUgPSBcIkFGVEVSX0FMTFwiO1xyXG4gICAgICB9ZWxzZSBpZih0ZXN0LnRpdGxlID09PSBcIlxcXCJiZWZvcmUgYWxsXFxcIiBob29rXCIpe1xyXG4gICAgICAgIGhvb2tUeXBlID0gXCJCRUZPUkVfQUxMXCI7XHJcbiAgICAgIH1lbHNlIGlmKHRlc3QudGl0bGUuaW5kZXhPZihcIlxcXCJhZnRlciBlYWNoXFxcIlwiKSA+IC0xKXtcclxuICAgICAgICBob29rVHlwZSA9IFwiQUZURVJfRUFDSFwiO1xyXG4gICAgICB9ZWxzZSBpZih0ZXN0LnRpdGxlLmluZGV4T2YoXCJcXFwiYmVmb3JlIGVhY2hcXFwiXCIpID4gLTEpe1xyXG4gICAgICAgIGhvb2tUeXBlID0gXCJCRUZPUkVfRUFDSFwiO1xyXG4gICAgICB9XHJcbiAgICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IGhvb2tUeXBlLFxyXG4gICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICBob29rVHlwZSA6IGhvb2tUeXBlLFxyXG4gICAgICAgICAgc3VpdGVJZCA6IHRlc3QucGFyZW50LmlkLFxyXG4gICAgICAgICAgc3RhdGUgOiB0ZXN0LnN0YXRlLFxyXG4gICAgICAgICAgdGl0bGUgOiB0ZXN0LnRpdGxlLFxyXG4gICAgICAgICAgZXJyb3IgOiB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2UgOiBlcnJvci5tZXNzYWdlLFxyXG4gICAgICAgICAgICBzdGFjayA6IEVycm9yU3RhY2tQYXJzZXIucGFyc2UoZXJyb3IpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1lbHNle1xyXG4gICAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgICAgbWVzc2FnZSA6IFwiRU5EX1RFU1RcIixcclxuICAgICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgICAgaWQgOiB0ZXN0LmlkLFxyXG4gICAgICAgICAgICAgIHN0YXRlIDogdGVzdC5zdGF0ZSxcclxuICAgICAgICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgIHN0YWNrIDogRXJyb3JTdGFja1BhcnNlci5wYXJzZShlcnJvcilcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9uZShkYXRhKXtcclxuICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IFwiRU5EXCIsXHJcbiAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgc3RhdHMgOiBkYXRhLnN0YXRzXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIl19
