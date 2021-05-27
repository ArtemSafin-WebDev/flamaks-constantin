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
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed:5000,
        pauseOnHover:false,
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

        const $mainSliderImages = $sliderWrap.find('.main-slider-images');
        const $mainSliderImagesSlides = $mainSliderImages.find('.main-slider-images-item');
        $mainSliderImagesSlides.eq(0).addClass('slide-active');


        const newOptions = Object.assign(sliderOptions, {
            prevArrow: $prevArrow,
            nextArrow: $nextArrow,
        })

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
    $techSlider.each(function (idx, item) {
        const $slider = $(item);

        const $techSliderTabs = $slider.find('.tech-slider-tab');

        $techSliderTabs.on('click', ' .tech-section-head', function (evt) {

            if (($slider).hasClass('tech-animated')) return false;


            const $thisTab = $(this).closest('.tech-slider-tab');

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
        <div class="tech-section-description-content new">
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
            }, 50)

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
        console.log( winHeight);
        elementFullHeightList.each(function (idx, item) {
            $(item).height(winHeight);
        })
    }


}























$(document).ready(function () {
    doPageMainSlider('.main-page-slider');
    doAccordionApp();
    doTechSlider();
    doSliderTrust();
    doUserSelect('.custom-select');

    doElementFullHeight('.block-full-height')

})
