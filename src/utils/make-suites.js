export default function makeSuite(s, idGenerator, parent = null){
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
            status : "pending",
            parent : suiteId
        };
    });
    const suites = s.suites.map((suite) => makeSuite(suite, idGenerator, suiteId));
    const suite = {
        id : suiteId,
        toggleState : "collapsed",
        title : s.title,
        tests : tests,
        suites : suites,
        parent : parent,
        status : "pending"
    };

    s.id = suiteId;
    return suite;
}
