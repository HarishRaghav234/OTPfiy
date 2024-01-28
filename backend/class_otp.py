import smtplib
import ssl
from email.message import EmailMessage
import jsonify
import requests
import mysql.connector
import OTPfiy.backend.class_conn as class_conn




def verfiy_mail(email,apppass):
        email_sender = email
        email_password = apppass 
        email_receiver =email

        try:
            # Set the subject and body of the email
            subject = 'just to verfiy weather you enterd correct gmail pass'
            body="""Subject: OTPFiy - Secure Login Verification: Please Confirm Your Password

Dear User,

We've received a request to log in to your OTPFiy account

If you're reading this email, it means you've correctly entered your email address and password. You can now proceed with OTPFiy's secure login process.

For your security, please do not share API key with anyone.

If you did not initiate this login attempt, please immediately disregard this email and reset your password.

Thank you for using OTPFiy!

Sincerely,
The OTPFiy Team"""

            em = EmailMessage() 
            em['From'] = email_sender
            em['To'] = email_receiver
            em['Subject'] = subject
            em.set_content(body)

            # Add SSL (layer of security)
            context = ssl.create_default_context()

            # Log in and send the email
            with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                smtp.login(email_sender, email_password)
                smtp.sendmail(email_sender, email_receiver, em.as_string())

            response ="done"
            return (response),200
        except smtplib.SMTPAuthenticationError as e:
            if e.smtp_code == 535:
                response = "password does not match"
                return (response), 401
            else:
                response = {"error": f"SMTP Authentication Error: {e.smtp_code} {e.smtp_error.decode('utf-8')}"}
                return (response), 401
        except Exception as e:
            response = {"error": f"An unexpected error occurred: {str(e)}"}

            return (response), 401
    
def send_otp(email):


    api_key = "ec1bb30156db80baa228"
    email_receiver = email

# Assuming your Flask app is running locally on port 1111
    url = "https://otpfiyapi.zeal.lol/send"

    param = {
    "api_key": api_key,
    "mail": email_receiver
    }

    try:
        response1 = requests.get(url, params=param)
        data = response1.json().get('otp')
        with conn() as connection:
            cursor = connection.cursor()
            select_user_query = "SELECT * FROM otp_verify WHERE email = %s"
            cursor.execute(select_user_query, (email,))
            check = cursor.fetchone()
            if check is None:
                cursor.execute("INSERT INTO otp_verify (email,otp) VALUES (%s,  %s)",(email,data))
                connection.commit()
                return("done")
            else:    
                cursor.execute("update otp_verify set otp = %s where email=%s ",(data,email)) 
                connection.commit()
                return("done")
    except requests.exceptions.RequestException as e:
        return(f"Error: {e}")
 

def check_otp(email,otp):
    with conn() as connection:
        cursor = connection.cursor()    
        otp_int=int(otp)

        cursor.execute("SELECT otp FROM otp_verify WHERE email = %s",(email,))
        og_otp = cursor.fetchone()
        if og_otp[0] == otp_int:
            return ({"status": "success"})
        else:
            return ({"status": "failed"}), 401
    
    
    