function clldrmsWatch(name,callback){
    var getVal = function (){
        if(typeof window[name] === typeof {}){
            return JSON.stringify(window[name]);
        } else {
            return window[name];
        }
    };
    var cache = getVal();
    var loop = function(){
        var current = getVal();
        if(current !== cache){
            cache = current;
            callback();
        }
    };
    return setInterval(loop, 1);
}

var vbinds = document.querySelectorAll("[value-bind]");
vbinds.forEach(function(item){
    var varName = item.getAttribute("value-bind");
    item.addEventListener("input", function(){
        
        try{
            eval("window." + varName + " = item.value;");
        }catch(e){
            alert("null referance");
        }
        
    });
    
    var callback = function(){
        eval("item.value = window." + varName + ";");
        if(item.value === "undefined"){
            item.value = "";
        }
    }
    
    var res = varName.split(".")[0];
    var res2 = res.split("[")[0];
    
    clldrmsWatch(res2,callback);
});

var hbinds = document.querySelectorAll("[html-bind]");
hbinds.forEach(function(item){
    
    var varName = item.getAttribute("html-bind");
    var callback = function(){
        eval("item.innerHTML = window." + varName + ";");
        if(item.innerHTML === "undefined"){
            item.innerHTML = "";
        }
    }
    
    var res = varName.split(".")[0];
    var res2 = res.split("[")[0];
    
    clldrmsWatch(res2,callback);
});

var tbinds = document.querySelectorAll("[text-bind]");
tbinds.forEach(function(item){
    
    var varName = item.getAttribute("text-bind");
    var callback = function(){
        eval("item.innerText = window." + varName + ";");
        if(item.innerText === "undefined"){
            item.innerText = "";
        }
    }
    
    var res = varName.split(".")[0];
    var res2 = res.split("[")[0];
    
    clldrmsWatch(res2,callback);
});