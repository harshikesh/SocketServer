import Subscription from './subscription'
import * as uuid from 'uuid';
import Context from './context'
import Client from './client'
export default class PubSub {

 subscription: Subscription;
 clients: Map<string,Client>;
 ctx: Context;
  constructor (ctx:Context) {
    this.ctx = ctx;
    this.clients = new Map()
    this.subscription = new Subscription()

    this.load = this.load.bind(this);
    this.autoId = this.autoId.bind(this);
    this.handleReceivedClientMessage = this.handleReceivedClientMessage.bind(this);
    // this.handleReceivedClientMessage = this.handleReceivedClientMessage.bind(
    //   this)
    // this.handleAddSubscription = this.handleAddSubscription.bind(this)
    // this.handleUnsubscribe = this.handleUnsubscribe.bind(this)
    // this.handlePublishMessage = this.handlePublishMessage.bind(this)
    // this.removeClient = this.removeClient.bind(this)

    this.load()
  }

 load ():void {

    const wss = this.ctx.wss;

    wss.on('connection', (ws: any ) => {
        console.log("a user connected");
     var id = this.autoId();
      var subscriptions;
       var client = new Client(id, ws, subscriptions);

       // Add client
      this.clients = this.clients.set(client.id, client);
      console.log("clients length " + this.clients.size);
      // listen when receive message from client
      ws.on('message',
        (message:any) => 
        this.handleReceivedClientMessage(id, message))

      ws.on('close', () => {
        console.log('Client is disconnected')
        // Find user subscriptions and remove
       

      })

    })

  }




  /**
   * Handle receive client message
   * @param clientId
   * @param message
   */
  handleReceivedClientMessage (clientId:string, message:any):void {
    console.log("Message recieved :" + clientId + message);
    const client = this.getClient(clientId)
 

      const action = message.action;
      switch (action) {
          
        case 'subscribe':

          break

        case 'unsubscribe':
          break

        case 'publish':


            const from = clientId;

          break

        case 'broadcast':
          break

        default:

          break
      }

  }



  /**
   * Get a client connection
   * @param id
   * @returns {V | undefined}
   */
  getClient (id:any):Client {

    return this.clients.get(id);
  }

  /**
   * Generate an ID
   * @returns {*}
   */
 autoId ():any {
    return uuid();
  }

  /**
   * Send to client message
   * @param message
   */
  send (clientId:string, message:any) {

    const client = this.getClient(clientId)
    if (!client) {
      return
    }
    const ws = client.ws
    try {
      message = JSON.stringify(message)
    }
    catch (err) {
      console.log('An error convert object message to string', err)
    }

    ws.send(message)
  }

}