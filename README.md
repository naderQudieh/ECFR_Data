This project was developed by using .NET Core in the back-end and Vite/Recat for the front-end
- .NET Core API is in the root folder
- React/Vite is in the WebApp folder
- SQL Server is used as a database and should be named as CRF_XML_DATA - if you want to change the name of the database, you need to change the connection string in appsettings.json file
  and change the database name in the SQL scripts
- XML files are located in the ECFR_Data folder
- SQL scripts are located in the SQL folder
- Unzip all files in ECFR_Data folder inside the same folder.
- Change the connection string in appsettings.json file to point to your SQL Server instance.
- Change the folder of xml files in the SQL scripts to point to your local folder.

Notice: you can import xml files either by running script 02*.sql or from the API GET
http://localhost:4000/api/Downlaod/bulkInsert-xml-files

The xml files are located in folder ECFR_Data in the root dir of the project.
------------------------------
STEP - 1 Database setup
------------------------------
- open SQL Server Managemnt studio
- run script 00*****.sql  to create DB objects - database CRF_XML_DATA will be created with all required Tables.
- run script 01*****.sql to import all XML files which are located in folder ECFR_Data (49 titles -  title-35 has no data ). make sure the script (lines 40 and 55) is pointing to the ECFR_Data folder.
- run script 02**.sql to 10**.sql in sequence to populate all tables with data.
- run script 11*.sql to update dashboard data.

Notice: Section Paragraphs are more than 200K of rows
-------------------------------
RUN DotNet/React Applications
-------------------------------
- open cmd/powershell window on the root folder
- run  dotnet run watch
- open cmd/powershell window on the root folder then cd to WebApp (front-end)
- run  npm run dev
- open the browser on port 4000/4001 (localhost:4000/index.html) / API home
- open the browser on port 3000/3001 (localhost:3000/home.html)  / Website home
-------------------------------
API Swagger 
<img width=800 src="https://github.com/naderQudieh/ECFR_Data/blob/main/WebApp/images/CaptureAPI.JPG" /> 

CRF-Home page - Dashboard
<img width=800 src="https://github.com/naderQudieh/ECFR_Data/blob/main/WebApp/images/CaptureDashborad.JPG" /> 

