import {Component, OnDestroy, OnInit} from '@angular/core';
import {PeopleModel} from './people/people.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'app';

  ngOnInit() {}
  ngOnDestroy() {}
}
