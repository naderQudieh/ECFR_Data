using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Data.Models;
using static WebApi.Data.Models.CategoryDTO;

namespace WebApi.Services.Interfaces;
public interface ICategoryService
    {
       
        Task<CategoryDTO> CreateOneAsync(CategoryDTO createDto);

        Task<List<CategoryDTO>> GetAllAsync();

        Task<CategoryDTO> GetByIdAsync(int id);

        Task<bool> DeleteOneASync(int id);

        // update
        Task<bool> UpdateOneAsync(int id, CategoryDTO updateDto);




    }
 