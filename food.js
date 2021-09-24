export default class Food{
    constructor(column=10,rows=10,colors=['red','blue','pink','yellow']){
        this.colors = colors;
        this.column = column;
        this.rows = rows;
        this.data = null;
        this.create();
        
    }
    create(){
        let x = Math.floor(Math.random()*this.column);
        let y = Math.floor(Math.random()*this.rows);
        let color = this.colors[parseInt(Math.random()*this.colors.length)];
        this.data = {x,y,color};  
    }
}