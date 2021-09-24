export default class Snake{
    constructor(){
        this.data = [
            {x: 6, y: 4, color: "green"},
            {x: 5, y: 4, color: "white"},
            {x: 4, y: 4, color: "white"},
            {x: 3, y: 4, color: "white"},
            {x: 2, y: 4, color: "white"}

        ];
        this.direction = 'right'
    }
    move(){
        let i = this.data.length -1;
        this.lastDate = {
            x:this.data[i].x,
            y:this.data[i].y,
            color:this.data[i].color
        }

        for(i;i>0;i--){
            this.data[i].x = this.data[i-1].x;
            this.data[i].y = this.data[i-1].y;
        }
        //根据方向移动蛇头
        switch(this.direction){
            case 'left':
                this.data[0].x --;
                break;
            case 'right':
                this.data[0].x ++;
                break;
            case 'top':
                this.data[0].y --;
                break;
            case 'bottom':
                this.data[0].y ++;
                break;
        }
    }
    changeDir(dir){
        //如果蛇在左右移动，那么我们只能让他上下改变
        if(this.direction === 'left' || this.direction === 'right'){
            if(dir === 'left'|| dir=== 'right'){
                return false;
            }
            //如果蛇正在上下移动，那么我们只能让他左右改变
        }else{
            if(dir === 'top' || dir === 'bottom'){
                return false;
            }
        }
         this.direction = dir;
         return true;
    }
    eatFood(){
        this.data.push(this.lastDate);
    }
}