import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_BASE_URL = "http://localhost:8888/ws";
const RECONECT_DELAY = 5000;

class WebSocketClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.client = null;
    this.subscriptions = new Map(); // Lưu các subscription theo topic
  }

  connect() {
    if (this.client && this.client.active) {
      console.warn("WebSocket is already connected.");
      return;
    }

    const socket = new SockJS("http://localhost:8333/ws/product");
    console.log("SockJS URL:", socket._transport && socket._transport.url);
    this.client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: RECONECT_DELAY, // Tự động reconnect sau 5s nếu mất kết nối
      onConnect: () => {
        console.log("WebSocket Connected!");
        this.resubscribe(); // Đăng ký lại các topic nếu reconnect
      },
      onStompError: (frame) => {
        console.error("WebSocket Error:", frame);
      },
    });

    this.client.activate();
  }

  subscribe(topic, callback) {
    if (!this.client) {
      console.error("WebSocket chưa được kết nối!");
      return;
    }

    if (this.client.connected) {
      const subscription = this.client.subscribe(topic, (message) => {
        callback(JSON.parse(message.body));
      });
      this.subscriptions.set(topic, { callback, subscription });
    } else {
      this.subscriptions.set(topic, { callback, subscription: null }); // Chờ connect rồi mới subscribe
    }
  }

  resubscribe() {
    this.subscriptions.forEach((value, topic) => {
      if (!value.subscription) {
        const subscription = this.client.subscribe(topic, (message) => {
          value.callback(JSON.parse(message.body));
        });
        this.subscriptions.set(topic, { callback: value.callback, subscription });
      }
    });
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
      console.log("WebSocket Disconnected!");
      this.subscriptions.clear(); // Xóa hết subscriptions khi disconnect
    }
  }
}


export const webSocket = new WebSocketClient();