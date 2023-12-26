$(document).ready(function () {

    $('#req-list').addClass('nowrap').dataTable({
        responsive: true,
        columnDefs: [{
            targets: [-1, -3],
            className: 'dt-body-right'
        }]
    });
});


/**
 * ==============================================================================+
 *                                                                               |
 *                  Callback / Function Bussiness Logic                          |
 *                                                                               |
 * ==============================================================================+
 */
function do_action_save() {
    var nama_lengkap = $('#nama_lengkap').val();
    var alamat = $('#alamat').val();
    var kelas = $('#kelas').val();

    //console.log(nama_lengkap, alamat, kelas);

    $("form[name='frm-biodata']").validate({
        rules: {
            nama_lengkap: "required",
            alamat: "required",
            kelas: "required"
        },
        messages: {
            nama_lengkap: "nama lengkap tidak boleh kosong",
            alamat: "alamat tidak boleh kosong",
            kelas: "kelas tidak boleh kosong"
        },
        submitHandler: function (form) {
            const csrfToken = $('meta[name="csrf-token"]').attr('content');
            var nama_lengkap = $('#nama_lengkap').val();
            var alamat = $('#alamat').val();
            var kelas = $('#kelas').val();

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                url: "/do_action_save",
                dataType: 'json',
                cache: false,
                type: 'POST',
                data: {
                    "_token": csrfToken,
                    nama_lengkap: nama_lengkap,
                    alamat: alamat,
                    kelas: kelas
                },
                success: function (data) {
                    //console.log(data)

                    if (data.code === 200) {
                        Swal.fire({
                            title: "Success",
                            text: data.msg,
                            icon: "success",
                            confirmButtonText: "Ok"
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.reload();
                            } else {
                                result.dismiss;
                            }
                        });
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: data.msg,
                            showConfirmButton: false,
                            timer: 10000
                        });
                        window.location.reload();
                    }
                }
            });
        }
    });

}

function call_view_edit_bio(id) {
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    var id_bio = id;
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': csrfToken
        },
        url: "/do_get_by/" + id_bio,
        dataType: 'json',
        cache: false,
        type: 'GET',
        data: {
            "_token": csrfToken,
            id: id
        },
        success: function (data) {
            $('#defaultModal').modal('show');
            $('#id_bio1').val(data.data.id_bio);
            $('#nama_lengkap1').val(data.data.nama_lengkap);
            $('#alamat1').val(data.data.alamat);
            $('#kelas1').val(data.data.kelas);
        }
    });
}


function update_bio() {
    $("form[name='frm-edit-bio']").validate({
        rules: {
            nama_lengkap1: "required",
            alamat1: "required",
            kelas1: "required"
        },
        messages: {
            nama_lengkap1: "Nama Lengkap tidak boleh kosong",
            alamat1: "Alamat tidak boleh kosong",
            kelas1: "Kelas tidak boleh kosong"
        },
        submitHandler: function (form) {
            Swal.fire({
                title: "Update this data.?",
                icon: 'question',
                text: "Are you sure.!",
                showCancelButton: !0,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: "Yes, updated.!",
                cancelButtonText: "No, cancel.!",
                reverseButtons: !0
            }).then(function (e) {

                if (e.value === true) {
                    const csrfToken = $('meta[name="csrf-token"]').attr('content');
                    var id_bio = $('#id_bio1').val();
                    var nama_lengkap = $('#nama_lengkap1').val();
                    var alamat = $('#alamat1').val();
                    var kelas = $('#kelas1').val();
                    $.ajax({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        },
                        url: "/do_update_bio",
                        dataType: 'json',
                        cache: false,
                        type: 'PUT',
                        data: {
                            "_token": csrfToken,
                            nama_lengkap: nama_lengkap,
                            alamat: alamat,
                            kelas: kelas,
                            id_bio: id_bio
                        },
                        success: function (data) {

                            if (data.code === 200) {
                                Swal.fire({
                                    title: "Success",
                                    text: data.msg,
                                    icon: "success",
                                    confirmButtonText: "Ok"
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                        window.location.reload();
                                    } else {
                                        result.dismiss;
                                    }
                                });
                            } else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: data.msg,
                                    showConfirmButton: false,
                                    timer: 10000
                                });
                                window.location.reload();
                            }
                        }
                    });
                } else {
                    e.dismiss;
                }

            });
        }
    });
}



function deltask(id) {
    Swal.fire({
        title: "Delete.?",
        icon: 'error',
        text: "Are you sure.!",
        showCancelButton: !0,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: "Yes, deleted.!",
        cancelButtonText: "No, cancel.!",
        reverseButtons: !0
    }).then(function (e) {

        if (e.value === true) {
            const csrfToken = $('meta[name="csrf-token"]').attr('content');
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                },
                url: "/do_delete" + '/' + id,
                dataType: 'json',
                type: "DELETE",
                data: {
                    "_token": csrfToken
                },
                success: function (data) {

                    if (data.code === 200) {
                        Swal.fire({
                            title: "Success",
                            text: data.msg,
                            icon: "success",
                            confirmButtonText: "Ok"
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.reload();
                            } else {
                                result.dismiss;
                            }
                        });
                    } else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: data.msg,
                            showConfirmButton: false,
                            timer: 10000
                        });
                        window.location.reload();
                    }
                }
            });

        } else {
            e.dismiss;
        }

    });

}