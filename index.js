function functorize(data,prototype){
    data           = data || {}
    var prot       = {
      inspect:    function(){ return data },
      toString:   function(){ return data }
    }
    var prot_old   = data.__proto__
    for( var i in prot_old  ) prot[i] = prot_old[i]    // copy original prototype
    for( var i in prototype ) prot[i] = function(f){   // copy custom prototype
        var args = Array.prototype.slice.apply(arguments).slice( 1 )
        if( prot_old[i] ) console.log("ja: "+i)
        if( prot_old[i] ) args.unshift(prot_old[i].bind(data) )
        return f.apply(data,args)
    }.bind(data,prototype[i])
    if( typeof data != "string" ) data.__proto__ = prot
    else data.__proto__.__proto__ = prot
    return data
}

var nodejs = (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
if( nodejs ) module.exports = functorize
else window.functorize = functorize
