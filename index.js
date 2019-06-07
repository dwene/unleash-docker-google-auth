"use strict";

const unleash = require("unleash-server");
const enableGoogleOauth = require("./google-auth-hook");
const clientSecret = process.env.CLIENT_AUTHORIZATION_HEADER;
const sessionSecret = process.env.SESSION_SECRET;

function enableClientAuth(app) {
  app.use("/api/client", (req, res, next) => {
    if (req.header("authorization") === clientSecret) {
      next();
    } else {
      res.sendStatus(401);
    }
  });
}

unleash
  .start({
    port: 8080,
    databaseUrl: process.env.DATABASE_URL,
    secret: sessionSecret,
    adminAuthentication: "custom",
    preRouterHook: app => {
      enableGoogleOauth(app);
      enableClientAuth(app);
    }
  })
  .then(server => {
    console.log(`Unleash started on port:${server.app.get("port")}`);
  });
