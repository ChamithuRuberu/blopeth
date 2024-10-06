( () => {
    "use strict";
    const t = {};
    function e() {
        if (location.hash)
            return location.hash.replace("#", "")
    }
    let o = !0
      , s = (t=500) => {
        document.documentElement.classList.contains("lock") ? a(t) : c(t)
    }
      , a = (t=500) => {
        if (o) {
            const e = document.querySelectorAll("[data-lp]");
            setTimeout(( () => {
                e.forEach((t => {
                    t.style.paddingRight = ""
                }
                )),
                document.body.style.paddingRight = "",
                document.documentElement.classList.remove("lock")
            }
            ), t),
            o = !1,
            setTimeout((function() {
                o = !0
            }
            ), t)
        }
    }
      , c = (t=500) => {
        if (o) {
            const e = document.querySelectorAll("[data-lp]")
              , s = window.innerWidth - document.body.offsetWidth + "px";
            e.forEach((t => {
                t.style.paddingRight = s
            }
            )),
            document.body.style.paddingRight = s,
            document.documentElement.classList.add("lock"),
            o = !1,
            setTimeout((function() {
                o = !0
            }
            ), t)
        }
    }
    ;
    function n() {
        a(),
        document.documentElement.classList.remove("menu-open")
    }
    function r(t) {
        setTimeout(( () => {
            window.FLS && console.log(t)
        }
        ), 0)
    }
    function i(t) {
        return t.filter((function(t, e, o) {
            return o.indexOf(t) === e
        }
        ))
    }
    if (!window.navigator.userAgent.match(/Trident\/7\./, [])) {
        const t = document.querySelectorAll("video");
        !function() {
            const t = window.navigator
              , e = t.userAgent.toLowerCase()
              , o = !(!t.mediaCapabilities || !t.mediaCapabilities.decodingInfo);
            return -1 != e.indexOf("safari") && !(-1 != e.indexOf("chrome")) && -1 != e.indexOf("version/") && o
        }() ? t.forEach((t => {
            let e = t.getAttribute("src");
            e += "webm",
            t.setAttribute("src", e)
        }
        )) : t.forEach((t => {
            let e = t.getAttribute("src");
            e += "mov",
            t.setAttribute("src", e),
            t.setAttribute("type", "video/quicktime")
        }
        ))
    }
    let l = (t, e=!1, o=500, s=0) => {
        const a = document.querySelector(t);
        if (a) {
            let c = ""
              , i = 0;
            if (e) {
                c = "header.header";
                const t = document.querySelector(c);
                t.classList.contains("_header-scroll") ? i = t.offsetHeight : (t.style.cssText = "transition-duration: 0s;",
                t.classList.add("_header-scroll"),
                i = t.offsetHeight,
                t.classList.remove("_header-scroll"),
                setTimeout(( () => {
                    t.style.cssText = ""
                }
                ), 0))
            }
            let l = {
                speedAsDuration: !0,
                speed: o,
                header: c,
                offset: s,
                easing: "easeOutQuad"
            };
            if (document.documentElement.classList.contains("menu-open") && n(),
            "undefined" != typeof SmoothScroll)
                (new SmoothScroll).animateScroll(a, "", l);
            else {
                let t = a.getBoundingClientRect().top + scrollY;
                t = i ? t - i : t,
                t = s ? t - s : t,
                window.scrollTo({
                    top: t,
                    behavior: "smooth"
                })
            }
            r(`[gotoBlock]: Юхуу...їдемо до ${t}`)
        } else
            r(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${t}`)
    }
    ;
    t.watcher = new class {
        constructor(t) {
            this.config = Object.assign({
                logging: !0
            }, t),
            this.observer,
            !document.documentElement.classList.contains("watcher") && this.scrollWatcherRun()
        }
        scrollWatcherUpdate() {
            this.scrollWatcherRun()
        }
        scrollWatcherRun() {
            document.documentElement.classList.add("watcher"),
            this.scrollWatcherConstructor(document.querySelectorAll("[data-watch]"))
        }
        scrollWatcherConstructor(t) {
            if (t.length) {
                this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${t.length})...`),
                i(Array.from(t).map((function(t) {
                    if ("navigator" === t.dataset.watch && !t.dataset.watchThreshold) {
                        let e;
                        t.clientHeight > 2 ? (e = window.innerHeight / 2 / (t.clientHeight - 1),
                        e > 1 && (e = 1)) : e = 1,
                        t.setAttribute("data-watch-threshold", e.toFixed(2))
                    }
                    return `${t.dataset.watchRoot ? t.dataset.watchRoot : null}|${t.dataset.watchMargin ? t.dataset.watchMargin : "0px"}|${t.dataset.watchThreshold ? t.dataset.watchThreshold : 0}`
                }
                ))).forEach((e => {
                    let o = e.split("|")
                      , s = {
                        root: o[0],
                        margin: o[1],
                        threshold: o[2]
                    }
                      , a = Array.from(t).filter((function(t) {
                        let e = t.dataset.watchRoot ? t.dataset.watchRoot : null
                          , o = t.dataset.watchMargin ? t.dataset.watchMargin : "0px"
                          , a = t.dataset.watchThreshold ? t.dataset.watchThreshold : 0;
                        if (String(e) === s.root && String(o) === s.margin && String(a) === s.threshold)
                            return t
                    }
                    ))
                      , c = this.getScrollWatcherConfig(s);
                    this.scrollWatcherInit(a, c)
                }
                ))
            } else
                this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz")
        }
        getScrollWatcherConfig(t) {
            let e = {};
            if (document.querySelector(t.root) ? e.root = document.querySelector(t.root) : "null" !== t.root && this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${t.root} немає на сторінці`),
            e.rootMargin = t.margin,
            !(t.margin.indexOf("px") < 0 && t.margin.indexOf("%") < 0)) {
                if ("prx" === t.threshold) {
                    t.threshold = [];
                    for (let e = 0; e <= 1; e += .005)
                        t.threshold.push(e)
                } else
                    t.threshold = t.threshold.split(",");
                return e.threshold = t.threshold,
                e
            }
            this.scrollWatcherLogging("йой, налаштування data-watch-margin потрібно задавати в PX або %")
        }
        scrollWatcherCreate(t) {
            this.observer = new IntersectionObserver(( (t, e) => {
                t.forEach((t => {
                    this.scrollWatcherCallback(t, e)
                }
                ))
            }
            ),t)
        }
        scrollWatcherInit(t, e) {
            this.scrollWatcherCreate(e),
            t.forEach((t => this.observer.observe(t)))
        }
        scrollWatcherIntersecting(t, e) {
            t.isIntersecting ? (!e.classList.contains("_watcher-view") && e.classList.add("_watcher-view"),
            this.scrollWatcherLogging(`Я бачу ${e.classList}, додав клас _watcher-view`)) : (e.classList.contains("_watcher-view") && e.classList.remove("_watcher-view"),
            this.scrollWatcherLogging(`Я не бачу ${e.classList}, прибрав клас _watcher-view`))
        }
        scrollWatcherOff(t, e) {
            e.unobserve(t),
            this.scrollWatcherLogging(`Я перестав стежити за ${t.classList}`)
        }
        scrollWatcherLogging(t) {
            this.config.logging && r(`[Спостерігач]: ${t}`)
        }
        scrollWatcherCallback(t, e) {
            const o = t.target;
            this.scrollWatcherIntersecting(t, o),
            o.hasAttribute("data-watch-once") && t.isIntersecting && this.scrollWatcherOff(o, e),
            document.dispatchEvent(new CustomEvent("watcherCallback",{
                detail: {
                    entry: t
                }
            }))
        }
    }
    ({});
    let d = !1;
    setTimeout(( () => {
        if (d) {
            let t = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(t)
            }
            ))
        }
    }
    ), 0),
    document.documentElement.classList.contains("loading") || window.addEventListener("load", (function() {
        setTimeout((function() {
            document.documentElement.classList.add("loaded")
        }
        ), 0)
    }
    )),
    document.querySelector(".icon-menu") && document.addEventListener("click", (function(t) {
        o && t.target.closest(".icon-menu") && (s(),
        document.documentElement.classList.toggle("menu-open"))
    }
    )),
    function() {
        const t = document.querySelectorAll("[data-clipboardBtn]");
        t.length && t.forEach((t => {
            t.addEventListener("click", ( () => {
                const e = t.closest("[data-clipboard]");
                if (e) {
                    const o = e.querySelector("[data-clipboardEl]").textContent.trim()
                      , s = e.querySelector("[data-cnHint]");
                    async function a(t) {
                        try {
                            await navigator.clipboard.writeText(t)
                        } catch (t) {
                            s.textContent = "Doesn't copied"
                        } finally {
                            setTimeout(( () => {
                                e.classList.remove("active")
                            }
                            ), 1e3)
                        }
                    }
                    e.classList.add("active"),
                    a(o)
                }
            }
            ))
        }
        ))
    }(),
    function() {
        function o(e) {
            if ("click" === e.type) {
                const o = e.target;
                if (o.closest("[data-goto]")) {
                    const s = o.closest("[data-goto]")
                      , a = s.dataset.goto ? s.dataset.goto : ""
                      , c = !!s.hasAttribute("data-goto-header")
                      , r = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : 500
                      , i = s.dataset.gotoTop ? parseInt(s.dataset.gotoTop) : 0;
                    if (t.fullpage) {
                        const e = document.querySelector(`${a}`).closest("[data-fp-section]")
                          , o = e ? +e.dataset.fpId : null;
                        null !== o && (t.fullpage.switchingSection(o),
                        document.documentElement.classList.contains("menu-open") && n())
                    } else
                        l(a, c, r, i);
                    e.preventDefault()
                }
            } else if ("watcherCallback" === e.type && e.detail) {
                const t = e.detail.entry
                  , o = t.target;
                if ("navigator" === o.dataset.watch) {
                    document.querySelector("[data-goto]._navigator-active");
                    let e;
                    if (o.id && document.querySelector(`[data-goto="#${o.id}"]`))
                        e = document.querySelector(`[data-goto="#${o.id}"]`);
                    else if (o.classList.length)
                        for (let t = 0; t < o.classList.length; t++) {
                            const s = o.classList[t];
                            if (document.querySelector(`[data-goto=".${s}"]`)) {
                                e = document.querySelector(`[data-goto=".${s}"]`);
                                break
                            }
                        }
                    t.isIntersecting ? e && e.classList.add("_navigator-active") : e && e.classList.remove("_navigator-active")
                }
            }
        }
        if (document.addEventListener("click", o),
        document.addEventListener("watcherCallback", o),
        e()) {
            let t;
            document.querySelector(`#${e()}`) ? t = `#${e()}` : document.querySelector(`.${e()}`) && (t = `.${e()}`),
            t && l(t, !0, 500, 20)
        }
    }(),
    function() {
        d = !0;
        const t = document.querySelector("header.header")
          , e = t.hasAttribute("data-scroll-show")
          , o = t.dataset.scrollShow ? t.dataset.scrollShow : 500
          , s = t.dataset.scroll ? t.dataset.scroll : 1;
        let a, c = 0;
        document.addEventListener("windowScroll", (function(n) {
            const r = window.scrollY;
            clearTimeout(a),
            r >= s ? (!t.classList.contains("_header-scroll") && t.classList.add("_header-scroll"),
            e && (r > c ? t.classList.contains("_header-show") && t.classList.remove("_header-show") : !t.classList.contains("_header-show") && t.classList.add("_header-show"),
            a = setTimeout(( () => {
                !t.classList.contains("_header-show") && t.classList.add("_header-show")
            }
            ), o))) : (t.classList.contains("_header-scroll") && t.classList.remove("_header-scroll"),
            e && t.classList.contains("_header-show") && t.classList.remove("_header-show")),
            c = r <= 0 ? 0 : r
        }
        ))
    }()
}
)();

document.addEventListener('scroll', () => {
    const menuItems = document.querySelectorAll('.menu__item');
    const footer = document.querySelector('.footer');
    const specificLink = document.querySelector('a[data-goto=".footer"]');
    const aboutLink = document.querySelector('a[data-goto=".about__container"]');

    // Check scroll positions
    const scrollPosition = window.scrollY + window.innerHeight;
    const footerPosition = footer.offsetTop;

    // If the user has scrolled to the very top of the page
    if (window.scrollY === 0) {
        menuItems.forEach(item => {
            const link = item.querySelector('.menu__link');
            link.classList.remove('_navigator-active');
        });
    }
    // If the user has scrolled to the bottom of the page
    else if (scrollPosition >= footerPosition) {
        menuItems.forEach(item => {
            const link = item.querySelector('.menu__link');
            link.classList.remove('_navigator-active');
        });

        // Add the class to the specific link (e.g., .footer link)
        specificLink.classList.add('_navigator-active');
    } 
    // If the user is scrolling in between
    else {
        specificLink.classList.remove('_navigator-active');
        aboutLink.classList.add('_navigator-active');
    }
});

function adjustFooterPosition() {
    const footerLeft = document.querySelector('.footer__left');
    const windowWidth = window.innerWidth;
    const elementWidth = footerLeft.offsetWidth;
    
    if (windowWidth > 992) {
        // Calculate and apply the margin-left to center the element
        const marginLeft = (windowWidth - elementWidth) / 2;
        footerLeft.style.marginLeft = `${marginLeft}px`;
    } else {
        // Remove margin when width is less than or equal to 992px
        footerLeft.style.marginLeft = '';
    }
}

// Adjust the footer when the page loads
window.addEventListener('load', adjustFooterPosition);

// Adjust the footer when the window is resized
window.addEventListener('resize', adjustFooterPosition);
