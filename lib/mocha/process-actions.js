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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL3Byb2Nlc3MtYWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztnQ0FBNkIsb0JBQW9COzs7O0FBRTFDLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBQztBQUN2QixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLE9BQU87QUFDakIsWUFBSSxFQUFHLElBQUk7S0FDZCxDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUM7QUFDM0IsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxXQUFXO0FBQ3JCLFlBQUksRUFBRztBQUNILGNBQUUsRUFBRyxLQUFLLENBQUMsRUFBRTtTQUNoQjtLQUNKLENBQUMsQ0FBQTtDQUNMOztBQUVNLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBQztBQUMzQixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLFlBQVk7QUFDdEIsWUFBSSxFQUFHO0FBQ0gsY0FBRSxFQUFHLElBQUksQ0FBQyxFQUFFO1NBQ2Y7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUM7QUFDMUIsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxVQUFVO0FBQ3BCLFlBQUksRUFBRztBQUNILGNBQUUsRUFBRyxJQUFJLENBQUMsRUFBRTtBQUNaLGlCQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUs7U0FDckI7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDO0FBQ2pDLFFBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUM7O0FBRXRCLFlBQUksUUFBUSxDQUFDO0FBQ2IsWUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLG9CQUFvQixFQUFDO0FBQ3JDLG9CQUFRLEdBQUcsV0FBVyxDQUFDO1NBQ3hCLE1BQUssSUFBRyxJQUFJLENBQUMsS0FBSyxLQUFLLHFCQUFxQixFQUFDO0FBQzVDLG9CQUFRLEdBQUcsWUFBWSxDQUFDO1NBQ3pCLE1BQUssSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO0FBQ2pELG9CQUFRLEdBQUcsWUFBWSxDQUFDO1NBQ3pCLE1BQUssSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDO0FBQ2xELG9CQUFRLEdBQUcsYUFBYSxDQUFDO1NBQzFCO0FBQ0QsZUFBTyxDQUFDLElBQUksQ0FBQztBQUNYLG1CQUFPLEVBQUcsUUFBUTtBQUNsQixnQkFBSSxFQUFHO0FBQ0wsd0JBQVEsRUFBRyxRQUFRO0FBQ25CLHVCQUFPLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3hCLHFCQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUs7QUFDbEIscUJBQUssRUFBRyxJQUFJLENBQUMsS0FBSztBQUNsQixxQkFBSyxFQUFHO0FBQ04sMkJBQU8sRUFBRyxLQUFLLENBQUMsT0FBTztBQUN2Qix5QkFBSyxFQUFHLDhCQUFpQixLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUN0QzthQUNGO1NBQ0YsQ0FBQyxDQUFDO0tBQ0osTUFBSTtBQUNILGVBQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxtQkFBTyxFQUFHLFVBQVU7QUFDcEIsZ0JBQUksRUFBRztBQUNILGtCQUFFLEVBQUcsSUFBSSxDQUFDLEVBQUU7QUFDWixxQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO0FBQ2xCLHFCQUFLLEVBQUc7QUFDSiwyQkFBTyxFQUFHLEtBQUssQ0FBQyxPQUFPO0FBQ3ZCLHlCQUFLLEVBQUcsOEJBQWlCLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ3hDO2FBQ0o7U0FDSixDQUFDLENBQUM7S0FDSjtDQUNKOztBQUVNLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBQztBQUN0QixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLEtBQUs7QUFDZixZQUFJLEVBQUc7QUFDSCxpQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0NBQ04iLCJmaWxlIjoibW9jaGEvcHJvY2Vzcy1hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yU3RhY2tQYXJzZXIgZnJvbSBcImVycm9yLXN0YWNrLXBhcnNlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJlZ2luKGRhdGEpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJCRUdJTlwiLFxyXG4gICAgICAgIGRhdGEgOiBkYXRhXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN1aXRlRW5kKHN1aXRlKXtcclxuICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IFwiU1VJVEVfRU5EXCIsXHJcbiAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgaWQgOiBzdWl0ZS5pZFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFRlc3QodGVzdCl7XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZ2UgOiBcIlNUQVJUX1RFU1RcIixcclxuICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICBpZCA6IHRlc3QuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhc3NUZXN0KHRlc3Qpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJFTkRfVEVTVFwiLFxyXG4gICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgIGlkIDogdGVzdC5pZCxcclxuICAgICAgICAgICAgc3RhdGUgOiB0ZXN0LnN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmYWlsVGVzdCh0ZXN0LCBlcnJvcil7XHJcbiAgICBpZih0ZXN0LnR5cGUgPT09IFwiaG9va1wiKXtcclxuICAgICAgLy9UT0RPIGZpbmQgYSBiZXR0ZXIgd2F5IHRvIGNoZWNrIGhvb2sgdHlwZVxyXG4gICAgICB2YXIgaG9va1R5cGU7XHJcbiAgICAgIGlmKHRlc3QudGl0bGUgPT09IFwiXFxcImFmdGVyIGFsbFxcXCIgaG9va1wiKXtcclxuICAgICAgICBob29rVHlwZSA9IFwiQUZURVJfQUxMXCI7XHJcbiAgICAgIH1lbHNlIGlmKHRlc3QudGl0bGUgPT09IFwiXFxcImJlZm9yZSBhbGxcXFwiIGhvb2tcIil7XHJcbiAgICAgICAgaG9va1R5cGUgPSBcIkJFRk9SRV9BTExcIjtcclxuICAgICAgfWVsc2UgaWYodGVzdC50aXRsZS5pbmRleE9mKFwiXFxcImFmdGVyIGVhY2hcXFwiXCIpID4gLTEpe1xyXG4gICAgICAgIGhvb2tUeXBlID0gXCJBRlRFUl9FQUNIXCI7XHJcbiAgICAgIH1lbHNlIGlmKHRlc3QudGl0bGUuaW5kZXhPZihcIlxcXCJiZWZvcmUgZWFjaFxcXCJcIikgPiAtMSl7XHJcbiAgICAgICAgaG9va1R5cGUgPSBcIkJFRk9SRV9FQUNIXCI7XHJcbiAgICAgIH1cclxuICAgICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogaG9va1R5cGUsXHJcbiAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgIGhvb2tUeXBlIDogaG9va1R5cGUsXHJcbiAgICAgICAgICBzdWl0ZUlkIDogdGVzdC5wYXJlbnQuaWQsXHJcbiAgICAgICAgICBzdGF0ZSA6IHRlc3Quc3RhdGUsXHJcbiAgICAgICAgICB0aXRsZSA6IHRlc3QudGl0bGUsXHJcbiAgICAgICAgICBlcnJvciA6IHtcclxuICAgICAgICAgICAgbWVzc2FnZSA6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHN0YWNrIDogRXJyb3JTdGFja1BhcnNlci5wYXJzZShlcnJvcilcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgICBtZXNzYWdlIDogXCJFTkRfVEVTVFwiLFxyXG4gICAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgICBpZCA6IHRlc3QuaWQsXHJcbiAgICAgICAgICAgICAgc3RhdGUgOiB0ZXN0LnN0YXRlLFxyXG4gICAgICAgICAgICAgIGVycm9yIDoge1xyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlIDogZXJyb3IubWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgc3RhY2sgOiBFcnJvclN0YWNrUGFyc2VyLnBhcnNlKGVycm9yKVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkb25lKGRhdGEpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJFTkRcIixcclxuICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICBzdGF0cyA6IGRhdGEuc3RhdHNcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4iXX0=
