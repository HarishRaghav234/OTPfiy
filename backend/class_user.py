import mysql.connector
import bcrypt
import secrets
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
import OTPfiy.backend.class_conn as class_conn

def gen_api():
    with conn() as connection:
        cursor = connection.cursor()
        while True:
            api = secrets.token_hex(10)
            select_user_query = "SELECT * FROM auth WHERE api_key = %s"
            cursor.execute(select_user_query, (api,))
            check = cursor.fetchone()
            if check is None:
                break 
        return api    


    
def email_exists(email):
    with conn() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM auth WHERE email = %s", (email,))
        existing_user = cursor.fetchone()
        return existing_user is not None    

def signup(email, apppass, password):
    if not email_exists(email):
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        api = gen_api()
        
        with conn() as connection:
            cursor = connection.cursor()
                # Insert the new user into the database
            cursor.execute("INSERT INTO auth (email,  app_pass, password, api_key, tot_otpsent) VALUES (%s,  %s, %s, %s, %s)",
                        (email,  apppass, hashed_password, api, 0))
            connection.commit()
            return {"message": "User created successfully!"}
    else:
        return {"error": "email already exists"} , 401




def login_route(email, password): 
    with conn() as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT password,id FROM auth WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            hashed_password_from_db = user[0].encode('utf-8')  # Ensure it's in bytes
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password_from_db):
                access_token = create_access_token(identity=user[1])
                
                return {"access_token": access_token,}

            else:
                return {"error": "Invalid password. Please try again."}, 401
        else:
            return {"error": "User not found. Please check your email."}, 401


def tot_otpsent_route(userid):
    try:
        with conn() as connection:
            if connection.is_connected():
                cursor = connection.cursor(dictionary=True)
                select_user_query = "SELECT tot_otpsent FROM auth WHERE id = %s"
                cursor.execute(select_user_query, (userid,))
                tot_otpsent = cursor.fetchone()
                return tot_otpsent["tot_otpsent"] if tot_otpsent else {"error": "Invalid API key"} , 401
    except mysql.connector.Error as err:
        print(f"Error in tot_otpsent_route: {err}")
        return {"error": "Database error"} , 401

def set_template_route(userid, templateid):
    try:
        with conn() as connection:
            if connection.is_connected():
                cursor = connection.cursor()
                update_template_query = "UPDATE auth SET template = %s WHERE id = %s"
                cursor.execute(update_template_query, (templateid, userid))
                connection.commit()
                return {"status": "done"}
    except mysql.connector.Error as err:
        print(f"Error in set_template_route: {err}")
        return {"error": "Database error"}

def reset_password(id,password):
    try:
        with conn() as connection:
            if connection.is_connected():
                cursor = connection.cursor()
                update_template_query = "UPDATE auth SET password = %s WHERE id = %s"
                cursor.execute(update_template_query, (password, id))
                connection.commit()
                return {"status": "done"}
    except mysql.connector.Error as err:
        print(f"Error in set_template_route: {err}")
        return {"error": "Database error"}    
    