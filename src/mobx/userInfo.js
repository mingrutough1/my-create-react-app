import { observable, action }from 'mobx';
class Store {
    @observable userInfo = {
        name: '',
        permissions: [],
        token: '',
        identity: {
            id: '',
            name: ''
        }
    };
    @observable rolesOptions = {}
    @action.bound setUserInfo(payload) {
        this.userInfo = payload.userInfo;
    }
    @action.bound setRolesOptions(payload) {
        this.rolesOptions = payload.rolesOptions;
    }
}

export default Store;