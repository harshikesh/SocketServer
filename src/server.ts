import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import Context from './context'
import PubSub from './pubsub'

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
app.use(express.static(__dirname +'/'));
app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./index.html"));
  });
  
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

const ctx:Context = new Context(io);
const pubSubServer = new PubSub(ctx);

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});