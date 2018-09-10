decorate javascript arrays & objects with functions & metadata automagically (to write less code)

<center> <img src="https://i.imgur.com/3xYKh5D.png" align="center" style="text-align:center"/> </center>

# Usage

    var functorize = require('functorize') 
    // or <script src="https://unpkg.com/functorize"/>
     
    functorize( your_array_or_object, { ... } )

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

# Why 

* 💛💛💛💛 minimal syntax 
* 💛💛💛💛 re-use of utility-functionbelts 
* 💛💛💛💛 no more free-floating utility functions 
* many scenarios do not need ES6 OO boilerplate
* function composition instead of OO is fine for utility functions
* delivers the original ES5 prototype-idea, but without side effects

| Strategy          | boilerplate | inheritance | polymorphism | overrides  | encapsulation | native side-effects |
|-------------------|-------------|-------------|--------------|------------|---------------|---------------------|
| Functorize        |             | no          | no           | wrapping   | yes, hoisting | no                  |
| ES6 classes       | ++++        | classes     | yes          | super()    | yes, private  | no                  |
| ES6 spread        |             | no          | no           | no         | no            | yes                 |
| ES5 Object.assign |             | no          | no           | no         | no            | yes                 |

> NOTE: example side-effects 

    var a = [1, 2]; 
    a.foo           = () => console.log('hello')
    a.__proto__.bar = () => console.log('hello')
    var b = []
    console.log(a.length)  // 3
    console.log(b.bar)     // [Function] (whaaaat?)

# Decorate array inserts with defaults 

    var arr      = []
    var defaults = { date: new Date() } 

    functorize( arr, {
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

    console.log(json.type)                          // user
    console.log(json.emailProvider())               // gmail.com

> NOTE: The original Object and Array prototypes untouched 

    console.log( Object.keys(json).length )         // 1
    console.log( Object.prototype.emailProvider() ) // undefined (we cloned the prototype)

# State machines

  var obj = {
      state:"inited" , 
      set state(val){ throw 'directly setting value not allowed' } 
  }

  functorize(obj, {
      create() { this.state = 'created' }, 
      destroy(){
          if( this.state != 'created' ) throw 'destroy() is impossible in state '+this.state
          this.state = 'destroyed'
      }
  })
  
  obj.state = 'foo'                  // not allowed
  obj.create()
  obj.destroy()                      // only possible after calling create()
  console.log("state = "+obj.state)  // is now 'destroyed'

# Function 

No idea why you'd want this, but here's a factory-ish pattern

    var Car = function(opts){
      return opts
    }

    functorize(Car, {
        createBMW: () => new Car({type:"bmw"})
    })

    var whitelabelcar = new Car()
    var bmw           = Car.createBMW()

# Credits

Haiko de Jong - great brainstorm!
