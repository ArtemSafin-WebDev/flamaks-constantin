"use strict";


const modalMenu = fnPlugin.modal( '#modal-menu',{
    animationIn: '_anim-in',
    animationOut: '_anim-out',
    animationDuration: 710,
    offset: 0,
    beforeClose: funcModalMenuBeforeClose,
    afterClose: null,
    beforeOpen:  funcModalMenuBeforeOpen,
    afterOpen:null,
    beforeDestruct: null,
    afterDestruct: null,
    classNames: ['light-menu-modal'],
});


function inputSearchHandler(evt) {
    const evtTarget = evt.target;
    const modalOuter = evtTarget.closest('.page-modal-outer');

    const inputSearchValue = evtTarget.value.trim();
    if(inputSearchValue.length === 0) {
        evtTarget.value = '';
        modalOuter.dataset.searchStatus = 'search-focus';
        return false;
    }
    modalOuter.dataset.searchStatus = 'search-live';

}

function  inputSearchBlurHandler(evt) {
    const evtTarget = evt.target;
    const modalOuter = evtTarget.closest('.page-modal-outer');
    const inputSearchValue = evtTarget.value.trim();
    if(inputSearchValue.length === 0) {
        evtTarget.value = '';
        modalOuter.dataset.searchStatus = '';
        return false;
    }
    modalOuter.dataset.searchStatus = 'search-live';
}

function  funcModalMenuBeforeOpen () {
    const setTimeAnimatedOpen = setTimeout(function () {
        modalMenu.modalElement.classList.add('modal-custom-animated');
        clearTimeout(setTimeAnimatedOpen);
    }, 20);

    const modalSearchInput = document.querySelector('.page-modal-header .search-input');
    modalSearchInput.addEventListener('change', inputSearchHandler);
    modalSearchInput.addEventListener('input', inputSearchHandler);
    modalSearchInput.addEventListener('focus', inputSearchHandler);
    modalSearchInput.addEventListener('blur', inputSearchBlurHandler);
}

function  funcModalMenuBeforeClose () {
    const modalSearchInput = document.querySelector('.page-modal-header .search-input');
    modalSearchInput.removeEventListener('change', inputSearchHandler);
    modalSearchInput.removeEventListener('input', inputSearchHandler);
    modalSearchInput.removeEventListener('focus', inputSearchHandler);
    modalSearchInput.removeEventListener('blur', inputSearchBlurHandler);
    modalSearchInput.value = '';
    modalSearchInput.closest('.page-modal-outer').removeAttribute("data-search-status");

    modalMenu.modalElement.classList.remove('modal-custom-animated');
}


function funcModalCalcBeforeClose() {
    modalCalc.modalElement.classList.remove('modal-custom-animated');
}

function funcModalCalcBeforeOpen() {
    const setTimeAnimatedOpen = setTimeout(function () {
        modalCalc.modalElement.classList.add('modal-custom-animated');
        clearTimeout(setTimeAnimatedOpen);
    }, 20);
}

const modalCalc = fnPlugin.modal( '#modal-calc',{
    animationIn: '_anim-in',
    animationOut: '_anim-out',
    animationDuration: 710,
    offset: 0,
    beforeClose: funcModalCalcBeforeClose,
    afterClose: null,
    beforeOpen: funcModalCalcBeforeOpen,
    afterOpen: null,
    beforeDestruct: null,
    afterDestruct: null,
    classNames: ['light-calc-modal'],
});



const modalComment = fnPlugin.modal( '#modal-comment',{
    animationIn: '_anim-in',
    animationOut: '_anim-out',
    animationDuration: 710,
    offset: 0,
    beforeClose: funcModalCommentBeforeClose,
    afterClose: null,
    beforeOpen: funcModalCommentBeforeOpen,
    afterOpen: null,
    beforeDestruct: null,
    afterDestruct: null,
    classNames: ['light-comment-modal'],
});

function funcModalCommentBeforeClose() {
    modalComment.modalElement.classList.remove('modal-custom-animated');
}

function funcModalCommentBeforeOpen() {
    const setTimeAnimatedOpen = setTimeout(function () {
        modalComment.modalElement.classList.add('modal-custom-animated');
        clearTimeout(setTimeAnimatedOpen);
    }, 20);
}



const modalSuccess = fnPlugin.modal( '#modal-success',{
    animationIn: '_anim-in',
    animationOut: '_anim-out',
    animationDuration: 710,
    offset: 0,
    beforeClose: funcModalSuccessBeforeClose,
    afterClose: null,
    beforeOpen: funcModalSuccessBeforeOpen,
    afterOpen: null,
    beforeDestruct: null,
    afterDestruct: null,
    classNames: ['light-success-modal'],
});



function funcModalSuccessBeforeClose() {
    modalSuccess.modalElement.classList.remove('modal-custom-animated');
}

function funcModalSuccessBeforeOpen() {
    const setTimeAnimatedOpen = setTimeout(function () {
        modalSuccess.modalElement.classList.add('modal-custom-animated');
        clearTimeout(setTimeAnimatedOpen);
    }, 20);
}

function switchModal(modalAction) {
    switch (modalAction) {
        case 'open-menu':
            modalMenu.open();
            break
        case 'open-calc':
            modalCalc.open();
            break
        case 'open-comment':
            modalComment.open();
            break
    }
}



document.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    const btnOpenModal = evtTarget.closest('.btn-open-modal');

    if (btnOpenModal === null) return false;

    const modalAction = btnOpenModal.dataset.action;
    if (modalAction === undefined || modalAction === '') return false;

    const openModals = document.querySelectorAll('.light-modal-open');

    if (openModals.length) {
        openModals.forEach(function (item) {
            item.modal.close();
        });
        const setTime = setTimeout(function () {
            switchModal(modalAction);
            clearTimeout(setTime);
        }, 720);
    } else {
        switchModal(modalAction);
    }

});












