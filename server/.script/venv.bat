@echo off
REM Script to create a Python virtual environment

REM Check if Python is installed
python --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Python is not installed or not added to PATH. Please install Python and try again.
    pause
    exit /b 1
)

REM Execute the command to create a virtual environment
echo Creating a Python virtual environment in the current directory...
python3 -m venv .venv

REM Check if the virtual environment was created successfully
IF EXIST ".venv" (
    echo Virtual environment created successfully!
) ELSE (
    echo Failed to create virtual environment.
    exit /b 1
)

REM Pause to see the output
pause
