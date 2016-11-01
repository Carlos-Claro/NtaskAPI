import jwt from "jwt-simple";

describe("Routes: Users", () => {
	const Users = app.db.models.Users;
	const JwtSecret = app.libs.config.jwtSecret;
	let token;
	beforeEach(done => {
		Users
			.destroy({where: {}})
			.then(() => Users.create({
				name: "john",
				email: "carlosclaro79@gmail.com",
				password: "12345"
			}))
			.then(user => {
				token = jwt.encode({id:user.id},JwtSecret);
				done();
				});
			});
	describe("GET /user", () => {
		describe("status 200", () => {
			it("returns an authenticated user", done => {
				request.get("/user")
					.set("Authorization",'JWT ' + token)
					.expect(200)
					.end((err,res) => {
						expect(res.body.name).to.eql("john");
						expect(res.body.email).to.eql("carlosclaro79@gmail.com");
						done(err);
					});
			});
		});
	});
	describe("DELETE /user", () => {
		describe("status 200", () => {
			it("deletes an authenticated user", done => {
				request.delete("/user")
					.set("Authorization",'JWT ' + token)
					.expect(204)
					.end((err,res) => {
						done(err);
					});
			});
		});
	});
	describe("POST /users", () => {
		describe("status 200", () => {
			it("create a new user", done => {
				request.post("/users")
					.set("Authorization",'JWT ' + token)
					.send({name:"Mary", email:"mary@mail.net",password:"12345"})
					.expect(200)
					.end((err,res) => {
						expect(res.body.name).to.eql("Mary");
						expect(res.body.email).to.eql("mary@mail.net");
						done(err);
					});
			});
		});
	});
});