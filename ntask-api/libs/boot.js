import https from "https";
import fs from "fs";

module.exports = app => {
	if ( process.env.NODE_ENV !== "test" ){
		const credentials = {
			key: fs.readFileSync("ntask.key","utf8"),
			cert: fs.readFileSync("ntask.cert","utf8")
		}
		var ok = true;
			app.db.sequelize.sync().done(() => {
				ok = true;
			});
		
	
			if ( ok )
			{
				app
				.listen(app.get("port"), () => {
					console.log("NTasks API - porta " + app.get("port"));
				});
			}
	}
	else
	{
		app.db.sequelize.sync().done(() => {});
	}
}