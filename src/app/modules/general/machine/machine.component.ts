import { Component, OnInit, Input } from '@angular/core';
import {MachineService} from './machine.service'
import {DashboardService} from '../dashboard/dashboard.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

   count = 0;
   @Input() machine : any = {};
   machineData : any;
   machineObservable : any;
   boxSize: any;
   lineHeight: any;
   closeResult: string;
   redTagList: any;
   yellowTagList: any;
  constructor(private machineService : MachineService, private dashboardService: DashboardService,
            private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit(): void {

    let routeId = this.route.snapshot.params.id;
    let arr = this.dashboardService.getDashboardView(routeId).subscribe((res: any) => {
      this.boxSize = res.data.boxSize;
      this.lineHeight = 2.5;
      // if(this.boxSize == 50) {
      // } else if(this.boxSize == 100 || this.boxSize == 150 || this.boxSize == 200 || this.boxSize == 300){
      //   this.lineHeight = 2.5;
      // }
      console.log("boxSize",res)
    }, (err) => {
      console.log("err----");
    });

    this.machine["old"] = 0;
    this.machine["current"] = 0;
    this.machineService.addInList(this.machine);
  }

  showTagAlertGrid(machine, color) {
    window.open('/tag-alert/'+ machine.id +'?alertType='+color, '_blank');
    // window.open('http://localhost:9911/tag-alert/'+machine.id+'?alertType='+color, '_blank');
  }

  showAssetComponent(machine) {
    window.open('/plc-asset-component/'+ machine.id , '_blank');
    // window.open('http://localhost:9911/plc-asset-component/'+ machine.id, '_blank');
  }

  updateData(data: any): void {
    const machineList = this.machineService.getList() ;
    data = JSON.parse(data);
    this.updateMachine(machineList, data);
  }

  updateMachine(machineList: any, data : any){
    const machines = machineList.filter((res) => res.id === data.id);
    if(machines.length > 0){
        const machineData = machines[0];
        machineData.currentRed = data.currentRed;
        machineData.currentYellow = data.currentYellow;
        machineData.oldRed = data.oldRed;
        machineData.oldYellow = data.oldYellow;
        machineData.current = data.current;
        machineData.old = data.old;
        machineData.tooltipYellow = data.tooltipYellow;
        machineData.tooltipRed = data.tooltipRed;
        machineData.popupYellow = data.popupYellow;
        machineData.Red = data.popupRed;
    }
  }

  openRed(content, machine) {
    this.redTagList = [];
    this.modalService.open(content, {
      size: 'xl',
      // centered: true,
      backdrop: 'static'});
      this.redTagList = machine.Red;
  }

  openYellow(content, machine) {
    this.yellowTagList = [];
    this.modalService.open(content, {
      size: 'xl',
      centered: true,
      backdrop: 'static'});
      this.yellowTagList = machine.popupYellow;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
