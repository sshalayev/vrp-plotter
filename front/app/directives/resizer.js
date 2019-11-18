/**
 * Created by user on 22.05.2017.
 */
module.exports = (vrp) => {
    vrp.directive('resizer', resizerDirective);
    resizerDirective.$inject = ['$q', '$timeout', 'resizeSensor'];
    function resizerDirective($q, $timeout, resizeSensor) {
        return {
            restrict: 'A',
            link: link
        };
        function link (scope, element, attrs) {
            const rs = resizeSensor.getInstance(element.parent());
            const offset = parseInt(attrs.resizer, 10) || 0;

            isAttached(element.parent()).then((info) => {
                updateSize(element, info.rect.width, info.rect.height);
                rs.attachResizeEvent(() => {
                    let w, h;
                    try {
                        h = element.parent()[0].offsetHeight;
                        w = element.parent()[0].offsetWidth;
                        console.log(`RS fired: ${w} x ${h}`);
                        if (h && !isNaN(h) && h !== element[0].offsetHeight) {
                            updateSize(element, w, h + offset);
                        }
                    } catch (e) {}
                });
            });
            scope.$on('$destroy', () => {
                rs.detachResizeEvent();
                rs.queue.flush();
            })
        }

        function updateSize (el, w, h) {
            el.removeAttr('style').css({
                'width': w + 'px',
                'height': h + 'px'
            })
        }

        function isAttached (elem, count = 0) {
            let elemRect;
            return $q((resolve) => {
                $timeout(() => {
                    try {
                        elemRect = elem[0].getBoundingClientRect();
                        if ((elemRect.width && elemRect.height) || count > 10000) {
                            resolve({rect: elemRect, count: count});
                        } else {
                            throw 'Element not in DOM yet'
                        }
                    } catch (e) {
                        if (count < 10000) {
                            return isAttached(elem, count + 100);
                        } else {
                            resolve({
                                rect: {width: 0, height: 0},
                                count: count
                            })
                        }
                    }
                }, 100);
            })
        }
    }
}