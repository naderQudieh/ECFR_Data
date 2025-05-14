 delete from CRF_Sub_Parts;
 go
INSERT INTO  CRF_Sub_Parts (Title,ParentNode, Node, SUB_PART_REF, Head)
SELECT
   'Title'+ SUBSTRING( PartNode.value('@NODE', 'NVARCHAR(50)'),1, CHARINDEX(':', PartNode.value('@NODE', 'NVARCHAR(50)'))-1  ) as source,
   LEFT(PartNode.value('@NODE', 'NVARCHAR(50)'), LEN(PartNode.value('@NODE', 'NVARCHAR(50)')) - CHARINDEX('.', REVERSE(PartNode.value('@NODE', 'NVARCHAR(50)')))) as ParentNode,
   PartNode.value('@NODE', 'NVARCHAR(50)') as 'NodeCode',
    PartNode.value('@N', 'NVARCHAR(20)') as 'SUB_PART_REF',
    PartNode.value('(HEAD/text())[1]', 'NVARCHAR(500)')  as Head
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/TEXT/BODY/ECFRBRWS//*[@TYPE="SUBPART"]') AS CRF_Parts(PartNode);