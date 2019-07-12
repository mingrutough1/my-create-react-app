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

    @action.bound setUserInfo(payload) {
        this.userInfo = payload.userInfo;
    }
}

export default Store;