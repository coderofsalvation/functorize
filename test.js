var functorize = require('./')

var arr = []
var myModel = {
   toggle: () => console.log("toggle!")
}
 
functorize( arr, {
  push: function(old,item){
    old( functorize({data:item}, myModel) )
    return this
  }
})

arr.push({foo:123})
   .push({foo:143})
arr[0].toggle()

console.dir(arr)
