function createPlayground(){
    for(let i = 0;i <10;i++){
        let playgroundRow = document.createElement("div")
        playgroundRow.classList.add("playground__row")
        playground.append(playgroundRow)
        for(let j = 0;j < 11;j++){
            let playgroundCell = document.createElement("div")
            playgroundCell.classList.add("playground__cell")
            playgroundRow.append(playgroundCell)
        }
    }
}
function createSnake(){
    let snakeHead = document.createElement("div")
    snakeHead.classList.add("playground__snake-head")
    snakeHead.innerText = ". ."
    playground.children[5].children[5].append(snakeHead)

    let snakeBody = document.createElement("div")
    snakeBody.classList.add("playground__snake-body")
    playground.children[4].children[5].append(snakeBody)

    snakeBody = document.createElement("div")
    snakeBody.classList.add("playground__snake-body") 
    playground.children[3].children[5].append(snakeBody)
}

let playground = document.querySelector(".playground")
createPlayground()
createSnake()