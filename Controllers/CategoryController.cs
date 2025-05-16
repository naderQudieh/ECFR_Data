using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Sprache;
using WebApi.Data;
using WebApi.Data.Models;
using WebApi.Services.Interfaces;

namespace WebApi.Controllers;
[ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        protected readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService service)
        {
            _categoryService = service;
        }


        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> CreateOneController([FromBody] CategoryDTO createDto)
        {
            var categoryCreated = await _categoryService.CreateOneAsync(createDto);
            //return Ok(categoryCreated);
            return Created($"api/v1/category/{categoryCreated.CategoryID}", categoryCreated);
        }


        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> GetAllAsync()
        {
            var categoryList = await _categoryService.GetAllAsync();
            return Ok(categoryList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetByIdAsync([FromRoute] int id)
        {
            var category = await _categoryService.GetByIdAsync(id);
            return Ok(category);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteOneAsync([FromRoute] int id)
        {
            var isDeleted = await _categoryService.DeleteOneASync(id);
            return Ok(isDeleted);
        }

        [HttpPut]
        public async Task<ActionResult<CategoryDTO>> CreateOneAsync([FromRoute] int id, [FromBody] CategoryDTO updateDto)
        {
            var categoryUpdated = await _categoryService.UpdateOneAsync(id, updateDto);
            return Ok(categoryUpdated);

        }
    }
 