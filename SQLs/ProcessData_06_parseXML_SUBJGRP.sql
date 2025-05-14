delete from CRF_SubjGrps
go
INSERT INTO CRF_SubjGrps (Node, ParentNode, SUBJGRP_REF, Head)
SELECT
    SubjGrpNode.value('@NODE', 'NVARCHAR(50)') as Node ,
    LEFT(SubjGrpNode.value('@NODE', 'NVARCHAR(50)'), LEN(SubjGrpNode.value('@NODE', 'NVARCHAR(50)')) - CHARINDEX('.', REVERSE(SubjGrpNode.value('@NODE', 'NVARCHAR(50)')))) as ParentNode,
    SubjGrpNode.value('@N', 'NVARCHAR(20)') as SUBJGRP_REF,
    SubjGrpNode.value('(HEAD/text())[1]', 'NVARCHAR(500)') as Head
FROM CRF_XMLRawData
CROSS APPLY XMLData.nodes('/DLPSTEXTCLASS/TEXT/BODY/ECFRBRWS//*[@TYPE="SUBJGRP"]') AS CRF_SubjGrps(SubjGrpNode)
 