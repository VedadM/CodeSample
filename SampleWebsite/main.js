/*!
  hey, [be]Lazy.js - v1.8.2 - 2016.10.25
  A fast, small and dependency free lazy load script (https://github.com/dinbror/blazy)
  (c) Bjoern Klinggaard - @bklinggaard - http://dinbror.dk/blazy
*/
(function(q,m){"function"===typeof define&&define.amd?define(m):"object"===typeof exports?module.exports=m():q.Blazy=m()})(this,function(){function q(b){var c=b._util;c.elements=E(b.options);c.count=c.elements.length;c.destroyed&&(c.destroyed=!1,b.options.container&&l(b.options.container,function(a){n(a,"scroll",c.validateT)}),n(window,"resize",c.saveViewportOffsetT),n(window,"resize",c.validateT),n(window,"scroll",c.validateT));m(b)}function m(b){for(var c=b._util,a=0;a<c.count;a++){var d=c.elements[a],e;a:{var g=d;e=b.options;var p=g.getBoundingClientRect();if(e.container&&y&&(g=g.closest(e.containerClass))){g=g.getBoundingClientRect();e=r(g,f)?r(p,{top:g.top-e.offset,right:g.right+e.offset,bottom:g.bottom+e.offset,left:g.left-e.offset}):!1;break a}e=r(p,f)}if(e||t(d,b.options.successClass))b.load(d),c.elements.splice(a,1),c.count--,a--}0===c.count&&b.destroy()}function r(b,c){return b.right>=c.left&&b.bottom>=c.top&&b.left<=c.right&&b.top<=c.bottom}function z(b,c,a){if(!t(b,a.successClass)&&(c||a.loadInvisible||0<b.offsetWidth&&0<b.offsetHeight))if(c=b.getAttribute(u)||b.getAttribute(a.src)){c=c.split(a.separator);var d=c[A&&1<c.length?1:0],e=b.getAttribute(a.srcset),g="img"===b.nodeName.toLowerCase(),p=(c=b.parentNode)&&"picture"===c.nodeName.toLowerCase();if(g||void 0===b.src){var h=new Image,w=function(){a.error&&a.error(b,"invalid");v(b,a.errorClass);k(h,"error",w);k(h,"load",f)},f=function(){g?p||B(b,d,e):b.style.backgroundImage='url("'+d+'")';x(b,a);k(h,"load",f);k(h,"error",w)};p&&(h=b,l(c.getElementsByTagName("source"),function(b){var c=a.srcset,e=b.getAttribute(c);e&&(b.setAttribute("srcset",e),b.removeAttribute(c))}));n(h,"error",w);n(h,"load",f);B(h,d,e)}else b.src=d,x(b,a)}else"video"===b.nodeName.toLowerCase()?(l(b.getElementsByTagName("source"),function(b){var c=a.src,e=b.getAttribute(c);e&&(b.setAttribute("src",e),b.removeAttribute(c))}),b.load(),x(b,a)):(a.error&&a.error(b,"missing"),v(b,a.errorClass))}function x(b,c){v(b,c.successClass);c.success&&c.success(b);b.removeAttribute(c.src);b.removeAttribute(c.srcset);l(c.breakpoints,function(a){b.removeAttribute(a.src)})}function B(b,c,a){a&&b.setAttribute("srcset",a);b.src=c}function t(b,c){return-1!==(" "+b.className+" ").indexOf(" "+c+" ")}function v(b,c){t(b,c)||(b.className+=" "+c)}function E(b){var c=[];b=b.root.querySelectorAll(b.selector);for(var a=b.length;a--;c.unshift(b[a]));return c}function C(b){f.bottom=(window.innerHeight||document.documentElement.clientHeight)+b;f.right=(window.innerWidth||document.documentElement.clientWidth)+b}function n(b,c,a){b.attachEvent?b.attachEvent&&b.attachEvent("on"+c,a):b.addEventListener(c,a,{capture:!1,passive:!0})}function k(b,c,a){b.detachEvent?b.detachEvent&&b.detachEvent("on"+c,a):b.removeEventListener(c,a,{capture:!1,passive:!0})}function l(b,c){if(b&&c)for(var a=b.length,d=0;d<a&&!1!==c(b[d],d);d++);}function D(b,c,a){var d=0;return function(){var e=+new Date;e-d<c||(d=e,b.apply(a,arguments))}}var u,f,A,y;return function(b){if(!document.querySelectorAll){var c=document.createStyleSheet();document.querySelectorAll=function(a,b,d,h,f){f=document.all;b=[];a=a.replace(/\[for\b/gi,"[htmlFor").split(",");for(d=a.length;d--;){c.addRule(a[d],"k:v");for(h=f.length;h--;)f[h].currentStyle.k&&b.push(f[h]);c.removeRule(0)}return b}}var a=this,d=a._util={};d.elements=[];d.destroyed=!0;a.options=b||{};a.options.error=a.options.error||!1;a.options.offset=a.options.offset||100;a.options.root=a.options.root||document;a.options.success=a.options.success||!1;a.options.selector=a.options.selector||".b-lazy";a.options.separator=a.options.separator||"|";a.options.containerClass=a.options.container;a.options.container=a.options.containerClass?document.querySelectorAll(a.options.containerClass):!1;a.options.errorClass=a.options.errorClass||"b-error";a.options.breakpoints=a.options.breakpoints||!1;a.options.loadInvisible=a.options.loadInvisible||!1;a.options.successClass=a.options.successClass||"b-loaded";a.options.validateDelay=a.options.validateDelay||25;a.options.saveViewportOffsetDelay=a.options.saveViewportOffsetDelay||50;a.options.srcset=a.options.srcset||"data-srcset";a.options.src=u=a.options.src||"data-src";y=Element.prototype.closest;A=1<window.devicePixelRatio;f={};f.top=0-a.options.offset;f.left=0-a.options.offset;a.revalidate=function(){q(a)};a.load=function(a,b){var c=this.options;void 0===a.length?z(a,b,c):l(a,function(a){z(a,b,c)})};a.destroy=function(){var a=this._util;this.options.container&&l(this.options.container,function(b){k(b,"scroll",a.validateT)});k(window,"scroll",a.validateT);k(window,"resize",a.validateT);k(window,"resize",a.saveViewportOffsetT);a.count=0;a.elements.length=0;a.destroyed=!0};d.validateT=D(function(){m(a)},a.options.validateDelay,a);d.saveViewportOffsetT=D(function(){C(a.options.offset)},a.options.saveViewportOffsetDelay,a);C(a.options.offset);l(a.options.breakpoints,function(a){if(a.width>=window.screen.width)return u=a.src,!1});setTimeout(function(){q(a)})}});

// Polyfill for Element.closest that falls back to Element.matches that falls back to querySelectorAll
// Created for blazy.js 1.8.1 - https://github.com/dinbror/blazy to ensure IE7+ support


(function () {
    if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = Element.prototype.closest ||
        function(selector) {
            var element = this;
            while (element.matches && !element.matches(selector)) element = element.parentNode;
            return element.matches ? element : null;
        };
    }
})();

/*
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright 2011, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 * @license
 */
var CanvasImage=function(a){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),document.body.appendChild(this.canvas),this.width=this.canvas.width=a.width,this.height=this.canvas.height=a.height,this.context.drawImage(a,0,0,this.width,this.height)};CanvasImage.prototype.clear=function(){this.context.clearRect(0,0,this.width,this.height)},CanvasImage.prototype.update=function(a){this.context.putImageData(a,0,0)},CanvasImage.prototype.getPixelCount=function(){return this.width*this.height},CanvasImage.prototype.getImageData=function(){return this.context.getImageData(0,0,this.width,this.height)},CanvasImage.prototype.removeCanvas=function(){this.canvas.parentNode.removeChild(this.canvas)};var ColorThief=function(){};/*!
 * quantize.js Copyright 2008 Nick Rabinowitz.
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * @license
 */
/*!
 * Block below copied from Protovis: http://mbostock.github.com/protovis/
 * Copyright 2010 Stanford Visualization Group
 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
 * @license
 */
if(ColorThief.prototype.getColor=function(a,b){var c=this.getPalette(a,5,b),d=c[0];return d},ColorThief.prototype.getPalette=function(a,b,c){"undefined"==typeof b&&(b=10),("undefined"==typeof c||c<1)&&(c=10);for(var d,e,f,g,h,i=new CanvasImage(a),j=i.getImageData(),k=j.data,l=i.getPixelCount(),m=[],n=0;n<l;n+=c)d=4*n,e=k[d+0],f=k[d+1],g=k[d+2],h=k[d+3],h>=125&&(e>250&&f>250&&g>250||m.push([e,f,g]));var o=MMCQ.quantize(m,b),p=o?o.palette():null;return i.removeCanvas(),p},!pv)var pv={map:function(a,b){var c={};return b?a.map(function(a,d){return c.index=d,b.call(c,a)}):a.slice()},naturalOrder:function(a,b){return a<b?-1:a>b?1:0},sum:function(a,b){var c={};return a.reduce(b?function(a,d,e){return c.index=e,a+b.call(c,d)}:function(a,b){return a+b},0)},max:function(a,b){return Math.max.apply(null,b?pv.map(a,b):a)}};var MMCQ=function(){function a(a,b,c){return(a<<2*i)+(b<<i)+c}function b(a){function b(){c.sort(a),d=!0}var c=[],d=!1;return{push:function(a){c.push(a),d=!1},peek:function(a){return d||b(),void 0===a&&(a=c.length-1),c[a]},pop:function(){return d||b(),c.pop()},size:function(){return c.length},map:function(a){return c.map(a)},debug:function(){return d||b(),c}}}function c(a,b,c,d,e,f,g){var h=this;h.r1=a,h.r2=b,h.g1=c,h.g2=d,h.b1=e,h.b2=f,h.histo=g}function d(){this.vboxes=new b(function(a,b){return pv.naturalOrder(a.vbox.count()*a.vbox.volume(),b.vbox.count()*b.vbox.volume())})}function e(b){var c,d,e,f,g=1<<3*i,h=new Array(g);return b.forEach(function(b){d=b[0]>>j,e=b[1]>>j,f=b[2]>>j,c=a(d,e,f),h[c]=(h[c]||0)+1}),h}function f(a,b){var d,e,f,g=1e6,h=0,i=1e6,k=0,l=1e6,m=0;return a.forEach(function(a){d=a[0]>>j,e=a[1]>>j,f=a[2]>>j,d<g?g=d:d>h&&(h=d),e<i?i=e:e>k&&(k=e),f<l?l=f:f>m&&(m=f)}),new c(g,h,i,k,l,m,b)}function g(b,c){function d(a){var b,d,e,f,g,h=a+"1",j=a+"2",k=0;for(i=c[h];i<=c[j];i++)if(o[i]>n/2){for(e=c.copy(),f=c.copy(),b=i-c[h],d=c[j]-i,g=b<=d?Math.min(c[j]-1,~~(i+d/2)):Math.max(c[h],~~(i-1-b/2));!o[g];)g++;for(k=p[g];!k&&o[g-1];)k=p[--g];return e[j]=g,f[h]=e[j]+1,[e,f]}}if(c.count()){var e=c.r2-c.r1+1,f=c.g2-c.g1+1,g=c.b2-c.b1+1,h=pv.max([e,f,g]);if(1==c.count())return[c.copy()];var i,j,k,l,m,n=0,o=[],p=[];if(h==e)for(i=c.r1;i<=c.r2;i++){for(l=0,j=c.g1;j<=c.g2;j++)for(k=c.b1;k<=c.b2;k++)m=a(i,j,k),l+=b[m]||0;n+=l,o[i]=n}else if(h==f)for(i=c.g1;i<=c.g2;i++){for(l=0,j=c.r1;j<=c.r2;j++)for(k=c.b1;k<=c.b2;k++)m=a(j,i,k),l+=b[m]||0;n+=l,o[i]=n}else for(i=c.b1;i<=c.b2;i++){for(l=0,j=c.r1;j<=c.r2;j++)for(k=c.g1;k<=c.g2;k++)m=a(j,k,i),l+=b[m]||0;n+=l,o[i]=n}return o.forEach(function(a,b){p[b]=n-a}),d(h==e?"r":h==f?"g":"b")}}function h(a,c){function h(a,b){for(var c,d=1,e=0;e<k;)if(c=a.pop(),c.count()){var f=g(i,c),h=f[0],j=f[1];if(!h)return;if(a.push(h),j&&(a.push(j),d++),d>=b)return;if(e++>k)return}else a.push(c),e++}if(!a.length||c<2||c>256)return!1;var i=e(a),j=0;i.forEach(function(){j++});var m=f(a,i),n=new b(function(a,b){return pv.naturalOrder(a.count(),b.count())});n.push(m),h(n,l*c);for(var o=new b(function(a,b){return pv.naturalOrder(a.count()*a.volume(),b.count()*b.volume())});n.size();)o.push(n.pop());h(o,c-o.size());for(var p=new d;o.size();)p.push(o.pop());return p}var i=5,j=8-i,k=1e3,l=.75;return c.prototype={volume:function(a){var b=this;return b._volume&&!a||(b._volume=(b.r2-b.r1+1)*(b.g2-b.g1+1)*(b.b2-b.b1+1)),b._volume},count:function(b){var c=this,d=c.histo;if(!c._count_set||b){var e,f,g,h=0;for(e=c.r1;e<=c.r2;e++)for(f=c.g1;f<=c.g2;f++)for(g=c.b1;g<=c.b2;g++)index=a(e,f,g),h+=d[index]||0;c._count=h,c._count_set=!0}return c._count},copy:function(){var a=this;return new c(a.r1,a.r2,a.g1,a.g2,a.b1,a.b2,a.histo)},avg:function(b){var c=this,d=c.histo;if(!c._avg||b){var e,f,g,h,j,k=0,l=1<<8-i,m=0,n=0,o=0;for(f=c.r1;f<=c.r2;f++)for(g=c.g1;g<=c.g2;g++)for(h=c.b1;h<=c.b2;h++)j=a(f,g,h),e=d[j]||0,k+=e,m+=e*(f+.5)*l,n+=e*(g+.5)*l,o+=e*(h+.5)*l;k?c._avg=[~~(m/k),~~(n/k),~~(o/k)]:c._avg=[~~(l*(c.r1+c.r2+1)/2),~~(l*(c.g1+c.g2+1)/2),~~(l*(c.b1+c.b2+1)/2)]}return c._avg},contains:function(a){var b=this,c=a[0]>>j;return gval=a[1]>>j,bval=a[2]>>j,c>=b.r1&&c<=b.r2&&gval>=b.g1&&gval<=b.g2&&bval>=b.b1&&bval<=b.b2}},d.prototype={push:function(a){this.vboxes.push({vbox:a,color:a.avg()})},palette:function(){return this.vboxes.map(function(a){return a.color})},size:function(){return this.vboxes.size()},map:function(a){for(var b=this.vboxes,c=0;c<b.size();c++)if(b.peek(c).vbox.contains(a))return b.peek(c).color;return this.nearest(a)},nearest:function(a){for(var b,c,d,e=this.vboxes,f=0;f<e.size();f++)c=Math.sqrt(Math.pow(a[0]-e.peek(f).color[0],2)+Math.pow(a[1]-e.peek(f).color[1],2)+Math.pow(a[2]-e.peek(f).color[2],2)),(c<b||void 0===b)&&(b=c,d=e.peek(f).color);return d},forcebw:function(){var a=this.vboxes;a.sort(function(a,b){return pv.naturalOrder(pv.sum(a.color),pv.sum(b.color))});var b=a[0].color;b[0]<5&&b[1]<5&&b[2]<5&&(a[0].color=[0,0,0]);var c=a.length-1,d=a[c].color;d[0]>251&&d[1]>251&&d[2]>251&&(a[c].color=[255,255,255])}},{quantize:h}}();



// main.js Start HERE:
(function() {
    var msnry;
    var gridSize, gridLayout, currentSizer;
    var buttonCounter = 2;
    var currentLayout;
    var currentParentWidth;
    var allImages = [];
    var currentImage, totalElements;
    var emptyPixel = "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
    // var endPoint = "https://gist.githubusercontent.com/VedadM/c9dea86a3dd331f63456fd65a13f86a4/raw/b803c11f93e320f09d281fa863d3d25f70dd09a9/file.json";
    var endPoint = "file.json";

    var assetPath = "";

    var jsonFile;

    var counterRow = 0;

    var openingByHover = 0;

    var scrollSpeeds = [8,10,8,10];

    // var backButton = true;

    //For Swipping:
    var touchstartX = 0,
        touchstartY = 0,
        touchendX = 0,
        touchendY = 0;

    var elms = {
        body: document.getElementsByTagName("body")[0],
        imageHolder : document.getElementById('image-holder'),
        videoHolder: document.querySelectorAll("#video-holder"),
        grid: document.querySelector('.grid'),
        // gridItems: document.querySelector('.grid-items'),
        overlay: document.querySelector('.overlay'),
        overlayControls: document.querySelector('.overlay-controls'),
        overlayControlsMobile: document.querySelector('.overlay-controls-mobile'),
        overlayAbout: document.querySelector('.overlay-about'),
        overlayMedia: document.querySelector('.overlay-media'),
        overlayInsideTop: document.querySelector('.overlay-inside-top'),
        loader: document.getElementById('loader'),
        wrapper: document.querySelector('.wrapper'),
        overlayClose: document.getElementById('overlay-close'),
        overlayCloseAbout: document.querySelector('.btn-about-close'),
        aboutAnimation: document.querySelectorAll('.about-animate-initial'),
        previous: document.getElementById('btn-previous'),
        next: document.getElementById('btn-next'),
        previousMobile: document.getElementById('btn-previous-mobile'),
        nextMobile: document.getElementById('btn-next-mobile'),
        about: document.getElementById('btn-about'),
        aboutMobile: document.getElementById('btn-about-mobile'),
        arrowUp: document.querySelector('.arrow-up'),
        // aboutDesktop: document.getElementById('btn-about-desktop'),
        aboutCloseDesktop: document.querySelector('.btn-overlay-close-desktop'),
        aboutCloseMobile: document.querySelector('.btn-overlay-close-mobile'),
        aboutClose: document.querySelector('.btn-about-close'),
        linkHome: document.getElementById('link-home'),
        artContent: document.querySelector('.artwork-content'),
        artworkId: document.getElementById('artwork-id'),
        artworkYear: document.getElementById('artwork-year'),
        artworkTitle: document.getElementById('artwork-title'),
        artworkDescription: document.getElementById('artwork-description'),
        artworkArtist: document.getElementById('artwork-artist'),
        artworkArtistSite: document.getElementById('artwork-artist-site'),
        artworkPost: document.getElementById('artwork-original-post'),
        // facebookArtistShare: document.getElementById('fb-social'),
        // twitterArtistShare: document.getElementById('tw-social'),
        afterBar: document.querySelector(".after-bar")
    }

    var overlayPosition = {
        w: 0,
        h: 0,
        left: 0,
        top: 0
    }

    gridSize = (isMobile()) ? 2 : 5;
    currentSizer = (isMobile()) ? "sizer-0" : "sizer-2";

    // Helpers
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    function isMobile() {
        return /(iPhone|iPod|android|ios|iPad|windowsphone|tablet)/i.test(navigator.userAgent);
    }

    function whichTransitionEvent(){
        var t;

        el = document.createElement("fakeelement");

        var transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        }

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    }

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
        xobj.open('GET', endPoint, true);
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
              }
        };
        xobj.send(null);
    }

    function addDesktopGrid() {
        // Inital Row
        for (var i = 0; i < 4; i++) {
            var el = document.createElement("div");
                el.className = 'col-' + i + ' grid-item-3' ;
                el.dataset.scrollspeed = scrollSpeeds[i];
                elms.grid.appendChild(el);
        }

        for (var i = 0; i < jsonFile.length; i++) {
            var colDecider = i % 4;

            var el = document.createElement("div");
                el.className = 'grid-item';
                el.dataset.type = jsonFile[i].type;
                el.dataset.id = i;
                el.dataset.current = jsonFile[i].id;

            var artworkNumber = document.createElement("span");
                artworkNumber.className = "artwork-number";

                var id = jsonFile[i].id;
                if (id < 10) {
                    id = "0" + id;
                }

            var hoverSpanNumber = document.createElement("span");
                hoverSpanNumber.className = "artwork-number-span";
                hoverSpanNumber.innerHTML = id;

                artworkNumber.appendChild(hoverSpanNumber);
                el.appendChild(artworkNumber);

            var img = document.createElement("img");
                img.className = "b-lazy animate js-hover-image";
                img.src = emptyPixel;
                img.dataset.src = assetPath + jsonFile[i].gridsrc;

            img.addEventListener( "load", function() {
                el.appendChild(img);
            }());

            document.querySelector('.col-' + colDecider).appendChild(el);
        }

        moveIt(document.querySelectorAll('[data-scrollspeed]'));
    }

    function moveIt(selector){
      var instances = [];

      arrayirize = Array.from(selector);

      arrayirize.forEach(function(el){
        instances.push(new moveItItem(el));
      });

      window.addEventListener('scroll', function(){
          var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

        instances.forEach(function(inst){
          inst.update(scrollTop);
        });
      }, {passive: false});
    }

    var moveItItem = function(el){
      this.el = el;
      this.speed = parseInt(this.el.getAttribute('data-scrollspeed'));
    };

    moveItItem.prototype.update = function(scrollTop){
        if ( scrollTop + window.innerHeight <= document.body.clientHeight + 99) {
            this.el.style.transform = 'translateY(' +  -(scrollTop / this.speed) + 'px)';
        } /* else {
            this.el.style.transform = 'translateY(0px)';
        }*/
    };

    function addMobileGrid() {
        // Inital Row
        for (var i = 0; i < jsonFile.length; i++) {
            var el = document.createElement("div");
                el.className = 'grid-item-0';
                el.dataset.type = jsonFile[i].type;
                el.dataset.id = i;
                el.dataset.current = jsonFile[i].id;

            var artworkNumber = document.createElement("span");
                artworkNumber.className = "artwork-number";

                var id = jsonFile[i].id;
                if (id < 10) {
                    id = "0" + id;
                }

            var hoverSpanNumber = document.createElement("span");
                hoverSpanNumber.className = "artwork-number-span";
                hoverSpanNumber.innerHTML = id;

            artworkNumber.appendChild(hoverSpanNumber);
            el.appendChild(artworkNumber);

            var img = document.createElement("img");
                img.className = "b-lazy animate js-hover-image";
                img.src = emptyPixel;
                img.dataset.src = assetPath + jsonFile[i].gridsrc;

            img.addEventListener( "load", function() {
                el.appendChild(img);
            }());

            elms.grid.appendChild(el);
        }
    }

    function resizeGridElement() {
        currentLayout = document.querySelector(".grid").children[1].classList[0];
        currentParentWidth = document.querySelectorAll("[class*='grid-width']")[0].classList[2];

        document.querySelectorAll("[class^='grid-item']").forEach(function(el) {
            el.className = el.className.replace( currentLayout , 'grid-item-' + buttonCounter );
        });

        document.querySelectorAll("[class^='sizer']")[0].className = 'sizer-' + buttonCounter;
        document.querySelectorAll("[class*='grid-width']")[0].className = document.querySelectorAll("[class*='grid-width']")[0].className.replace(currentParentWidth,'grid-width-' + buttonCounter);

        msnry.layout();
    }

    function blazy() {
        window.bLazy = new Blazy({
            container: '.img-container',
            success: function(element){
                setTimeout(function() {
                    var colorThief = new ColorThief();

                    element.dataset.dominant = 'rgb(' + colorThief.getColor(element) + ')';
                },50);
            }
        });
    }

    function overlayAbout(e) {
        e.preventDefault();
        overlayClose(e);

        elms.body.classList.add('no-scroll');
        elms.overlayCloseAbout.style.opacity = 1;

        for (var i = 0; i < elms.about.children.length; i++) {
            elms.about.children[i].removeAttribute('style');
        }

        for (var i = 0; i < elms.aboutAnimation.length; i++) {
            elms.aboutAnimation[i].classList.add('about-animation-' + i);
        }

        (elms.about.classList.toggle("open")) ? elms.overlayAbout.classList.add("about-overlay-open") : elms.overlayAbout.classList.remove("about-overlay-open");

        if (window.history && window.history.pushState) {
            if (elms.about.classList.contains("open")) {
                history.pushState("", document.title, window.location.pathname + '#about');
            } else {
                history.pushState("", document.title, window.location.pathname);
            }
        }
    }

    function overlayOpen(e) {
        if (isMobile()) {
            openingByHover = 0;
            document.querySelectorAll('.artwork-number').forEach(function(el) {
                el.classList.remove('artwork-number-hover');
            });
        }

        if (e.target.nodeName == "IMG" || e.target.nodeName == "SPAN") {
            if (isMobile()) {
                elms.artContent.classList.remove('slide-content-left');
            }
            elms.about.classList.add('overlay-open');
            elms.afterBar.classList.remove('after-bar-full');
            elms.overlayInsideTop.classList.remove('overlay-inside-top-padder');
        }

        if(e.target && e.target.nodeName == "IMG" || e.target.nodeName == "SPAN") {
            elms.overlay.removeAttribute("style");
            elms.overlay.classList.add("info-overlay-open");
            elms.overlay.classList.add("info-overlay-open-index");
            elms.afterBar.classList.remove('after-bar-full');
            elms.overlayInsideTop.classList.remove('overlay-inside-top-padder');

            if (e.target.classList.contains('artwork-number')) {
                getId(e.target);
            } else if (e.target.classList.contains('artwork-number-span')) {
                getId(e.target.parentNode);
            }

        }

        if (!isNaN(window.location.hash) && (e.target.nodeName == "IMG" || e.target.nodeName == "SPAN")) {
            updateHash();
        }

        // HACK: in case overlay hidden doesnt get removed on transition end
        setTimeout(function() {
            if (elms.overlayMedia.classList.contains('overlay-media-hidden')) {
                elms.overlayMedia.classList.remove('overlay-media-hidden');
            }
        }, 1000);

        windowWidthCheck();
    }

    function windowWidthCheck() {
        if (window.innerWidth < 762) {
            var temp = elms.afterBar.style.backgroundColor.replace(/[a-zA-Z()]/g,"").split(',');
            if (parseInt(temp[0]) < 140 && parseInt(temp[1]) < 140 && parseInt(temp[2]) < 140) {
                arrowColorSwitch("white");
            } else {
                arrowColorSwitch("black");
            }
        } else {
            arrowColorSwitch("black");
        }
    }

    function arrowColorSwitch(color) {

        for (var i = 0; i < elms.aboutCloseMobile.children.length; i++) {
            elms.aboutCloseMobile.children[i].style.backgroundColor = color;
        }

        for (var i = 0; i < elms.overlayControls.getElementsByTagName('SPAN').length; i++) {
            if (elms.overlayControls.getElementsByTagName('SPAN')[i].className == 'js-span-bgcolor') {
                elms.overlayControls.getElementsByTagName('SPAN')[i].style.backgroundColor = color;
            }

            if (elms.overlayControls.getElementsByTagName('SPAN')[i].className == 'js-span-border') {
                elms.overlayControls.getElementsByTagName('SPAN')[i].style.border = 'solid ' + color;
                elms.overlayControls.getElementsByTagName('SPAN')[i].style.borderWidth = '0 2px 2px 0';
            }
        }

        for (var i = 0; i < elms.overlayControlsMobile.getElementsByTagName('SPAN').length; i++) {
            if (elms.overlayControlsMobile.getElementsByTagName('SPAN')[i].className == 'js-span-border') {
                elms.overlayControlsMobile.getElementsByTagName('SPAN')[i].style.border = 'solid ' + color;
                elms.overlayControlsMobile.getElementsByTagName('SPAN')[i].style.borderWidth = '0 2px 2px 0';
            }
        }
    }

    function overlayClose(e, backButton = true) {
        e.preventDefault();

        elms.body.classList.remove('no-scroll');

        while (elms.videoHolder[0].firstChild) elms.videoHolder[0].removeChild(elms.videoHolder[0].firstChild);

        document.querySelectorAll(".artwork-number-span").forEach(function(el){
            el.removeAttribute('style');
        });

        elms.overlay.classList.remove("info-overlay-open");
        elms.body.classList.remove("overflow");

        elms.artContent.classList.add('slide-content-left');
        elms.afterBar.classList.add('after-bar-full');
        elms.afterBar.style.backgroundColor = "rgb(191, 191, 191)";
        elms.overlayInsideTop.classList.remove('overlay-inside-top-padder');
        elms.wrapper.classList.add('opacity-zero');

        elms.about.classList.remove('overlay-open');
        elms.overlayMedia.classList.add('overlay-media-hidden');

        document.querySelectorAll('.grid-item').forEach(function(el) {
            el.classList.remove('grid-hide');
            el.classList.remove('grid-current-item');
        });

        setTimeout(function() {
            elms.overlay.scrollTop = 0;
            elms.overlay.classList.remove("info-overlay-open-index");
        },1000)

        if (window.history && window.history.pushState && backButton) {
            history.pushState("", document.title, window.location.pathname);
        }
    }

    function getId(el) {
        // Remove old image
        var id = el.parentNode.getAttribute("data-id");
        var color = el.nextSibling.getAttribute("data-dominant");

        currentImage = id;

        displayArtworkInfo(id,color);
        changeImage(id, color);
    }

    function nextImage(e) {
        e.preventDefault();

        if (currentImage >= totalElements - 1) {
            currentImage = -1;
        }

        currentImage++;

        updateHash();

        elms.artContent.classList.add("slide-content-left"); /* Side Scroll added */
        elms.afterBar.classList.add("arrow-click"); /* Side Scroll added */
        elms.afterBar.classList.add("after-bar-full"); /* Side Scroll added */
        elms.overlayInsideTop.classList.add('overlay-inside-top-padder'); /* Side Scroll added */
        elms.overlayMedia.classList.add('overlay-media-hidden'); /* Side Scroll added */
    }

    function previousImage(e) {
        e.preventDefault();

        if (currentImage < 1) {
            currentImage = totalElements;
        }

        currentImage--;

        updateHash();

        elms.artContent.classList.add("slide-content-left"); /* Side Scroll added */
        elms.afterBar.classList.add("arrow-click"); /* Side Scroll added */
        elms.afterBar.classList.add("after-bar-full"); /* Side Scroll added */
        elms.overlayInsideTop.classList.add('overlay-inside-top-padder'); /* Side Scroll added */
        elms.overlayMedia.classList.add('overlay-media-hidden'); /* Side Scroll added */
    }

    function updateHash() {
        if (window.history && window.history.pushState) {
            history.pushState("", document.title, window.location.pathname + '#' + jsonFile[currentImage].id);
        }
    }

    function displayArtworkInfo(id, color) {
        vals = jsonFile[id];

        elms.loader.style.visibility = 'hidden';

        elms.artworkId.innerHTML = '#' + (parseInt(vals.id));
        elms.artworkYear.innerHTML = vals.year;
        elms.artworkTitle.innerHTML = vals.name;
        elms.artworkDescription.innerHTML = vals.description;

        elms.artworkArtist.innerHTML = vals.artist;
        (vals.artist == "") ? elms.artworkArtist.style.display = "none" : elms.artworkArtist.style.display = "block";

        (vals.original == "") ? elms.artworkPost.style.display = "none" : elms.artworkPost.style.display = "block";
        elms.artworkPost.href = vals.original;

        elms.artworkArtistSite.href = vals.artisturl;
        (vals.artisturl == "") ? elms.artworkArtistSite.style.display = "none" : elms.artworkArtistSite.style.display = "block";

        elms.afterBar.style.backgroundColor = color;
    }

    function changeImage(id) {
        while (elms.imageHolder.lastChild && elms.imageHolder.lastChild.nodeName == "IMG") {
          elms.imageHolder.removeChild(elms.imageHolder.lastChild);
        }

        while (elms.videoHolder[0].firstChild) elms.videoHolder[0].removeChild(elms.videoHolder[0].firstChild);

        if (vals.type == "image") {
            elms.imageHolder.style.display = "block";
            elms.videoHolder[0].style.display = "none";

            var img = document.createElement("img");
                img.src = vals.src;

            img.onload=function(){
                elms.loader.style.visibility = 'hidden';
                document.getElementById("image-holder").appendChild(img);
            };
        } else {
            elms.imageHolder.style.display = "none";
            elms.videoHolder[0].style.display = "block";

            setTimeout(function() {
                setUpVideo(vals);
            }, 500);
        }
    }

    function setUpVideo(data) {
        for (var i = 0; i < elms.videoHolder.length; i++) {
            var source = "http://img.youtube.com/vi/" + data.video + "/sddefault.jpg";

            var image = new Image();
                image.src = source;
                image.addEventListener( "load", function() {
                    elms.videoHolder[ i ].appendChild( image );
                }( i ) );

                var iframe = document.createElement( "iframe" );

                    iframe.setAttribute( "allowfullscreen", "true" );
                    iframe.setAttribute( "frameborder", "0" );
                    iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ data.video +"?autoplay=1&rel=0&showinfo=0&controls=0&modestbranding=1" );

                    elms.videoHolder[i].innerHTML = "";
                    elms.videoHolder[i].appendChild( iframe );
        };
    }

    function bindEvents() {
        var transitionEvent = whichTransitionEvent();

        elms.grid.addEventListener("click", function(e) {
            if (!isMobile()) {
                currentImage = parseInt(e.target.parentNode.getAttribute('data-id'));

                elms.artContent.classList.remove('slide-content-left');

                if (e.target.nodeName == "IMG" || e.target.nodeName == "SPAN" ) {

                    if (e.target.nodeName == "IMG" ) {
                        elms.afterBar.style.backgroundColor = e.target.getAttribute('data-dominant');
                    }

                    if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number')) {
                        elms.afterBar.style.backgroundColor = e.target.parentNode.childNodes[1].getAttribute('data-dominant');
                    }

                    if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number-span')) {
                        elms.afterBar.style.backgroundColor = e.target.parentNode.nextSibling.getAttribute('data-dominant');
                    }

                    e.target.parentNode.classList.add('grid-current-item');

                    overlayOpen(e);
                }
            } else {
                openingByHover = 1;

                currentImage = parseInt(e.target.parentNode.getAttribute('data-id'));

                if (e.target.nodeName == "IMG" ) {
                    elms.afterBar.style.backgroundColor = e.target.getAttribute('data-dominant');
                    e.target.previousSibling.classList.add('artwork-number-hover');
                    e.target.previousSibling.style.backgroundColor = e.target.getAttribute('data-dominant');
                }

                if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number')) {
                    e.target.classList.add('artwork-number-hover');
                    e.target.style.backgroundColor = e.target.nextSibling.getAttribute('data-dominant');
                }

                if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number-span')) {
                    e.target.parentNode.classList.add('artwork-number-hover');
                    e.target.parentNode.style.backgroundColor = e.target.parentNode.nextSibling.getAttribute('data-dominant');
                }
            }

        }, false);

        if (!isMobile()) {
            elms.grid.addEventListener("mouseover", function(e) {
                e.stopPropagation();

                if (e.target.nodeName == "IMG") {
                    e.target.previousSibling.firstChild.style.display = 'inline-block';
                    e.target.previousSibling.classList.add('artwork-number-hover');
                    e.target.previousSibling.style.backgroundColor = e.target.getAttribute('data-dominant');
                }

                if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number')) {
                    e.target.classList.add('artwork-number-hover');
                    e.target.firstChild.style.opacity = 1;
                    e.target.style.backgroundColor = e.target.nextSibling.getAttribute('data-dominant');
                }

                if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number-span')) {
                    e.target.style.opacity = 1;
                    e.target.parentNode.classList.add('artwork-number-hover');
                    e.target.style.display = 'inline-block';
                }
            });

            elms.grid.addEventListener("mouseout", function(e) {
                e.stopPropagation();
                if (e.target.nodeName == "IMG" ) {
                    e.target.previousSibling.classList.remove('artwork-number-hover');
                }

                if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number')) {
                    e.target.firstChild.style.opacity = 0;
                    e.target.firstChild.style.display = "none";
                    e.target.classList.remove('artwork-number-hover');
                }

                if (e.target.nodeName == "SPAN" && e.target.classList.contains('artwork-number-span')) {
                    e.target.parentNode.classList.remove('artwork-number-hover');
                }
            });
        }

        elms.aboutCloseDesktop.addEventListener('click', function(e) {
            elms.afterBar.classList.add('after-bar-full');
            elms.overlayInsideTop.classList.add('overlay-inside-top-padder');
            elms.overlayMedia.classList.add('overlay-media-hidden');

        }, false);

        elms.aboutCloseMobile.addEventListener('click', function(e) {
            elms.afterBar.classList.add('after-bar-full');
            elms.overlayInsideTop.classList.add('overlay-inside-top-padder');
            elms.overlayMedia.classList.add('overlay-media-hidden');

        }, false);

        elms.next.addEventListener("click", nextImage, false);
        elms.previous.addEventListener("click", previousImage, false);

        elms.nextMobile.addEventListener("click", nextImage, false);
        elms.previousMobile.addEventListener("click", previousImage, false);

        elms.about.addEventListener("click", overlayAbout, false);

        // On Content
        elms.artContent.addEventListener(transitionEvent, function(e) {
            if (this.classList.contains("slide-content-left") && elms.overlay.classList.contains('info-overlay-open')) {
                this.classList.remove("slide-content-left");
                elms.overlayMedia.classList.remove('overlay-media-hidden');
                displayArtworkInfo(currentImage, document.querySelectorAll("[data-id='"+ currentImage +"']")[0].lastChild.getAttribute("data-dominant"));
                changeImage(currentImage);
            }
        }, false);

        elms.overlay.addEventListener(transitionEvent, function(e) {
            if (e.propertyName == 'opacity' && this.classList.contains('info-overlay-open') && !elms.afterBar.classList.contains('after-bar-full')) {
                elms.body.classList.add('no-scroll');
                elms.afterBar.classList.remove('after-bar-full');
                elms.overlay.scrollTop = 0;
            }
        }, false);

        elms.afterBar.addEventListener(transitionEvent, function(e) {
            windowWidthCheck();
            if (elms.overlay.classList.contains("info-overlay-open") && e.propertyName == 'background-color' && !this.classList.contains('after-bar-full')) {
                elms.wrapper.classList.remove('opacity-zero');
                elms.overlay.classList.remove('js-hash-call');
                if (!isMobile()) {
                    elms.artContent.classList.remove('slide-content-left');
                }

                elms.afterBar.style.backgroundColor = document.querySelectorAll("[data-id='"+ currentImage +"']")[0].lastChild.getAttribute("data-dominant");
            }

            if (elms.overlay.classList.contains("info-overlay-open") && this.classList.contains('after-bar-full') && !elms.overlay.classList.contains('js-hash-call') && !this.classList.contains('arrow-click')) { /* Side Scroll added  just !this.classList.contains('arrow-click')*/
                overlayClose(e);
            }

            if (this.classList.contains('arrow-click')) { /* Side Scroll added */
                elms.afterBar.classList.remove("arrow-click"); /* Side Scroll added */
                elms.afterBar.classList.remove("after-bar-full"); /* Side Scroll added */
                elms.overlayInsideTop.classList.remove('overlay-inside-top-padder'); /* Side Scroll added */
                elms.afterBar.style.backgroundColor = document.querySelectorAll("[data-id='"+ currentImage +"']")[0].lastChild.getAttribute("data-dominant");
            }

        }, false);

        document.addEventListener('keydown', function(e) {
            var keyCode = e.keyCode;

            if (elms.overlay.classList.contains("info-overlay-open")) {
                // Left Arrow Click
                if (keyCode == 37) {
                    previousImage(e);
                }

                // Right Arrow Click
                if (keyCode == 39) {
                    nextImage(e);
                }
            }
        }, false);

        elms.overlayCloseAbout.addEventListener('click', function() {
            elms.body.classList.remove('no-scroll');
            elms.overlayAbout.classList.remove("about-overlay-open");
            elms.about.classList.remove("open");
            this.style.opacity = 0;

            for (var i = 0; i < elms.aboutAnimation.length; i++) {
                elms.aboutAnimation[i].classList.remove('about-animation-' + i);
            }

            history.pushState("", document.title, window.location.pathname);
        }, false);

        elms.overlayMedia.addEventListener('touchstart', function(e) {
            touchstartX = e.changedTouches[0].screenX;
            touchstartY = e.changedTouches[0].screenY;
        }, false);

        elms.overlayMedia.addEventListener('touchend', function(e) {
            touchendX = e.changedTouches[0].screenX;
            touchendY = e.changedTouches[0].screenY;
            touchGesture(e);
        }, false);

        elms.arrowUp.addEventListener('click', function(e) {
            e.preventDefault();
            window.scroll({top: 0, behavior: 'smooth' });
        });

        if (isMobile()) {
            elms.grid.addEventListener(transitionEvent, function(e) {
                if (e.target.nodeName == 'SPAN' && e.target.classList.contains('artwork-number-span') && openingByHover) {
                    setTimeout(function() {
                        e.target.style.opacity = 0;
                    }, 400);

                    setTimeout(function() {
                        e.target.style.display = 'none';
                        e.target.parentNode.parentNode.classList.add('grid-current-item');
                        overlayOpen(e);
                    }, 800);
                }
            });
        }

        window.addEventListener('scroll', function(e) {
            (window.scrollY > 0) ? elms.arrowUp.classList.remove('opacity-null') : elms.arrowUp.classList.add('opacity-null');
        });
    }

    function touchGesture(e) {
        var threshold = touchendX - touchstartX;

        if (threshold > 60) {
            previousImage(e);
        }

        if (threshold < -60) {
            nextImage(e);
        }
    }

    function checkHash() {
        var hash = window.location.hash;

        // Check for about
        if (!!hash && hash.substring(1) === 'about') {
            console.log("open about")
            elms.overlayAbout.classList.add("about-overlay-open");
            elms.about.classList.add("open");

            elms.body.classList.add('no-scroll');
            elms.overlayCloseAbout.style.opacity = 1;

            for (var i = 0; i < elms.aboutAnimation.length; i++) {
                elms.aboutAnimation[i].classList.add('about-animation-' + i);
            }
        }

        // Check for individual elements
        if (!!hash && !!parseInt(hash.substring(1))) {
            if (hash.substring(1) > 0 && hash.substring(1) <= 100) {
                elms.grid.classList.add('hide');
                elms.body.classList.add('no-scroll');

                elms.overlay.removeAttribute("style");
                elms.overlay.classList.add("info-overlay-open");
                elms.overlay.classList.add("js-hash-call");
                elms.overlay.classList.add("info-overlay-open-index");
                elms.overlayMedia.classList.add('overlay-media-hidden');
                elms.artContent.classList.remove('slide-content-left');
                elms.afterBar.classList.remove('after-bar-full');

                var id = jsonFile.findIndex(function(el) {
                    return el.id === parseInt(hash.substring(1));
                });

                currentImage = id;

                elms.about.classList.add('overlay-open');

                displayArtworkInfo(currentImage, document.querySelectorAll("[data-id='"+ currentImage +"']")[0].lastChild.getAttribute("data-dominant"));
                changeImage(currentImage, "rgb(191, 191, 191)");

                setTimeout(function() {
                    var color = document.querySelectorAll("[data-id='"+ currentImage +"']")[0].lastChild.getAttribute("data-dominant");
                    elms.afterBar.style.backgroundColor = color;
                    // elms.afterBar.style.boxShadow = "0px 4px 5px 0px " + color;
                    elms.grid.classList.remove('hide');
                    elms.overlayMedia.classList.remove('overlay-media-hidden');
                }, 500);

            }
        } else {
            elms.overlay.classList.remove("info-overlay-open");
            elms.body.classList.remove("overflow");
        }
    }

    function preLoad(arr) {
        for (var i = 0; i < arr.length; i++) {
            var img = new Image();
            img.src = assetPath + arr[i];
        }

        return true;
    }

    function init() {

        loadJSON(function(response) {
            // Parse JSON string into object
            jsonFile = JSON.parse(response);

            jsonFile.sort(function (a, b) {
                return parseInt(a.id) - parseInt(b.id);
            });

            totalElements = jsonFile.length;

            jsonFile.forEach(function(el) {
                allImages.push(el.src);
            });

            var ready = preLoad(allImages);

            if(ready) {

                document.querySelector(".content").style.display = "block";
                if (isMobile() || window.innerWidth < 500) {
                    addMobileGrid();
                } else {
                    addDesktopGrid();
                }

                blazy();

                setTimeout(function() {
                    checkHash();
                },500);

                setTimeout(function(){
                    (window.scrollY > 0) ? elms.arrowUp.classList.remove('opacity-null') : elms.arrowUp.classList.add('opacity-null');
                }, 10);


            }
        });

        bindEvents();
        if (window.history && window.history.pushState) {
            window.onpopstate = function(e) {
                checkHash();

                if (window.location.hash == "") {
                    overlayClose(e, false);

                    elms.body.classList.remove('no-scroll');
                    elms.overlayAbout.classList.remove("about-overlay-open");
                    elms.about.classList.remove("open");
                    elms.overlayCloseAbout.style.opacity = 1;
                }
            }
        }

        window.onfocus = function() {
            blazy();
        }
    }

    init();
})();
