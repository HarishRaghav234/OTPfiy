from flask import Flask, request, jsonify,json
from class_info import tot_otpsent_route, set_template_route, get_info_route,set_db_info
from class_user import signup, login_route,reset_password
from class_otp import verfiy_mail,send_otp,check_otp
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
from flask_cors import CORS

application = Flask(__name__)
CORS(application,supports_credentials=True)
application.config['SECRET_KEY'] = 'y123'  # Replace with your actual secret key
application.config['JWT_TOKEN_LOCATION'] = ['headers','query_string'] 



jwt = JWTManager(application)



# Route for user registration
@application.route('/signup', methods=['POST'])
def signup_route():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
    else:       
        data = request.get_json()
        verify=verfiy_mail(data.get('email'), data.get('apppass'))
        if verify=="done":
    # Validate request data using Marshmallow or other validation library
            result = signup(data.get('email'), data.get('apppass'), data.get('password'))
            return jsonify(result)
        else:
            if verify=="password does not match":
                return(verify), 401
            else:
                return(verify), 401



@application.route('/send_otp', methods=['POST'])
def send_otp_route():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response    
    else:
        try:
            data = request.get_json()
            email = data.get('email')
            response = send_otp(email)
            if response == "done":
                result = {"status": "success", "message": f"OTP sent to {email}"}
            else:
                result =response   

            return jsonify(result), 401
        except Exception as e:
            return jsonify({"error": str(e)}), 500


@application.route('/check_otp', methods=['POST'])
def check_otp_route():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response    
    else:

        data = request.get_json()
        email = data.get('email')
        otp = data.get('otp')
        response = check_otp(email,otp)
        return jsonify(response)


# Route for user login
@application.route('/login', methods=['POST'])
def login():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response   
    data = request.get_json()
    # Validate request data using Marshmallow or other validation library

    result = login_route(data.get('email'), data.get('password'))
    return jsonify(result)

# Protected route for setting a template
@application.route('/set_template', methods=['PUT'])
@jwt_required()
def set_template():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response   
    data = request.get_json()
    # Validate request data using Marshmallow or other validation library

    template_id = data.get('templateid')
    current_userid = get_jwt_identity()
    result = set_template_route(current_userid, template_id)
    return jsonify(result)

# Protected route for retrieving the total OTPs sent
@application.route('/tot_otpsent', methods=['GET'])
@jwt_required()
def tot_otpsent():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response   
    current_userid = get_jwt_identity()
    result = tot_otpsent_route(current_userid)
    response = {"tot_otpsent": result}
    return jsonify(response)

# Protected route for retrieving user information
@application.route('/get_info', methods=['GET'])
@jwt_required()
def get_info():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response   
    current_userid = get_jwt_identity()
    user_info = get_info_route(current_userid)
    # response = {
    #     "email": user_info["email"],
    #     "api_key": user_info["api_key"],
    #     "templateid": user_info["template"]
    # }
    return (user_info)

# Example of a protected test route
@application.route('/test', methods=['GET'])
def hi():
    # if request.method == 'OPTIONS':
    #     # Handle pre-flight request
    #     response = jsonify({'result': 'success'})
    #     response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
    #     return response
    
    return jsonify({'message': 'Protected route, user: '})


@application.route('/set_db_info', methods=['POST'])
@jwt_required
def set_db_info_route():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
    else:
        current_userid = get_jwt_identity()       
        data = request.get_json()
        result=set_db_info(current_userid,data.get('host'),data.get('dbuser'),data.get('dbpassword'),data.get('database'))
        return jsonify(result)

@application.route('/reset_password', methods=['POST'])
@jwt_required
def reset():
    if request.method == 'OPTIONS':
        # Handle pre-flight request
        response = jsonify({'result': 'success'})
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response
    else:
        current_userid = get_jwt_identity()       
        data = request.get_json()
        
        email = data.get('email')
        otp = data.get('otp')
        otp_check_result = check_otp(email,otp)
        if otp_check_result["status"] == "success":
            result=reset_password(current_userid,data.get('password'))
        else:
            return jsonify(otp_check_result)    
    
    


if __name__ == '__main__':
    
    application.run(host='0.0.0.0', port=1123)
