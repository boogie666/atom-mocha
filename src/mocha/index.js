import Mocha from "mocha";
import processor from "../utils/processor";
import makeSuite from "../utils/make-suites";
import {begin, done, endSuite, startTest, finishTest, restart, handleError, handleHookFailed, handleEachHookFailed} from "../actions";
import * as proc from "child_process";
import AbstractRuntime from "../AbstractRuntime";
import path from "path";

export default class MochaRuntime extends AbstractRuntime{
    constructor(store, {compiler, env, expandAnyway}){
        super();
        this.store = store;
        this.compiler = compiler;
        this.env = env;
        this.expandAnyway = expandAnyway;
        this.mocha = null;
    }
    start(){
        const {store, files} =  this;
        const mochaPath = path.join(__dirname, 'mocha-process.js');
        if(this.mocha !== null){
          this.cleanup();
          this.mocha.kill();
          this.mocha = null;
        }

        const processOptions = {
            slient : false,
            env : this.env || {}
        };

        if(process.platform !== "win32"){
          processOptions.cwd = "/";
        }

        this.mocha =  proc.fork(mochaPath, [this.compiler].concat(this.files), processOptions);

        restart(store);
        this.mocha.on("uncaughtException", function(){
            console.log('error');
        });
        this.mocha.on("message", (action) => {
            switch(action.message){
                case "BEGIN" :
                    return begin(store, { data : processor([makeSuite(action.data)])} );
                case "END" :
                    this.cleanup();
                    this.mocha = null;
                    return done(store, { data : action.data });
                case "START_TEST":
                    return startTest(store, { test : action.data });
                case "END_TEST":
                    return finishTest(store, { test : action.data, expandAnyway : this.expandAnyway });
                case "SUITE_END" :
                    return endSuite(store, { suite : action.data });
                case "ERROR" :
                    return handleError(store, { error : action.error });
                case "BEFORE_ALL" :
                    return handleHookFailed(store, action.data);
                case "AFTER_ALL" :
                    return handleHookFailed(store, action.data);
                case "BEFORE_EACH" :
                    return handleEachHookFailed(store, action.data);
                case "AFTER_EACH":
                    return handleEachHookFailed(store, action.data);
            }
        });
    }
    cleanup() {
      this.mocha.removeAllListeners();
    }
    clearFiles(){
        this.files = [];
    }
    addFile(filePath){
        this.files.push(filePath);
    }
}
