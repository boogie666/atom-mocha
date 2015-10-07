import {begin, startTest, finishTest, done} from "./process-actions";
import makeSuite from "../utils/make-suites";

export default function connect(runner){
    runner.once("suite", s => {
        s.title="Tests";
        begin(makeSuite(s));
    });
    runner.on("test",  test =>{
        startTest(test);
    });
    runner.on("test end",  test =>{
        finishTest(test);
    });
    runner.on("end",() =>{
        done();
    });
}
