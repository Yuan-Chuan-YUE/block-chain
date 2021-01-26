var a = "[1,3],[2,4]"
a = '[' + a + ']';
a = JSON.parse(a);
a.map((ele,k) => {
    console.log(ele[0])
});
console.log(a);
