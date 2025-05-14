using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Shared.Helpers;
using WebApi.Data;


namespace WebApi.Services.Interfaces;
public interface ICRFService
{
    Task<List<CRF_Title>> GetCRF_Titles();
    Task<List<CRF_TitleMain>> get_crf_mainTitles();
    Task<List<CRF_Part>> GetCRF_Parts(int title);
    Task<List<CRF_Paragraph>> get_crf_TitleParagraphs(string title);
    Task<bool> DeleteOneASync(int id);
    Task<bool> uploadCRF_XML_Title(string file_id, string filepath);
}
 