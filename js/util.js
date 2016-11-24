function isOn(key,callbackTrue,callbackFalse,param){
  get(key,function(value){
    if(value=='1'){
      if(callbackTrue){
        callbackTrue(param);
      }
    }
    else{
      if(callbackFalse){
        callbackFalse(param);
      }
    }
  });
}

function setIfNull(key,setValue,callback){
  get(key,function(value){
    if(!value){
      set(key,setValue,callback);
    }
    else{
      if(callback)
    callback();
    }
  });
}

function setDB(key,value,callback){
  var indexedDB = window.indexedDB;
  var open = indexedDB.open("NooBoss", 1);
  open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("Store", {keyPath: "key"});
  };
  open.onsuccess = function() {
    var db = open.result;
    var tx = db.transaction("Store", "readwrite");
    var store = tx.objectStore("Store");
    var action1=store.put({key:key, value:value});
    action1.onsuccess=function(){
      callback();
    }
    action1.onerror=function(){
      console.log('setDB fail');
    }
  }
}

function getDB(key,callback){
  if(callback){
    var indexedDB = window.indexedDB;
    var open = indexedDB.open("NooBoss", 1);
    open.onupgradeneeded = function() {
      var db = open.result;
      var store = db.createObjectStore("Store", {keyPath: "key"});
    };
    open.onsuccess = function() {
      var db = open.result;
      var tx = db.transaction("Store", "readwrite");
      var store = tx.objectStore("Store");
      var action1=store.get(key);
      action1.onsuccess=function(e){
        if(e.target.result){
          callback(e.target.result.value);
        }
        else{
          callback(null);
        }
      }
      action1.onerror=function(){
        console.log('getDB fail');
      }
    }
  }
}

function set(key,value,callback){
  var temp={};
  temp[key]=value;
  chrome.storage.sync.set(temp,callback);
}

function get(key,callback){
  chrome.storage.sync.get(key,function(result){
    if(callback)
    callback(result[key]);
  });
}
