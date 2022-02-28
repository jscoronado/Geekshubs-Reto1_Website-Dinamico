"use strict";

function parallaxImages(t) {
    this.isSetTransiton = !1, this.classSections = "content-parallax", this.classImages = "parallax-image", this.init = function () {
        t && (this.classSections = t.classSections ? t.classSections : this.classSections, this.classImages = t.classImages ? t.classImages : this.classImages), this.scrolling()
    }, this.setTransitons = function () {
        for (var t = document.getElementsByClassName(this.classImages), e = 0; e < t.length; e++) {
            var a = t[e], o = a.getAttribute("data-transiton");
            o = "all " + (o = o || "0.1s"), a.style.transition = o
        }
    }, this.scrolling = function () {
        var t = this, e = this.classSections, a = this.classImages, o = void 0, c = document.getElementsByClassName(a),
            n = document.getElementsByClassName(e);
        window.addEventListener("scroll", function (e) {
            var a = this.pageYOffset;
            o || function () {
                o = [];
                for (var t = 0; t < n.length; t++) o[n[t].id] = n[t].offsetTop
            }();
            for (var s = 0; s < c.length; s++) {
                var i = c[s], r = i.getAttribute("data-speed"), l = i.getAttribute("data-parent-section"),
                    d = -(a - o[l]) * r / 100;
                i.style.webkitTransform = "translate3d(0px, " + d + "px, 0px)", i.style.MozTransform = "translate3d(0px, " + d + "px, 0px)", i.style.msTransform = "translate3d(0px, " + d + "px, 0px)", i.style.OTransform = "translate3d(0px, " + d + "px, 0px)", i.style.transform = "translate3d(0px, " + d + "px, 0px)"
            }
            t.isSetTransiton || (t.setTransitons(), t.isSetTransiton = !0)
        })
    }
}

function pluginAnimations(t) {
    var e = this;
    this.sections = [], this.currentSection = [], this.configBgColors = t.bgColors, this.configParticles = t.particles, this.header = document.getElementById("header"), this.bodyElement = document.getElementsByTagName("main")[0], this.bodyTag = document.getElementsByTagName("body")[0],this.init = function () {
        e.sections = e.mapSections(), e.currentSection = e.findSection(), e.resizing(), e.scrolling()
    }, this.addTransition = function () {
        var t = "background-color " + e.configBgColors.timeTransition;
        e.bodyElement.style.transition = t
    }, this.mapSections = function () {
        for (var t = [], a = document.getElementsByClassName(e.configBgColors.className), o = 0; o < a.length; o++) {
            var c = /bg_\w*/.exec(a[o].className)[0].replace("bg", "");
            c && (a[o].bgColorClass = c, a[o].bgColor = configColorsBg[c].color, a[o].offset = a[o].dataset.bgOffset ? parseInt(a[o].dataset.bgOffset) : e.configBgColors.offset, a[o].particlesColor = a[o].dataset.particlesColor ? a[o].dataset.particlesColor : "_primary_beige", a[o].particlesAlpha = !!a[o].dataset.particlesAlpha && parseFloat(a[o].dataset.particlesAlpha), a[o].showParticles = a[o].classList.contains("section-bg-particles"), a[o].classList.contains("percentual-divider-start") && (a[o].percentualDividerId = a[o].dataset.percentualDividerId), t.push(a[o]))
        }
        return t
    }, this.findSection = function () {
        for (var t = window.scrollY, a = 0; a < e.sections.length; a++) {
            var o = e.sections[a];
            if (o.offsetTop - e.sections[a].offset + o.offsetHeight > t) return a
        }
    }, this.setBackground = function (t) {
        var a = document.getElementsByClassName(e.configBgColors.className);
        if (e.configBgColors.dynamicBackgrounds) {
            for (var o = 0; o < a.length; o++) "static" !== a[o].dataset.colorChange && (t ? a[o].style.backgroundColor = "" : a[o].setAttribute("style", "background-color:transparent !important"));
            e.sections[e.currentSection] && (e.bodyElement.style.backgroundColor = t ? "" : e.sections[e.currentSection].bgColor)
        }
    }, this.responsiveMobile = function (t) {
    }, this.resizing = function () {
        e.bodyElement.classList.remove("dynamic-backgrounds"), e.configBgColors.dynamicBackgrounds && window.innerWidth > 992 && (e.bodyElement.classList.add("dynamic-backgrounds"), e.setBackground(!1)), e.responsiveMobile(window.innerHeight);
        var t = e;
        window.addEventListener("resize", function (e) {
            t.responsiveMobile(this.innerHeight), t.configBgColors.dynamicBackgrounds && this.innerWidth > 992 ? (t.bodyElement.classList.add("dynamic-backgrounds"), t.setBackground(!1)) : (t.bodyElement.classList.remove("dynamic-backgrounds"), t.setBackground(!0))
        })
    }, this.scrolling = function () {
        var t = e, a = !1, o = !1, c = !1, n = "_primary_beige", s = !1, i = !1;
        window.addEventListener("scroll", function (e) {
            var r = this.pageYOffset;
            if (t.sections[t.currentSection]) {
                var l = t.sections[t.currentSection], d = t.configBgColors.offset;
                this.innerWidth >= 1200 && (d = t.sections[t.currentSection + 1] ? t.sections[t.currentSection + 1].offset : t.sections[t.currentSection].offset);
                if (l.offsetTop - d + l.offsetHeight > r) {
                    var m = t.sections[t.currentSection].bgColor, p = t.sections[t.currentSection].bgColorClass;
                    t.configBgColors.dynamicBackgrounds && (t.bodyElement.style.backgroundColor = m), configColorsBg[p].isLightBg ? t.bodyTag.classList.add("content-text-dark") : t.bodyTag.classList.remove("content-text-dark"), l.percentualDividerId && i != l.percentualDividerId && document.getElementById(l.percentualDividerId).classList.add("animate-divider"), o = configColorsBg[p].isLightBg, n = l.particlesColor, s = l.particlesAlpha, c = l.showParticles, i = l.percentualDividerId, t.currentSection > 0 && t.currentSection--
                } else t.currentSection < t.sections.length - 1 && t.currentSection++;
                a || (t.addTransition(), a = !0)
            }
            r > 5 ? t.header.classList.add("fixed-top-active") : (header.classList.remove("fixed-top-active"), header.style.backgroundColor = "transparent")
        })
    }
}

var configColorsBg = {
    _primary_red: {color: "#c23c48"},
    _primary_black: {color: "#2b2b2b"},
    _primary_beige: {color: "#efe1d9", isLightBg: !0},
    _secondary: {color: "#072744"},
    _white: {color: "#ffffff", isLightBg: !0},
    _black: {color: "#2b2b2b"}
};