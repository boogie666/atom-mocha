import {begin, suiteEnd, startTest, passTest, failTest, done} from "./process-actions";
import Base from "mocha/lib/reporters/base";
import makeSuite from "../utils/make-suites";

export default function(runner){
    Base.call(this, runner);

    runner.once("suite", s => {
        s.title="All";
        begin(makeSuite(s));
    });
    runner.on("suite end", suiteEnd);
    runner.on("test", startTest);
    runner.on("pass",  passTest);
    runner.on("fail", failTest);

    runner.on("end",() => {
        done(this);
    });
}
