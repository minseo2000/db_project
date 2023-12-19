module.expors = class User{
    constructor(username, isAdmin = false){
        this.username = username;
        this.isAdmin = isAdmin;
    }
    user(){
        return  this.isAdmin;
    }
}
