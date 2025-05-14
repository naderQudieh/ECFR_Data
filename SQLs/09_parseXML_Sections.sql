
delete from CRF_Sections
go 
INSERT INTO CRF_Sections (Node, ParentNode, SECTION_REF, Head)
SELECT
   SectionNode.value('@NODE', 'NVARCHAR(50)') as Node ,
    LEFT(SectionNode.value('@NODE', 'NVARCHAR(50)'), LEN(SectionNode.value('@NODE', 'NVARCHAR(50)')) - CHARINDEX('.', REVERSE(SectionNode.value('@NODE', 'NVARCHAR(50)')))) as ParentNode,
   SectionNode.value('@N', 'NVARCHAR(20)') as SECTION_REF,
   SectionNode.value('(HEAD/text())[1]', 'NVARCHAR(500)') as Head
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/TEXT/BODY/ECFRBRWS//*[@TYPE="SECTION"]') AS CRF_Section(SectionNode)


 
 