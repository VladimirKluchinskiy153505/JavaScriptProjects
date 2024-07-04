// if(NaN == undefined){
//     console.log(1);
// }
// if(null == undefined){
//     console.log(2);
// }
// if(null == NaN){
//     console.log(3);
// }
let f = function(x){
    console.log(x);
};
(function (){
    f(1)
}())
let a =1;
let b = {toString(){return '1'}};
let c = 1;
console.log([] -false+true);
a= undefined+null;