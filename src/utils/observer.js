export default class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(unsubscriber) {
    this.subscribers = this.subscribers.filter((subscriber) => subscriber !== unsubscriber);
  }

  notify(updateType, args) {
    this.subscribers.forEach((subscriber) => subscriber(updateType, args));
  }
}
