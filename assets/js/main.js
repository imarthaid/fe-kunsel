$(document).ready(function() {

    $(".alert-success").fadeTo(2000, 500).slideUp(500, function() {
         $(".alert-success").slideUp(500);
     });

    if(document.querySelector('.js-example-basic-single')){
        handleSelect2();
    }
    function handleSelect2(){
        $('.js-example-basic-single').select2();
    }

    /* ---------- CONFIRM MODAL ---------- */
    if(document.querySelector('.modal-confirm')){
        modalConfirm()
    }
    function modalConfirm(){
        let modalBtn = document.querySelectorAll('.btn-confirm-modal');
        let close = document.querySelectorAll('.btn-confirm-close');
        for( let i = 0; i < modalBtn.length; i++){
            let modal = document.getElementById(modalBtn[i].dataset.content)
            let inputId = modal.querySelector('.id-data');
            modalBtn[i].addEventListener('click', function(){
                if(document.body.contains(inputId)){
                    let idData = modalBtn[i].dataset.kode;
                    inputId.value = idData
                }
                modal.classList.add('show')
            })
        }

        for( let j = 0; j < close.length; j++){
            let target = document.getElementById(close[j].dataset.close)
            close[j].addEventListener('click', function(e){
                e.preventDefault()
                target.classList.remove('show')
            })
        }

    }



    /* ---------- ACTIVE MENU SIDEBAR ---------- */
    if(document.getElementById('sidebar')){
        handleActiveMenu();
    }
    function handleActiveMenu(){
        let sidebar = document.getElementById('sidebar');
        let linkNav = sidebar.getElementsByClassName('nav-link');
        let currentLocation = location.href;
        for( let i = 0; i < linkNav.length; i++){
            if(linkNav[i].href === currentLocation){
                linkNav[i].classList.add('active-link')
            }
        }
    }

    function showBox(el){
        el.classList.add('show-box');
    }

    function hideBox(el){
        el.classList.remove('show-box');
    }

    /* ---------- MODAL BOX ---------- */
    if(document.querySelector('.box-add')){
        handleModalBox();
    }
    function handleModalBox(){
        let boxAdd = document.querySelector('.box-add');
        let firstInput = boxAdd.querySelector('input');
        document.getElementById('btn-box').addEventListener('click', function(){
            showBox(document.querySelector('.box-add'));
            if(firstInput.dataset.focus !== 'false'){
                firstInput.focus();
            }

        })
        document.getElementById('min-box').addEventListener('click', function(){
            hideBox(document.querySelector('.box-add'));
        })
        document.getElementById('close-box').addEventListener('click', function(){
            hideBox(document.querySelector('.box-add'));
        })

        let pageContent = document.getElementsByClassName('main-content');

        pageContent[0].addEventListener('click', function(event) {
            if(event.target.id === 'btn-box'){
                showBox(document.querySelector('.box-add'));
            } else {
                var isClickInside = boxAdd.contains(event.target);
                if (!isClickInside) {
                    hideBox(document.querySelector('.box-add'));
                }
            }

        });
    }



     /* ---------- CLIENT-SIDE VALIDATION ---------- */
    var dataVal = document.querySelectorAll('[data-validation]');
    var btnSubmit = document.querySelector('.btn-validation');
    for( let i = 0; i < dataVal.length; i++){
        btnSubmit.addEventListener('click', (e) =>{
            if(checkValidation(dataVal[i]) === false ){
                e.preventDefault();
            }

        })
    }

    function checkValidation(data){
        var validation = false;
        if(data.dataset.validation === 'email'){
            if(data.value === ''){
                setError(data, 'Inputan tidak boleh kosong')
                validation = false;
            } else if (!isEmail(data.value.trim())) {
                setError(data, 'Email yang di input tidak valid')
                validation = false;
            } else {
                setSuccess(data);
                validation = true;
            }
        }

        if(data.dataset.input === 'login' && data.dataset.validation === 'email'){

            if(data.value === ''){
                setError(data.parentElement, 'Inputan tidak boleh kosong')
                data.parentElement.style.border = '1px solid #e74c3c'
                inputGroup = data.parentElement;
                inputGroup.querySelector('i').style.color = '#e74c3c'
                validation = false;
            } else if (!isEmail(data.value.trim())) {
                setError(data.parentElement, 'Email yang di input tidak valid')
                data.parentElement.style.border = '1px solid #e74c3c'
                inputGroup = data.parentElement;
                inputGroup.querySelector('i').style.color = '#e74c3c'
                validation = false;
            } else {
                setSuccess(data.parentElement);
                data.parentElement.style.border = '1px solid #2ecc71'
                inputGroup = data.parentElement;
                inputGroup.querySelector('i').style.color = '#2ecc71'
                validation = true;
            }
        }

        if(data.dataset.input === 'login' && data.dataset.validation === 'required'){
            if(data.value === ''){
                setError(data.parentElement, 'Inputan tidak boleh kosong')
                data.parentElement.style.border = '1px solid #e74c3c'
                inputGroup = data.parentElement;
                inputGroup.querySelector('i').style.color = '#e74c3c'
                validation = false;
            } else {
                setSuccess(data.parentElement);
                data.parentElement.style.border = '1px solid #2ecc71'
                inputGroup = data.parentElement;
                inputGroup.querySelector('i').style.color = '#2ecc71'
                validation = true;
            }
        }

        if(data.dataset.validation === 'required' && !data.dataset.input){
            if(data.value === ''){
                setError(data, 'Inputan tidak boleh kosong!');
                validation = false;
            } else {
                setSuccess(data)
                validation = true;
            }
        }

        if(data.dataset.validation === 'file'){
            let validExtention = data.dataset.valid.split('-')
            let extentionFile = data.value.replace(/^C:\\fakepath\\/i, '')
            extentionFile = extentionFile.split('.').pop();
            if(data.value === ''){
                setError(data.parentElement, 'Inputan tidak boleh kosong!')
                validation = false;
            } else if(isFile(extentionFile, validExtention) === false){
                setError(data.parentElement, 'Format file tidak valid');
                validation = false;
            }
            else {
                validation = true;
            }
        }

        return validation
    }

    function setError(input, message){
        let formGroup = input.parentElement;
        let small = formGroup.querySelector('small')
        small.classList.remove('v-hidden')
        small.classList.add('v-visible')
        small.innerText = message
    }

    function setSuccess(input){
        let formGroup = input.parentElement;
        let small = formGroup.querySelector('small')
        small.classList.remove('v-visible')
        small.classList.add('v-hidden')
    }

    function isFile(input, message){
        let formGroup = input.parentElement;
        let small = formGroup.querySelector('small')
        small.classList.remove('v-hidden')
        small.classList.add('v-visible')
        small.innerText = message
    }

    function isEmail(email){
        let cek = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
        return cek;
    }

    function isFile(extentionFile, validExtention){
        var result = validExtention.includes(extentionFile);
        if(result === false){
            return false
        } else {
            return true
        }
    }


});
