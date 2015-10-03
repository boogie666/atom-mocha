describe("A test", function(){
    it("should pass", function(){

    });

    it("should fail", function(){
        throw new Error("Failed");
    });
    describe("with nested stuff", function(){
        it("passes", function(){

        });
        it("fails", function(){
            throw new Error("Nested Fail");
        });
        it("is async", function(done){
            setTimeout(function(){
                done();
            }, 1000);
        })
    })
});
