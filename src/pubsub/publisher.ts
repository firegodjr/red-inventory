import PubSub from 'pubsub-js';

export class Publisher {
  topic = "";

  constructor(topic: string) {
    this.topic = topic
  }

  publish(message: any) {
    PubSub.publish(this.topic, message);
  }
}