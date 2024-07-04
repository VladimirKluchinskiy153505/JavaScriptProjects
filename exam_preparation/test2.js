let obj = {'1':0, 1:1, 0:2};
console.log(obj['1']);
console.log(null+{0:1}[0] + [,[1],][1][0]);
for(let i =0;i<10;i++){
    //console.log(i);
}
"use strict";
let a = null+undefined;
console.log(a);
for(let key in {1:1, 0:0}){
    console.log(key);
    var c = 9/0;
    console.log(c);
}
function f(){};
console.log(typeof f);
arr = [1,2,3,4,5]
arr1 = arr.reduce(function(prev, item){return Math.max(prev,item)});
num = Math.max.apply(null, arr);
console.log(num);