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

var obj = {
    state:"inited" , 
    set state(val){
        throw 'directly setting value not allowed'
    }, 
}
functorize(obj, {
    create() { this.state = 'created' }, 
    destroy(){
        if( this.state != 'created' ) throw 'destroy() is impossible in state '+this.state
        this.state = 'destroyed'
    }
})

//obj.state = 'foo'                  // not allowed
obj.create()
obj.destroy()                      // only possible after calling create()
console.log("state = "+obj.state)  // is now 'destroyed'
