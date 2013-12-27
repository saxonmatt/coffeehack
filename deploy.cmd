rm coffeehack-server-deploy -f
md coffeehack-server-deploy
xcopy server\. coffeehack-server-deploy\. /E /Y
md coffeehack-server-deploy\client
xcopy client\. coffeehack-server-deploy\client\. /E /Y
cd coffeehack-server-deploy
node server.js
pause