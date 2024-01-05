import { Component } from '@angular/core';
import { NumToWordPipe } from './num-to-word.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[NumToWordPipe]
})
export class AppComponent {
  title = 'numToWords';
  num!:number;
  numWord!:string;

  constructor(private numToWordPipe : NumToWordPipe){}
  ngOninit(){
    console.log("oninit");
  }
  convert(){
    this.numWord = this.numToWordPipe.transform(this.num);
    console.log(this.numWord);
    
  }
}
