import { Component, OnInit, Input } from '@angular/core';
import { ITripPreview } from 'src/app/interfaces/trip.interface';

@Component({
  selector: 'app-trip-preview',
  templateUrl: './trip-preview.component.html',
  styleUrls: ['./trip-preview.component.scss']
})
export class tripPreviewComponent  implements OnInit {
  @Input() tripFormValues: ITripPreview;

  constructor() { }

  ngOnInit() {
  }

}