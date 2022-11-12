/**
 * if data does not exist, send 404 not found
 * @param {*} res 
 * @param {*} data 
 */
 function sendData(res,data){
    if(!data) res.status(404).end()
    else res.send(data)
}
/**
 * send 500 internal server error
 * @param {*} res 
 * @param {*} e 
 */
function onServerError(res,e){
    res.status(500).send(e)
}

module.exports={
    sendData,onServerError
}