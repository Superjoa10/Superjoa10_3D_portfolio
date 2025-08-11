from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()  
app.secret_key = os.getenv('APP_KEY')  # Provide a default value if SECRET_KEY is not set

# Flask-Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# Ensure you use the correct template folder path
#app.template_folder = 'C:/Users/Joao/Projects/fucking_about/resume_template (javascript + flask)/templates'

@app.route("/")
def main_page():
    return render_template('index.html')

@app.route("/projects")
def projects_page():
    return render_template('projects.html')

@app.route("/services/ai_bot")
def services_AIbot_page():
    return render_template('bot.html')

@app.route("/services/websites") 
def services_websites_pages():
    return render_template("websites.html")

@app.route('/send_message', methods=['POST'])
def send_message():
    name = request.form['name']
    email = request.form['email']
    subject = request.form['subject']
    message_body = request.form['message']

    msg = Message(subject=subject,
                  sender=email,
                  recipients=['joaovictorluz@gmail.com'],  # Your email where you want to receive messages
                  body=f"Name: {name}\nEmail: {email}\n\nMessage:\n{message_body}")

    try:
        mail.send(msg)
        flash('Message sent successfully!', 'success')
    except Exception as e:
        flash(f'Error sending message: {e}', 'danger')

    return redirect(url_for('main_page'))

if __name__ == "__main__":
    app.run(debug=True)