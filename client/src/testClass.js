class Test{
    constructor(){
        console.log("hello");
    };
    run(){
        console.log("Test");
    };
}


class t2 extends Test{
    constructor(){
        super();
    }
    run(){
        console.log("t2");
    }
}

module.exports = {
    Test,
    t2
}
