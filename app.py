from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
from models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from forms import LoginForm, SignupForm  # Import the forms

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # Update with your database URI
app.config['SECRET_KEY'] = 'your_secret_key'  # Set a secret key for session management
db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager(app)  # Initialize the LoginManager with the app
login_manager.login_view = 'login'  # Set the login view for redirection

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()  # Create an instance of the LoginForm
    if form.validate_on_submit():  # Check if the form is submitted and valid
        username = form.username.data
        password = form.password.data
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('Login successful!', 'success')
            return redirect(url_for('index'))  # Ensure the index route is accessible
        else:
            flash('Login failed. Check your username and password.', 'danger')
    return render_template('login.html', form=form)  # Pass the form to the template

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignupForm()  # Create an instance of the SignupForm
    if form.validate_on_submit():  # Check if the form is submitted and valid
        first_name = form.first_name.data
        last_name = form.last_name.data
        age = form.age.data
        username = form.username.data
        password = generate_password_hash(form.password.data)
        
        new_user = User(first_name=first_name, last_name=last_name, age=age, username=username, password=password)
        try:
            db.session.add(new_user)
            db.session.commit()
            flash('Account created successfully! You can now log in.', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            db.session.rollback()  # Rollback in case of error
            flash('An error occurred while creating your account. Please try again.', 'danger')
    return render_template('signup.html', form=form)  # Pass the form to the template

@app.route('/logout')
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

@app.route('/')
@login_required
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/courses')
def courses():
    return render_template('courses.html')

@app.route('/courses/<course>')
def course(course):
    if course == 'data_science':
        return render_template('course-1.html')
    elif course == 'web_development':
        return render_template('course-2.html')
    else:
        return "Course not found", 404

@app.route('/courses/<course>/<module>/<lesson>')
def course_page(course, module, lesson):
    # Mapping of courses, modules, and lessons to video URLs
    video_urls = {
        'data_science': {
            'module1': {
                'lesson1': 'V1.mp4',
                'lesson2': 'V2.mp4',
            },
            'module2': {
                'lesson6': 'V4.mp4',
                'lesson7': 'V3.mp4',
            },
        },
        'web_development': {
            'module1': {
                'lesson1': 'V5.mp4',
                'lesson2': 'V5.mp4',
            },
        },
    }

    video_url = video_urls.get(course, {}).get(module, {}).get(lesson, None)
    if course == 'web_development':
        return render_template('course-page-1.html', course=course, module=module, lesson=lesson, video_url=video_url)
    elif course == 'data_science':
        return render_template('course-page-2.html', course=course, module=module, lesson=lesson, video_url=video_url)

if __name__ == '__main__':
    app.run(debug=True)