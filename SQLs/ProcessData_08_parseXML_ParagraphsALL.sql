
delete from CRF_SectionParagraphs
go 
INSERT INTO CRF_SectionParagraphs (Title, SectionNode, ParagraphText, Position)
 
SELECT
   'Title'+ SUBSTRING( SectionNode.value('@NODE', 'NVARCHAR(50)'),1, CHARINDEX(':', SectionNode.value('@NODE', 'NVARCHAR(50)'))-1  ) as Title,
    SectionNode.value('@NODE', 'NVARCHAR(50)'),
    PNode.value('.', 'NVARCHAR(MAX)'),
    ROW_NUMBER() OVER (
        PARTITION BY SectionNode.value('@NODE', 'NVARCHAR(50)') 
        ORDER BY PNode
    ) AS Position
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/TEXT/BODY/ECFRBRWS//*[@TYPE="SECTION"]') AS Sections(SectionNode)
CROSS APPLY SectionNode.nodes('P') AS Paragraphs(PNode);
 



