This project was developed by using .NET Core in the back-end and Vite/Recat for the front-end

The xml files are located in folder ECFR_Data in the root dir of the project.
------------------------------
STEP - 1 Database setup
------------------------------
- Unzip all files in ECFR_Data folder inside the same folder.
- open SQL Server Managemnt studio
- all sql files are located in SQL folder 
- run script 00*****.sql  to create DB objects - database CRF_XML_DATA will be created with all required Tables.
- run script 01*****.sql to import all XML files which are located in folder ECFR_Data (49 titles -  title-35 has no data )
- run script 02**.sql to 10**.sql in sequence to populate all tables with data.
- run script 11*.sql to update dashboard data.

Notice: Section Paragraphs are more than 200K of rows
-------------------------------
DotNet/React setup
-------------------------------
- open cmd/powershell window on the root folder
- run  dotnet run watch
- open cmd/powershell window on the root folder then cd to WebApp (front-end)
- run  npm run dev
- open the browser on port 4000/4001 (localhost:4000/index.html) / swagger home
- open the browser on port 3000/3001 (localhost:3000/home.html)  / swagger home
-------------------------------
API Swagger 
<img width=800 src="https://github.com/naderQudieh/ECFR_Data/blob/main/WebApp/images/CaptureAPI.JPG" /> 

CRF-Home page - Dashboard
<img width=800 src="https://github.com/naderQudieh/ECFR_Data/blob/main/WebApp/images/CaptureDashborad.JPG" /> 

