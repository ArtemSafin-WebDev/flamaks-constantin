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













function fixVhBug() {
    let styleTag;
    const cssVh = document.getElementById('cssVh');
    if (cssVh === null) {
        styleTag = document.createElement('style');
        styleTag.id = 'cssVh';
    } else {
        styleTag = cssVh;
    }
    let windowInnerHeight;

    windowInnerHeight = window.innerHeight;
    const vh = windowInnerHeight / 100;
    styleTag.innerText = `:root {--vh: ${vh}px; --vh100: ${windowInnerHeight}px`;
    document.querySelector('head').appendChild(styleTag);
}


const numToStr = function (num) {
    if ( num <= 9 && num !== 0) {
        return `0${num}`;
    }
    return num;
}
const doPageMainSlider = function(selector) {
    const $pageMainSlider = $(selector);
    if ($pageMainSlider.length === 0) return false;
    const sliderOptions = {
        dots: true,
        arrows: true,
        infinite: true,
        draggable: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed:4000,
        pauseOnHover:false,
        pauseOnFocus:false,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 501,
                settings: {
                    arrows: false,
                    dots: true,
                }
            },
        ]
    };

    const sliderImagesOptions = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: false,
        pauseOnHover:false,
        pauseOnFocus:false,
        lazyLoad: 'ondemand',
    };



    $pageMainSlider.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');
        const countSlides = $slider.find('.slide-item').length;

        const $sliderCurrentPage = $sliderWrap.find('.slider-current-page');
        const $sliderAllPage = $sliderWrap.find('.slider-all-page');

        const $mainSliderImages = $sliderWrap.find('.main-slider-images').eq(0);
        $mainSliderImages.slick(sliderImagesOptions);


        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
            asNavFor: $mainSliderImages,
        });

        $sliderCurrentPage.html( numToStr(1) );
        $sliderAllPage.html( numToStr(countSlides) );
        $slider.slick(newOptions);

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            // $mainSliderImagesSlides.removeClass('slide-active');
            // $mainSliderImagesSlides.eq(nextSlide).addClass('slide-active');
            $sliderCurrentPage.html( numToStr(nextSlide + 1) );
        });

    });
};

const doNewsMainSlider = function () {

    const $newsMainSliders =  $('.news-main-slider');;
    if ($newsMainSliders.length === 0) return false;

    const sliderOptions = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed:5000,
        pauseOnHover:false,
        pauseOnFocus:false,
        lazyLoad: 'ondemand',
    };

    $newsMainSliders.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');
        const countSlides = $slider.find('.slide-item').length;

        const $sliderCurrentPage = $sliderWrap.find('.slider-counter-current');
        const $sliderAllPage = $sliderWrap.find('.slider-counter-all');

        const $mainSliderImages = $sliderWrap.find('.main-slider-images');
        const $mainSliderImagesSlides = $mainSliderImages.find('.main-slider-images-item');
        $mainSliderImagesSlides.eq(0).addClass('slide-active');


        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });

        $sliderCurrentPage.html(1);
        $sliderAllPage.html( countSlides);
        $slider.slick(newOptions);

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $mainSliderImagesSlides.removeClass('slide-active');
            $mainSliderImagesSlides.eq(nextSlide).addClass('slide-active');
            $sliderCurrentPage.html( nextSlide + 1);
        });

    });

}

const doSideBlockSlider = function () {
    const $sideBlockSliders = $('.side-block-slider');

    if ($sideBlockSliders.length === 0) return false;

    const sliderOptions = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 450,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: false,
        autoplaySpeed:4000,
        pauseOnHover:true,
        pauseOnFocus:true,
        lazyLoad: 'ondemand',
    };

    $sideBlockSliders.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');

        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });
        $slider.slick(newOptions);
    });
}

const doNewsColumnsSlider = function () {
    const $newsColumnsSlider = $('.news-columns-slider');

    if ($newsColumnsSlider.length === 0) return false;

    const sliderOptions = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 450,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: false,
        autoplaySpeed:4000,
        pauseOnHover:true,
        pauseOnFocus:true,
        lazyLoad: 'ondemand',
    };

    $newsColumnsSlider.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');

        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });
        $slider.slick(newOptions);
    });
}

const doProjectSizesSlider = function () {
    const projectSizesSlider = $('.project-sizes-slider');

    if (projectSizesSlider.length === 0) return false;
    const sliderOptions = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        autoplay: false,
        pauseOnHover:true,
        pauseOnFocus:true,
        lazyLoad: 'ondemand',
        variableWidth: true,
        focusOnSelect: true
    };

    projectSizesSlider.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');
        const $previewBox = $sliderWrap.find('.project-sizes-preview-box').eq(0);

        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });
        $slider.slick(newOptions);


        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $previewBox
                .find('.project-sizes-preview-item')
                .removeClass('active')
                .eq(nextSlide)
                .addClass('active');


        });


    });
}


const doAccordionApp = function () {
    const $appAccordion = $('.app-accordion');
    if ($appAccordion.length) {

        $appAccordion.each(function (idx, item) {
            const timeDuration = 600;
            const $accordion = $(item);
            const $accordionItems = $accordion.find('.app-accordion-item');

            $accordion.on('click', '.app-accordion-head', function (evt) {
                const $thisItem = $(this).closest('.app-accordion-item');
                $accordionItems.not($thisItem)
                    .removeClass('accordion-section-active')
                    .find('.app-accordion-body').stop().slideUp(timeDuration);

                if ($thisItem.hasClass('accordion-section-active')) {
                    $thisItem.removeClass('accordion-section-active');
                    $thisItem.find('.app-accordion-body').stop().slideUp(timeDuration);
                } else {
                    $thisItem.addClass('accordion-section-active');
                    $thisItem.find('.app-accordion-body').stop().slideDown(timeDuration);
                }
            })
        })
    }
};

const doTechSlider = function () {
    const $techSlider = $('.tech-slider');

    function fireTechSlider($thisTab, $techSliderTabs, $slider) {

        if (($slider).hasClass('tech-animated')) return false;
        if ( $thisTab.hasClass('tech-slider-tab-active') ) return false;

        $techSliderTabs.removeClass('tech-slider-tab-active');
        $thisTab.addClass('tech-slider-tab-active');

        const $techSliderMediaCover = $slider.find('.tech-slider-media .tech-slider-media-cover');
        const width = $techSliderMediaCover.width();

        const $techSectionTitle =  $slider.find('.tech-slider-media  .tech-section-title');
        const $techSectionDescriptionContent =  $slider.find('.tech-slider-media  .tech-section-description');

        /* получить контент таба */

        const imgHtml = $thisTab.find('.tech-slider-tab-img-container').html();
        const titleHtml = $thisTab.find('.tech-slider-tab-title').html();
        const descHtml = $thisTab.find('.tech-slider-tab-description').html();

        /*подготовить контент для вывода*/

        const prepImg = `
                <div class="tech-section-cover-frame new">
                    <div class="tech-section-cover-frame-wrap " style="width:${width}px">
                      ${imgHtml}
                    </div>
                </div>
            `;

        const prepTitle = `
                <div class="tech-section-title-content new">
                    ${titleHtml}
                </div>
            `;
        const prepDesc = `
                <div class="tech-section-description-content new u-text-t2">
                    ${descHtml}
                </div>
            `;

        $techSliderMediaCover.append(prepImg);
        $techSectionTitle.append(prepTitle);
        $techSectionDescriptionContent.append(prepDesc);

        const setTimeDelayStart = setTimeout(function () {
            $slider
                .addClass('tech-animated')
                .addClass('tech-animated-start');
            const setTimeDelayEnd = setTimeout(function () {
                $slider
                    .removeClass('tech-animated-start')
                    .addClass('tech-animated-end');

                const setTimeDelayFinish = setTimeout(function () {

                    $slider.find(`
                    .tech-section-title-content:not(.new), 
                    .tech-section-description-content:not(.new), 
                    .tech-section-cover-frame:not(.new)`).remove();

                    $slider.find(`
                    .tech-section-title-content, 
                    .tech-section-description-content,  
                    .tech-section-cover-frame`).removeClass('new');

                    $slider
                        .removeClass('tech-animated-end')
                        .removeClass('tech-animated');

                    clearTimeout(setTimeDelayStart);
                    clearTimeout(setTimeDelayEnd);
                    clearTimeout(setTimeDelayFinish);
                }, 450)
            }, 450)
        }, 20);


    }

    function fireTechAccordion($thisTab, $techSliderTabs) {
        $techSliderTabs.not($thisTab)
            .removeClass('accordion-active')
            .find('.tech-section-body').stop().slideUp(200);

        if ($thisTab.hasClass('accordion-active')) {
            $thisTab
                .removeClass('accordion-active')
                .find('.tech-section-body').stop().slideUp(200);
        } else {
            $thisTab
                .addClass('accordion-active')
                .find('.tech-section-body').stop().slideDown(200);
        }
    }


    $techSlider.each(function (idx, item) {
        const $slider = $(item);

        const $techSliderTabs = $slider.find('.tech-slider-tab');



        $techSliderTabs.on('click', ' .tech-section-head', function (evt) {
            const $thisTab = $(this).closest('.tech-slider-tab');

            if ($(window).width() > 781) {
                fireTechSlider($thisTab, $techSliderTabs, $slider)
            } else {
                fireTechAccordion($thisTab, $techSliderTabs)
            }

        });
    });
};


const doSliderTrust = function () {
    const $trustSlider = $('.trust-slider');

    const sliderOptions = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        autoplay: false,
        autoplaySpeed:5000,
        pauseOnHover:false,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    $trustSlider.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');

        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });

        $slider.slick(newOptions);
    });
}

const doUserSelect = function (selector) {
    const userSelect = $(selector);
    if (userSelect.length) {
        userSelect.select2({
            minimumResultsForSearch: 2,
        });
    }
}

const doElementFullHeight = function (selector, minMedia = 0) {
    if ($(window).width() < minMedia)  return false;
    const elementFullHeightList = $(selector);
    if (elementFullHeightList.length > 0) {
        const winHeight = $(window).height();
        elementFullHeightList.each(function (idx, item) {
            $(item).height(winHeight);
        })
    }
}


$(document).on('click', '.btn-open-menu', function (evt) {
    $('html')
        .addClass('modal-menu-active')
        .addClass('stop-scroll');
});

$(document).on('click', '.btn-open-search', function (evt) {
    $('html')
        .addClass('modal-search-active')
        .addClass('stop-scroll');
});

$(document).on('click', '.btn-open-modal-form', function (evt) {
    $('html')
        .addClass('modal-form-active')
        .addClass('stop-scroll');
});




$(document).on('click', '.btn-modal-outer-close', function (evt) {
    $('html')
        .removeClass('modal-menu-active')
        .removeClass('modal-search-active')
        .removeClass('modal-form-active')
        .removeClass('stop-scroll');
});



const doTabs = function () {
    const tabWrap = $('.tab-wrap');
    if (tabWrap.length) {

        tabWrap.each(function (idx, item) {
            const $tabWrapper = $(item);
            $tabWrapper.on('click', '.btn-tab', function() {
                const thisBtnTab = $(this);

                const selector = thisBtnTab.attr('data-tab-target');
                const $target = $tabWrapper.find(selector);

                if ($target && $target.length) {
                    $tabWrapper
                        .find('.tab-body-item')
                        .removeClass('tab-active');
                    $target.addClass('tab-active');

                    $tabWrapper
                        .find('.btn-tab')
                        .removeClass('tab-active');

                    thisBtnTab.addClass('tab-active');

                    const $sliders = $tabWrapper.find('.slick-slider');
                    if ($sliders.length) {
                        $sliders.each(function(idx) {
                            let setTime = setTimeout(function () {
                                $sliders.eq(idx).slick('setPosition');
                            }, 30);

                        })
                    }

                    const $videoBoxList = $tabWrapper.find('.video-box');
                    if ($videoBoxList.length) {
                        $videoBoxList.each(function(idx) {
                            stopVideoBox($(this));
                        });
                    }
                }

            });
        });
    }
}

const doAccordionMenu = function () {
    const $mainMenuList = $('.main-menu-list');
    if ($mainMenuList.length === 0)  {
        return 0;
    }
    const $mainMenuItems = $mainMenuList.find('.main-menu-item');

    $mainMenuList.on('click', '.main-menu-item-head', function (evt) {
        if ($(window).width() > 575) {
            return 0;
        }
        evt.preventDefault();
        const $thisMainMenuItem = $(this).closest('.main-menu-item');
        $mainMenuItems.not($thisMainMenuItem)
            .stop()
            .removeClass('menu-accordion-active')
            .find('.main-menu-item-body')
            .stop()
            .slideUp(200);

        if($thisMainMenuItem.hasClass('menu-accordion-active')) {
            $thisMainMenuItem
                .removeClass('menu-accordion-active')
                .find('.main-menu-item-body')
                .stop()
                .slideUp(200)

        } else {
            $thisMainMenuItem
                .addClass('menu-accordion-active')
                .find('.main-menu-item-body')
                .stop()
                .slideDown(200)
        }


    });

}



function initMaskPhoneInputs() {
    const inputPhones = $('input[type="tel"]');

    if(inputPhones.length) {
        inputPhones.mask('+7 000 000 00 00');
        inputPhones.on('focus', function () {
            const $this = $(this);
            if ($this.val().length === 0) {
                $this.val('+7 ');
            }
        });
        inputPhones.on('blur', function () {
            const $this = $(this);
            if ($this.val().length !== 16) {
                $this.val('');
            }
        });
    }
}

function isValid (jqObj) {
    const objects = jqObj.find('.validated-control');
    let mas = [];
    objects.each(function () {
        const $this = $(this);
        if ($this.val().length === 0 || !$this.val().replace(/\s+/g, '')) {
            $this.addClass('invalid');
            mas.push("0");
        } else if (($this.attr('type') === "checkbox") && !$this.prop('checked')) {
            $this.addClass('invalid');
            mas.push("0");
        } else if ($this.attr('type')=== "tel" && $this.val().length !== 16) {
            $this.addClass('invalid');
            mas.push("0");
        }
        else{
            $this.removeClass('invalid');
        }
    });
    return (mas.length === 0);
}

function toggleThemeHeader () {
    const header = document.querySelector('.header-block');
    if (header.classList.contains('not-toggle')) {
        return;
    }
    
    const $header = $('.header-block').eq(0);

    const $mainFirstBlock = $('.main-first-block').eq(0);
    if ($header.length === 0  || $mainFirstBlock === 0 ) return;
    let mainFirstBlockHeight = $mainFirstBlock.height();
    let scrTop = $(window).scrollTop();

    if (scrTop > mainFirstBlockHeight)  {
        $header.addClass('dark');
    } else {
        $header.removeClass('dark');
    }
}

$(window).on('scroll', function () {
    toggleThemeHeader();
});

const doLightGallery = function () {
    const $lgVideoItems = $('.lg-video-item');
    if ($lgVideoItems.length) {
        $lgVideoItems.lightGallery({
            selector: 'this',
        });
    }
}

/**
 *  fix project tile
 *  */

function fixProjectsTileBox($wrap = null) {
    let $projectsTileBox;
    if ($wrap !== null) {
        $projectsTileBox = $wrap.find('.projects-tile-box');
    } else {
        $projectsTileBox = $('.projects-tile-box');
    }
    if ($projectsTileBox.length) {
        $projectsTileBox.each(function () {
            const $box = $(this);
            const $projectsTileUnitHeaderItems = $box.find('.projects-tile-unit-header');
            const headerSizeList = []
            $projectsTileUnitHeaderItems.each(function () {
                const $item = $(this);
                headerSizeList.push($item.height());
            });
            const msxSizeHeight =  Math.max(...headerSizeList);
            $projectsTileUnitHeaderItems.css('min-height', msxSizeHeight + 'px');
        })
    }
}

function doFixProjectsTileBox() {
    fixProjectsTileBox();
    if ($('.project-tab-unit').length) {
        $(document).on('click', '.project-tab-unit', function (evt) {
            const $tabWrap = $(this).closest('.tab-wrap');
            const setTime = setTimeout(function () {
                const $tabBodyActive = $tabWrap.find('.tab-body-item.tab-active');
                fixProjectsTileBox($tabBodyActive);
                clearTimeout(setTime);
            }, 40);
        });
    }
}

function stopVideoBox ($videoBox) {
    $videoBox.find('.video-frame-container').html('');
    $videoBox.removeClass('video-active');
}

function doVideoBox() {
    const $videoBox = $('.video-box');

    if($videoBox.length) {
        $(document).on('click', '.video-box-cover', function (evt) {
            const videoBoxCover = $(this);
            const videoLink = videoBoxCover.attr('data-video');
            const $videoBox = videoBoxCover.closest('.video-box');
            const $videoContainer = $videoBox.find('.video-frame-container');
            $videoBox.addClass('video-active');
            const videoFrame = `
    <iframe width="560" height="315" src="${videoLink}?autoplay=1"  frameborder="0" allow="accelerometer; autoplay;"" allowfullscreen></iframe>
    `;
            $videoContainer.html(videoFrame);
        });
    }

}


function slider() {
    const sliderSection = document.querySelector('.slider-section');
    
    if (sliderSection) {
        const slider = sliderSection.querySelector('.slider')
        const sliderBtns = sliderSection.querySelector('.slider-controls-wrap')
        const prevBtn = sliderBtns.querySelector('.slider-control-prev')
        const nextBtn = sliderBtns.querySelector('.slider-control-next')

        const sliderOptions = {
            dots: false,
            arrows: true,
            infinite: true,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: false,
            autoplay: false,
            pauseOnHover:false,
            pauseOnFocus:false,
            lazyLoad: 'ondemand',
            prevArrow: prevBtn,
            nextArrow: nextBtn
        };
    
        $('.slider').slick(sliderOptions);
    }
}

function setHoverEffect(element, trigger) {
    trigger.addEventListener("mouseenter", () => {
        gsap.to(element, {
            width: '100%',
            duration: 2
        });
    });

    trigger.addEventListener("mouseleave", () => {
        gsap.to(element, {
            width: '0%',
            duration: 2
        });
    });
}

function animateOnHover() {
    const container = document.querySelector('.stages-outer');

    if (container) {
        const line1 = container.querySelector('.d-stages__fill-line_n_1');
        const line2 = container.querySelector('.d-stages__fill-line_n_2');
        const line3 = container.querySelector('.d-stages__fill-line_n_3');
        const line4 = container.querySelector('.d-stages__fill-line_n_4');

        const card1 = container.querySelector('.stage-project-item_n_1');
        const card2 = container.querySelector('.stage-project-item_n_2');
        const card3 = container.querySelector('.stage-project-item_n_3');
        const card4 = container.querySelector('.stage-project-item_n_4');
        
        setHoverEffect(line1, card1)
        setHoverEffect(line2, card2)
        setHoverEffect(line3, card3)
        setHoverEffect(line4, card4)
    }
}


$(document).ready(function () {
    fixVhBug();
    doFixProjectsTileBox();
    // doElementFullHeight('.block-full-height');
    doPageMainSlider('.main-page-slider');
    doAccordionApp();
    doTechSlider();
    doSliderTrust();
    doSideBlockSlider();
    doNewsColumnsSlider();
    doNewsMainSlider();
    doTabs();
    doAccordionMenu();
    doLightGallery();

    doUserSelect('.custom-select');
    initMaskPhoneInputs();
    doVideoBox();
    doProjectSizesSlider();


    slider();
    animateOnHover();
});

$(window).on('resize', function () {
    fixVhBug();
});


/*
* симуляция отправки модальной формы
* */


$(document).ready(function () {
    $(document).on('focus change', 'input, textarea', function(){
        $(this).removeClass('invalid');
    });

    $(document).on('submit', '.send-form', function (evt) {
        evt.preventDefault();
        const $form = $(this);

        if (isValid($form)) {
            if ($form.closest('.light-modal-outer')) {
                $form.trigger('reset');
                const openModals = document.querySelectorAll('.light-modal-open');

                if (openModals.length) {
                    openModals.forEach(function (item) {
                        item.modal.close();
                    });
                    const setTime = setTimeout(function () {
                        modalSuccess.open();
                        clearTimeout(setTime);
                    }, 720);
                } else {
                    modalSuccess.open();
                }
            }
        }
    });
});


// try to define mobile browser
// const ua = window.navigator.userAgent.toLowerCase();
// const isIe = (/trident/gi).test(ua) || (/msie/gi).test(ua);
// const isFirefox = (/firefox/gi).test(ua) || (/firefox/gi).test(ua);




























function scrollVisible(element, options = {
    offsetTop:0,
    offsetBottom:0,
    k:false
}) {
    if (element.length === 0) return false;
    const scrTop = $(window).scrollTop();
    const winHeight = $(window).height();
    const elemOfTop = element.offset().top;
    const elemHeight = element.outerHeight();

    const elemTopBoundary = elemOfTop;
    const elemBottomBoundary = elemHeight + elemOfTop;

    const windowTopBoundary = scrTop;
    const windowBottomBoundary = scrTop + winHeight;

    const windowSpaceTop = winHeight * options.offsetTop;
    const windowSpaceBottom = winHeight * options.offsetBottom;

    let  result = {
        visible: false,
        k:0,
    }

    if ( (windowTopBoundary + windowSpaceTop) < elemBottomBoundary &&
        (windowBottomBoundary - windowSpaceBottom) > elemTopBoundary) {
        result.visible = true;
    }

    if (options.k === false) {
        return result;
    }

    /*calculate k*/
    let  pathTop = elemTopBoundary - winHeight + windowSpaceBottom;
    pathTop = pathTop >= 0 ? pathTop : windowSpaceBottom;
    let  pathEnd = elemBottomBoundary - windowSpaceTop;
    pathEnd = pathEnd >= 0 ? pathEnd: elemBottomBoundary;

    const pathSize = pathEnd - pathTop;
    const difPath = scrTop - pathTop;
    let  k = difPath / (pathSize / 100);

    k = k < 0 ? 0 : k;
    k = k >= 100 ? 100 : k;

    result.k = k.toFixed(2);
    return result;
}







