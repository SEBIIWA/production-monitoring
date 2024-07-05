@echo off
REM Script to deactivate and remove the Python virtual environment

REM Check if the virtual environment is activated
IF NOT DEFINED VIRTUAL_ENV (
    echo Virtual environment is not activated.
) ELSE (
    REM Deactivate the virtual environment
    echo Deactivating the Python virtual environment...
    deactivate
    rmdir /S /Q .venv
)

REM Check if the virtual environment directory exists
IF NOT EXIST ".venv" (
    echo Virtual environment directory not found. Nothing to remove.
    pause
    exit /b 1
)

REM Remove the virtual environment directory
echo Removing the virtual environment directory...
rmdir /S /Q .venv

REM Check if the directory was removed successfully
IF NOT EXIST ".venv" (
    echo Virtual environment removed successfully!
) ELSE (
    echo Failed to remove the virtual environment.
    exit /b 1
)

REM Pause to see the output
pause
