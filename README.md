decorate javascript arrays & objects with functions & metadata automagically (to write less code)

<center> <img src="https://i.imgur.com/3xYKh5D.png" align="center" style="text-align:center"/> </center>

# Usage

    var functorize = require('functorize') 
    // or <script src="https://unpkg.com/functorize"/>

# Smart arrays and object-wrapping 

    var arr = []
    var myModel = {
       toggle: () => console.log("toggle!")
    }
     
    functorize( arr, {
      push: function(old,item){
        old( functorize(item, myModel) )
        return this
      }
    })
  
    arr.push({foo:123})
       .push({foo:143})
    arr[0].toggle()

> Wow! What happened here?

* We override push() and make it chainable
* we always wrap a model around data when inserted

# Decorate array inserts with defaults 

    var arr = []
    functorize( arr, {
      defaults: { date: new Date() }, 
      push: function(old,i){
        old( Object.assign(i, defaults) )
        return this
      }, 
    })

    arr.push({a:1})       // [{date:'1234-02-03 Z12314234', a:1}]
       .push({b:1})       // [{date:'1234-02-03 Z12314234', a:1},{....}]

# Decorate json data with utilities

    var json = {email:  "foo@gmail.com" }

    var userModel = {
       type: 'user', 
       emailProvider: function(){ this.email.replace(/.*@/, '') }
    }
    
    functorize(json, userModel ) 

    console.log(json.type)                        // user
    console.log(json.emailProvider)               // gmail.com

> NOTE: The original Object and Array prototypes untouched 

    console.log( Object.keys(json).length )       // 1
    console.log( Object.prototype.emailProvider ) // undefined (we cloned the prototype)

# Why

* 💛💛💛💛 minimal syntax 
* 💛💛💛💛 re-use of utility-functionbelts 
* 💛💛💛💛 no more free-floating utility functions 
* common scenario which does not need ES6 OO boilerplate
* function composition instead of OO is fine for utility functions
* no side effects: `.prototype` and `__proto__` (ES5) usually mutates prototype of native datatypes (Object, Array)

# Credits

Haiko de Jong - great brainstorm!
