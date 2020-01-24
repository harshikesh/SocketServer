import Subscription from './subscription'

export default class Client {

    ws: any;
    id: string;
    subscriptions: Subscription[];
    constructor (id:string, ws:any ,subscriptions : Subscription[]) {
        this.id= id;
        this.ws= ws;
      this.subscriptions = subscriptions;
    }
}
  