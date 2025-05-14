USE master
GO
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'CRF_XML_DATA')
BEGIN
  CREATE DATABASE CRF_XML_DATA;
END;
GO

USE CRF_XML_DATA
GO
IF OBJECT_ID('CRF_XMLRawData', 'U') IS NULL
BEGIN
 CREATE TABLE [dbo].[CRF_XMLRawData](
    [ID] [varchar](50) NOT NULL,
	[FileName] [varchar](50) NULL,
	[XMLData] [xml] NULL,
	[LoadDate] [datetime] NULL,
) ON [PRIMARY]
END;
GO

IF OBJECT_ID('CRF_Titles_main', 'U') IS NULL
BEGIN
CREATE TABLE [dbo].[CRF_Titles_main](
	[Node] [int] NOT NULL,
	[Title] [nvarchar](500) NOT NULL,
	[no_of_paragraphs] [int] NULL,
	[no_of_parts] [int] NULL,
	[no_of_words] [int] NULL,
 CONSTRAINT [PK_CRF_Titles_main] PRIMARY KEY CLUSTERED 
(
	[Node] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
END;
GO


  
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('CRF_Titles', 'U') IS NULL
BEGIN

CREATE TABLE [dbo].CRF_Titles(
    [Title][varchar](20) NULL,
    [Node] [varchar](50) NOT NULL,
	[Title_Ref] [nvarchar](20) NULL,
	[Head] [nvarchar](500) NULL,
	[AmendmentDate] [nvarchar](50) NULL
  ) ON [PRIMARY]
END;
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('[CRF_Sub_Parts]', 'U') IS NULL
BEGIN
CREATE TABLE [dbo].[CRF_Sub_Parts](
	[Title] [nvarchar](20) NULL,
	[ParentNode] [nvarchar](20) NULL,
	[Node] [nvarchar](50) NOT NULL,
	[SUB_PART_REF] [nvarchar](20) NULL,
	[Head] [nvarchar](500) NULL
) ON [PRIMARY]
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('CRF_Chapters', 'U') IS NULL
BEGIN
 CREATE TABLE [dbo].[CRF_Chapters](
	[Source] [nvarchar](10) NULL,
	[ParentNode] [nvarchar](20) NULL,
	[Node] [nvarchar](50) NOT NULL,
	[CHAPTER_REF] [nvarchar](20) NULL,
	[Head] [nvarchar](500) NULL
) ON [PRIMARY]
END;
GO
 
 
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('CRF_Sub_Chapters', 'U') IS NULL
BEGIN
 CREATE TABLE [dbo].CRF_Sub_Chapters(
	[Title] [nvarchar](10) NULL,
	[ParentNode] [nvarchar](20) NULL,
	[Node] [nvarchar](50) NOT NULL,
	[SUB_CHAPTER_REF] [nvarchar](20) NULL,
	[Head] [nvarchar](500) NULL
) ON [PRIMARY]
END;
GO

IF OBJECT_ID('CRF_Parts', 'U') IS NULL
BEGIN

CREATE TABLE [dbo].[CRF_Parts](
	[Title] [varchar](20) NULL,
	[ParentNode] [nvarchar](20) NULL,
	[Node] [nvarchar](50) NOT NULL,
	[PART_REF] [nvarchar](20) NULL,
	[Head] [nvarchar](500) NULL
  ) ON [PRIMARY]
END;
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('[CRF_SectionParagraphs]', 'U') IS NULL
BEGIN

CREATE TABLE [dbo].[CRF_SectionParagraphs](
[Title] [nvarchar](50) NULL,
 [ParagraphID] [int] IDENTITY(1,1) NOT NULL,
	[SectionNode] [nvarchar](50) NULL,
	[ParagraphText] [nvarchar](max) NULL,
	[Position] [int] NULL,
  ) ON [PRIMARY]
END;
GO

  
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('[CRF_Sections]', 'U') IS NULL
BEGIN

CREATE TABLE [dbo].[CRF_Sections](
	[Title] [nvarchar](50) NULL,
	[Node] [nvarchar](50) NOT NULL,
	[ParentNode] [nvarchar](50) NULL,
	[SECTION_REF] [nvarchar](20) NULL,
	[Head] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
END;
GO

  
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('CRF_SubjGrps', 'U') IS NULL
BEGIN

CREATE TABLE [dbo].CRF_SubjGrps(
[Node] [nvarchar](50) NOT NULL,
	[ParentNode] [nvarchar](50) NULL,
	[SUBJGRP_REF] [nvarchar](20) NULL,
	[Head] [nvarchar](500) NULL,
  ) ON [PRIMARY]
END;
GO

 
 