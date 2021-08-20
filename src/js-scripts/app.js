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
    styleTag.innerText = `:root {--vh: ${ vh }px; --vh100: ${ windowInnerHeight }px`;
    document.querySelector('head').appendChild(styleTag);
}


const numToStr = function (num) {
    if (num <= 9 && num !== 0) {
        return `0${ num }`;
    }
    return num;
}
const doPageMainSlider = function (selector) {
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
        autoplaySpeed: 4000,
        pauseOnHover: false,
        pauseOnFocus: false,
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
        pauseOnHover: false,
        pauseOnFocus: false,
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

        $sliderCurrentPage.html(numToStr(1));
        $sliderAllPage.html(numToStr(countSlides));
        $slider.slick(newOptions);

        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            // $mainSliderImagesSlides.removeClass('slide-active');
            // $mainSliderImagesSlides.eq(nextSlide).addClass('slide-active');
            $sliderCurrentPage.html(numToStr(nextSlide + 1));
        });

    });
};

const doNewsMainSlider = function () {

    const $newsMainSliders = $('.news-main-slider');
    ;
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
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
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
        $sliderAllPage.html(countSlides);
        $slider.slick(newOptions);

        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $mainSliderImagesSlides.removeClass('slide-active');
            $mainSliderImagesSlides.eq(nextSlide).addClass('slide-active');
            $sliderCurrentPage.html(nextSlide + 1);
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
        autoplaySpeed: 4000,
        pauseOnHover: true,
        pauseOnFocus: true,
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
        autoplaySpeed: 4000,
        pauseOnHover: true,
        pauseOnFocus: true,
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
        pauseOnHover: true,
        pauseOnFocus: true,
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


        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
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
        if ($thisTab.hasClass('tech-slider-tab-active')) return false;

        $techSliderTabs.removeClass('tech-slider-tab-active');
        $thisTab.addClass('tech-slider-tab-active');

        const $techSliderMediaCover = $slider.find('.tech-slider-media .tech-slider-media-cover');
        const width = $techSliderMediaCover.width();

        const $techSectionTitle = $slider.find('.tech-slider-media  .tech-section-title');
        const $techSectionDescriptionContent = $slider.find('.tech-slider-media  .tech-section-description');

        /* получить контент таба */

        const imgHtml = $thisTab.find('.tech-slider-tab-img-container').html();
        const titleHtml = $thisTab.find('.tech-slider-tab-title').html();
        const descHtml = $thisTab.find('.tech-slider-tab-description').html();

        /*подготовить контент для вывода*/

        const prepImg = `
                <div class="tech-section-cover-frame new">
                    <div class="tech-section-cover-frame-wrap " style="width:${ width }px">
                      ${ imgHtml }
                    </div>
                </div>
            `;

        const prepTitle = `
                <div class="tech-section-title-content new">
                    ${ titleHtml }
                </div>
            `;
        const prepDesc = `
                <div class="tech-section-description-content new u-text-t2">
                    ${ descHtml }
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
        autoplaySpeed: 5000,
        pauseOnHover: false,
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
    if ($(window).width() < minMedia) return false;
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
            $tabWrapper.on('click', '.btn-tab', function () {
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
                        $sliders.each(function (idx) {
                            let setTime = setTimeout(function () {
                                $sliders.eq(idx).slick('setPosition');
                            }, 30);

                        })
                    }

                    const $videoBoxList = $tabWrapper.find('.video-box');
                    if ($videoBoxList.length) {
                        $videoBoxList.each(function (idx) {
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
    if ($mainMenuList.length === 0) {
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

        if ($thisMainMenuItem.hasClass('menu-accordion-active')) {
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

    if (inputPhones.length) {
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

function isValid(jqObj) {
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
        } else if ($this.attr('type') === "tel" && $this.val().length !== 16) {
            $this.addClass('invalid');
            mas.push("0");
        } else {
            $this.removeClass('invalid');
        }
    });
    return (mas.length === 0);
}

function toggleThemeHeader() {
    const header = document.querySelector('.header-block');
    if (header.classList.contains('not-toggle')) {
        return;
    }

    const $header = $('.header-block').eq(0);

    const $mainFirstBlock = $('.main-first-block').eq(0);
    if ($header.length === 0 || $mainFirstBlock === 0) return;
    let mainFirstBlockHeight = $mainFirstBlock.height();
    let scrTop = $(window).scrollTop();

    if (scrTop > mainFirstBlockHeight) {
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
            const msxSizeHeight = Math.max(...headerSizeList);
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

function stopVideoBox($videoBox) {
    $videoBox.find('.video-frame-container').html('');
    $videoBox.removeClass('video-active');
}

function doVideoBox() {
    const $videoBox = $('.video-box');

    if ($videoBox.length) {
        $(document).on('click', '.video-box-cover', function (evt) {
            const videoBoxCover = $(this);
            const videoLink = videoBoxCover.attr('data-video');
            const $videoBox = videoBoxCover.closest('.video-box');
            const $videoContainer = $videoBox.find('.video-frame-container');
            $videoBox.addClass('video-active');
            const videoFrame = `
    <iframe width="560" height="315" src="${ videoLink }?autoplay=1"  frameborder="0" allow="accelerometer; autoplay;"" allowfullscreen></iframe>
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
            pauseOnHover: false,
            pauseOnFocus: false,
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

function mapInit(mapElement, title, content) {
    const lat = Number(mapElement.getAttribute('data-lat'));
    const lng = Number(mapElement.getAttribute('data-lng'));
    const pinURL = mapElement.getAttribute('data-pin');

    if (!mapElement) return;
    ymaps.ready(initContactsMap);

    function initContactsMap() {
        const pin = {
            iconLayout: 'default#image',
            iconImageHref: pinURL,
            iconImageSize: [60, 60],
            iconImageOffset: [0, 0]
        };

        const center = [lat, lng];

        const pointsMapData = [{
            coords: center,
            title: title,
            content: content
        }];

        const mapInstance = new ymaps.Map(mapElement, {
            center: center,
            zoom: 16,
            controls: []
        });

        mapInstance.behaviors.disable('scrollZoom');

        const MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
            `<a class="close" href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 329 329"><path fill="#fff" d="M194.64,164.77,322.75,36.66A21.31,21.31,0,0,0,292.61,6.52L164.5,134.63,36.39,6.52A21.31,21.31,0,0,0,6.25,36.66L134.36,164.77,6.25,292.88A21.31,21.31,0,0,0,36.39,323L164.5,194.91,292.61,323a21.31,21.31,0,0,0,30.14-30.14Z" /></svg></a>` +
            '<div class="arrow"></div>' +
            '<div class="popover-inner">' +
            '$[[options.contentLayout observeSize minWidth=150 maxWidth=300 maxHeight=450]]' +
            '</div>' +
            '</div>',
            {
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.popover', this.getParentElement());

                    this.applyElementOffset();

                    this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                },

                clear: function () {
                    this._$element.find('.close').off('click');

                    this.constructor.superclass.clear.call(this);
                },

                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if (!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },
                applyElementOffset: function () {
                    this._$element.css({
                        right: -(this._$element[0].offsetWidth) ,
                        top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },

                onCloseClick: function (e) {
                    e.preventDefault();

                    this.events.fire('userclose');
                },

                getShape: function () {
                    if (!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(
                        new ymaps.geometry.pixel.Rectangle([
                            [position.left, position.top],
                            [
                                position.left + this._$element[0].offsetWidth,
                                position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                            ]
                        ])
                    );
                },

                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }
        );
        // Создание вложенного макета содержимого балуна.
        const MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover-container">' +
            '<div class="popover-wrapper">' +
            '<div class="popover-title">$[properties.balloonHeader]</div>' +
            '<div class="popover-content">$[properties.balloonContent]</div>' +
            '</div>'
        );

        const objectManager = new ymaps.ObjectManager({
            clusterize: false,
            clusterHasBalloon: false,
            geoObjectOpenBalloonOnClick: true
        });
        mapInstance.geoObjects.add(objectManager);

        pointsMapData.forEach(function (item) {
            const objectToAdd = {
                id: item.coords.join('-'),
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: item.coords
                },
                options: {
                    ...pin,
                    balloonShadow: false,
                    balloonLayout: MyBalloonLayout,
                    balloonContentLayout: MyBalloonContentLayout,
                    balloonPanelMaxMapArea: 0,
                    hideIconOnBalloonOpen: false,
                    balloonOffset: [30, 0]
                },
                properties: {
                    balloonContent: item.content,
                    balloonHeader: item.title
                }
            };
            objectManager.add(objectToAdd);
            objectManager.objects.balloon.open(item.coords.join('-'));
        });
    }
}


function contactsMap() {
    const hostElem = document.querySelector('#contacts-page-host');
    if (hostElem) {
        const mapElemsArr = hostElem.querySelectorAll('.js-contacts-map');

        mapElemsArr.forEach((mapElement, index) => {
            switch (index) {
                case 0:
                    mapInit(mapElement, 'ЦЕНТРАЛЬНЫЙ ОФИС ', 'г. Москва, Алтуфьевское шоссе, д.44');
                    break;

                case 1:
                    mapInit(mapElement, 'КАЗАНСКИЙ ОФИС  ', 'г. Казань, ул. Павлюхина 99Б, офис 1009');
                    break;

                case 2:
                    mapInit(mapElement, 'СКЛАД ', 'г. Москва, Алтуфьевское шоссе, 37строение 8');
                    break;
            }
        })
    }
}

$(document).ready(function () {
    console.log(1211)
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
    contactsMap();
});

$(window).on('resize', function () {
    fixVhBug();
});


/*
* симуляция отправки модальной формы
* */


$(document).ready(function () {
    $(document).on('focus change', 'input, textarea', function () {
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



























