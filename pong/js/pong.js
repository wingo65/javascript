//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97

//Player Array
player = [new Player(), new Player()]
player[0].pad = new Box();
player[1].pad = new Box();
console.log(player)


//Pad Array 
pad = [player[0].pad, player[1].pad]

//pad[0] setup
pad[1].dir = 1
pad[1].w = 20
pad[1].h = 150
pad[1].x = 0 + pad[1].w/2
pad[1].color = 'gray'

//pad[0] setup
pad[0].dir = -1
pad[0].w = 40
pad[0].h = 150
pad[0].x = 0 + c.width 
pad[0].color = 'gray'



//ball setup

var ball = new Box();
ball.w = 20
ball.h = 20
ball.vx = -5
ball.vy = -5
ball.color = `white`



function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    //pad[0] accelerates when key is pressed 
    if(keys[`w`])
    {
       pad[1].vy += -pad[1].force
    }

    if(keys[`s`])
    {
        pad[1].vy += pad[1].force
    }

    //pad[0] accelerates when key is pressed
    if(keys[`ArrowUp`])
    {
       pad[0].vy += -pad[0].force
    }

    if(keys[`ArrowDown`])
    {
        pad[0].vy += pad[0].force
    }



    //ball movement
    ball.move()

    //ball collision 
    if(ball.x < 0)
    {
        ball.x = c.width/2
        ball.y  =c.height/2
        player[0].score += 1
    }
    if(ball.x > c.width)
    {
        ball.x = c.width
        ball.vx = -ball.vx
        player[1].score += 1
    }

    console.log(`${player[0].score} | ${player[0].score}`)
    var highscore = document.querySelectorAll(`#score div`)

    if(ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if(ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy
       
    }

    //draw the objects
    ball.draw()
    
    for(i = 0; i < highscore.length; i++)
    {
        highscore[i].innerHTML = `${player[i].score}`
        //applies friction
        pad[i].vy *= fy
        //player movement
        pad[i].move();
        if(pad[i].y < 0+pad[i].h/2)
        {
            pad[i].y = 0+pad[i].h/2
        }
        if(pad[i].y > c.height-pad[i].h/2)
        {
            pad[i].y = c.height-pad[i].h/2
        }
        if(ball.collide(pad[i]))
        {
            ball.x = pad[i].x + (pad[i].w/2 + ball.w/2) * pad[i].dir
            ball.vx = -ball.vx;

        }
        pad[i].draw()
    

    }
}
