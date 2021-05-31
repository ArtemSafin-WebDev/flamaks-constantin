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
        speed: 300,
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

    $pageMainSlider.each(function (idx, item) {
        const $slider = $(item);
        const $sliderWrap = $slider.closest('.slider-wrap');
        const $prevArrow = $sliderWrap.find('.btn-slider.prev');
        const $nextArrow = $sliderWrap.find('.btn-slider.next');
        const countSlides = $slider.find('.slide-item').length;

        const $sliderCurrentPage = $sliderWrap.find('.slider-current-page');
        const $sliderAllPage = $sliderWrap.find('.slider-all-page');

        const $mainSliderImages = $sliderWrap.find('.main-slider-images');
        const $mainSliderImagesSlides = $mainSliderImages.find('.main-slider-images-item');
        $mainSliderImagesSlides.eq(0).addClass('slide-active');


        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        });

        $sliderCurrentPage.html( numToStr(1) );
        $sliderAllPage.html( numToStr(countSlides) );
        $slider.slick(newOptions);

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $mainSliderImagesSlides.removeClass('slide-active');
            $mainSliderImagesSlides.eq(nextSlide).addClass('slide-active');
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










const doAccordionApp = function () {
    const $appAccordion = $('.app-accordion');
    if ($appAccordion.length) {

        $appAccordion.each(function (idx, item) {
            const $accordion = $(item);

            const $accordionItems = $accordion.find('.app-accordion-item');

            $accordion.on('click', '.app-accordion-head', function (evt) {
                const $thisItem = $(this).closest('.app-accordion-item');
                $accordionItems.not($thisItem)
                    .removeClass('accordion-section-active')
                    .find('.app-accordion-body').stop().slideUp(200);

                if ($thisItem.hasClass('accordion-section-active')) {
                    $thisItem.removeClass('accordion-section-active');
                    $thisItem.find('.app-accordion-body').stop().slideUp(200);
                } else {
                    $thisItem.addClass('accordion-section-active');
                    $thisItem.find('.app-accordion-body').stop().slideDown(200);
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
                }, 400)
            }, 400)
        }, 50);


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
        if ($(window).width > 575) {
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



$(document).ready(function () {
    doPageMainSlider('.main-page-slider');
    doAccordionApp();
    doTechSlider();
    doSliderTrust();
    doSideBlockSlider();
    doNewsColumnsSlider();
    doNewsMainSlider();
    doTabs();
    doAccordionMenu();

    doUserSelect('.custom-select');
    doElementFullHeight('.block-full-height')

    initMaskPhoneInputs();

    $(document).on('focus change', 'input, textarea', function(){
        $(this).removeClass('invalid');
    });

    $(document).on('submit', '.send-form', function (evt) {
        evt.preventDefault();
        const $form = $(this);
        if (isValid($form)) {
            console.log('удачно');
        } else {
            console.log('неудачно')
        }
    });

});


























function touchPrevent (evt) {
    evt.preventDefault();
}

function pageCanceledScroll() {
    $('html').addClass('no-scroll');
    document.addEventListener('touchmove', touchPrevent, { passive: true });
}

function pageReturnedScroll() {
    $('html').removeClass('no-scroll');
    document.removeEventListener('touchmove', touchPrevent, { passive: true });
}


function openUserModal(selector) {
    const $modalSelector = $(document).find(selector);
    if ($modalSelector.length) {
        pageCanceledScroll();
        $('html').addClass('user-modal-opened');
        $modalSelector.addClass('user-modal-active');
    }
}

function closeUserModal() {
    pageReturnedScroll()
    $('html').removeClass('user-modal-opened');
    $(document)
        .find('.user-modal-outer')
        .removeClass('user-modal-active')
        .removeClass('user-modal-filtered')
        .removeClass('user-modal-live-filtered')
}



$(document).on('click', '.btn-open-menu', function () {
    openUserModal('#modal-page-menu-outer');
});

$(document).on('click', '.btn-modal-outer-close', function () {
    closeUserModal();
});

$(document).on('click', '.btn-open-search', function () {
    openUserModal('#modal-page-menu-outer');
});

$(document).on('click', '.btn-open-modal-calc', function () {
    openUserModal('#modal-page-calc-outer');
});

$(document).on('focus', '.page-modal-header-search .search-input', function () {
    const $searchInput = $(this);
    const val = $searchInput.val()
    if (val.length > 0) {
        $searchInput.closest('.page-modal-outer').addClass('user-modal-live-filtered');
        return 0;
    }
    $searchInput.closest('.page-modal-outer').addClass('user-modal-filtered');

});

$(document).on('blur', '.page-modal-header-search .search-input', function () {
    const $searchInput = $(this);
    const $pageModalOuter = $searchInput.closest('.page-modal-outer');

    if($searchInput.val().length === 0) {
        $pageModalOuter
            .removeClass('user-modal-filtered');
        return 0;
    }
});



$(document).on('change input', '.page-modal-header-search .search-input', function () {
    const $searchInput = $(this);
    const $pageModalOuter = $searchInput.closest('.page-modal-outer');
    const val = $searchInput.val()

    if(val.length === 0) {
        $pageModalOuter
            .addClass('user-modal-filtered')
            .removeClass('user-modal-live-filtered');
        return 0;
    }
    if(val.length !== 0) {
        $pageModalOuter
            .removeClass('user-modal-filtered')
            .addClass('user-modal-live-filtered');
        return 0;
    }

});


$(document).on('click', '.btn-open-modal', function () {
    const modalTarget = $(this).attr('data-modal-id');
    const $modalObj = $(modalTarget);
    console.log(modalTarget);
    if ($modalObj.length) {
        openUserModal(modalTarget);
    }


});


































