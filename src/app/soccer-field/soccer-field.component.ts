import { Component, OnInit, AfterViewInit, DoCheck, ViewChild } from '@angular/core';

class Ball {
  x: number;  // 中心X座標
  y: number;  // 中心Y座標
  radius: number; // 半径

  img = null; // ボール画像

  constructor( x,y,radius: number ) {
    this.moveTo( x,y );
    this.radius = radius;
  }

  getWidth(): number {
    return this.radius * 2;
  }

  getHeight(): number {
    return this.radius * 2;
  }

  moveTo( x,y: number ) {
    this.x = x;
    this.y = y;
  }

  draw( ctx: CanvasRenderingContext2D ): void {
    if ( this.img ) {
        ctx.drawImage( 
          this.img,
          this.x - this.getWidth() / 2,
          this.y - this.getHeight() / 2,
          this.getWidth(),
          this.getHeight()
        );
    }
  }
}

enum Position {
  FW,
  MF,
  DF,
  GK
}

class Player {
  x: number;  // 中心X座標
  y: number;  // 中心Y座標

  name: string; // 選手名
  face_url: string; // 顔画像URL（使えるといいな）

  postion: Position;  // ポジション

  uniform_number: number;  // 背番号

  constructor() {}

  moveTo( x,y: number ): void {
    this.x = x;
    this.y = y;
  }

  draw( ctx: CanvasRenderingContext2D ): void {
    const PLAYER_RADIUS = 25;
    ctx.save();
    ctx.translate( this.x,this.y );
    ctx.fillStyle = 'red';
    ctx.arc(0,0,PLAYER_RADIUS,0,Math.PI * 2,false);
    ctx.fill();
    ctx.restore();
  }
}


@Component({
  selector: 'app-soccer-field',
  templateUrl: './soccer-field.component.html',
  styleUrls: ['./soccer-field.component.css']
})
export class SoccerFieldComponent implements OnInit, AfterViewInit, DoCheck {

  @ViewChild('myCanvas') myCanvas;

  canvasWidth = 600;
  canvasHeight = 400;
  
  context: CanvasRenderingContext2D;

  grassPattern = null;

  soccerBall = new Ball( 100,100,20 );

  player = new Player();

  constructor() {
    this.player.moveTo( 200,200 );
    this.player.name = '上杉謙信';
    this.player.postion = Position.FW;
    this.player.uniform_number = 9;
  }

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
      this.soccerBall.img = img_ball; // まわりくどいね
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

      // player
      this.player.draw( ctx );

      // soccer ball
      this.soccerBall.draw( ctx );
    }
  }
/*
  drawBall(ctx): void {
    if ( this.soccerBall.img ) {
        ctx.drawImage( this.soccerBall.img, this.soccerBall.x - (this.soccerBall.radius * 2) / 2, this.soccerBall.y - (this.soccerBall.radius * 2) / 2, (this.soccerBall.radius * 2),(this.soccerBall.radius * 2));
    }
  }
*/

  canvasClick(e): void {
    console.log('click');

    const rect = e.target.getBoundingClientRect();
    this.soccerBall.moveTo( e.clientX - rect.left, e.clientY - rect.top );
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
    // console.log('mouse move');  イベントが頻発するのでコメント
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
