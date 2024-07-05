to set up a virtual environment for a Django project, run the following command in the project directory:
you can replace `.venv` with any name you want to give to the virtual environment.

```sh
$ python -m venv .venv
```

Windows venv activation
To activate your venv on Windows, you need to run a script that gets installed by venv. If you created your venv in a directory called myenv, the command would be:

```sh
# In cmd.exe
$ .\packages\Scripts\activate.bat
```

Linux and MacOS venv activation
On Linux and MacOS, we activate our virtual environment with the source command. If you created your venv in the myvenv directory, the command would be:

```sh
$ source myvenv/bin/activate
```

That’s it! We’re ready to rock! You can now install packages with `pip`. When you’re done working in your virtual environment, you can deactivate it with the `deactivate` command.

```sh
$ deactivate
```

Make sure you are inside the project directory. In other words, the directory where the Pipenv and Pipenv.lock files reside. This way, pipenv knows which virtual environment it has to delete.