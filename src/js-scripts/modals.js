"use strict";


const modalMenu = fnPlugin.modal( '#modal-menu',{
    animationIn: 'modal-menu-animation-in',
    animationOut: 'modal-menu-animation-out',
    animationDuration: 200,
    offset: 0,
    beforeClose: funcModalMenuBeforeClose,
    afterClose: null,
    beforeOpen: null,
    afterOpen: funcModalMenuAfterOpen,
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

function  funcModalMenuAfterOpen (evt) {
    const modalSearchInput = document.querySelector('.page-modal-header .search-input');
    modalSearchInput.addEventListener('change', inputSearchHandler);
    modalSearchInput.addEventListener('input', inputSearchHandler);
    modalSearchInput.addEventListener('focus', inputSearchHandler);
    modalSearchInput.addEventListener('blur', inputSearchBlurHandler);
}

function  funcModalMenuBeforeClose (evt) {
    const modalSearchInput = document.querySelector('.page-modal-header .search-input');
    modalSearchInput.removeEventListener('change', inputSearchHandler);
    modalSearchInput.removeEventListener('input', inputSearchHandler);
    modalSearchInput.removeEventListener('focus', inputSearchHandler);
    modalSearchInput.removeEventListener('blur', inputSearchBlurHandler);
    modalSearchInput.value = '';
    modalSearchInput.closest('.page-modal-outer').removeAttribute("data-search-status");
}



document.addEventListener('click', function (evt) {
    const evtTarget = evt.target;
    const btnOpenModal = evtTarget.closest('.btn-open-modal');

    if (btnOpenModal === null) return false;

    const modalAction = btnOpenModal.dataset.action;
    if (modalAction === undefined || modalAction === '') return false;

    switch (modalAction) {
        case 'open-menu':
            modalMenu.open();
    }
});













// data-modal-id="#modal-page-comment-outer"


/*

const $btnOrder = document.getElementById('btn-order');
$btnOrder.addEventListener('click',  function (evt) {
    modal.open();
}, false);

const modalText = $.modal('#myModalText');

const $btnMore = document.getElementById('btn-more');
$btnMore.addEventListener('click', () => {
    modalText.open();
});
*/