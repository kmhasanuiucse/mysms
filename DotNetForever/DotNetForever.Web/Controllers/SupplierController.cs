﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DotNetForever.Manager.Manager;
using DotNetForever.Model.Model;
using DotNetForever.Web.ViewModels;

namespace DotNetForever.Web.Controllers
{
    public class SupplierController : Controller
    {
        SupplierManager _supplierManager=new SupplierManager();
        // GET: Supplier
        public ActionResult Index(string search)
        {
            SupplierListViewModel model = new SupplierListViewModel();
            model.Suppliers = _supplierManager.GetAll();
            if (!String.IsNullOrEmpty(search))
            {
                model.Suppliers = _supplierManager.Search(search);
            }

            model.Search = search;
            return View(model);
        }

        //public ActionResult Listing()
        //{
        //    var product = _productManager.GetAll();

        //    return PartialView("_Listing", product);
        //}

        [HttpGet]
        public ActionResult Create()
        {
            Supplier model = new Supplier();
            return PartialView("_Create", model);

        }

        [HttpPost]
        public ActionResult Create(Supplier supplier)
        {
            JsonResult jason = new JsonResult();

            if (_supplierManager.Add(supplier))
            {
                jason.Data = new { Success = true, Message = "Saved Successfully" };
            }
            else
            {
                jason.Data = new { Success = true, Message = "Unable to save" };
            }

            return jason;
        }

        [HttpGet]
        public ActionResult Edit(int id)
        {
            var supplier = _supplierManager.GetById(id);
            return PartialView("_Edit", supplier);
        }

        [HttpPost]
        public ActionResult Edit(Supplier supplier)
        {
            JsonResult jason = new JsonResult();
            var existingSupplier = _supplierManager.GetById(supplier.Id);
            existingSupplier.Code = supplier.Code;
            existingSupplier.Name = supplier.Name;
            existingSupplier.Address = supplier.Address;
            existingSupplier.Email = supplier.Email;
            existingSupplier.Contact = supplier.Contact;
            existingSupplier.ContactPerson = supplier.ContactPerson;


            if (_supplierManager.Update(existingSupplier))
            {
                jason.Data = new { Success = true };
            }
            else
            {
                jason.Data = new { Success = true, Message = "Unable to update" };
            }

            return jason;
        }

        [HttpPost]
        public ActionResult Delete(int id)
        {
            _supplierManager.Delete(id);
            return RedirectToAction("Index");
        }
    }
}