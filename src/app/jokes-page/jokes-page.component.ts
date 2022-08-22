import { Component, OnDestroy, OnInit } from '@angular/core';
import { JokesService } from '../shared/services/jokes.service';
import { Subscription } from 'rxjs';
import { JokeInterface } from '../shared/interfeces';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionJokeComponent } from '../description-joke/description-joke.component';

@Component({
  selector: 'app-jokes-page',
  templateUrl: './jokes-page.component.html',
  styleUrls: ['./jokes-page.component.scss'],
})
export class JokesPageComponent implements OnInit, OnDestroy {
  joke!: JokeInterface;
  jokes$!: Subscription;
  jokesData!: JokeInterface[];
  similarJokes!: JokeInterface[];

  constructor(public jokesService: JokesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.jokes$ = this.jokesService.getJokes().subscribe((res) => {
      this.jokesData = res;
    });
  }

  openJoke(joke: JokeInterface): void {
    this.similarJokes = this.jokesData.filter((j) => j.type === joke.type);
    this.dialog.open(DescriptionJokeComponent, {
      data: { joke, similarJokes: this.randomJokes().slice(0, 3) },
      width: '400px',
    });
  }

  ngOnDestroy(): void {
    if (this.jokes$) {
      this.jokes$.unsubscribe();
    }
  }

  private randomJokes(): JokeInterface[] {
    let randomData: JokeInterface[] = JSON.parse(
      JSON.stringify(this.similarJokes)
    );
    let temp = null;
    let len = randomData?.length - 1;
    for (let i = len; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      temp = randomData[i];
      randomData[i] = randomData[j];
      randomData[j] = temp;
    }
    return randomData;
  }
}
