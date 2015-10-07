export function begin(data){
    process.send({
        message : "BEGIN",
        data : data
    });
}

export function startTest(test){
    process.send({
        message : "START_TEST",
        data : {
            id : test.id
        }
    });
}

export function finishTest(test){
    process.send({
        message : "END_TEST",
        data : {
            id : test.id,
            state : test.state
        }
    });
}

export function done(){
    process.send({
        message : "END"
    });
}
