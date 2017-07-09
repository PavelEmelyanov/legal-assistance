using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LA.Common.Services
{
    public static class MappingHelper
    {
        public static TDestination Map<TSource, TDestination>(TSource source)
        {
            var mapped = AutoMapper.Mapper.Map<TSource, TDestination>(source);
            return mapped;
        }

        public static TDestination Map<TSource, TDestination>(TSource source, TDestination destination)
        {
            var mapped = AutoMapper.Mapper.Map(source, destination);
            return destination;
        }
    }
}
