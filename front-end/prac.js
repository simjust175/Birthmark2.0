const name = "sim"
const age = 23;
const email = "bunim175@gmail.com"

const user = {name, age, email};

const noeUser = null;
if(!noeUser) console.log("null = false");;
console.log(JSON.stringify(user));