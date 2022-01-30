class Authorization
{
    constructor(authority) {
        this.authority = authority;
    }

    can(roles) {
        return roles.indexOf(this.authority) >= 0;
    }

    createCategory() {
        this.can([1, 2]);
    }

    createBoard() {
        this.can([1, 2]);
    }

    createThread() {
        this.can([1, 2]);
    }

    createComment() {
        this.can([1, 2]);
    }

    settingProfile() {
        this.can([1, 2]);
    }
}

export default Authorization;
