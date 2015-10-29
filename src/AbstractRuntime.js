function notImplement(methodName){
    throw new Error(methodName + " is not implemented!");
}

export default class AbstractRuntime{
    constructor(){
        this.files = [];
    }

    start(){
        notImplement("start");
    }

    kill(){
        notImplement("kill");
    }
    clearFiles(){
        this.files = [];
    }
    addFile(filePath){
        this.files.push(filePath);
    }

}
