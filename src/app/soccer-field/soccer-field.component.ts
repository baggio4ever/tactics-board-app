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
    const PLAYER_RADIUS = 23;
    ctx.save();

    ctx.translate( this.x,this.y );

    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(0,0,PLAYER_RADIUS,0,Math.PI * 2,false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#A22';
    ctx.arc(0,0,PLAYER_RADIUS-3,0,Math.PI * 2,false);
    ctx.fill();

    ctx.restore();
  }
}

const CANVAS_WIDTH = 600;   // デフォルト値
const CANVAS_HEIGHT = 400;  // デフォルト値

const FORMATION_GRID_X = Math.round((CANVAS_WIDTH/2)/5);
const FORMATION_GRID_Y = Math.round( CANVAS_HEIGHT/5 );

const player_list = [
  {
    x: FORMATION_GRID_X * 1,
    y: (CANVAS_HEIGHT/2),
    name:'B',
    position:Position.GK,
    unifom_number:1
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 1,
    name:'C',
    position:Position.DF,
    unifom_number:2
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 2,
    name:'A',
    position:Position.DF,
    unifom_number:3
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 3,
    name:'A',
    position:Position.DF,
    unifom_number:4
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 4,
    name:'A',
    position:Position.DF,
    unifom_number:5
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 1,
    name:'A',
    position:Position.MF,
    unifom_number:6
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 2,
    name:'A',
    position:Position.MF,
    unifom_number:7
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 3,
    name:'A',
    position:Position.MF,
    unifom_number:8
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 4,
    name:'A',
    position:Position.MF,
    unifom_number:9
  },
  {
    x: FORMATION_GRID_X * 4,
    y: FORMATION_GRID_Y * 2,
    name:'A',
    position:Position.FW,
    unifom_number:10
  },
  {
    x: FORMATION_GRID_X * 4,
    y: FORMATION_GRID_Y * 3,
    name:'A',
    position:Position.FW,
    unifom_number:11
  },
];

@Component({
  selector: 'app-soccer-field',
  templateUrl: './soccer-field.component.html',
  styleUrls: ['./soccer-field.component.css']
})
export class SoccerFieldComponent implements OnInit, AfterViewInit, DoCheck {

  @ViewChild('myCanvas') myCanvas;

  canvasWidth = CANVAS_WIDTH;
  canvasHeight = CANVAS_HEIGHT;
  
  context: CanvasRenderingContext2D;

  grassPattern = null;

  soccerBall = new Ball( 100,100,20 );

  players = [];

  constructor() {
    this.players = [];
    for( let i=0;i<player_list.length;i++ ) {
      const pl = player_list[i];
      const p = new Player();
      p.moveTo( pl.x,pl.y );
      p.name = pl.name;
      p.postion = pl.position;
      p.uniform_number = pl.unifom_number;

      this.players.push(p);
    }
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
      for( let i=0;i<this.players.length;i++ ) {
        this.players[i].draw( ctx );
      }
//      this.player.draw( ctx );

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
