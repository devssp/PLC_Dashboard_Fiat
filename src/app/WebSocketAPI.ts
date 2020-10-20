import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MachineComponent } from './modules/general/machine/machine.component';

export class WebSocketAPI {
    webSocketEndPoint: string = '/ws';
    // webSocketEndPoint: string = 'http://localhost:9911/ws';
    topic: string = "/topic/";
    stompClients: any = [];
    machineComponent : MachineComponent
    // appComponent: DashboardComponent;
    constructor(machineComponent : MachineComponent){
        this.machineComponent = machineComponent;
    }
    _connect(machines) {
        let machine: any;
        for(let index in machines) {
            this._connetToMachine(machines[index].code);
        }
    };

    _connetToMachine(machineCode) {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        var stompClient = Stomp.over(ws);
        const _this = this;
        stompClient.connect({}, function (frame) {
            stompClient.subscribe(_this.topic+ machineCode, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
        this.stompClients.push(stompClient);

    }
    _disconnect() {
        // let stompClient: any;
        for(let index in this.stompClients) {
            if (this.stompClients[index] !== null) {
                this.stompClients[index].disconnect();
            }
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error) {
       console.log("errorCallBack -> " + error)
        // setTimeout(() => {
        //     this._connect("");
        // }, 5000);
    }

	/**
	 * Send message to sever via web socket
	 * @param {*} message 
	 */
    _send(message) {
        // console.log("calling logout api via web socket");
        // console.log('here',this.stompClient);
        // this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        this.machineComponent.updateData(message.body);
    }
}