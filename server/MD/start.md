# Using Python Virtual Environment Management Scripts

## Overview

This document provides instructions for using CMD scripts to manage Python virtual environments (`venv.bat`, `run.bat`, `stop.bat`) located in the `.script` folder.

## Prerequisites

Before using these scripts, ensure the following prerequisites are met:
- Python is installed on your system.
- The Python executable is added to the system's PATH environment variable.

## Scripts

### venv.bat

#### Description
This script creates a Python virtual environment named `.venv` in the current directory using `python3 -m venv .venv`.

#### Usage
1. Open Command Prompt (`cmd`).
2. **Option 1: Navigate to the `.script` folder:**
   ```bat
   $ cd .script
   $ .\venv.bat
   ```

3. **Option 2: Execute directly from another location:**
   ```bat
   $ .\.script\venv.bat
   ```

### run.bat

#### Description
This script activates the Python virtual environment (`./.venv`) and optionally runs a Python script or starts an interactive Python session.

#### Usage
1. Ensure the virtual environment is created using `venv.bat`.
2. Open Command Prompt (`cmd`).

3. **Option 1: Navigate to the `.script` folder:**
   ```bat
   $ cd .script
   $ .\run.bat
   ```

4. **Option 2: Execute directly from another location:**
   ```bat
   $ .\.script\run.bat
   ```

### stop.bat

#### Description
This script deactivates the Python virtual environment and removes the `.venv` directory.

#### Usage
1. Ensure the virtual environment is deactivated.
2. Open Command Prompt (`cmd`).

3. **Option 1: Navigate to the `.script` folder:**
   ```bat
   $ cd .script
   $ .\stop.bat
   ```

4. **Option 2: Execute directly from another location:**
   ```bat
   $ .\.script\stop.bat
   ```

## Notes

- Always ensure the virtual environment is deactivated before running `stop.bat` to prevent any file locking issues.
- These scripts are designed for use on Windows using Command Prompt (`cmd`).

Feel free to modify and extend these scripts according to your specific project requirements.


This version provides clear instructions for both navigating to the `.script` folder and executing scripts directly from another location. Adjust the paths (`.script`) based on your project setup.