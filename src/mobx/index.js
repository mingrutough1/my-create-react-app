import UseInfo from './userInfo';
import PublicFactor from './publicFactor';

class Store {
    constructor() {
        this.UseInfo = new UseInfo();
        this.PublicFactor = new PublicFactor();
    }
}
export default Store;