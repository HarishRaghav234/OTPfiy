import mysql.connector
import OTPfiy.backend.class_conn as class_conn





def tot_otpsent_route(userid):
    try:
        with conn() as connection:
            if connection.is_connected():
                cursor = connection.cursor(dictionary=True)
                select_user_query = "SELECT tot_otpsent FROM auth WHERE id = %s"
                cursor.execute(select_user_query, (userid,))
                tot_otpsent = cursor.fetchone()
                return tot_otpsent["tot_otpsent"] if tot_otpsent else {"error": "Invalid API key"}
    except mysql.connector.Error as err:
        print(f"Error in tot_otpsent_route: {err}")
        return {"error": "Database error"}

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

def get_info_route(userid):
    try:
        with conn() as connection:
            if connection.is_connected():
                cursor = connection.cursor(dictionary=True)
                select_user_query = "SELECT email, api_key, template FROM auth WHERE id = %s"
                cursor.execute(select_user_query, (userid,))
                user = cursor.fetchone()
                return user if user else {"error": "User not found"}
    except mysql.connector.Error as err:
        print(f"Error in get_info_route: {err}")
        return {"error": "Database error"}



def set_db_info(id,host,dbuser,dbpassword,database):
    try:
        with conn() as connection:
            if connection.is_connected():    
                cursor = connection.cursor(dictionary=True)
                cursor.execute("INSERT INTO `user_db_info` (`id`, `host`, `dbuser`, `dbpassword`, `database`) VALUES (%s,  %s, %s, %s, %s)",
                        (id,  host, dbuser, dbpassword, database))
                connection.commit()
            return {"message": "otp_check db is configured successfully!"}
    except mysql.connector.Error as err:
        print(f"Error : {err}")
        return {"error": "Database error"}
