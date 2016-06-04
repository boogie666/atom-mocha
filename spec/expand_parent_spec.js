require("babel/register");

import reducer from "../src/reducers";
import {expect} from "chai";
import {Actions} from "../src/actions";


const state = {
  "entities": {
    "suites": {
      "0": {
        "id": "0",
        "toggleState": "collapsed",
        "title": "All",
        "tests": [],
        "suites": [
          "1"
        ],
        "parent": null
      },
      "1": {
        "id": "1",
        "toggleState": "collapsed",
        "title": "Some other test",
        "tests": [
          "2"
        ],
        "suites": [],
        "parent": "0"
      }
    },
    "tests": {
      "2": {
        "id": "2",
        "title": "is going to fail",
        "status": "pending",
        "parent": "1"
      }
    }
  },
  "result": [
    "0"
  ]
};


function byId(state, type, id){
    return state.entities[type][id];
};

function createEndTestAction(testId){
    return {
        type : Actions.END_TEST,
        test : {
            id : testId,
            state : "failed"
        }
    };
}

describe("If a test fails", function(){
    const action = createEndTestAction("2");
    const newState = reducer(state, action);

    it("expands all the nodes from that test upward", function(){
        const test = byId(newState, "tests", 2);
        const parentSuite = byId(newState, "suites", test.parent);
        const parentParentSuite = byId(newState, "suites", parentSuite.parent);

        expect(test.status).to.equal("failed");
        expect(test.parent).to.equal("1");

        expect(parentSuite.toggleState).to.equal("expanded");
        expect(parentParentSuite.toggleState).to.equal("expanded");
    });
});
