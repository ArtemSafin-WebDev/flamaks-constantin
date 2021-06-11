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







