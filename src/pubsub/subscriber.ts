import PubSub from 'pubsub-js';

export class Subscriber {
  topic: string = "";
  callback: (data: any) => void
  isSubscribing = false;
  token: string = "";

  constructor(topic: string, callback: (data: any) => void) {
    this.topic = topic
    this.callback = callback
  }

  subscribe() {
    if(!this.token) {
      this.token = PubSub.subscribe(this.topic, (message, data) => {
        this.callback(data);
      });
      this.isSubscribing = true;
    }
  }

  unsubscribe() {
    if(this.token) {
      PubSub.unsubscribe(this.token);
      this.token = "";
      this.isSubscribing = false;
    }
  }
}