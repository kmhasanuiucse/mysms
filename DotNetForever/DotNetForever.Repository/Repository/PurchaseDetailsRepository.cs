﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DotNetForever.DatabaseContext.DatabaseContext;
using DotNetForever.Model.Model;

namespace DotNetForever.Repository.Repository
{
    public class PurchaseDetailsRepository
    {
        public PurchaseDetail GetPurchaseDetailByProductId(int productId)
        {
            using (var context = new SMSDbContext())
            {
                return context.PurchaseDetails.Where(x=>x.ProductId==productId).OrderByDescending(x => x.Id).FirstOrDefault<PurchaseDetail>();
            }
        }

        public List<PurchaseDetail> GetAllPurchaseDetailByPurchaseId(int purchaseId)
        {
            using (var context = new SMSDbContext())
            {
                return context.PurchaseDetails.Where(x => x.PurchaseId == purchaseId).Include(x=>x.Product).ToList();
            }
        }
    }
}
