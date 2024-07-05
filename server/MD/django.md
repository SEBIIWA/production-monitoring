### to get started we first lunch
1. you have to run the virtual environment you can find the comment in <a href="./start.md">Start.md</a> file
2. then you have to install django
```bash
pip install django
```
3. then you have to create a project
```bash
django-admin startproject project_name
```
4. then you have to create an app
```bash
python manage.py startapp app_name
```
5. then you have to add the app to the installed apps in the settings.py file
```python
INSTALLED_APPS = [
    'app_name',
]
```
5. then you can lunch the app using the following command
```bash
python manage.py runserver
```

### don't forget to open the venv environment
```bash
.venv\Scripts\python.exe -m pip install --upgrade pip
pip install django
pip install djangorestframework
pip install dotenv
```