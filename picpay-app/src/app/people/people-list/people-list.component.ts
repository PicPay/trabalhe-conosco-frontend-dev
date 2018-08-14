import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleModel} from '../people.model';
import {DataService} from '../data-server.service';
import {Subscription} from 'rxjs';
import {DialogBoxService} from './dialog-box.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  constructor(private dataServer: DataService,
              private dialogBoxService: DialogBoxService) { }
  people: PeopleModel[];
  subsDialog: Subscription;
  subsNewCard: Subscription;
  subsCardsList: Subscription;
  subsFinishPayment: Subscription;
  showDialog: boolean;
  showNewCard: boolean;
  showCardsList: boolean;
  showFinishPayment: boolean;
  ngOnInit() {

    this.subsDialog = this.dialogBoxService.showDialog.subscribe(
      (bool: boolean) => {
        this.showDialog = bool;
      }
    );
      this.subsNewCard = this.dialogBoxService.showNewCard.subscribe(
      (bool: boolean) => {
        this.showNewCard = bool;
      }
    );
      this.subsCardsList = this.dialogBoxService.showCardsList.subscribe(
      (bool: boolean) => {
        this.showCardsList = bool;
      }
    );
      this.subsFinishPayment = this.dialogBoxService.showFinishPayment.subscribe(
      (bool: boolean) => {
        this.showFinishPayment = bool;
      }
    );
    this.dataServer.getPeople().subscribe(
      (people) => {
        this.people = people;
      }
    );
  }
  ngOnDestroy() {
    this.subsDialog.unsubscribe();
    this.subsNewCard.unsubscribe();
    this.subsCardsList.unsubscribe();
    this.subsFinishPayment.unsubscribe();
  }
}
