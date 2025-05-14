using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;



namespace WebApi.Data;

public class CRF_Paragraph
{
    public string? Title { get; set; }
    public int ParagraphID { get; set; }
    public string? SectionNode { get; set; }
    public string? ParagraphText { get; set; }
    public int Position { get; set; }
  
}

public class CRF_Title
{
    public string? Node { get; set; }
    public int Title_Ref  { get; set; }
  
    public string? Head { get; set; }
    // save it string for demo
    public string? AmendmentDate { get; set; }

}
public class CRF_TitleMain
{
    public  int Node { get; set; }
    public string? Title { get; set; }
    public int no_of_paragraphs { get; set; } = 0;
    public int no_of_words { get; set; } = 0;
    public int no_of_parts { get; set; } = 0; 
    public int no_of_sections { get; set; } = 0;
}
public class CRF_Part
{
    public string? Source { get; set; }
    public string? Node { get; set; }
    public int PART_REF { get; set; } 
    public string? ParentNode { get; set; }
    // save it string for demo
    public string? Head { get; set; }

}