import { Component, OnInit, AfterViewInit, DoCheck, ViewChild } from '@angular/core';

class SomeService {
  // 2点間の距離
  static getDistanceFromTo( x1,y1,x2,y2:number ): number {
      const d = Math.floor( Math.sqrt( Math.pow( x1 - x2, 2 ) + Math.pow( y1 - y2, 2 ) ) );

      return d;
  }
}

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

  offsetMoveTo( x,y: number ): void {
    this.x += x;
    this.y += y;
  }

  draw( ctx: CanvasRenderingContext2D, isSelected,isHovered: boolean ): void {
    if ( this.img ) {
      ctx.save();
      
      ctx.drawImage( 
        this.img,
        this.x - this.getWidth() / 2,
        this.y - this.getHeight() / 2,
        this.getWidth(),
        this.getHeight()
      );

      if( isHovered ) {
        ctx.beginPath();
        ctx.strokeStyle = '#F00';
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
      }

      if( isSelected ) {
        ctx.beginPath();
        ctx.fillStyle = '#FF07';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  includes( x,y: number ): boolean {
    const d = SomeService.getDistanceFromTo(this.x, this.y, x, y);

    return (this.radius > d);
  }
}

// チョーク
class Chalk {
  color = 'black';
  strokes = [];

  constructor(color='white') {
    this.color = color;
  }

  draw( ctx:CanvasRenderingContext2D ) {}

  offsetMoveTo( x,y: number ): void {}
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

  radius = 23;  // 描画時の円の半径

  constructor() {}

  moveTo( x,y: number ): void {
    this.x = x;
    this.y = y;
  }

  offsetMoveTo( x,y: number ): void {
    this.x += x;
    this.y += y;
  }

  draw( ctx: CanvasRenderingContext2D, isSelected,isHovered: boolean ): void {
//    const PLAYER_RADIUS = 23;
    ctx.save();

    ctx.translate( this.x,this.y );

    ctx.beginPath();
    ctx.fillStyle = '#F00';
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    if( isHovered ) {
      ctx.fillStyle = '#C77';
    } else {
      ctx.fillStyle = '#A22';
    }
    ctx.arc(0, 0, this.radius-3, 0, Math.PI * 2, false);
    ctx.fill();

    if( isSelected) {
      ctx.beginPath();
      ctx.fillStyle = '#FF07';
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }

    if( this.name !== '' ){
      ctx.font = '9pt serif';
      ctx.fillStyle = 'white';
      const t = ctx.measureText( this.name );
      ctx.fillText( this.name, -t.width / 2, this.radius + 14 );
    }

    ctx.restore();
  }

  includes( x,y: number ): boolean {
    // 2点間の距離
    const d = SomeService.getDistanceFromTo(this.x, this.y, x, y);

    return (this.radius > d);
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
    name:'川口能活',
    position:Position.GK,
    unifom_number:1
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 1,
    name:'井原正巳',
    position:Position.DF,
    unifom_number:2
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 2,
    name:'ロベルト・カルロス',
    position:Position.DF,
    unifom_number:3
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 3,
    name:'パオロ・マルディーニ',
    position:Position.DF,
    unifom_number:4
  },
  {
    x: FORMATION_GRID_X * 2,
    y: FORMATION_GRID_Y * 4,
    name:'ベッケンバウアー',
    position:Position.DF,
    unifom_number:5
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 1,
    name:'ドゥンガ',
    position:Position.MF,
    unifom_number:6
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 2,
    name:'中田英寿',
    position:Position.MF,
    unifom_number:7
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 3,
    name:'名波浩',
    position:Position.MF,
    unifom_number:8
  },
  {
    x: FORMATION_GRID_X * 3,
    y: FORMATION_GRID_Y * 4,
    name:'リオネル・メッシ',
    position:Position.MF,
    unifom_number:9
  },
  {
    x: FORMATION_GRID_X * 4,
    y: FORMATION_GRID_Y * 2,
    name:'ロベルト・バッジョ',
    position:Position.FW,
    unifom_number:10
  },
  {
    x: FORMATION_GRID_X * 4,
    y: FORMATION_GRID_Y * 3,
    name:'C・ロナウド',
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

  players:Player[] = [];

  chalks:Chalk[] = [];

  currentMousePos = [0,0];
  lastCurrentMousePos = [0,0];

  selectedBall:Ball = null;
  selectedPlayers:Player[] = [];
  selectedChalks:Chalk[] = [];

  isMouseDown = false;
  
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

  getLocalXY(e): [number,number] {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x,y];
  }

  getOffsetFromLastPos(): [number,number] {
    return [
      this.currentMousePos[0]-this.lastCurrentMousePos[0],
      this.currentMousePos[1]-this.lastCurrentMousePos[1]
    ];
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
        const p = this.players[i];
        p.draw( 
          ctx,
          this.selectedPlayers.includes(p),
          p.includes(this.currentMousePos[0], this.currentMousePos[1])
        );
      }

      // soccer ball
      this.soccerBall.draw(
        ctx,
        (this.selectedBall == this.soccerBall ),
        this.soccerBall.includes( this.currentMousePos[0], this.currentMousePos[1] )
      );
    }
  }

  markObjects( x,y: number ) {
    // ball
    if( this.soccerBall.includes( x, y ) ) {
      this.selectedBall = this.soccerBall;
    } else {
      this.selectedBall = null;
    }

    // players
    this.selectedPlayers = [];
    for( let i = 0; i < this.players.length; i++ ) {
      if( this.players[i].includes( x,y ) ) {
        this.selectedPlayers.push( this.players[i] );
      }
    }
  }

  canvasClick(e): void {
//    console.log('click');
//    const xy = this.getLocalXY(e);

//    this.soccerBall.moveTo( xy[0], xy[1] );
  }

  canvasMouseDown(e): void {
    console.log('mouse down');

    this.markObjects( this.currentMousePos[0], this.currentMousePos[1] );
    this.isMouseDown = true;
    this.lastCurrentMousePos = this.currentMousePos;
  }

  canvasMouseUp(e): void {
    console.log('mouse up');

    this.isMouseDown = false;
  }

  canvasMouseOver(e): void {
    console.log('mouse over');
  }

  canvasMouseOut(e): void {
    console.log('mouse out');
  }

  canvasMouseMove(e): void {
    // console.log('mouse move');  イベントが頻発するのでコメント
    const xy = this.getLocalXY(e);
    this.currentMousePos = xy;

    if(this.isMouseDown) {
      const xy2 = this.getOffsetFromLastPos();

      if( this.selectedBall !== null ) {
        this.selectedBall.offsetMoveTo(xy2[0],xy2[1]);
      }
      if( this.selectedPlayers.length>0 ) {
        for( let i=0; i<this.selectedPlayers.length; i++ ) {
          const p = this.selectedPlayers[i];
          p.offsetMoveTo( xy2[0], xy2[1] );
        }
      }
      if( this.selectedChalks.length>0 ) {
        for( let i=0; i<this.selectedChalks.length; i++ ) {
          const c = this.selectedChalks[i];
          c.offsetMoveTo( xy2[0], xy2[1] );
        }
      }
      this.lastCurrentMousePos = this.currentMousePos;
    }
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
