console.log("hello world")
var arr = [1, 2, 3, 4, 5]
var str = arr.join(',,')
var str1 = arr.toLocaleString()
var str2 = arr.valueOf()
console.log(str)
console.log(str1)
console.log(str2)
const stringObject = new String("Hello")
console.log(20e-1['toString'](10)+1)
let mu = {};
mu.str = "top"
console.log(mu.str)
// var intervalId = setInterval(function() {
//     console.log("Этот код выполняется каждую секунду");
// }, 1000);
// setTimeout(function (){
//     clearInterval(intervalId);
// },3000);
// Через 5 секунд отменяем выполнение интервала
function my_function(n) {
    if(n === 1){
        return '1';
    }
    return my_function(n-1)+' '+n;
}
console.log(my_function(9));
function Person(name, age, year){
    this.name = name;
    this.age = age;
    this.year = year;
}

var employee = new Person("Oleg","25","2017")
var Person= {
    name:"Ivan",
    age:25,
    hiredYear:2017
}
delete employee.name;
console.log(employee.name);
function testStr1(a, b) {
    return a.toUpperCase()+b.toLowerCase();
}
myString = new String("Hello world");
console.log(myString.valueOf());
console.log(myString);
function testStr(a, b) {
    return a.indexOf(b);
}
function testArray(a, b) {
    let sum = 0;
    for(let i in a){
        sum+=a[i];
    }
    for(let i in b){
        sum+=b[i];
    }
    return sum;
}
testArray([1,2,3,4],[5])
function Func(a, b) {
    let str = a + b;
    let lt = str.split('');
    lt.unshift('Иванов');
    return lt.reverse().join('');
}
lt1 = Func('4326', '297515');
console.log(lt1);