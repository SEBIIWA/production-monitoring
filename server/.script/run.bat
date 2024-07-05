@echo off
REM Script to activate a Python virtual environment

REM Check if the virtual environment directory exists
IF NOT EXIST ".venv" (
    echo Virtual environment not found. Please create it first by running the CreateVenv.cmd script.
    pause
    exit /b 1
)

REM Activate the virtual environment
echo Activating the Python virtual environment...
call .venv\Scripts\activate

REM Check if the virtual environment was activated successfully
IF %ERRORLEVEL% NEQ 0 (
    echo Failed to activate the virtual environment.
    exit /b 1
)

REM Optional: Run a Python script
REM Uncomment the following line to run a specific Python script
REM python your_script.py

REM Optional: Start an interactive Python session
REM Uncomment the following line to start an interactive Python session
REM python

REM Pause to keep the window open
pause
