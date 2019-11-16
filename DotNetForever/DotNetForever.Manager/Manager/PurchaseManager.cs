﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DotNetForever.Model.Model;
using DotNetForever.Repository.Repository;

namespace DotNetForever.Manager.Manager
{
    public class PurchaseManager
    {
        PurchaseRepository _purchaseRepository=new PurchaseRepository();    
        public List<Purchase> GetAll()
        {
            return _purchaseRepository.GetAll();
        }
    }
}