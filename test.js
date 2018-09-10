var F = require('./')

var arr = []
var myModel = {
   toggle(){ console.log("toggle!") }
}
 
F( arr, {
  foo: () => console.log("foo!"), 
  push(old, item){
    old( F({data:item}, myModel) )
    return this
  }
})

arr.push({foo:123})
   .push({foo:143})
arr[0].toggle()
console.dir(arr)

if( arr.length != 2 || Array.prototype.foo ) throw 'original object or prototype was touched! not cool!'

var f = function foo(){
  return 1      
}

F(f, {
    bar: () => console.log("bar!")
})

f.bar()

if( Function.prototype.bar ) throw 'original prototype was touched'

var strutils = {
    truncate(){ return this.substr(0, 2) + '...' }
}

var str = "lorem ipsum" 
F( str, strutils )  
console.log( str.truncate(1) )             // lo...
console.log( String.prototype.truncate )   // undefined
