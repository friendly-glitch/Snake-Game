function createPlayground() {
    for (let i = 0; i < 11; i++) {
        let playgroundRow = document.createElement("tr")
        playgroundRow.classList.add("playground__row")
        playground.tBodies[0].append(playgroundRow)
        for (let j = 0; j < 11; j++) {
            let playgroundCell = document.createElement("td")
            playgroundCell.classList.add("playground__cell")
            playgroundRow.append(playgroundCell)
        }
    }
}
function createSnake() {
    let snakeHead = document.createElement("div")
    snakeHead.classList.add("playground__snake-head")
    snakeHead.classList.add("playground__snake-head_down")
    snakeHead.innerText = ". ."
    playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].append(snakeHead)

    let snakeBody = document.createElement("div")
    snakeBody.classList.add("playground__snake-body")
    playground.tBodies[0].rows[snake.body[1][1]].cells[snake.body[1][0]].append(snakeBody)

    snakeBody = document.createElement("div")
    snakeBody.classList.add("playground__snake-body")
    playground.tBodies[0].rows[snake.body[0][1]].cells[snake.body[0][0]].append(snakeBody)
}
function moveSnake() {
    playground.tBodies[0].innerHTML = ''
    createPlayground()
    for (let i = snake.body.length - 1; i >= 0; i--) {
        if (i == snake.body.length - 1) snake.tail = snake.body[i].slice(0)
        if (i == 0) {
            snake.body[i] = snake.head.slice(0);

            continue;
        }
        snake.body[i] = snake.body[i - 1].slice(0)
        console.log(snake.body[i]);
    }
    let snakeHead
    try {
        switch (moveDirection) {
            case "down":
                snake.head[1]++

                if (JSON.stringify(snake.head) == JSON.stringify(berryPlacement)) eatBerry()
                snakeHead = document.createElement("div")
                snakeHead.className = ""
                snakeHead.classList.add("playground__snake-head")
                snakeHead.classList.add("playground__snake-head_down")
                snakeHead.innerText = ". ."
                playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].append(snakeHead)


                for (let i = snake.body.length - 1; i >= 0; i--) {
                    let snakeBody = document.createElement("div")
                    snakeBody.classList.add("playground__snake-body")
                    playground.tBodies[0].rows[snake.body[i][1]].cells[snake.body[i][0]].append(snakeBody)
                }
                break;
            case "up":
                snake.head[1]--
                if (JSON.stringify(snake.head) == JSON.stringify(berryPlacement)) eatBerry()
                snakeHead = document.createElement("div")
                snakeHead.className = ""
                snakeHead.classList.add("playground__snake-head")
                snakeHead.classList.add("playground__snake-head_up")
                snakeHead.innerText = ". ."
                playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].append(snakeHead)

                for (let i = snake.body.length - 1; i >= 0; i--) {
                    let snakeBody = document.createElement("div")
                    snakeBody.classList.add("playground__snake-body")
                    playground.tBodies[0].rows[snake.body[i][1]].cells[snake.body[i][0]].append(snakeBody)
                }
                break;
            case "left":
                snake.head[0]--
                if (JSON.stringify(snake.head) == JSON.stringify(berryPlacement)) eatBerry()
                snakeHead = document.createElement("div")
                snakeHead.className = ""
                snakeHead.classList.add("playground__snake-head")
                snakeHead.classList.add("playground__snake-head_left")
                snakeHead.innerText = ":"
                playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].append(snakeHead)

                for (let i = snake.body.length - 1; i >= 0; i--) {
                    let snakeBody = document.createElement("div")
                    snakeBody.classList.add("playground__snake-body")
                    playground.tBodies[0].rows[snake.body[i][1]].cells[snake.body[i][0]].append(snakeBody)
                }
                break;
            case "right":
                snake.head[0]++
                if (JSON.stringify(snake.head) == JSON.stringify(berryPlacement)) eatBerry()
                snakeHead = document.createElement("div")
                snakeHead.className = ""
                snakeHead.classList.add("playground__snake-head")
                snakeHead.classList.add("playground__snake-head_right")
                snakeHead.innerText = ":"
                playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].append(snakeHead)

                for (let i = snake.body.length - 1; i >= 0; i--) {
                    let snakeBody = document.createElement("div")
                    snakeBody.classList.add("playground__snake-body")
                    playground.tBodies[0].rows[snake.body[i][1]].cells[snake.body[i][0]].append(snakeBody)
                }
                break;
        }
    } catch (error) {
        gameOver()
        setTimeout(function(){
            playground.tBodies[0].innerHTML = ''
            snakeRestart()
        },1000)
        return
    }

    if (playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].children.length > 1) {
        let body = playground.tBodies[0].rows[snake.head[1]].cells[snake.head[0]].querySelector(".playground__snake-body")
        body.remove()

        gameOver()
        setTimeout(function(){
            playground.tBodies[0].innerHTML = ''
            snakeRestart()
        },1000)
    }
    createBerry()

}
function createBerry() {
    berryCells = []
    for (let i = 0; i < 11; i++) {
        for (let j = 0; j < 11; j++) {
            if (playground.tBodies[0].rows[i].cells[j].innerHTML == '') berryCells.push([j, i])
        }
    }

    if (!berryPlaced) {
        berryPlacement = berryCells[Math.floor(Math.random() * berryCells.length - 1)]
        playground.tBodies[0].rows[berryPlacement[1]].cells[berryPlacement[0]].innerHTML = '<i class="fab fa-raspberry-pi"></i>'
        berryPlaced = true

        return;
    }
    playground.tBodies[0].rows[berryPlacement[1]].cells[berryPlacement[0]].innerHTML = '<i class="fab fa-raspberry-pi"></i>'
}
function eatBerry() {
    playground.tBodies[0].rows[berryPlacement[1]].cells[berryPlacement[0]].innerHTML = ""
    berryPlaced = false
    // let snakeTail = document.createElement("div")
    // snakeTail.classList.add("playground__snake-body")
    // playground.tBodies[0].rows[snake.tail[1]].cells[snake.tail[0]].append(snakeTail)
    snake.body.push(snake.tail)

}
function snakeRestart() {
     moveDirection = "down"
     snake = {
        "head": [5, 5],
        "body": [[5, 4], [5, 3]],
        "tail": [5, 3],
    }
     berryCells = []
     berryPlacement
     berryPlaced = false
     movement
    createPlayground()
    createSnake()
    createBerry()
}

function gameOver(){
    let title  = document.createElement("div")
    title.classList.add("playground__game-over-title")
    title.textContent = 'GAME OVER'
    playground.style.backgroundColor = 'rgb(0, 0, 0,0.5)'  
    clearInterval(movement)
    playground.tBodies[0].rows[0].append(title)
    setTimeout(() => {
        playground.style.backgroundColor = 'white'
    }, 1000);

}
let playground = document.querySelector(".playground")
let moveDirection = "down"
let snake = {
    "head": [5, 5],
    "body": [[5, 4], [5, 3]],
    "tail": [5, 3],
}
let berryCells = []
let berryPlacement
let berryPlaced = false
let movement
let speed = 400
createPlayground()
createSnake()
createBerry()
let startGame = document.addEventListener("keyup", function (e) {
    if (e.key != "Enter") return
    document.addEventListener("keydown", function (e) {
        switch (e.code) {
            case "ArrowLeft":
                if (moveDirection != "right") moveDirection = "left"
                break;
            case "ArrowUp":
                if (moveDirection != "down") moveDirection = "up"
                break;
            case "ArrowRight":
                if (moveDirection != "left") moveDirection = "right"
                break;
            case "ArrowDown":
                if (moveDirection != "up") moveDirection = "down"
                break;
        }
    })
    movement = setInterval(function () {
        moveSnake()
    }, speed)
    document.addEventListener("keydown", function (e) {
        if (e.code == "Space") clearInterval(movement)
    })
    
})
document.addEventListener("click",function(e){
    if(e.target.classList.contains("speed-buttons__fast")){
        let btns = Array.from(e.target.parentNode.children)
        btns.forEach(element => {
            element.classList.remove("btn_active")
        });
        e.target.classList.add("btn_active")
        speed = 200
        return
    } 
    if(e.target.classList.contains("speed-buttons__medium")){
                let btns = Array.from(e.target.parentNode.children)
        btns.forEach(element => {
            element.classList.remove("btn_active")
        });
        e.target.classList.add("btn_active")
        speed = 400
        return
    }
    if(e.target.classList.contains("speed-buttons__slow")){
                let btns = Array.from(e.target.parentNode.children)
        btns.forEach(element => {
            element.classList.remove("btn_active")
        });
        e.target.classList.add("btn_active")        
        speed = 600
        return
    }
})

