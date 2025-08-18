````markdown
# AAI Assets Management System

The AAI Assets Management System is a comprehensive solution designed to efficiently manage assets within an organization. It provides functionalities for tracking, categorizing, and maintaining an inventory of various assets, ensuring streamlined operations and better resource allocation.

---

## ✨ Features

* **Asset Registration:** Easily add new assets to the system with detailed information.

* **Asset Categorization:** Organize assets into different categories for better management and searchability.

* **Asset Tracking:** Keep track of asset status, location, and assignment.

* **Maintenance Scheduling:** Schedule and record maintenance activities for assets.

* **Reporting:** Generate reports on asset inventory, status, and historical data.

* **User Management:** Manage user roles and permissions for system access.

---

## 💻 Technologies Used

* **Frontend:**

    * HTML

    * CSS

    * JavaScript

* **Backend:**

    * Django

* **Database:**

    * MySQL

---

## 🛠️ Setup Process

Follow these steps to get the AAI Assets Management System up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

* **Python** (3.8+ recommended)

* **pip** (Python Package Installer, comes with Python)

* **MySQL Server**

* **Git**

---

### 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone [https://github.com/adityadahiya12/AAI_Assets_Management_System.git](https://github.com/adityadahiya12/AAI_Assets_Management_System.git)
cd AAI_Assets_Management_System
````

-----

### 2\. Setup Backend (Django)

Navigate into the `server` directory (or wherever your backend code is located, e.g., `backend` or `aai_assets_backend`).

```bash
cd server # or cd backend
```

#### a. Create and Activate a Virtual Environment

It's highly recommended to use a virtual environment for Python projects.

```bash
python -m venv venv
# On Windows:
# .\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### b. Install Backend Dependencies

Install the required Python packages:

```bash
pip install -r requirements.txt
```

*(If a `requirements.txt` file is not present, you might need to create one by listing your Django and other Python dependencies, e.g., `Django==X.Y.Z`, `mysqlclient`, `djangorestframework`)*

#### c. Configure Database (MySQL)

**Create a MySQL Database:**
Log in to your MySQL server and create a new database for the project:

```sql
CREATE DATABASE aai_assets_db;
CREATE USER 'aai_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON aai_assets_db.* TO 'aai_user'@'localhost';
FLUSH PRIVILEGES;
```

**Update Django Settings:**
Open your Django project's `settings.py` file (usually located at `server/your_project_name/settings.py`) and configure the `DATABASES` setting for MySQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'aai_assets_db',
        'USER': 'aai_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost', # Or your MySQL host
        'PORT': '3306',      # Default MySQL port
    }
}
```

**Install `mysqlclient` dependency if you haven't already and are on Windows/macOS/Linux with specific compiler needs:**
On Windows, you might need pre-compiled wheels or Visual C++ Build Tools.
On Linux, you might need `sudo apt-get install python3-dev libmysqlclient-dev` (for Debian/Ubuntu) or `sudo yum install python3-devel mysql-devel` (for CentOS/RHEL).

#### d. Run Database Migrations

Apply the database migrations to create the necessary tables:

```bash
python manage.py migrate
```

#### e. Create a Superuser (Optional but Recommended)

To access the Django admin panel:

```bash
python manage.py createsuperuser
```

-----

### 3\. Setup Frontend (HTML, CSS, JavaScript)

Navigate back to the root of your project and then into the `client` directory (or wherever your frontend code is located).

```bash
cd ..
cd client # or cd frontend
```

There are no specific dependencies to install for a plain HTML, CSS, and JavaScript frontend. Ensure all necessary HTML, CSS, and JavaScript files are present in this directory.

-----

### 4\. Run the Application

#### a. Start the Backend Server (Django)

From the `server` directory (where `manage.py` is located):

```bash
python manage.py runserver
```

The Django backend server should now be running, typically on `http://localhost:8000`.

#### b. Start the Frontend Application (HTML, CSS, JavaScript)

From the `client` directory, simply open the `index.html` file (or your main HTML file) in your web browser.

```bash
# On macOS/Linux
open index.html
# On Windows
start index.html
```

Alternatively, for local development with a simple server (often useful for handling API requests and avoiding CORS issues):

```bash
# You might need to install a simple HTTP server first if you don't have one:
# npm install -g http-server
# Then, from the 'client' directory:
http-server
```

The frontend application should now open in your web browser, likely on `http://localhost:8080` if using `http-server`.

-----

## 🚀 Usage

Once the application is running, you can access it via your web browser.

  * **Register:** Create a new user account.

  * **Login:** Use your credentials to log in.

  * **Dashboard:** Navigate through the different sections to manage assets, add new entries, schedule maintenance, and view reports.

  * **Django Admin:** You can usually access the Django admin panel at `http://localhost:8000/admin/` (if enabled in your Django project) using the superuser credentials created earlier.

-----

## 👋 Contributing

We welcome contributions\! Please follow these steps to contribute:

1.  Fork the repository.

2.  Create a new branch (`git checkout -b feature/YourFeature`).

3.  Make your changes.

4.  Commit your changes (`git commit -m 'Add some feature'`).

5.  Push to the branch (`git push origin feature/YourFeature`).

6.  Open a Pull Request.

-----

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

```
```
