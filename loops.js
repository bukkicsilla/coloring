for (let i = 0; i < 10; i++){
  console.log(i)
}

const users = ['Leon', 'Maya', 'Noemi']

for (const user of users){
  console.log(user)
}

const loggedInUser = {
  name: 'Lua',
  age: 100, 
  isAdmin: false
}

for (const key in loggedInUser){
  console.log(key)
  console.log(loggedInUser[key])
}

/*let isFinished = false
while(!isFinished){
  isFinished = confirm('Do you want to quit?')
}
console.log('DONE!')*/