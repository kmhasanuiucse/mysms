﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DotNetForever.Model.Model;
using DotNetForever.Repository.Repository;

namespace DotNetForever.Manager.Manager
{
    public class SaleManager
    {
       SaleRepository _saleRepository=new SaleRepository();
        public List<Sale> GetAll()
        {
            return _saleRepository.GetAll();
        }
    }
}