delete from CRF_Titles_main;
 go
INSERT INTO  CRF_Titles_main (Node,Title)
SELECT 
       stuff(trim(ECFRBRWSNode.value('(PUBLICATIONSTMT/IDNO/text())[1]', 'NVARCHAR(100)')) , 1, patindex('%[0-9]%', trim(ECFRBRWSNode.value('(PUBLICATIONSTMT/IDNO/text())[1]', 'NVARCHAR(100)')) )-1, '') AS Node,
    ECFRBRWSNode.value('(TITLESTMT/TITLE/text())[1]', 'NVARCHAR(100)') AS Title
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/HEADER/FILEDESC') AS ECFRBRWS(ECFRBRWSNode)
