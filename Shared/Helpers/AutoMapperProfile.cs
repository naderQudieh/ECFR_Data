namespace WebApi.Shared.Helpers;
using AutoMapper;
using WebApi.Data.Entities;
using WebApi.Data.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Category, CategoryDTO>();

    }

}