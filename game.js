import Map from './map.js';
import Snake from './snake.js';
import Food from './food.js';
import Event from './event.js';

export default class Game extends Event{
    constructor(el,rect,toControl=null,toGrade=null){
        super();
        this.gameMap = new Map(el,rect);
        this.food = new Food(this.gameMap.column,this.gameMap.rows);
        this.createFood();
        this.snake = new Snake();
        this.render();
        this.timer = 0;
        this.interver = 200;
        this.grade = 0;
        this.keyDown = this.keyDown.bind(this)
        this.control();
    }
    //游戏开始

    start(){
       this.move();
    }
    createFood(){
        if(this.gameMap.include(this.food.data)){
            this.food.create(); 
        }
    }
    //向地图渲染数据
    render(){
            this.gameMap.setData(this.snake.data);
            this.gameMap.setData(this.food.data);
            this.gameMap.render();
    }
    //游戏结束
    stop(){
        clearInterval(this.timer);
    }
    //移动蛇
    move(){
        this.stop();
        this.timer = setInterval(()=>{
            this.snake.move();
            this.gameMap.clearData();
            if(this.isEat()){
                this.snake.eatFood();
                this.grade ++;
                this.changeGrade(this.grade);
                this.food.create();
                //减少时间，提高速度
                this.interver *= .9;
                this.stop();
                this.start();
                if(this.grade>10){
                    this.over(1);
                }
            }
            if(this.isOver()){
                this.over(0);
                return ;
            }
            this.render();
        },this.interver)
    }
    /*
    overStatu:
        0:表示游戏中途结束
        1.表示游戏胜利，结束游戏
    */
    over(overStatu){
        if(overStatu ===0){
            // this.toOver && this.toOver();
            this.dispatch('over')
        }else if(overStatu === 1){
            // this.toWin && this.toWin();
            this.dispatch('win');
        }
        
        this.stop();
    }
    isOver(){
        //判断蛇出了地图游戏结束
        if(this.snake.data[0].x<0 || this.snake.data[0].x>=this.gameMap.column || this.snake.data[0].y<0 || this.snake.data[0].y>=this.gameMap.rows){
            return true;
        }
        //判断蛇撞到了自己
        for(let i =1;i<this.snake.data.length;i++){
            if(this.snake.data[0].x === this.snake.data[i].x && this.snake.data[0].y === this.snake.data[i].y){
                return true;
            }
        }
        return false;
    }
    changeGrade(grade){
        //触发事件，改变分数
        this.dispatch('changegrade',grade);
    }
    //蛇吃东西
    isEat(){
        return (this.snake.data[0].x === this.food.data.x) && (this.snake.data[0].y === this.food.data.y);
    }
    //控制按键，改变蛇的方向
    keyDown(e){
        // console.log(e.keyCode);
        let isDir;
        switch(e.keyCode){
            case 40:
                isDir = this.snake.changeDir('bottom');
                break;
            case 37:
                isDir =this.snake.changeDir('left');
                break;
            case 38:
                isDir =this.snake.changeDir('top');
                break;
            case 39:
                isDir =this.snake.changeDir('right');
                break;
        }
    }
    //添加键盘按下事件
    control(){
        window.addEventListener('keydown',this.keyDown);
    }
    //自定义控制键
    addControl(fn){
        //绑定this指向到实例化对象game
        fn().call(this);
        window.removeEventListener('keydown',this.keyDown);
    }
}