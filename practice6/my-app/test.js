const _ = require('lodash')
function square(n) {
  return n * n;
}
 
const addSquare = _.flowRight([square,_.add]);
const ret = addSquare(2, 2)
console.log(ret)

// var sayHello = function (name) {
//     return 'Hello, ' + name;
//    },
  
//   addExclamation = function (s) {
//     return s + '!';
//   },
  
//   smallTalk = function (s) {
//     return s + ' Nice weather we are having, eh?';
//   }
  
//   const flowRight = (...functions) => functions.reduce((a, c) => (...args) => a(c(...args)))
  
//   var greetEnthusiastically = flowRight(smallTalk, addExclamation, sayHello)
  
//   console.log(greetEnthusiastically('Antonio'));