import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { dashboardData } from '../data';
import { WebSocketAPI } from '../../../WebSocketAPI';
import { MachineComponent } from '../machine/machine.component';
import { LineComponent } from '../line/line.component';
import { MachineService } from '../machine/machine.service';
import { DashboardService } from './dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  uteList: any;
  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  randomNum: any;
  viewName: any;

  constructor(private machineService : MachineService,
            private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal ){}

  ngOnInit() {

    let routeId = this.route.snapshot.params.id;
    this.webSocketAPI = new WebSocketAPI(new MachineComponent(this.machineService, this.dashboardService, this.route, this.router, this.modalService));
    let arr = this.dashboardService.getDashboardView(routeId).subscribe((res: any) => {
      // this.uteList = res.data.utes;
      this.uteList = JSON.parse(res.data.json);
      this.viewName = res.data.name;
      console.log(res);
    }, (err) => {
      console.log("err----");
    });
  }

  connect(){
    this.webSocketAPI._connect(this.machineService.getList());
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send('Hello');
  }

  handleMessage(message){
    this.greeting = message;
  }

}
