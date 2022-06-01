//1 gold, 2 blue, 3 red, 4 green

const boardData = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
]
let currentColor = 'gold'
let currentNumber = 1
let counter = 0

const startButton = document.getElementById("start-btn");
const coloringSection = document.getElementById("coloring")
const endgame = document.getElementById('endgame')
const colorFields = document.querySelectorAll("#color-board li");
const colorBoard = document.getElementById("color-board");

for (const colorField of colorFields) {
  colorField.classList.add(currentColor)
  colorField.addEventListener("click", selectField);
}
function startNewColoring(event){
  if (event.target.textContent === 'Start'){
    coloringSection.style.display = 'block';
    startButton.textContent = 'End'
  }else{
    coloringSection.style.display = 'none';
    startButton.textContent = 'Start'
    
    //reset game
    currentColor = 'gold'
    currentNumber = 1
    endgame.textContent = ''
    counter = 0
    
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        boardData[i][j] = 0;
      }
    }
    for (const colorField of colorFields) {
      colorField.style.removeProperty('background-color')
      colorField.classList.remove('disabled')
      colorField.classList.remove('gold')
      colorField.classList.remove("blue")
      colorField.classList.remove("red")
      colorField.classList.remove("green")
      colorField.classList.add(currentColor)
      colorField.addEventListener('click', selectField)
    }
  }
}
startButton.addEventListener("click", startNewColoring);


function nextColor(){
  switch(currentColor){
    case 'gold':
      currentNumber = 2
      currentColor = 'blue'
      break;
    case 'blue':
      currentNumber = 3
      currentColor = 'red'
      break
    case 'red':
      currentNumber = 4
      currentColor = 'green'
      break
    default:
      currentNumber = 1
      currentColor = 'gold'
  }
}
function selectField(event){
  counter += 1
  const field = event.target
  const col = +field.dataset.col
  const row = +field.dataset.row
  if (boardData[row][col] > 0){
    return;
  }
  boardData[row][col] = currentNumber
  checkNeighbors(row, col)
  if (counter === 16){
    win()
  }
  field.style.backgroundColor = currentColor
  field.classList.add('disabled')
  for (const colorField of colorFields){
    colorField.classList.remove(currentColor)
  }
  nextColor()
  for (const colorField of colorFields){
    colorField.classList.add(currentColor)
  }
}
function checkNeighbors(r, c){
  const e = boardData[r][c]
  for (let i=0; i < 4; i++){
    for (let j=0; j < 4; j++){
       if (i !== r || j !== c){
          if (i === r && (j=== (c-1) || j === (c+1))){
            if (e === boardData[i][j]) gameOver()
          }
          if (j === c && (i===(r-1) || (i === (r+1)))){
            if (e === boardData[i][j]) gameOver()
          }
         if (i === (r -1) && j === (c - 1)){
           if (e === boardData[i][j]) gameOver()
         }
         if (i === (r-1) && j === (c + 1)){
           if (e === boardData[i][j]) gameOver()
         } 
         if (i === (r+1) && j === (c-1)){
           if (e === boardData[i][j]) gameOver()
         }
         if (i === (r+1) && j === (c+1)){
           if (e === boardData[i][j]) gameOver()
         }
       }
    }
  }

}
function gameOver(){
  endgame.textContent = 'END of GAME!'
  for (const colorField of colorFields) {
  colorField.removeEventListener("click", selectField);
  }
}
function win(){
  endgame.textContent = "YOU WON!"
  for (const colorField of colorFields) {
  colorField.removeEventListener("click", selectField);
  }
}