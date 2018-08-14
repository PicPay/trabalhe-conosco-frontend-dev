import {Component, Input, OnInit} from '@angular/core';
import {PeopleModel} from '../../people.model';
import {DialogBoxService} from '../dialog-box.service';


@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.css']
})
export class PeopleItemComponent implements OnInit {
  @Input() person: PeopleModel;
  @Input() index: number;
  constructor(private dialogBoxService: DialogBoxService) { }

  ngOnInit() {
  }

  onClick() {
    this.dialogBoxService.showDialog.next(true);
    this.dialogBoxService.onSelecPerson(this.person);
  }
}
