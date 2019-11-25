﻿$(document).ready(function () {


    function getTodayDate() {
        var date = new Date();
        var currentDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        return currentDate;
    }


    $("#purchaseDate").val(getTodayDate());

    $('#TotalPrice').val("0");
    $('#MRP').val("0");
    //category changes
    $("#categoryId").on("change",
        function () {

            //disable supplier details
            $("#SupplierId").prop("disabled", true);
            $("#InvoiceNo").prop("disabled", true);
            $("#Code").prop("disabled", true);
            $("#purchaseDate").prop("disabled", true);

            var categoryId = $('#categoryId').val();
            var jsonData = { categoryId: categoryId };


            $('#ProductId').empty();

            if (categoryId <= 0) {
                //alert("hi");
                var defaultValue = '<option value=0 > Select One</option>';
                $('#ProductId').append(defaultValue);
            }
            else {
                var defaultValue1 = '<option value=0 > Select One</option>';
                $('#ProductId').append(defaultValue1);
                $.ajax({
                    type: "POST",
                    url: "/Product/GetProductByCategoryId/",
                    data: JSON.stringify(jsonData),
                    //data: {
                    //    categoryId:$("#categoryId").val()
                    //} ,
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        $.each(data, function (key, category) {
                            var optionText = "<option value='" + category.Id + "' >" + category.Name + "</option>";
                            $('#ProductId').append(optionText);
                        });
                    }
                });
            }

        });

    //function Clear Available Product Details
    function clearAvailableProductDetails() {
        $('#ProductCode').val("0");
        $('#AvailableQty').val("0");
        $('#PreviousUnitPrice').val("0");
        $('#PreviousMRP').val("0");

        //current purchase product
        $('#UnitPrice').val("0");
        $('#MRP').val("0");
    }

    clearAvailableProductDetails();
    //product changes
    $("#ProductId").on("change",
        function () {
            var productId = $('#ProductId').val();
            var jsonData = { productId: productId };

            $.ajax({
                type: "POST",
                url: "/Purchase/GetPurchaseDetailByProductId/",
                data: JSON.stringify(jsonData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {

                    clearAvailableProductDetails();
                    if (response != null) {
                        //set the values to input field by id
                        $('#ProductCode').val(response.ProductCode);
                        $('#AvailableQty').val(response.AvailableQty);
                        $('#PreviousUnitPrice').val(response.PreviousUnitPrice);
                        $('#PreviousMRP').val(response.PreviousMRP);

                        //current purchase product
                        $('#UnitPrice').val(response.PreviousUnitPrice);
                        $('#MRP').val(response.PreviousMRP);

                    }

                }
            });

        });


    $('input[name="MRP"]').keyup(function (e) {

        //input field accept numeric value
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }


    });


    $('input[name="Quantity"]').keyup(function (e) {

        //input field accept numeric value
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }

        var qty = $('#Quantity').val();
        var unitPrice = $('#UnitPrice').val();
        $('#TotalPrice').val(qty * unitPrice);
    });

    $('input[name="UnitPrice"]').keyup(function (e) {

        //input field accept numeric value
        if (/\D/g.test(this.value)) {
            // Filter non-digits from input value.
            this.value = this.value.replace(/\D/g, '');
        }

        var qty = $('#Quantity').val();
        var unitPrice = $('#UnitPrice').val();

        var totalPrice = qty * unitPrice;

        $('#TotalPrice').val(totalPrice);

        $('#MRP').val(parseInt(unitPrice) + parseInt(unitPrice * 25 / 100));


        if (isNaN($('#MRP').val())) {
            $('#MRP').val("0");
        }

    });


    $("#PurchaseForm").validate({
        rules: {
            SupplierId: {
                required: true
            },
            InvoiceNo: {
                required: true
            },
            Code: {
                required: true
            },
            purchaseDate: {
                required: true,
                date:true
            },
            categoryId: {
                required: true
            },
            ProductId: {
                required: true
            },
            ManufacturedDateTime: {
                required: true
            },
            ExpireDate: {
                required: true
            },
            Quantity: {
                required: true
            },
            UnitPrice: {
                required: true
            },
            MRP: {
                required: true
            },
            Remarks: {
                required: true
            }

        },
        messages: {
            SupplierId: {

            },
            InvoiceNo: {

            },
            Code: {

            },
            purchaseDate: {

            },
            categoryId: {

            },
            ProductId: {

            },
            ManufacturedDateTime: {

            },
            ExpireDate: {

            },
            Quantity: {

            },
            UnitPrice: {

            },
            MRP: {

            },
            Remarks: {

            }
        }
    });


    //Product List Table 

    var index = 0;

    $("#addButton").click(function () {

        if ($("#PurchaseForm").valid()) {
            //enable the submit button
            $("#submitButton").prop("disabled", false);
            var result = getResultData();

            var resultRow = gerResultRow(result);

            $("#ProductListTable").append(resultRow);
            index++;      
        }
       
    });
     //initially disable the submit button
    if (index<=0) {
        $("#submitButton").prop("disabled", true); 
    }

    function getResultData() {
        var productId = $("#ProductId").val();
        var productName = $("#ProductId  option:selected").text();
        var manufacturedDateTime= $("#ManufacturedDateTime").val();
        var expireDate= $("#ExpireDate").val();
        var quantity= $("#Quantity").val();
        var unitPrice= $("#UnitPrice").val();
        var totalPrice= $("#TotalPrice").val();
        var mrp= $("#MRP").val();
        var remarks = $("#Remarks").val();
        return {
            ProductId: productId, ProductName: productName, ManufacturedDateTime: manufacturedDateTime,
            ExpireDate: expireDate, Quantity: quantity, UnitPrice: unitPrice, TotalPrice: totalPrice, MRP: mrp, Remarks: remarks
        }
    }

    var sl = index;
    function gerResultRow(result) {
        var productIdHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].ProductId' value='" + result.ProductId + "'></div>";
        //var productNameHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].ProductName' value='" + result.ProductName + "'></div>";
        var manufacturedDateTimeHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].ManufacturedDateTime' value='" + result.ManufacturedDateTime + "'></div>";
        var expireDateHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].ExpireDate' value='" + result.ExpireDate + "'></div>";
        var quantityHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].Quantity' value='" + result.Quantity + "'></div>";
        var unitPriceHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].UnitPrice' value='" + result.UnitPrice + "'></div>";
        var totalPriceHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].TotalPrice' value='" + result.TotalPrice + "'></div>";
        var mrpHiddenHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].MRP' value='" + result.MRP + "'></div>";
        var remarksHidden = "<input type='hidden' name='PurchaseDetails[" + index + "].Remarks' value='" + result.Remarks + "'></div>";

        var startTr = "<tr>";
        var slCell = "<td class='text-success'>" + (++sl) + "</td>";

        var productIdCell = productIdHidden;
        var productNameCell = "<td class='text-success'>" + result.ProductName + "</td>";
        var manufacturedDateTimeCell = "<td class='text-success'>" + manufacturedDateTimeHidden + result.ManufacturedDateTime + "</td>";
        var expireDateCell = "<td class='text-success'>" + expireDateHidden + result.ExpireDate + "</td>";
        var quantityCell = "<td class='text-success'>" + quantityHidden + result.Quantity + "</td>";
        var unitPriceCell = "<td class='text-success'>" + unitPriceHidden + result.UnitPrice + "</td>";
        var totalPriceCell = "<td class='text-success'>" + totalPriceHidden + result.TotalPrice + "</td>";
        var mrpCell = "<td class='text-success'>" + mrpHiddenHidden + result.MRP + "</td>";
        var remarksCell = "<td class='text-success'>" + remarksHidden + result.Remarks + "</td>";

        var endTr = "</tr>";



        return (startTr + slCell + productIdCell +productNameCell+ manufacturedDateTimeCell + expireDateCell + quantityCell + unitPriceCell + totalPriceCell + mrpCell + remarksCell+ endTr);

    }


    $("#submitButton").click(function () {
        //document.getElementById("saveError").style.display = "none";

        $("#SupplierId").prop("disabled", false);
        $("#InvoiceNo").prop("disabled", false);
        $("#Code").prop("disabled", false);
        $("#purchaseDate").prop("disabled", false);

        if ($("#PurchaseForm").valid()) {
            $.ajax({
                    type: "POST",
                    url: "/Purchase/Create",
                    data: $("#PurchaseForm").serialize()

                })
                .done(function (response) {
                    //if (response.Success) {
                        swal({
                                title: "Saved Successfully",
                                //text: "Once deleted, you will not be able to recover this imaginary file!",
                                icon: "success",
                                buttons: true,
                                dangerMode: true

                            })
                            .then((willDelete) => {
                                if (willDelete) {
                                    window.location.reload();
                                }
                            });

                    //} else {
                    //    alert("failed");
                    //}

                })
                .fail(function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("Fail");
                });
        };

    });



});