export default class Authorization
{
    constructor(authority) {
        this.authority = authority;
    }

    can(roles) {
        return roles.indexOf(this.authority) >= 0;
    }

    createCategory() {
        return this.can([2]);
    }

    createBoard() {
        return this.can([2]);
    }

    createThread() {
        return this.can([1, 2]);
    }

    createComment() {
        return this.can([1, 2]);
    }

    settingProfile() {
        return this.can([1, 2]);
    }
}
