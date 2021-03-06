'use strict'
$(function(){
    // swal("Here's a message!")
    initDeafult()

    $('body').on('click', 'button#create-form', function(){
        initCreate()
    })
    $('body').on('click', 'button#bt-back', function(){
        initDeafult()
    })
    function initDeafult(){
        $('div.content-module').css('display', 'none')
        $('div#list-content').show()
    }
    function initCreate(){
        $('body div.content-module').css('display', 'none')
        $('div#form-create').show()
    }

    function initShow(){
        $('body div.content-module').css('display', 'none')
        $('div#form-show').show()
    }

    $('body').on('click', 'button.bt-show-form', function(e){
        e.preventDefault()
        var id = $(this).data('id')
        $.get('/setting/sys-options/'+id+'/show', function(data){
            $("div#form-show").html(data)
            initShow()
        })
    })

    $('button.bt-delete-form').on('click', function(e){
        e.preventDefault()
        var id = $(this).data('id')
        var status = $(this).data('status')
        swal({
            title: "Warning!",
            text: "Are'u sure remove this item ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-warning",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        },
        function(){
            $.ajax({
                headers: {'x-csrf-token': $('[name=_csrf]').val()},
                method: 'POST',
                url: "/setting/sys-options/"+id+"/update",
                data: {status: status != 'Y' ? 'Y':'N'},
                dataType: 'json',
                success: function(res){
                    console.log(res)
                    if(res.success){
                        swal("Okey", "Delete data success", "success")
                        window.location.reload()
                    }else{
                        swal("Oops", "Insert data failed", "error")
                    }
                },
                error: function(err){
                    console.log(err.responseJSON)
                    swal("Oops", "Insert data failed", "error")
                }
            })
        });
    })

    $('body').on('click', 'button.bt-cancel', function(e){
        e.preventDefault()
        initDeafult()
    })

    $('#bt-save-option').on('click', function(e){
        e.preventDefault()
        const names = []
        const values = []
        $('.field-add').each(function(){
            names.push($(this).attr("name"))
            values.push($(this).val())
        })
        console.log(_.object(names, values))
        $.ajax({
            headers: {'x-csrf-token': $('[name=_csrf]').val()},
            method: 'POST',
            url: "/setting/sys-options",
            data: _.object(names, values),
            dataType: 'json',
            success: function(res){
                console.log(res)
                if(res.success){
                    swal({
                        title: "Okey!",
                        text: "Insert data success, are you finish insert data ?",
                        type: "success",
                        showCancelButton: true,
                        confirmButtonClass: "btn-warning",
                        confirmButtonText: "Yes",
                        closeOnConfirm: false
                    },
                    function(){
                        window.location.reload()
                    });
                }else{
                    swal("Oops", "Insert data failed", "error")
                }
            },
            error: function(err){
                console.log(err.responseJSON)
                swal("Oops", "Insert data failed", "error")
            }
        })
    })

    $("body").on('click', 'button.bt-update', function(e){
        e.preventDefault()
        var id = $(this).data('id')
        const names = []
        const values = []
        $('.field-upd').each(function(){
            names.push($(this).attr("name"))
            values.push($(this).val())
        })
        $.ajax({
            headers: {'x-csrf-token': $('[name=_csrf]').val()},
            method: 'POST',
            url: "/setting/sys-options/"+id+"/update",
            data: _.object(names, values),
            dataType: 'json',
            success: function(res){
                console.log(res)
                if(res.success){
                    swal("Okey!", "Update data success", "success")
                    window.location.reload()
                }else{
                    swal("Oops!", "Update data failed", "error")
                }
            },
            error: function(err){
                console.log(err.responseJSON)
                swal("Oops", "Update data failed", "error")
            }
        })
    })

    $('body').on('click', 'a.btn-pagging', function(e){
        e.preventDefault()
        var page = $(this).data('page')
        var url = window.location.pathname+'/list?page='+page
        // swal(window.location.pathname+'/list?page='+page)
        $.get(url, function(data){
            $('div#list-content').children().remove()
            $('div#list-content').append(data)
        })
    })
})