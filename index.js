import { LogHandler, AuthorizeHandler, ResponceHandler, Capcha, SMS } from "./chainPattern";
let chain = new LogHandler();
// chain.SetNext(new AuthorizeHandler()).SetNext(new ResponceHandler());
// console.log(chain.Handle({ Login: "admin", Password: "admin" }));
// console.log(chain.Handle({ Login: "Noname", Password: "No" }));

chain.SetNext(new Capcha()).SetNext(new AuthorizeHandler()).SetNext(new SMS()).SetNext(new ResponceHandler())

console.log(chain.Handle({ Login: "admin", Password: "admin" }))
