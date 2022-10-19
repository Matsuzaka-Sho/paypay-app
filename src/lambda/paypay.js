const PAYPAY = require("@paypayopa/paypayopa-sdk-node")
const {v4: uuuidv4} = require("uuid")

PAYPAY.Configure({
    clientId: process.env.PAYPAY_CLIENT_ID,         // PayPay APIキー
    clientSecret: process.env.PAYPAY_CLIENT_SECRET, // PayPay シークレット
    merchantId: process.env.PAYPAY_MERCHANT_ID,     // PayPay Merchant ID
    productionMode: false                           // 今回はテストモードなのでfalse
})

exports.handler = (event, context, callback) => {
    // POSTメソッド以外が来たら、エラーを出す
    if (event.httpMethod !== "POST"){
        return callback(null, {
            statusCode: 405,
            body: "Method Not Allowed."
        })
    }

    // 金額と注文内容の説明はbodyから取得
    const { amount, orderDescription } = JSON.parse(event.body)

    // 金額が1円未満だったらエラー
    if (parseInt(amount) < 1) {
        return callback(null, {
            statusCode: 400,
            body: JSON.stringify({
                message: "Some required fields were not supplied."
            })
        })
    }

    // 支払いID（一意になるようにuuidで生成）
    const merchantPaymentId = uuuidv4()

    let payload = {
        merchantPaymentId: merchantPaymentId,
        amount: {
            amount: parseInt(amount),
            currency: "JPY"
        },
        codeType: "ORDER_QR",
        orderDescription: orderDescription,
        isAuthorization: false,
        // 支払い完了後のリダイレクト先URL
        redirectUrl: `${process.env.APP_HOST_NAME}/complete?merchant-payment-id=${merchantPaymentId}`,
        // webブラウザからの支払いなら「WEB_LINK」, アプリからの支払いなら「APP_DEEP_LINK」
        redirectType: "WEB_LINK"
    }

    // 支払い用QRコードを生成
    PAYPAY.QRCodeCreate(payload, (response) => {
        if (response.STATUS == 201){
            return callback(null, {
                statusCode: 200,
                body: response.BODY
            })
        }
    })
}