// 動作確認用
// $ curl http://localhost:3000/.netlify/functions/hello

exports.handler = (event, context, callback) => {
    return callback(null, {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello World!!!"})
    })
}