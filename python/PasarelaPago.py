import paypalrestsdk
from flask import Flask, request, jsonify

app = Flask(__name__)

# Configuración de PayPal
paypalrestsdk.configure({
    "mode": "sandbox",  
    "client_id": "", 
    "client_secret": "TU_SECRET_KEY" 
})

@app.route('/create-payment', methods=['POST'])
def create_payment():
    data = request.json 
    total_amount = data.get('total')  

    payment = paypalrestsdk.Payment({
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/payment-success",
            "cancel_url": "http://localhost:5000/payment-cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [
                    {
                        "name": "Compra en tienda online",
                        "sku": "001",
                        "price": str(total_amount),
                        "currency": "USD",
                        "quantity": 1
                    }
                ]
            },
            "amount": {
                "total": str(total_amount),
                "currency": "USD"
            },
            "description": "Compra de productos."
        }]
    })

    if payment.create():
        for link in payment.links:
            if link.rel == "approval_url":
                return jsonify({"approval_url": link.href}), 200
    else:
        return jsonify({"error": payment.error}), 500


@app.route('/payment-success', methods=['GET'])
def payment_success():
    payment_id = request.args.get('paymentId')
    payer_id = request.args.get('PayerID')

    payment = paypalrestsdk.Payment.find(payment_id)

    if payment.execute({"payer_id": payer_id}):
        return jsonify({"message": "Pago exitoso"}), 200
    else:
        return jsonify({"error": payment.error}), 500


if __name__ == '__main__':
    app.run(debug=True)
