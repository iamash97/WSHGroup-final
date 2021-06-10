let server = require("../backend/routes/user-route");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

//Get User List - test
describe("Get User List /user/getUserList", () =>{
  it("It should get the User List"), (done) =>{
    chai.request(server)
    .get("/user/getUserList")
    .end((err, response) => {
        response.should.have.status.status(200);
        response.body.should.be.a('array');
        //response.body.length.should.be.
    done();
    })
  }
});

//Sign Up Testing
describe("Test create user /user/signup", () => {
  it("It should create a new user", (done) => {
    let user = {
      FirstName: "Chris",
      LastName: "Parker",
      Age: 30,
      Email: "Chirs.Parker@mail.com",
      UsrPwd: "123",
      UsrRole: 2,
      IsActive: true
    };
    chai
      .request(server)
      .post("/user/signup")
      .send(user)
      .end((err, res) => {
        console.log(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("message").eql("User added successfully");
        //res.body.errors.should.have.property("pages");
        //res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
});

/*describe("/POST Login user", () => {
  it("it should login successfully", (done) => {
    let user = {
      Email: "Chirs.Parker@mail.com",
      UsrPwd: "123"
    };
    chai
      .request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        //res.body.errors.should.have.property("pages");
        //res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
}); */

