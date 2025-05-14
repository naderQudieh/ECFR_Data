

update CRF_Titles_main 
set no_of_words = (
select count(*) from [dbo].[CRF_SectionParagraphs] SS where SS.[Title] ='Title'+ Trim(CAST(CRF_Titles_main.Node AS VARCHAR(10))) 
)
 

 update CRF_Titles_main 
set [no_of_paragraphs] = (
select count(*) from [dbo].[CRF_SectionParagraphs] SS where SS.[Title] ='Title'+ Trim(CAST(CRF_Titles_main.Node AS VARCHAR(10))) 
)

update CRF_Titles_main 
set no_of_words = (
 SELECT   COUNT(*) AS [Count]
	FROM CRF_SectionParagraphs
	CROSS APPLY STRING_SPLIT(ParagraphText, ' ')   where CRF_SectionParagraphs.Title ='Title'+ Trim(CAST(CRF_Titles_main.Node AS VARCHAR(10)))
	GROUP BY Title 
)
 