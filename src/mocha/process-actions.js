import ErrorStackParser from "error-stack-parser";

export function begin(data){
    process.send({
        message : "BEGIN",
        data : data
    });
}

export function suiteEnd(suite){
    process.send({
        message : "SUITE_END",
        data : {
            id : suite.id
        }
    })
}

export function startTest(test){
    process.send({
        message : "START_TEST",
        data : {
            id : test.id
        }
    });
}

export function passTest(test){
    process.send({
        message : "END_TEST",
        data : {
            id : test.id,
            state : test.state
        }
    });
}

export function failTest(test, error){
    process.send({
        message : "END_TEST",
        data : {
            id : test.id,
            state : test.state,
            error : {
                message : error.message,
                stack : ErrorStackParser.parse(error)
            }
        }
    });
}

export function done(data){
    process.send({
        message : "END",
        data : {
            stats : data.stats
        }
    });
}
