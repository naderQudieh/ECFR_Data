using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApi.Services.Interfaces;
using WebApi.Data.Models;
using WebApi.Data.Entities;
using WebApi.Data;
using Microsoft.EntityFrameworkCore;
using WebApi.Shared.Helpers;
namespace WebApi.Services;



public class CategoryService  : ICategoryService
    {

    private readonly DbContext_EF _dbContext;
    protected readonly IMapper _mapper;

    public CategoryService (DbContext_EF dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<CategoryDTO> CreateOneAsync(CategoryDTO createDto)
    {
        var product = _mapper.Map<CategoryDTO, Category>(createDto);
        await _dbContext.Categories.AddAsync(product);
        await _dbContext.SaveChangesAsync();
        return _mapper.Map<Category, CategoryDTO>(product);
    }

   

        // get all
        public async Task<List<CategoryDTO>> GetAllAsync()
        {
            var categoryList = await _dbContext.Categories.ToListAsync(); 
             return _mapper.Map<List<Category>, List<CategoryDTO>>(categoryList);
        }

        // id888
        public async Task<CategoryDTO> GetByIdAsync(int id)
        {
            var foundCategory = await _dbContext.Categories.FindAsync(id);
            if (foundCategory == null)
            {
                throw CustomException.NotFound($"Category with {id} is not found");
            }
            return _mapper.Map<Category, CategoryDTO>(foundCategory);
        }

        // delete
        public async Task<bool> DeleteOneASync(int id)
    {
            var foundCategory = await _dbContext.Categories.FindAsync(id);
            if (foundCategory is not null)
            {
                _dbContext.Categories.Remove(foundCategory);
                return true;
            }
            return false;
        }
     
        
        public async Task<bool> UpdateOneAsync(int id, CategoryDTO updateDto)
        {
            var foundProduct = await _dbContext.Categories.FirstOrDefaultAsync(p => p.CategoryID == id);
            if (foundProduct == null)
            {
                return false;
            }
            _mapper.Map(updateDto, foundProduct);
            _dbContext.Categories.Update(foundProduct);
            await _dbContext.SaveChangesAsync();
            return true;

        }
}
 