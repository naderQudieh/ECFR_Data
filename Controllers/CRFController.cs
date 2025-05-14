namespace WebApi.Controllers;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services.Interfaces;
using WebApi.Shared.Helpers;
using WebApi.Data;

[ApiController]
[Route("api/[controller]")]
public class CRFController : ControllerBase
{
    protected readonly ICRFService _crfService;

    public CRFController(ICRFService service)
    {
        _crfService = service;
    }


    [HttpGet]
    [Route("Get_crf_Titles")]
    public async Task<ActionResult<List<CRF_Title>>> Get_crf_Titles()
    {
        var _list = await _crfService.GetCRF_Titles();
        return Ok(_list);
    }

    [Route("get_crf_mainTitles")]
    [HttpGet]
    public async Task<ActionResult<List<CRF_TitleMain>>> get_crf_mainTitles()
    {
        
        var _list = await _crfService.get_crf_mainTitles();
        return Ok(_list);
    }

    [Route("get_crf_TitleParagraphs")]
    [HttpGet]
    public async Task<ActionResult<List<CRF_Paragraph>>> get_crf_TitleParagraphs([FromQuery] string? title)
    {
        if (string.IsNullOrEmpty(title))
        {
            title = "Title1";
        }
        var _list = await _crfService.get_crf_TitleParagraphs(title); 
        return Ok(_list);
    }

    
}
