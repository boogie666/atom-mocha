"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.promisify = promisify;

function promisify(fn) {
    return function () {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return new Promise(function (resolve, reject) {
            fn.call.apply(fn, [_this].concat(args, [function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }]));
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBTyxTQUFTLFNBQVMsQ0FBQyxFQUFFLEVBQUM7QUFDekIsV0FBTyxZQUFpQjs7OzBDQUFMLElBQUk7QUFBSixnQkFBSTs7O0FBQ25CLGVBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFLO0FBQ3BDLGNBQUUsQ0FBQyxJQUFJLE1BQUEsQ0FBUCxFQUFFLGlCQUFlLElBQUksR0FBRSxVQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUs7QUFDcEMsb0JBQUcsR0FBRyxFQUFDO0FBQ0gsMkJBQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN0QjtBQUNELHVCQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkIsR0FBQyxDQUFDO1NBQ04sQ0FBQyxDQUFDO0tBQ04sQ0FBQztDQUNMIiwiZmlsZSI6InV0aWxzL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHByb21pc2lmeShmbil7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncyl7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCAuLi5hcmdzLCAoZXJyLCByZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGVycil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
