//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

var p=[]
var amt = 50

for(let i=0; i<p.amt; i++)
{
    p[i]=new Box();
    p[i].x = Math.random()*c.width;
    p[i].y = Math.random()*c.height;
    p[i].w = rand(10, 20)
    p[i].h = p[1].w
    p[i].vy = p[i].w *.55;
}

function rand(l, h)
{
    return Math.random() * (h-l) + 1
}

function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    for(let i=0; i<p.length; i++)
    {
        p[i].move()
        if(p[i].y > c.height +p[i].h)
        {
            p[i].y = -p[i].h
        }
        p[i].draw()
    }
   
    
}