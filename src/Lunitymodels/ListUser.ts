import User from '../models/user'
class ListUser {
    public users: User[];
    constructor() {
        this.users = []
      }
}
export default ListUser;
