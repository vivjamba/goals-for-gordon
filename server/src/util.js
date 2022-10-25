/**
 * 
 * @returns a random number
 */
function randNumber(){
    return Math.floor(Math.random()*new Date().valueOf())
}

/**
 * 
 * @param {*} num 
 * @returns random number between 1 and num
 */
function randInt(num){
    return Math.floor(Math.random()*num+1)
}
module.exports={
    randNumber,randInt
}