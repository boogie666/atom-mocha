"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = makeSuite;

function makeSuite(s, idGenerator) {
    var parent = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

    if (!idGenerator) {
        idGenerator = (function () {
            var id = 0;
            return function () {
                return id++ + "";
            };
        })();
    }
    var suiteId = idGenerator();
    var tests = s.tests.map(function (test) {
        var testId = idGenerator();
        test.id = testId;
        return {
            id: testId,
            title: test.title,
            status: "pending",
            parent: suiteId
        };
    });
    var suites = s.suites.map(function (suite) {
        return makeSuite(suite, idGenerator, suiteId);
    });
    var suite = {
        id: suiteId,
        toggleState: "collapsed",
        title: s.title,
        tests: tests,
        suites: suites,
        parent: parent,
        status: "pending"
    };

    s.id = suiteId;
    return suite;
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL21ha2Utc3VpdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUF3QixTQUFTOztBQUFsQixTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFnQjtRQUFkLE1BQU0seURBQUcsSUFBSTs7QUFDM0QsUUFBRyxDQUFDLFdBQVcsRUFBQztBQUNaLG1CQUFXLEdBQUksQ0FBQSxZQUFVO0FBQ3JCLGdCQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDWCxtQkFBTzt1QkFBTyxFQUFFLEVBQUUsR0FBRyxFQUFFO2FBQUMsQ0FBQztTQUM1QixDQUFBLEVBQUUsQUFBQyxDQUFDO0tBQ1I7QUFDRCxRQUFNLE9BQU8sR0FBRyxXQUFXLEVBQUUsQ0FBQztBQUM5QixRQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxVQUFDLElBQUksRUFBSztBQUNqQyxZQUFNLE1BQU0sR0FBRyxXQUFXLEVBQUUsQ0FBQztBQUM3QixZQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztBQUNqQixlQUFPO0FBQ0gsY0FBRSxFQUFHLE1BQU07QUFDWCxpQkFBSyxFQUFHLElBQUksQ0FBQyxLQUFLO0FBQ2xCLGtCQUFNLEVBQUcsU0FBUztBQUNsQixrQkFBTSxFQUFHLE9BQU87U0FDbkIsQ0FBQztLQUNMLENBQUMsQ0FBQztBQUNILFFBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztlQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQztLQUFBLENBQUMsQ0FBQztBQUMvRSxRQUFNLEtBQUssR0FBRztBQUNWLFVBQUUsRUFBRyxPQUFPO0FBQ1osbUJBQVcsRUFBRyxXQUFXO0FBQ3pCLGFBQUssRUFBRyxDQUFDLENBQUMsS0FBSztBQUNmLGFBQUssRUFBRyxLQUFLO0FBQ2IsY0FBTSxFQUFHLE1BQU07QUFDZixjQUFNLEVBQUcsTUFBTTtBQUNmLGNBQU0sRUFBRyxTQUFTO0tBQ3JCLENBQUM7O0FBRUYsS0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7QUFDZixXQUFPLEtBQUssQ0FBQztDQUNoQiIsImZpbGUiOiJ1dGlscy9tYWtlLXN1aXRlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ha2VTdWl0ZShzLCBpZEdlbmVyYXRvciwgcGFyZW50ID0gbnVsbCl7XHJcbiAgICBpZighaWRHZW5lcmF0b3Ipe1xyXG4gICAgICAgIGlkR2VuZXJhdG9yID0gKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiAoaWQrKyArIFwiXCIpO1xyXG4gICAgICAgIH0oKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdWl0ZUlkID0gaWRHZW5lcmF0b3IoKTtcclxuICAgIGNvbnN0IHRlc3RzID0gcy50ZXN0cy5tYXAoICh0ZXN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGVzdElkID0gaWRHZW5lcmF0b3IoKTtcclxuICAgICAgICB0ZXN0LmlkID0gdGVzdElkO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlkIDogdGVzdElkLFxyXG4gICAgICAgICAgICB0aXRsZSA6IHRlc3QudGl0bGUsXHJcbiAgICAgICAgICAgIHN0YXR1cyA6IFwicGVuZGluZ1wiLFxyXG4gICAgICAgICAgICBwYXJlbnQgOiBzdWl0ZUlkXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG4gICAgY29uc3Qgc3VpdGVzID0gcy5zdWl0ZXMubWFwKChzdWl0ZSkgPT4gbWFrZVN1aXRlKHN1aXRlLCBpZEdlbmVyYXRvciwgc3VpdGVJZCkpO1xyXG4gICAgY29uc3Qgc3VpdGUgPSB7XHJcbiAgICAgICAgaWQgOiBzdWl0ZUlkLFxyXG4gICAgICAgIHRvZ2dsZVN0YXRlIDogXCJjb2xsYXBzZWRcIixcclxuICAgICAgICB0aXRsZSA6IHMudGl0bGUsXHJcbiAgICAgICAgdGVzdHMgOiB0ZXN0cyxcclxuICAgICAgICBzdWl0ZXMgOiBzdWl0ZXMsXHJcbiAgICAgICAgcGFyZW50IDogcGFyZW50LFxyXG4gICAgICAgIHN0YXR1cyA6IFwicGVuZGluZ1wiXHJcbiAgICB9O1xyXG5cclxuICAgIHMuaWQgPSBzdWl0ZUlkO1xyXG4gICAgcmV0dXJuIHN1aXRlO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
