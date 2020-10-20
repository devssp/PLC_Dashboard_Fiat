import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  constructor() { }
  @Input() line : any;

  ngOnInit(): void {
  }

  changeMachineData(msg: any): void {
    console.log('here in line component',msg);
    console.log('lineeeeeeee',this.line);
  }

}
