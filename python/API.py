# from flask import Flask, request, jsonify
# import mysql.connector
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
 
# db = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     password="",
#     database="test"
# )
 
# cursor = db.cursor(dictionary=True)
 
# #login
# @app.route('/login', methods=['POST'])

# def login():
#     data = request.json
#     email = data.get('email')
#     password = data.get('password')
   
#     print("Email recibido:", email)
#     print("Password recibido:", password)
 
#     if not email or not password:
#         return jsonify({'message': 'Faltan datos del usuario'}), 400
 
#     # Ejecuta la consulta para buscar el usuario
#     cursor.execute("SELECT * FROM customers WHERE email = %s AND password = %s", (email, password))
#     user = cursor.fetchone()
 
#     # Imprime el resultado de la consulta para depuración
#     print("Resultado de la consulta:", user)
 
#     if user:
#         return jsonify({'message': 'Login exitoso'}), 200
#     else:
#         return jsonify({'message': 'Credenciales incorrectas'}), 401
    
 
# @app.route('/products', methods=['GET'])
# def get_products():
#     cursor.execute("SELECT * FROM products")
#     products = cursor.fetchall()
#     return jsonify(products), 200
 
 
# if __name__ == '__main__':
#     app.run(debug=True)