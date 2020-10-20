import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MachineService {

  machineList = [];
  constructor() { }

 
  addInList(machine: any) {
    this.machineList.push(machine);
  }

  getList(){
    return this.machineList;
  }

}