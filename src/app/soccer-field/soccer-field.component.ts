import { Component, OnInit, AfterViewInit, DoCheck, ViewChild } from '@angular/core';

@Component({
  selector: 'app-soccer-field',
  templateUrl: './soccer-field.component.html',
  styleUrls: ['./soccer-field.component.css']
})
export class SoccerFieldComponent implements OnInit, AfterViewInit, DoCheck {

  canvasWidth = 600;
  canvasHeight = 400;
  
  context: CanvasRenderingContext2D;

  grassPattern = null;

  soccerBall = null;
  x = 100;
  y = 100;

  @ViewChild('myCanvas') myCanvas;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // myCanvas
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');

    const img = new Image();
    img.src = '../../assets/images/soccer-field/grass.jpg';
    img.onload = () => {
      this.grassPattern = this.context.createPattern(img, 'repeat');
    };

    const img_ball = new Image();
    img_ball.src = '../../assets/images/soccer-field/soccer-ball.png';
    img_ball.onload = () => {
      this.soccerBall = img_ball; // まわりくどいね
    };

    this.draw();
  }

  ngDoCheck() {
    this.draw();
  }

  draw(): void {
    const ctx = this.context;

    if ( ctx ) {
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 芝生パターン
      ctx.fillStyle = this.grassPattern;
      ctx.fillRect( 10, 10, this.canvasWidth - 20, this.canvasHeight - 20);

      // soccer ball
      this.drawBall( ctx );
    }
  }

  drawBall(ctx): void {
    const BALL_WIDTH = 40;
    const BALL_HEIGHT = 40;
    if ( this.soccerBall ) {
        ctx.drawImage( this.soccerBall, this.x - BALL_WIDTH / 2, this.y - BALL_HEIGHT / 2, BALL_WIDTH, BALL_HEIGHT);
    }
  }

  canvasClick(e): void {
    console.log('click');
  }

  canvasMouseDown(e): void {
    console.log('mouse down');
  }

  canvasMouseUp(e): void {
    console.log('mouse up');
  }

  canvasMouseOver(e): void {
    console.log('mouse over');
  }

  canvasMouseOut(e): void {
    console.log('mouse out');
  }

  canvasMouseMove(e): void {
    console.log('mouse move');
  }

  canvasKeyUp(e): void {
    console.log('key up');
  }

  canvasKeyPress(e): void {
    console.log('key press');
  }

  canvasKeyDown(e): void {
    console.log('key down');
  }
}
