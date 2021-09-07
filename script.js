let ball = document.querySelector(".ball");
let board = document.querySelector(".board");
let leftPaddle = document.querySelector(".left");
let rightPaddle = document.querySelector(".right");
let boardBound = board.getBoundingClientRect();
let x=true;
let y=true;
let leftPlayerLife = 3;
let rightPlayerLife = 3;

document.addEventListener("keydown",function(e){
    if(e.key=="w"){
        movePaddle(leftPaddle, -window.innerHeight*0.05 );
    }
    if(e.key=="s"){
        movePaddle(leftPaddle, window.innerHeight*0.05);
    }
    if(e.key=="ArrowUp"){
        movePaddle(rightPaddle, -window.innerHeight*0.05);
    }
    if(e.key=="ArrowDown"){
        movePaddle(rightPaddle, window.innerHeight*0.05);
    }
})

function movePaddle(currentPadd, change){
    let cPaddleBound = currentPadd.getBoundingClientRect();
    if(cPaddleBound.top+change >= boardBound.top && cPaddleBound.bottom+change <= boardBound.bottom)
    {currentPadd.style.top = cPaddleBound.top+change+1+"px";}
}

function moveBall(){
    let ballCoord = ball.getBoundingClientRect();
    let ballTop = ballCoord.top;
    let ballLeft = ballCoord.left;
    let ballBottom = ballCoord.bottom;
    let ballRight = ballCoord.right;
    let hasTouchedLeft = ballLeft<boardBound.left;
    let hasTouchedRight = ballRight>boardBound.right;

        if(hasTouchedLeft) {
            leftPlayerLife--;
            setColor(leftPlayerLife);
            if(leftPlayerLife == 0){
                alert("Player B Wins!");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }
        if(hasTouchedRight) {
            rightPlayerLife--;
            setColor(3+rightPlayerLife);
            if(rightPlayerLife == 0){
                alert("Player A Wins!");
                document.location.reload();
            }
            else{
                return resetGame();
            }
        }
    

    function resetGame(){
        ball.style.top = window.innerHeight*0.45 +"px";
        ball.style.left = window.innerWidth*0.5 +"px";
        requestAnimationFrame(moveBall);
    }

    //handling vertical bounds
    if(ballTop<=boardBound.top||ballBottom>=boardBound.bottom){
        y=!y;
    }
   
    let leftPaddleBound = leftPaddle.getBoundingClientRect();
    let rightPaddleBound = rightPaddle.getBoundingClientRect();
    if(ballLeft <= leftPaddleBound.right && ballRight >= leftPaddleBound.left && ballTop+30 >= leftPaddleBound.top && ballBottom-30 <= leftPaddleBound.bottom){
        x=!x;
    }
    if(ballLeft <= rightPaddleBound.right && ballRight >= rightPaddleBound.left && ballTop+30 >= rightPaddleBound.top && ballBottom-30 <= rightPaddleBound.bottom){
        x=!x;
    }
    ball.style.top = y == true ?  ballTop+5+"px" : ballTop-5+"px";
    ball.style.left = x == true ?  ballLeft+6+"px" : ballLeft-6+"px";
    requestAnimationFrame(moveBall);
   
}
function setColor(ind){
    let icons = document.querySelectorAll(".fas.fa-circle");
    icons[ind].style.color = "#E6DDC6";
}
requestAnimationFrame(moveBall);