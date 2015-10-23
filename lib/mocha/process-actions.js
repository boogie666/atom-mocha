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

function done(data) {
    process.send({
        message: "END",
        data: {
            stats: data.stats
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2hhL3Byb2Nlc3MtYWN0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztnQ0FBNkIsb0JBQW9COzs7O0FBRTFDLFNBQVMsS0FBSyxDQUFDLElBQUksRUFBQztBQUN2QixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLE9BQU87QUFDakIsWUFBSSxFQUFHLElBQUk7S0FDZCxDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUM7QUFDM0IsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxXQUFXO0FBQ3JCLFlBQUksRUFBRztBQUNILGNBQUUsRUFBRyxLQUFLLENBQUMsRUFBRTtTQUNoQjtLQUNKLENBQUMsQ0FBQTtDQUNMOztBQUVNLFNBQVMsU0FBUyxDQUFDLElBQUksRUFBQztBQUMzQixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLFlBQVk7QUFDdEIsWUFBSSxFQUFHO0FBQ0gsY0FBRSxFQUFHLElBQUksQ0FBQyxFQUFFO1NBQ2Y7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUM7QUFDMUIsV0FBTyxDQUFDLElBQUksQ0FBQztBQUNULGVBQU8sRUFBRyxVQUFVO0FBQ3BCLFlBQUksRUFBRztBQUNILGNBQUUsRUFBRyxJQUFJLENBQUMsRUFBRTtBQUNaLGlCQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUs7U0FDckI7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFFTSxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFDO0FBQ2pDLFdBQU8sQ0FBQyxJQUFJLENBQUM7QUFDVCxlQUFPLEVBQUcsVUFBVTtBQUNwQixZQUFJLEVBQUc7QUFDSCxjQUFFLEVBQUcsSUFBSSxDQUFDLEVBQUU7QUFDWixpQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO0FBQ2xCLGlCQUFLLEVBQUc7QUFDSix1QkFBTyxFQUFHLEtBQUssQ0FBQyxPQUFPO0FBQ3ZCLHFCQUFLLEVBQUcsOEJBQWlCLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDeEM7U0FDSjtLQUNKLENBQUMsQ0FBQztDQUNOOztBQUVNLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBQztBQUN0QixXQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1QsZUFBTyxFQUFHLEtBQUs7QUFDZixZQUFJLEVBQUc7QUFDSCxpQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO1NBQ3JCO0tBQ0osQ0FBQyxDQUFDO0NBQ04iLCJmaWxlIjoibW9jaGEvcHJvY2Vzcy1hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVycm9yU3RhY2tQYXJzZXIgZnJvbSBcImVycm9yLXN0YWNrLXBhcnNlclwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJlZ2luKGRhdGEpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJCRUdJTlwiLFxyXG4gICAgICAgIGRhdGEgOiBkYXRhXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN1aXRlRW5kKHN1aXRlKXtcclxuICAgIHByb2Nlc3Muc2VuZCh7XHJcbiAgICAgICAgbWVzc2FnZSA6IFwiU1VJVEVfRU5EXCIsXHJcbiAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgaWQgOiBzdWl0ZS5pZFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFRlc3QodGVzdCl7XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZ2UgOiBcIlNUQVJUX1RFU1RcIixcclxuICAgICAgICBkYXRhIDoge1xyXG4gICAgICAgICAgICBpZCA6IHRlc3QuaWRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBhc3NUZXN0KHRlc3Qpe1xyXG4gICAgcHJvY2Vzcy5zZW5kKHtcclxuICAgICAgICBtZXNzYWdlIDogXCJFTkRfVEVTVFwiLFxyXG4gICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgIGlkIDogdGVzdC5pZCxcclxuICAgICAgICAgICAgc3RhdGUgOiB0ZXN0LnN0YXRlXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmYWlsVGVzdCh0ZXN0LCBlcnJvcil7XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZ2UgOiBcIkVORF9URVNUXCIsXHJcbiAgICAgICAgZGF0YSA6IHtcclxuICAgICAgICAgICAgaWQgOiB0ZXN0LmlkLFxyXG4gICAgICAgICAgICBzdGF0ZSA6IHRlc3Quc3RhdGUsXHJcbiAgICAgICAgICAgIGVycm9yIDoge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA6IGVycm9yLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICBzdGFjayA6IEVycm9yU3RhY2tQYXJzZXIucGFyc2UoZXJyb3IpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvbmUoZGF0YSl7XHJcbiAgICBwcm9jZXNzLnNlbmQoe1xyXG4gICAgICAgIG1lc3NhZ2UgOiBcIkVORFwiLFxyXG4gICAgICAgIGRhdGEgOiB7XHJcbiAgICAgICAgICAgIHN0YXRzIDogZGF0YS5zdGF0c1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
