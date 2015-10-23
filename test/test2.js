describe("Some other test", ()=>{
    it("is going to fail", ()=>{
        throw new Error("The test has failed");
    });
    it("is going to be ok", ()=>{
    });
});
describe("Some other test", ()=>{
    describe("Some other test", ()=>{
        it("is going to fail", ()=>{
            throw new Error("The test has failed");
        });
        it("is going to be ok", (done)=>{
            setTimeout(done, 1000);
        });
    });
    it("is going to fail", ()=>{
    });
    it("is going to be ok", ()=>{
    });
});
describe("Some other test", ()=>{
    it("is going to fail", ()=>{
        throw new Error("The test has failed");
    });
    it("is going to be ok", ()=>{
    });
});
describe("Some other test", ()=>{
    it("is going to fail", ()=>{
        throw new Error("The test has failed");
    });
    it("is going to be ok", ()=>{
        throw new Error("The test has failed");
    });
});
