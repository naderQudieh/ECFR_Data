 
namespace WebApi.Controllers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Data;
using WebApi.Services;
using WebApi.Services.Interfaces;
using static System.Net.WebRequestMethods;
 

[ApiController]
[Route("api/[controller]")]
public class DownlaodController : ControllerBase
{
    private static readonly HttpClient _httpClient = new HttpClient();
    protected readonly ICRFService _crfService;

    public DownlaodController(ICRFService service)
    {
        _crfService = service;
    }

    [HttpGet]
    [Route("download-a-title")]
    public async Task<ActionResult<bool>> downloadTitle(int title)
    {
        await Downlaod_xml_data_a_title(title);
        return Ok();
    }
    [HttpGet]
    [Route("download-all-titles")]
    public async Task<ActionResult<bool>> downloadfiles()
    {
        await Downlaod_xml_data_Current_for_titles();
        return Ok();
    }

    [HttpGet]
    [Route("bulkInsert-xml-files")]
    public async Task<ActionResult<List<CRF_Title>>> bulkInsertXMLFiles()
    {
        string downloadDir = Path.Combine(Environment.CurrentDirectory, "ECFR_Data");
        string[] fileEntries = Directory.GetFiles(downloadDir);
        foreach (string fileName in fileEntries)
        {
            string filePath = Path.Combine(downloadDir, fileName);
            string file_id = Path.GetFileNameWithoutExtension(fileName);
            var ParagraphsList = await _crfService.uploadCRF_XML_Title(file_id, filePath);
            
        }
        return Ok();
    }
    [HttpGet]
    [Route("bulkInsert-a-file")]
    public async Task<ActionResult<List<CRF_Title>>> bulkInsertXMLFile(int Title)
    {
        string downloadDir = Path.Combine(Environment.CurrentDirectory, "ECFR_Data");
        
        string filePath = Path.Combine(downloadDir, "Title-"+ Title+".xml");
        string file_id = Path.GetFileNameWithoutExtension(filePath);
        var ParagraphsList = await _crfService.uploadCRF_XML_Title(file_id, filePath);

        
        return Ok();
    }
    private async Task Downlaod_cvs_data_Current_for_titles()
    {
        string downloadDir = Path.Combine(Environment.CurrentDirectory, "CVS_Data");
        Directory.CreateDirectory(downloadDir);
        for (int i = 1; i <= 50; i++)
          {
            // limit to 1000 ROWS FOR DEMO only
            string BaseUrl = $"https://www.ecfr.gov/api/search/v1/results.csv?date=current&hierarchy[title]={i}&order=relevance&results=1000";        
            string fileName = "Title-"+i.ToString() + ".cvs"; ;
            await DownloadFileAsync(BaseUrl, fileName, downloadDir); 
        } 
    }

    private async Task Downlaod_json_data_Current_for_titles()
    {
        string downloadDir = Path.Combine(Environment.CurrentDirectory, "JSON_Data");
        Directory.CreateDirectory(downloadDir);
        for (int i = 1; i <= 50; i++)
        {
            // limit to 1000 ROWS FOR DEMO only
            string BaseUrl = $"https://www.ecfr.gov/api/search/v1/results.json?date=current&hierarchy[title]={i}&order=relevance&results=1000";
            string fileName = "Title-" + i.ToString() + ".json"; ;
            await DownloadFileAsync(BaseUrl, fileName, downloadDir);

        }
        Console.WriteLine("Download complete!");
    }
    private async Task Downlaod_xml_data_a_title(int title)
    {
        string downloadDir = Path.Combine(Environment.CurrentDirectory, "ECFR_Data");
        Directory.CreateDirectory(downloadDir); 
        string BaseUrl = $"https://www.govinfo.gov/bulkdata/ECFR/title-{title}/ECFR-title{title}.xml";
        string fileName = "Title-" + title.ToString() + ".xml"; ;
        await DownloadFileAsync(BaseUrl, fileName, downloadDir); 
        Console.WriteLine("Download complete for title", fileName);
    }
    private async Task Downlaod_xml_data_Current_for_titles()
    {
         string downloadDir = Path.Combine(Environment.CurrentDirectory, "ECFR_Data");
        Directory.CreateDirectory(downloadDir);
        for (int i = 1; i <= 50; i++)
        {
            string BaseUrl = $"https://www.govinfo.gov/bulkdata/ECFR/title-{i}/ECFR-title{i}.xml";
            string fileName = "Title-" + i.ToString() + ".xml"; ;
            await DownloadFileAsync(BaseUrl, fileName, downloadDir);

        } 
        Console.WriteLine("Download complete!");
    }


    private static async Task DownloadFileAsync(string url,string filename, string downloadDir)
    {
        try
        {

            string filePath = Path.Combine(downloadDir, filename);
            Console.WriteLine($"Downloading {filename}...");

            using (var response = await _httpClient.GetAsync(url, HttpCompletionOption.ResponseHeadersRead))
            using (var stream = await response.Content.ReadAsStreamAsync())
            using (var fileStream = System.IO.File.Create(filePath))
            {
                await stream.CopyToAsync(fileStream);
            }

            Console.WriteLine($"Saved: {filePath}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error downloading {url}: {ex.Message}");
        }
    }

}
