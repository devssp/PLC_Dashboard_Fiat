import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ute',
  templateUrl: './ute.component.html',
  styleUrls: ['./ute.component.css']
})
export class UteComponent implements OnInit {

  @Input() ute: any;

  constructor() { }

  ngOnInit(): void {
  }

}
