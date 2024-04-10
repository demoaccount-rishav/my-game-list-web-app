export default class UserModel {

    constructor(id, name, email, password) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    static AddUser(name, email, password) {
        userList.push(new UserModel(userList.length, name, email, password));
    }

    static searchUser(email, password) {
        if(userList.length == 0) return null;

        const result = userList.find(eachUser => eachUser.email == email && eachUser.password == password)
        
        return result;
    }
}

let userList = [

]