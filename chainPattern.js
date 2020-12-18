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

class LogHandler extends Handler {
    Handle(request) {
        console.log(`Log\n ${JSON.stringify(request)}`);
        return super.Handle(request);
    }
}

class AuthorizeHandler extends Handler {

    Check(Login, Password) {
        console.log(Login);
        return Login == "admin" && Password == "admin";
    }

    Handle(request) {
        console.log("Authorize");
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

class ResponceHandler extends Handler {
    Handle(request) {
        console.log("Response");
        return 42;
    }
}

class Capcha extends Handler {
    readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })

    Handle(request) {
        let a = Math.floor(Math.random() * 50),
            b = Math.floor(Math.random() * 50)
        this.readline.question(`${a}+${b}=`, res => {
            if (res == a + b) {
                this.readline.close()
                return super.Handle(request)
            }
            else {
                console.log("Wrong value")
                this.readline.close()
                return null
            }
        })
    }
}

export { LogHandler, AuthorizeHandler, ResponceHandler, Capcha };