"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = makeSuite;

function makeSuite(s, idGenerator) {
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
            status: "pending"
        };
    });
    var suites = s.suites.map(function (suite) {
        return makeSuite(suite, idGenerator);
    });
    var suite = {
        id: suiteId,
        title: s.title,
        tests: tests,
        suites: suites
    };
    s.id = suiteId;
    return suite;
}

module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL21ha2Utc3VpdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O3FCQUV3QixTQUFTOztBQUFsQixTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFDO0FBQzdDLFFBQUcsQ0FBQyxXQUFXLEVBQUM7QUFDWixtQkFBVyxHQUFJLENBQUEsWUFBVTtBQUNyQixnQkFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1gsbUJBQU87dUJBQU8sRUFBRSxFQUFFLEdBQUcsRUFBRTthQUFDLENBQUM7U0FDNUIsQ0FBQSxFQUFFLEFBQUMsQ0FBQztLQUNSO0FBQ0QsUUFBTSxPQUFPLEdBQUcsV0FBVyxFQUFFLENBQUM7QUFDOUIsUUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsVUFBQyxJQUFJLEVBQUs7QUFDakMsWUFBTSxNQUFNLEdBQUcsV0FBVyxFQUFFLENBQUM7QUFDN0IsWUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7QUFDakIsZUFBTztBQUNILGNBQUUsRUFBRyxNQUFNO0FBQ1gsaUJBQUssRUFBRyxJQUFJLENBQUMsS0FBSztBQUNsQixrQkFBTSxFQUFHLFNBQVM7U0FDckIsQ0FBQztLQUNMLENBQUMsQ0FBQztBQUNILFFBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBSztlQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0FBQ3RFLFFBQU0sS0FBSyxHQUFHO0FBQ1YsVUFBRSxFQUFHLE9BQU87QUFDWixhQUFLLEVBQUcsQ0FBQyxDQUFDLEtBQUs7QUFDZixhQUFLLEVBQUcsS0FBSztBQUNiLGNBQU0sRUFBRyxNQUFNO0tBQ2xCLENBQUM7QUFDRixLQUFDLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztBQUNmLFdBQU8sS0FBSyxDQUFDO0NBQ2hCIiwiZmlsZSI6InV0aWxzL21ha2Utc3VpdGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlU3VpdGUocywgaWRHZW5lcmF0b3Ipe1xyXG4gICAgaWYoIWlkR2VuZXJhdG9yKXtcclxuICAgICAgICBpZEdlbmVyYXRvciA9IChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgaWQgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gKCkgPT4gKGlkKysgKyBcIlwiKTtcclxuICAgICAgICB9KCkpO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgc3VpdGVJZCA9IGlkR2VuZXJhdG9yKCk7XHJcbiAgICBjb25zdCB0ZXN0cyA9IHMudGVzdHMubWFwKCAodGVzdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRlc3RJZCA9IGlkR2VuZXJhdG9yKCk7XHJcbiAgICAgICAgdGVzdC5pZCA9IHRlc3RJZDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZCA6IHRlc3RJZCxcclxuICAgICAgICAgICAgdGl0bGUgOiB0ZXN0LnRpdGxlLFxyXG4gICAgICAgICAgICBzdGF0dXMgOiBcInBlbmRpbmdcIlxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHN1aXRlcyA9IHMuc3VpdGVzLm1hcCgoc3VpdGUpID0+IG1ha2VTdWl0ZShzdWl0ZSwgaWRHZW5lcmF0b3IpKTtcclxuICAgIGNvbnN0IHN1aXRlID0ge1xyXG4gICAgICAgIGlkIDogc3VpdGVJZCxcclxuICAgICAgICB0aXRsZSA6IHMudGl0bGUsXHJcbiAgICAgICAgdGVzdHMgOiB0ZXN0cyxcclxuICAgICAgICBzdWl0ZXMgOiBzdWl0ZXNcclxuICAgIH07XHJcbiAgICBzLmlkID0gc3VpdGVJZDtcclxuICAgIHJldHVybiBzdWl0ZTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
