@echo off
echo ========================================
echo Testing Login with admin@dios.com
echo ========================================
echo.

curl -X POST http://localhost:8000/api/login ^
  -H "Content-Type: application/json" ^
  -H "Accept: application/json" ^
  -d "{\"email\":\"admin@dios.com\",\"password\":\"password123\"}"

echo.
echo.
echo ========================================
echo Test Complete
echo ========================================
pause
