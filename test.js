var functorize = require('./')

var arr = []
var myModel = {
   toggle: () => console.log("toggle!")
}
 
functorize( arr, {
  foo: () => console.log("foo!"), 
  push: function(old,item){
    old( functorize({data:item}, myModel) )
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

functorize(f, {
    bar: () => console.log("bar!")
})

f.bar()

if( Function.prototype.bar ) throw 'original prototype was touched'
