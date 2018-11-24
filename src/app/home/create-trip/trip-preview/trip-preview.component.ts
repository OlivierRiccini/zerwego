import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss']
})
export class tripPreviewComponent  implements OnInit {
  @Input() imageUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
