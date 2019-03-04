var someVal = 2;

function getSomeVal(){
    return someVal;
}

function setSomeVal(newSomeVal){
    someVal = newSomeVal;
}
module.exports = {
    getSomeVal,
    setSomeVal
}