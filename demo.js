/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));

function countLines() {
    var el = document.getElementById('content');
    var divHeight = el.offsetHeight
    var lineHeight = parseInt(el.style.lineHeight);
    var lines = divHeight / lineHeight;
    alert("Lines: " + lines);
}


$("html").click(function () {
    $(".js-select-list").removeClass("active");
    $(".js-select").removeClass("active");
});

$(".js-keys-carousel-wrapper").each(function (i) {

    var el = $(this),
        current = $(this).find(".js-keys-carousel-current");

    el.find(".js-keys-carousel").slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        pauseOnHover: false,
        speed: 1000,
        responsive: []
    }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //slick.slideCount
        current.text(String(nextSlide + 1).padStart(2, '0'));
    });

});

$(".js-carousel").slick({

    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

});

$(".js-shiftbox-carousel").slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    pauseOnHover: false,
    speed: 1000,
    responsive: []
});

$(".js-service-container").each(function (i) {

    var container = $(this),
        preview = $(".js-service-copy"),
        els = container.find(".js-service"),
        test = $("<div>", {}).css({
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "100%"
        }),
        mw = 0;

    test.appendTo(preview);

    els.each(function (n) {
        var el = $(this),
            caption = el.find(".js-service-caption"),
            content = el.find(".js-service-content");

        test.html(content.clone());
        tw = test.height();

        if (tw > mw) {
            mw = tw;
            container.css({
                "min-height": mw
            });
        }

        test.remove();


        caption.click(function (e) {
            e.preventDefault();
            el.addClass("active").siblings().removeClass("active");
            if (!preview.hasClass("hidden")) {
                preview.addClass("hidden").removeClass("active");
                setTimeout(function () {
                    var contentCopy = content.clone();
                    preview.html(null).append(contentCopy).show().toggleClass("hidden active");
                    aosRefresh();
                }, 250);
            }

            return;
        });

    });

    els.first().find(".js-service-caption").trigger("click");

});

$(".js-formtab").click(function (e) {
    e.preventDefault();
    var pane = $(this).data("pane");
    $(pane).addClass("active").siblings().removeClass("active");
    $(this).addClass("active").siblings().removeClass("active");
    aosRefresh();
});

var scrollPosition = 0;

$(".js-headroom").each(function (i) {
    var headroom = $(this),
        top = headroom.offset().top,
        content = $(".js-headroom-clone").clone(true, true);;

    headroom.find(".js-headroom-content").html(content);

    $(window).on("scroll", function () {

        var wt = $(this).scrollTop();

        if (wt > top) {

            if (!headroom.hasClass("init")) {
                headroom.addClass("init");
            }

            headroom.toggleClass("active", wt < scrollPosition);

        } else {
            headroom.removeClass("active");
        }

        scrollPosition = wt;

    });


});

$(".js-marquee").each(function (i) {

    var runner = $(this),
        content = runner.find(".js-marquee-content"),
        mw = runner.width(),
        rw = content.width(),
        els = content.children(),
        stop = 0;

    if (mw > rw) {
        while (stop != 1) {

            els.each(function (el) {

                $(this).clone().appendTo(content);

            });

            rw = content.width();

            if (mw < rw) {

                stop = 1;

            }

        }
    }

    $(window).on("scroll", function () {

        var wt = $(this).scrollTop(),
            wh = $(this).height(),
            top = runner.offset().top,
            k = wh / 10,
            startPos = top - (k * 10), //10
            endPos = top - (k * -10), //1
            rw = content.width(),
            slide = mw - rw;


        if (wt <= endPos) {
            if (wt >= startPos) {
                var perc = 100 - ((endPos - wt) * 100 / (endPos - startPos));

                if (perc > 100) {
                    perc = 100;
                }

                if (perc < 0) {
                    perc = 0;
                }

                content.css({
                    transform: "translateX(" + (perc * slide / 100) + "px)"
                });
            } else {
                content.css({
                    transform: "translateX(0)"
                });
            }
        } else {
            content.css({
                transform: "translateX(" + slide + "px)"
            });
        }

    });

});

function runnerUpdate(runner, content) {

    runner.html(null).append(content);

    var vw = $(window).width(),
        rw = content.width(),

        start = $("<div>", {
            class: "runner-start",
            html: content.clone()
        }),
        end = $("<div>", {
            class: "runner-end",
            html: content.clone()
        });

    if (rw < vw) {
        var k = Math.floor(vw / rw);
        while (k > 0) {
            content.clone().appendTo(start);
            content.clone().appendTo(end);
            k--;
        }
    }

    runner.html(null);
    runner.append(start);
    runner.append(end);


}

$(".js-runner").each(function (i) {
    var runner = $(this),
        container = runner.find(".js-runner-content"),
        content = container.clone();

    runnerUpdate(runner, content);

    $(window).on('resize', function () {
        runnerUpdate(runner, content);
    });

});

$(".js-switch").each(function (i) {

    var s = $(this),
        row = s.find(".js-switch-tabs"),
        tabs = row.find(".js-switch-tab"),
        panes = row.find(".js-switch-pane"),
        preview = s.find(".js-switch-copy"),
        sensor = row.find(".js-switch-sensor");

    tabs.each(function (el) {

        var pane = $(this).data("pane"),
            content = $(pane);

        if (!el) {

            var contentCopy = content.clone();
            preview.html(null).append(contentCopy).addClass("active");
        }

        $(this).click(function (e) {
            e.preventDefault();

            var
                tleft = $(this).position().left,
                twidth = $(this).width();

            $(this).addClass("active").siblings().removeClass("active");

            if (!preview.hasClass("hidden")) {
                preview.addClass("hidden").removeClass("active");
                setTimeout(function () {
                    var contentCopy = content.clone();
                    preview.html(null).append(contentCopy).show().toggleClass("hidden active");
                    aosRefresh();
                }, 250);
            }
            sensor.css({
                left: tleft,
                width: twidth
            });
        });
    });

    tabs.first().trigger("click");

});

function lineSplitter(el) {

    var c = el.find(".js-karaoke-content"),
        t = c.html(),
        p = t.replace(/(<([^>]+)>)/ig, ''),
        vh = $(window).height(),
        mask = el.find(".js-karaoke-mask"),
        test = $("<div>", {}).css({
            position: "absolute",
            visibility: "hidden",
            height: "auto",
            width: "auto",
            "white-space": "nowrap"
        });

    el.append(test);

    mask.html(null);
    c.html(null);

    var allWords = p.match(/\S+/g);
    var lines = [];
    var currentLine = "";

    for (var i = 0; i < allWords.length; i++) {
        // Build a new line and check if it is now too large for the container
        var newLine = currentLine + allWords[i] + " ";
        test.html(newLine);
        if (test.width() > el.width()) {
            // If the line is now larger, use the previous line (without the last added word) and reset the current line to just the last word
            lines.push(currentLine.trim());
            currentLine = allWords[i] + " ";
        } else {
            // If it's not long enough yet, just keep adding words
            currentLine = newLine;
        }
    }

    lines.push(currentLine.trim());

    for (var i = 0; i < lines.length; i++) {

        var line = $("<span>", {
            html: lines[i] + " "
        });

        line.clone().attr("data-aos", true).attr("data-aos-offset", vh / 3).appendTo(mask); //.css({"transition-delay": (i * 0.25) + "s"})
        line.clone().appendTo(c);

    }

    // el.append(mask);
    test.remove();

}

$(".js-karaoke").each(function (i) {

    lineSplitter($(this));

});

$(".js-formtoggle").click(function (e) {

    var toggleButton = $(this);

    if (!$(this).hasClass("active")) {
        e.preventDefault();

        var content = $(this).find(".js-formbox-content");

        $(this).addClass("active");
        content.slideDown(500, function () {

            var formOffset = 0;

            if ($(".js-mainnav").length) {
                formOffset = $(".js-mainnav").height() * 3;
            }

            $("html, body").animate({
                scrollTop: content.offset().top - formOffset
            }, 500, function () {
                //$(".js-headroom").removeClass("active");
            });

            $(this).css({
                opacity: 1
            });

            aosRefresh();

        });
    }
});

function aosRefresh() {

    AOS.refresh();

}

$(".js-aos").each(function (i) {

    var vh = $(window).height();

    if (!$(this).hasClass("aos-animate")) {
        $(this).attr("data-aos", true).attr("data-aos-offset", vh / 3).attr("data-aos-once", "true");
    }

});


$(".js-menu-toggle").click(function (e) {
    e.preventDefault();
    if ($(this).parents(".header").length && $(window).scrollTop() > 0) {
        $("html, body").animate({
            scrollTop: 0
        }, 250, function () {
            $(".document").addClass("menu-active");
        });
    } else {
        $(".document").toggleClass("menu-active");

    }

    return;
});
/*
$(".pane").each(function (el) {
    var crossClone = $(".js-pane-cross").clone();

    crossClone.removeClass("js-pane-cross").prependTo($(this));

    $(this).mousemove(function (e) {

        var parentOffset = $(this).offset();

        crossClone.find("div").css({
            left: e.pageX - parentoffset().left,
            top: e.pageY - parentoffset().top
        });
    });

});
*/

var $id1, $id2;

$(".js-select").each(function (i) {
    var select = $(this),
        dd = select.find(".js-select-list"),
        holder = select.find(".js-select-holder"),
        form = select.closest("form"),
        chips = form.find(".checkbox-control");

    select.addClass("hidden");

    form.change(function () {
        var selectedChips = chips.filter(function (el) {
            return $(this).prop("checked");
        }).length;
        if (selectedChips) {
            select.removeClass("hidden");
        } else {
            select.addClass("hidden");
        }
        console.log('Change checkbox');
        $id1 = '';
        $('.checkbox-control').each(function () {
            if ($(this).is(":checked")) {
                $id1 = $id1 + $(this).parent().find('.checkbox-label').text() + ' ';
            }
        });
        console.log($id1);
        $('input[name="idd1"]').val($id1);
    })

    $(".document").prepend(dd);

    select.click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        pos = select.offset(),
            pl = pos.left,
            pt = pos.top + select.outerHeight();
        dd.css({
            left: pl,
            top: pt,
            "max-width": select.outerWidth()
        }).toggleClass("active");
        select.toggleClass("active");
    });

    dd.find(".js-select-option").click(function (e) {
        e.stopPropagation();
        var v = $(this).text();
        holder.val(v);
        $(this).addClass("active").siblings().removeClass("active");
        dd.removeClass("active");
        select.removeClass("active");
        console.log('Change select');
        console.log(v);
        $('input[name="idd2"]').val(v);
        return;
    });

});

$(document).on('click','.formbox-content .heartbox_icon',function(e){
    $(this).closest('.heartbox').find('.wpcf7-submit').click();
});

$('.formss h2, .formss i.formss-heart').on("click", function(){
    if (!$(this).hasClass('show')) {
        document.getElementsByClassName("js-fab")[0].click();
        $parent = $(this).closest('.formss-wrap');
        $parent.find('.formss-heart').toggleClass('no-active');
        $parent.find('.toggle-formss').slideToggle('333');
        $('.formss h2, .formss i.formss-heart').addClass('show');
    }
    return false;
});

$('.checkbox-select input[type="checkbox"]').change(function() {
    var ii;
    ii = 0;
    $('input[type=checkbox]').each(function () {
        if ($(this).is(':checked')) {
            ii++;
        }
    });
    console.log(ii);
    if (ii != 0) {
        $('.selectbox').addClass("visible");
        console.log('Select - visible');
    } else {
        $('.selectbox').removeClass("visible");
        console.log('Select - hidden');
    }
});

$(document).on('click','.wpcf7-list-item-label',function(e){
    $(this).toggleClass('choise');
});

// wpcf7mailsent wpcf7submit
document.addEventListener( 'wpcf7mailsent', function( event ) {
    if ( '1252' == event.detail.contactFormId ) {
        $('.formss h2').fadeOut("333", function(){
            $('.formss h2').text("Thanks! We'll be in touch.").fadeIn("333");
        });
        $("#contact .formss").css("padding-top", $xxx);
        $parent = $('.formss .formss-wrap');
        $parent.find('.formss-heart').toggleClass('no-active');
        $parent.find('.toggle-formss').slideToggle('333');
        setTimeout(function() {
            aosRefresh();
            $('.to-formss').click();
            history.pushState('', document.title, window.location.pathname);
        }, 1000);

    }
}, false );

$('.toggle-formss').show();
$heightform = $('.formss-wrap').outerHeight();
$heightformcaption = $('.formss-wrap h2').height();
$('.toggle-formss').hide();
$xx = ($(window).height() - $heightform - $('.formss-wrap h2').height()) / 2;
$xxx = ($(window).height() - $heightformcaption) / 2;
if ($xx < 0) { $xx = 0; }
$("#contact .formss").css("padding-top", $xx);


$('.js-fab').on("click", function(){
    //$('a.to-formss').trigger('click');
    aosRefresh();
    $('.to-formss').click();

    setTimeout(function() {
        $('.formss h2').click();
    }, 1000);

    //$('html, body').animate({
    //	scrollTop: $('.formss').offset().top - ($(window).height() / 4)
    //}, 2000, function() {

    //});
    //aosRefresh();
    //return false;
});






var fab = $(".js-fab");

//fab.click(function (e) {
//    form = $(".js-formtoggle");
//    if (form.length) {
//        e.preventDefault();
//       form.trigger("click");
//   }
//});

function logoChanger() {

}

// Autorun
$(function () {

    var footer = $(".footer");

    var logoTimerStart = false,
        logoTimer,
        clientsArr = [];

    $(window).on('resize', function () {

        $(".js-karaoke").each(function (i) {
            lineSplitter($(this));
        });

    }).scroll(function () {
        //fab.toggleClass(
        //    "active",
        //     (fab.offset().top - $(window).height()) < $(window).scrollTop() &&
        //    (footer.offset().top - $(window).height()) > $(window).scrollTop()
        // );
    })
        .on('ready', function () {

            fab.addClass('active');

            var clientsGrid = $(".clients > .client");
            clientsGrid.each(function (i) {

                var img = $(this).find("img");
                clientsArr[i] = img;

            });

            $(this).resize();

        })
        .on('resize', function () {

            var clientsHidden = [];
            var num = 0;
            var clientsVisible = [];
            var clientsGrid = $(".clients > .client");

            clientsGrid.each(function (i) {

                var el = $(this),
                    imgsrc = clientsArr[i];

                $(this).html(null).append(imgsrc.clone());

                var img = $(this).find("img");

                if (el.is(':hidden')) {
                    clientsHidden.push(img);
                } else {
                    clientsVisible.push(img);
                    num = i;
                }

            });

            if (logoTimerStart) {
                logoTimerStart = false;
                clearInterval(logoTimer);
            }

            if (!logoTimerStart && clientsHidden.length) {

                logoTimerStart = true;
                logoTimer = setInterval(function () {

                    var randomnumber = Math.floor(Math.random() * (num - 0 + 1)) + 0,
                        cell = clientsGrid.eq(randomnumber),
                        currentImage = clientsVisible[randomnumber],
                        nextImage = clientsHidden[0];


                    nextImage.hide().addClass("hidden").removeClass("visible").prependTo(cell).show().toggleClass("visible hidden");
                    clientsHidden.shift();
                    clientsVisible[randomnumber] = nextImage;
                    clientsHidden.push(currentImage);



                }, 2000);

            }




        }).trigger('ready');

    if ($(".document").hasClass("loading") || $(".document").hasClass("loading1")) {
        var
            vc = $(window).height() / 2,
            t = $(".js-header-title"),
            th = t.height(),
            tc = t.offset().top + th / 2,
            m = vc - tc;

        if (m > 0) {
            t.css({
                'margin-top': m
            });
        }

        var tick = 0

        if ($(".document").hasClass("loading")) {

            var preloader = setInterval(function () {
                tick++;

                $(window).scrollTop(0);

                if (tick == 1) {
                    $(".loading").addClass("loading-phase-1");
                    $(".logo-cut").each(function () {
                        $(this).css({
                            'max-width': $(this).width()
                        });
                    });
                }

                if (tick == 2) {
                    $(".loading").addClass("loading-phase-2");
                }

                //return;
                if (tick == 3) {
                    $(".loading").addClass("loading-phase-3");
                }

                if (tick == 5) {
                    $(".loading").addClass("loading-phase-4");
                }

                if (tick == 6) {
                    $(".loading").addClass("loading-phase-5");
                }

                if (tick == 7) {
                    $(".loading").removeClass("loading");
                    clearTimeout(preloader);
                    $(".js-active-header").mousemove(function (e) {
                        $(".js-cross").css({
                            left: e.pageX,
                            top: e.pageY
                        });
                    }).mouseleave(function () {
                        $(".js-cross").removeAttr("style");
                    });
                }

            }, 1000);

        } else {
            if ($(".document").hasClass("loading1")) {

                $(".js-active-header").mousemove(function (e) {
                    $(".js-cross").css({
                        left: e.pageX,
                        top: e.pageY
                    });
                }).mouseleave(function () {
                    $(".js-cross").removeAttr("style");
                });

            }
        }

    }

    $(".js-dropdown-layer-text").css({
        left: $(".js-dropdown-layer-marker").offset().left
    });

    var dropdownLayer = $(".js-dropdown-layer");

    if (dropdownLayer.length) {

        $(".js-dropdown").each(function (i) {
            var list = $(this).find(".js-dropdown-list"),
                bottom = list.outerHeight() + list.offset().top - dropdownLayer.offset().top;
            $(this).on("mouseenter", function () {
                $(this).addClass("hover");
                dropdownLayer.addClass("active").height(bottom);
            });
        });

        $(".js-mainnav").on("mouseleave", function () {
            $(".js-dropdown").removeClass("hover");
            dropdownLayer.removeClass("active").height(0);
        });

    }

    $(".js-award").each(function (i) {
        var award = $(this),
            header = $(this).find(".js-award-header"),
            content = $(this).find(".js-award-content");

        header.click(function (e) {
            e.preventDefault();
            content.slideToggle();
            award.siblings(".active").find(".js-award-content").slideUp();
            award.toggleClass("active").siblings().removeClass("active");
        });

        var timer = null;

        $(this).on("mouseenter", function () {
            if (!$(this).hasClass("hover")) {
                award.addClass("hover");
                setTimeout(function () {
                    award.removeClass("hover");
                    console.log(1);
                }, 500);
            }

        });

    });

    function menuFollow(w, o) {
        var bar = $(".js-topnav-follow-bar");
        bar.css({
            width: w,
            left: o
        });
    }

    $(window).on("scroll", function () {

        $(".js-mainnav").toggleClass("active", $(this).scrollTop() > 0);

    });

    var shiftboxCurrent = $(".js-shiftbox-current");

    $(".js-shiftbox-carousel").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        //slick.slideCount
        shiftboxCurrent.text(String(nextSlide + 1).padStart(2, '0'));
    });

    $(".js-shiftbox-prev").click(function (e) {
        $(".js-shiftbox-carousel").slick('slickPrev');
    });
    $(".js-shiftbox-next").click(function (e) {
        $(".js-shiftbox-carousel").slick('slickNext');
    });


});

function utmget(){

    $('input[name="ip"]').val($('.ip').text()); console.log('IP: ' + $('.ip').text());
    $('input[name="ipdetails"]').val('https://whatismyipaddress.com/ip/' + $('.ip').text());
    $('input[name="urll"]').val($('.url').text()); console.log('URL: ' + $('.url').text());
    $('input[name="urlback"]').val($('.urlback').html()); console.log('URL back: ' + $('.urlback').html());

    $('input[name="datas-message"]').val($('.datas').html()); console.log('Data server: ' + $('.datas').html());
    $('input[name="times-message"]').val($('.times').html()); console.log('Time server: ' + $('.times').html());

    var currentdate = new Date();
    $('input[name="datac-message"]').val((currentdate.getMonth()+1) + '.' + currentdate.getDate() + '.' + currentdate.getFullYear()); console.log('Data client: ' + currentdate.getDate() + '.' + (currentdate.getMonth()+1) + '.' + currentdate.getFullYear());
    $('input[name="timec-message"]').val(currentdate.getHours() + '-' + currentdate.getMinutes()); console.log('Time client: ' + currentdate.getHours() + '-' + currentdate.getMinutes());

    var self = window.location.toString(); console.log(self);
    var querystring = self.split("?"); console.log(querystring);
    if (querystring.length > 1) {
        var pairs = querystring[1].split("&"); console.log(pairs);
        for (i in pairs) {
            var keyval = pairs[i].split("=");
            console.log(keyval[0]);
            console.log(keyval[1]);
            //Cookies.remove(keyval[0], { expires: 7, path: '/', domain: '.dd.nyc' });
            //alert(keyval[0]);
            Cookies.set(keyval[0], keyval[1], { expires: 7, path: '/', domain: '.dd.nyc' });
        }
    }
    if (Cookies.get('utm_source', { domain: '.dd.nyc' })) {
        $('input[name="utm_source"]').val(Cookies.get('utm_source', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_source', { domain: '.dd.nyc' }));
    }
    if (Cookies.get('utm_medium', { domain: '.dd.nyc' })) {
        $('input[name="utm_medium"]').val(Cookies.get('utm_medium', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_medium', { domain: '.dd.nyc' }));
    }
    if (Cookies.get('utm_campaign', { domain: '.dd.nyc' })) {
        $('input[name="utm_campaign"]').val(Cookies.get('utm_campaign', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_campaign', { domain: '.dd.nyc' }));
    }
    if (Cookies.get('utm_id', { domain: '.dd.nyc' })) {
        $('input[name="utm_id"]').val(Cookies.get('utm_id', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_id', { domain: '.dd.nyc' }));
    }
    if (Cookies.get('utm_content', { domain: '.dd.nyc' })) {
        $('input[name="utm_content"]').val(Cookies.get('utm_content', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_content', { domain: '.dd.nyc' }));
    }
    if (Cookies.get('utm_term', { domain: '.dd.nyc' })) {
        $('input[name="utm_term"]').val(Cookies.get('utm_term', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_term', { domain: '.dd.nyc' }));
    }
    if (Cookies.get('utm_id', { domain: '.dd.nyc' })) {
        $('input[name="utm_id"]').val(Cookies.get('utm_id', { domain: '.dd.nyc' })); console.log(Cookies.get('utm_id', { domain: '.dd.nyc' }));
    }
    history.pushState('', document.title, window.location.pathname);

}
setTimeout(function(){ utmget(); }, 5000);

var origTitle = document.title;

window.addEventListener('focus', function() {
    document.title = origTitle;
},false);

window.addEventListener('blur', function() {
    document.title = 'Мы скучаем по тебе!';
},false);