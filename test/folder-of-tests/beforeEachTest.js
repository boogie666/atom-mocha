var expect = require("chai").expect;

before(function(){
    throw new Error("A BE Fail");
});
describe("BeforeEach Fail", function(){
  beforeEach(function(){
  });
  afterEach(function(){
  });

  after(function(){
    throw new Error("A BE Fail");
  });

  it("works", function(){
    expect(1).to.be.eql(1);
  });

  it("works 2", function(){
    expect(1).to.be.eql(1);
  });

});


describe("Before Each success", function(){
  beforeEach(function(){
    throw new Error("A BE Fail");
  });
  afterEach(function(){
    throw new Error("A BE Fail");
  });
  it("works", function(){});
  it("works2", function(){});
});
