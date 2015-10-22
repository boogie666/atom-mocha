export default function makeSuite(s, idGenerator){
    if(!idGenerator){
        idGenerator = (function(){
            var id = 0;
            return () => (id++ + "");
        }());
    }
    const suiteId = idGenerator();
    const tests = s.tests.map( (test) => {
        const testId = idGenerator();
        test.id = testId;
        return {
            id : testId,
            title : test.title,
            status : "pending"
        };
    });
    const suites = s.suites.map((suite) => makeSuite(suite, idGenerator));
    const suite = {
        id : suiteId,
        toggleState : "collapsed",
        title : s.title,
        tests : tests,
        suites : suites
    };
    s.id = suiteId;
    return suite;
}
