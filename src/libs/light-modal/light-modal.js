"use strict";

const fnPlugin = {};
window.fnPlugin = fnPlugin;

fnPlugin.modal = function (selector, options = {}) {

    const DEFAULT_OPTIONS = {
        closableOverlay: true,
        hotESC: true,
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        animationDuration: 300,
        offset: 20,
        beforeClose: null,
        afterClose: null,
        beforeOpen: null,
        afterOpen: null,
        beforeDestruct: null,
        afterDestruct: null,
        classNames: [],
    }
    options = Object.assign(DEFAULT_OPTIONS, options);

    const OVERLAY_ANIMATION_IN = 'fadeIn';
    const OVERLAY_ANIMATION_OUT = 'fadeOut';
    let destructed = false;

    const $modalBlock = document.querySelector(selector);
    const $modal = _createModal();
    const $modalOverlay = $modal.querySelector('.light-modal-overlay');

    $modal.options = options;
    
    document.body.append($modal);

    Object.defineProperties(options, {
        'selfDOM': {
            value: $modal,
            enumerable: true,
        },
        'overlayDOM': {
            value: $modalOverlay,
            enumerable: true,
        },
        'modalDOM': {
            value: $modalBlock,
            enumerable: true
        },
        'currentScrollTop': {
            value:0,
            enumerable:true,
            writable: true,
        },
    });

    function _createModal() {
        const $wrap = document.createElement('div');
        $wrap.classList.add('light-modal-outer', ...options.classNames);
        $wrap.innerHTML = `<div class="light-modal-overlay animated" ${options.closableOverlay ? 'data-closable="true"' : ''} style="-webkit-animation-duration: ${options.animationDuration}ms;, animation-duration: ${options.animationDuration}ms;"></div>`;
        $modalBlock.classList.add('light-modal', 'animated');
        $modalBlock.style.animationDuration = options.animationDuration + 'ms';
        $wrap.append($modalBlock);
        return $wrap;
    }

    function _listenerESC(evt) {
        if (evt.code === 'Escape') {
            modal.close();
        }
    }

    function _listenerClose(evt) {
        const evtTarget = evt.target;
        if(evtTarget.dataset.closable || evtTarget.closest('[data-closable]') ) {
            modal.close();
        }
    }

    function _getDocumentHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        )
    }

    function _getWindowScrollTop() {
        return window.pageYOffset;
    }

    function _setModalOuterPosition() {
        $modal.style.top = window.pageYOffset + 'px';
    }

    function _setModalInnerPosition() {
        const modalHeight = Math.floor($modal.clientHeight);
        const modalBlockHeight = Math.floor($modalBlock.clientHeight);
        const extraTop = options.offset;

        if (modalBlockHeight + extraTop >= modalHeight) {
            $modalBlock.style.top = extraTop + 'px';
        } else {
            $modalBlock.style.top = Math.ceil(modalHeight / 2 - modalBlockHeight / 2) + 'px';
        }
    }

    function _getScrollWidth() {
        const $div = document.createElement('div');

        $div.style.cssText = `
        width: 80px;
        height: 80px;
        position: fixed; 
        top: -100px;
        left: -100px;
        box-sizing: border-box;
        overflow:scroll;
        z-index:99;
        `;

        document.body.insertAdjacentElement('beforeend', $div);
        const scrollWidth = $div.offsetWidth - $div.clientWidth;
        $div.remove();
        return  scrollWidth;
    }


    function _isDocumentScroll() {
        return window.innerWidth > document.documentElement.clientWidth;
    }

    function _disallowScrollDocument() {
        if (_isDocumentScroll()) {
            document.documentElement.style.paddingRight = _getScrollWidth() + 'px';
        }
        options.currentScrollTop = _getWindowScrollTop();
        _setAttrWindowScrollTop(options.currentScrollTop);

        document.documentElement.classList.add('document-no-scroll');
        document.documentElement.style.top = `-${options.currentScrollTop}px`;
    }

    function _allowScrollDocument() {
        document.documentElement.style.paddingRight = '';
        document.documentElement.classList.remove('document-no-scroll');
        document.documentElement.style.top = '';
        window.scrollBy(0, options.currentScrollTop );
        options.currentScrollTop = 0;
        _setAttrWindowScrollTop('');

    }

    function _isFunciton(obj) {
        return typeof(obj) === 'function';
    }

    function _setAttrWindowScrollTop(value) {
        document.documentElement.dataset.scrollTop = value;
    }

    function open() {
        if (!destructed) {
            if ( _isFunciton(options.beforeOpen)) options.beforeOpen();

            _setModalOuterPosition();

            _disallowScrollDocument();
            $modal.classList.add('light-modal-open');
            _setModalInnerPosition();
            $modalBlock.classList.add(options.animationIn);
            $modalOverlay.classList.add(OVERLAY_ANIMATION_IN);

            const animationTimeout = setTimeout(() => {
                $modalBlock.classList.remove(options.animationIn);
                $modalOverlay.classList.remove(OVERLAY_ANIMATION_IN);
                if (_isFunciton(options.afterOpen)) options.afterOpen();
                clearTimeout(animationTimeout)
            }, options.animationDuration);


            if (options.hotESC) {
                document.addEventListener('keydown', _listenerESC);
            }
            $modal.addEventListener('click', _listenerClose);
        }
    }

    function close() {
        if (!destructed) {
            if (_isFunciton(options.beforeClose)) options.beforeClose();

            document.removeEventListener('keydown', _listenerESC);
            $modal.removeEventListener('click', _listenerClose);
            $modalBlock.classList.add(options.animationOut);
            $modalOverlay.classList.add(OVERLAY_ANIMATION_OUT);

            const animationTimeout = setTimeout(() => {
                _allowScrollDocument();
                $modal.scrollTo(0, 0);
                $modal.classList.remove('light-modal-open');
                $modalBlock.classList.remove(options.animationOut)
                $modalOverlay.classList.remove(OVERLAY_ANIMATION_OUT);

                if (_isFunciton(options.afterClose)) options.afterClose();
                clearTimeout(animationTimeout);
            }, options.animationDuration)
        }
    }

    function destruct() {
        if (_isFunciton(options.beforeDestruct)) options.beforeDestruct();
        document.removeEventListener('keydown', _listenerEsc);
        $modal.removeEventListener('click', _listenerClose );
        $modal.remove();
        destructed = true;
        _allowScrollDocument();
        _setAttrWindowScrollTop('');

        if (_isFunciton(options.afterDestruct)) options.afterDestruct();
    }



    const modal = {
        open,
        close,
        destruct,
    };

    $modal.modal = modal;
    return modal;
}







