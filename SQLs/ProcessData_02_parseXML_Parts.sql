delete from CRF_Parts;
 go
INSERT INTO  CRF_Parts (Title,ParentNode, Node, PART_REF, Head)
SELECT
   'Title'+ SUBSTRING( PartNode.value('@NODE', 'NVARCHAR(50)'),1, CHARINDEX(':', PartNode.value('@NODE', 'NVARCHAR(50)'))-1  ) as Title,
   LEFT(PartNode.value('@NODE', 'NVARCHAR(50)'), LEN(PartNode.value('@NODE', 'NVARCHAR(50)')) - CHARINDEX('.', REVERSE(PartNode.value('@NODE', 'NVARCHAR(50)')))) as ParentNode,
   PartNode.value('@NODE', 'NVARCHAR(50)') as 'NodeCode',
    PartNode.value('@N', 'NVARCHAR(20)') as 'PART_REF',
    PartNode.value('(HEAD/text())[1]', 'NVARCHAR(500)')  as Head
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/TEXT/BODY/ECFRBRWS//*[@TYPE="PART"]') AS CRF_Parts(PartNode);