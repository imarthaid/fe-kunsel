$('#example').DataTable({
    language: {
        "info": "Menampilkan <b class='text-primary'> _START_ </b> sampai <b class='text-primary'> _END_ </b> dari <b class='text-primary'>_TOTAL_</b> Data",
        "lengthMenu" : "Tampilkan _MENU_ Data",
        "search" : "Cari data disini : ",
        paginate: {
          next: '&#8594;', // or '→'
          previous: '&#8592;' // or '←' 
        }
      }
  });