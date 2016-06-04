
import {expect} from "chai";

describe("A test with env variables", ()=>{
    it("the variable should be 'AN_ENVIROMENT_VARIABLE'", function(){
        //VARIABLE1_NAME=VARIABLE1_VALUE; VARIABLE2_NAME = VARIABLE2_VALUE
        expect("VARIABLE1_VALUE").to.be.eql(process.env.VARIABLE1_NAME);
        expect("VARIABLE2_VALUE").to.be.eql(process.env.VARIABLE2_NAME);
    });
});
