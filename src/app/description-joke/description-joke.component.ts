import { Component, Inject, OnInit } from '@angular/core';
import { JokeInterface } from '../shared/interfeces';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-description-joke',
  templateUrl: './description-joke.component.html',
  styleUrls: ['./description-joke.component.scss'],
})
export class DescriptionJokeComponent implements OnInit {
  joke!: JokeInterface;
  similarJokes!: JokeInterface[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.joke = this.data.joke;
    this.similarJokes = this.data.similarJokes;
  }
}
