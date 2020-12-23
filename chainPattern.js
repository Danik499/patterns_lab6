import promptSync from "prompt-sync"
let prompt = promptSync()

class Handler {
    SetNext(handler) {
        this._next = handler;
        return handler;
    }
    Handle(request) {
        if (this._next && this._next.Handle)
            return this._next.Handle(request);
        else
            return null;
    }
}

class AuthorizeHandler extends Handler {

    Check(Login, Password) {
        return Login == "admin" && Password == "admin";
    }

    Handle(request) {
        if (request.Login && request.Password) {
            if (this.Check(request.Login, request.Password)) {
                return super.Handle(request);
            }
            else {
                console.log("Wrong login or password");
                return null;
            }
        }
        else {
            console.log("Bad request");
            return null;
        }
    }
}

class ResponseHandler extends Handler {
    Handle(request) {
        console.log("Response");
        return 42;
    }
}

class Capcha extends Handler {
    Handle(request) {
        let a = Math.floor(Math.random() * 50),
            b = Math.floor(Math.random() * 50),
            res = parseInt(prompt(`${a}+${b}=`))
        if (res == a + b) super.Handle(request)
        else return null
    }
}

class SMS extends Handler {
    Handle(request) {
        let sms = Math.floor(Math.random() * 8999 + 1000)
        console.log(`Code: ${sms}`)
        let res = parseInt(prompt("Enter code: "))
        if (res == sms) super.Handle(request)
        else return null
    }
}

export { LogHandler, AuthorizeHandler, ResponseHandler, Capcha, SMS };