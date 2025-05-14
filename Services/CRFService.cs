using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApi.Services.Interfaces;
using WebApi.Data;
using Microsoft.EntityFrameworkCore;
using WebApi.Shared.Helpers;
using Dapper;
using Microsoft.Extensions.Options;
using Microsoft.Data.SqlClient;
using System.Text;
using FluentNHibernate.MappingModel.Output;
using System.Xml.Serialization;
using System.Xml;
using System.Xml.Linq;
using static System.Net.Mime.MediaTypeNames;

namespace WebApi.Services;
public class CRFService : ICRFService
{
    private readonly DbContext_Dapper _dbContext;
    protected readonly IMapper _mapper;

    public CRFService(DbContext_Dapper dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<List<CRF_Title>> GetCRF_Titles()
    {
        using var connection = _dbContext.CreateConnection();
        var sql = $"SELECT * FROM  [dbo].[CRF_Titles] ";

        var items = (await connection.QueryAsync<CRF_Title>(sql));
        return items.ToList(); ;
    }
    public async Task<List<CRF_Part>> GetCRF_Parts(int title)
    {
        using var connection = _dbContext.CreateConnection();
        var sql = $"SELECT  [source]  ,[Node] ,[N]      ,[Head]  FROM  [dbo].[CRF_Parts]  WHERE source = @source";

        var items = (await connection.QueryAsync<CRF_Part>(sql, new { source = "Title"+title.ToString() }));
        return items.ToList(); ;
    }
    public async Task<List<CRF_Paragraph>> get_crf_TitleParagraphs(string Title)
    {
        using var connection = _dbContext.CreateConnection();
        var sql = $" SELECT TOP (1000)  Title, [ParagraphID] ,[SectionNode]  , LEFT (ParagraphText,200) as ParagraphText,[Position] FROM  [CRF_SectionParagraphs]  WHERE Title = @SectionTitle";

        var items = (await connection.QueryAsync<CRF_Paragraph>(sql, new { SectionTitle = Title }));
        return items.ToList(); ;
    }
    public async Task<List<CRF_TitleMain>> get_crf_mainTitles()
    {
        using var connection = _dbContext.CreateConnection();
        var sql = $" SELECT TOP (1000) Node, Title, [no_of_paragraphs],[no_of_parts],no_of_words from CRF_Titles_main  ";

        var items = (await connection.QueryAsync<CRF_TitleMain>(sql));
        return items.ToList(); ;
    }
    public async Task<bool> DeleteOneASync(int id)  
    {
        using var connection = _dbContext.CreateConnection();
        var sql = $"delete FROM CRF_SectionParagraphs WHERE  ParagraphID  = @Id";
       // int result = (await connection.ExecuteAsync(sql, new { Id = id }));
        return await Task.FromResult(true);
    }

    public async Task<bool> TestCpunt(int id)
    {
        using var connection = _dbContext.CreateConnection();
        var sql = "SELECT COUNT(*) FROM CRF_SectionParagraphs";
        var count = connection.ExecuteScalar(sql); 
        return await Task.FromResult(true);
    }
    public async Task<bool> uploadCRF_XML_Title(string file_Id, string filepath)
    {
        try
        {
            string xmlContent = File.ReadAllText(filepath).Trim();
            var xml = XDocument.Parse(xmlContent);

            using (var connection = _dbContext.CreateConnection())
            {
                connection.Open();
                await connection.ExecuteAsync(
                   @"
                    delete  FROM  CRF_XMLRawData where [ID]=@file_Id;
                    INSERT INTO CRF_XMLRawData (ID,LoadDate, XMLData) 
                                      VALUES (@file_Id,@LoadDate, CAST(@XmlContent AS XML))",
                   new { file_Id = file_Id, LoadDate=DateTime.Now, XmlContent = xml }
               );
            }
            return await Task.FromResult(true);
        }
        catch (Exception ex)
        {
            return await Task.FromResult(false);
        }
       
    }

    private string ConvertToString(object source, Type type, Encoding encoding)
    {
        // The string to hold the object content
        String content;

        // Create a memoryStream into which the data can be written and readed
        using (var stream = new MemoryStream())
        {
            // Create the xml serializer, the serializer needs to know the type
            // of the object that will be serialized
            var xmlSerializer = new XmlSerializer(type);

            // Create a XmlTextWriter to write the xml object source, we are going
            // to define the encoding in the constructor
            using (var writer = new XmlTextWriter(stream, encoding))
            {
                // Save the state of the object into the stream
                xmlSerializer.Serialize(writer, source);

                // Flush the stream
                writer.Flush();

                // Read the stream into a string
                using (var reader = new StreamReader(stream, encoding))
                {
                    // Set the stream position to the begin
                    stream.Position = 0;

                    // Read the stream into a string
                    content = reader.ReadToEnd();
                }
            }
        }

        // Return the xml string with the object content
        return content;
    }
    private async Task<bool> uploadCRF_XML_Title_Binary(string file_Id, string filepath)
    {
        byte[] xmlBytes = File.ReadAllBytes(filepath);
        string xmlContent = Encoding.Unicode.GetString(xmlBytes);

        using (var connection = _dbContext.CreateConnection())
        {
             connection.Open(); 
             await connection.ExecuteAsync(
                @"INSERT INTO CRF_XMLRawData (ID, XMLData) 
                  VALUES (@file_Id, CAST(@XmlContent AS XML))",
                new { file_Id=file_Id, XmlContent = xmlContent }  
            );
        } 
        return await Task.FromResult(true);
    }
}
