delete from CRF_Titles;
go
 INSERT INTO  CRF_Titles (Title, Node,Title_Ref, Head,[AmendmentDate])
SELECT
   'Title'+ SUBSTRING( DIV1Node.value('@NODE', 'NVARCHAR(50)'),1, CHARINDEX(':', DIV1Node.value('@NODE', 'NVARCHAR(50)'))-1  ) as Title,
    DIV1Node.value('@NODE', 'NVARCHAR(50)') AS Node,
    DIV1Node.value('@N', 'NVARCHAR(10)') AS N,
    DIV1Node.value('(HEAD/text())[1]', 'NVARCHAR(500)') AS Head,
    ECFRBRWSNode.value('(AMDDATE/text())[1]', 'NVARCHAR(100)') AS AmendmentDate
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/TEXT/BODY/ECFRBRWS') AS ECFRBRWS(ECFRBRWSNode)
CROSS APPLY ECFRBRWSNode.nodes('DIV1[@TYPE="TITLE"]') AS DIV1(DIV1Node);