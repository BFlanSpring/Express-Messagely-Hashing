/** Server startup for Message.ly. */


const app = require("./app");

console.log('Before app.listen');
app.listen(3000, function () {
  console.log("Listening on 3000");
});