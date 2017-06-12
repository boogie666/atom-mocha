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
    if(test.type === "hook"){
      //TODO find a better way to check hook type
      var hookType;
      if(test.title === "\"after all\" hook"){
        hookType = "AFTER_ALL";
      }else if(test.title === "\"before all\" hook"){
        hookType = "BEFORE_ALL";
      }else if(test.title.indexOf("\"after each\"") > -1){
        hookType = "AFTER_EACH";
      }else if(test.title.indexOf("\"before each\"") > -1){
        hookType = "BEFORE_EACH";
      }
      process.send({
        message : hookType,
        data : {
          hookType : hookType,
          suiteId : test.parent.id,
          state : test.state,
          title : test.title,
          error : {
            message : error.message,
            stack : ErrorStackParser.parse(error)
          }
        }
      });
    }else{
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
}

export function done(data){
    process.send({
        message : "END",
        data : {
            stats : data.stats
        }
    });
}
