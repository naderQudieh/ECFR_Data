--Disable
Use Master

GO
EXEC master.dbo.sp_configure 'xp_cmdshell', 0
RECONFIGURE WITH OVERRIDE

GO

EXEC master.dbo.sp_configure 'show advanced options', 0
RECONFIGURE WITH OVERRIDE
GO
 
EXEC master.dbo.sp_configure 'show advanced options', 1
RECONFIGURE WITH OVERRIDE
GO

EXEC master.dbo.sp_configure 'xp_cmdshell', 1
RECONFIGURE WITH OVERRIDE

IF OBJECT_ID('tempdb..#TempFiles ') IS NOT NULL
begin
        drop table  #TempFiles 
end
GO 
IF OBJECT_ID('#TempFiles', 'U') IS NULL
BEGIN
CREATE TABLE #TempFiles (
    FileName NVARCHAR(255)
)
end
Use CRF_XML_DATA

delete from CRF_XMLRawData
GO 
-- Declare variables
DECLARE @cmd NVARCHAR(4000), @filePath NVARCHAR(4000), @fileName NVARCHAR(4000);

-- Loop through files
SET @cmd = 'dir /B "D:\projects_2025\AATopProjects\CoreReactDODES\ECFR_Data\*.xml"';
INSERT INTO #TempFiles (FileName)
EXEC xp_cmdshell @cmd;

-- Process each file
DECLARE fileCursor CURSOR FOR 
SELECT FileName FROM #TempFiles WHERE FileName IS NOT NULL;


OPEN fileCursor;
FETCH NEXT FROM fileCursor INTO @fileName;

WHILE @@FETCH_STATUS = 0
BEGIN
  BEGIN TRY
		SET @filePath = 'D:\projects_2025\AATopProjects\CoreReactDODES\ECFR_Data\' + @fileName;
		DECLARE @sql NVARCHAR(MAX) = N'
		   	 
			INSERT INTO CRF_XMLRawData (FileName, XMLData)
			SELECT ''' + @fileName + ''', CONVERT(XML, BulkColumn)
			FROM OPENROWSET(BULK ''' + @filePath + ''', SINGLE_BLOB) AS x;';
		PRINT 'processing ' + @fileName   ;
		EXEC sp_executesql @sql;
		FETCH NEXT FROM fileCursor INTO @fileName;
    END TRY
    BEGIN CATCH 
	    FETCH NEXT FROM fileCursor INTO @fileName;
        PRINT 'Error processing ' + @fileName + ': ' + ERROR_MESSAGE();
    END CATCH
END

CLOSE fileCursor;
DEALLOCATE fileCursor;