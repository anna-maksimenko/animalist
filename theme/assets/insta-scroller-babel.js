function asyncGeneratorStep(t, e, o, n, i, s, r) {
    try {
        var a = t[s](r),
            c = a.value
    } catch (t) {
        return void o(t)
    }
    a.done ? e(c) : Promise.resolve(c).then(n, i)
}

function _asyncToGenerator(t) {
    return function () {
        var e = this,
            o = arguments;
        return new Promise(function (n, i) {
            var s = t.apply(e, o);

            function r(t) {
                asyncGeneratorStep(s, n, i, r, a, "next", t)
            }

            function a(t) {
                asyncGeneratorStep(s, n, i, r, a, "throw", t)
            }
            r(void 0)
        })
    }
}(function () {
    var t;

    function e() {
        return (e = _asyncToGenerator(function* () {
            console.log("init");
            const e = $(".instagram-scroller-injection-point"),
                o = $(".insta-scroller-to-clone"),
                n = o.find("#instafeed");
            e.length > 0 ? new t({
                get: "user",
                limit: "20",
                userId: parseFloat(n.attr("data-user-id")),
                accessToken: n.attr("data-access-token"),
                template: '<div class="shg-ig-posts item" data-date="{{model.caption.created_time}}"><a href="{{link}}" target="_blank" class="shg-ig-posts-link"><img src="{{image}}" class="shg-ig-posts-image" /><div class="shg-ig-feed-overlay"><span class="shg-ig-like-count"><svg class="shg-ig-icon shg-ig-icon-heart" viewBox="0 0 17 15" role="presentation"><path d="M15.0349331 1.40485867C14.1287273.49933787 12.9252477 0 11.6443673 0S9.16000731.49933787 8.25448651 1.40417371c-.01164437.01164436-.02328874.02328873-.03493311.03561806-.01164436-.01232933-.02260377-.02328873-.03424813-.0349331C7.2790995.49933787 6.07561989 0 4.79473949 0 3.51385908 0 2.31037947.49933787 1.40417371 1.40485867.49796794 2.31037947 0 3.51385908 0 4.79473949 0 6.07561989.4986529 7.2790995 1.40417371 8.1846203L8.2195534 15l6.8153797-6.8153797c.9055208-.9055208 1.4041737-2.10900041 1.4041737-3.38988081 0-1.28019545-.4986529-2.48436002-1.4041737-3.38988082z"></path></svg>{{likes}}</span><p class="shg-ig-caption">{{caption}}</p><time class="shg-ig-feed-date"></time></div></a></div>',
                after: () => {
                    n.removeAttr("id").removeAttr("data-access-token").removeAttr("data-user-id"), e.map((t, e) => {
                        e.replaceWith(o.children(".shg-ig-x").clone()[0])
                    }), o.remove(), $(".shg-ig-posts a .shg-ig-feed-date").each(function (t, e) {
                        var o = $(e),
                            n = new Date(1e3 * parseInt(o.closest(".shg-ig-posts.item").attr("data-date")));
                        o.text(n.toLocaleDateString({
                            year: "numeric",
                            month: "numeric",
                            day: "numeric"
                        }))
                    }), $(".owl-carousel").owlCarousel({
                        stagePadding: 50,
                        loop: !0,
                        dots: !1,
                        margin: 0,
                        nav: !0,
                        autoplayHoverPause: !1,
                        touchDrag: !1,
                        responsive: {
                            0: {
                                items: 1
                            },
                            600: {
                                items: 3
                            },
                            1000: {
                                items: 4
                            }
                        },
                        navText: ['<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.148 10.398l-1.297 1.289q-0.148 0.148-0.352 0.148t-0.352-0.148l-4.148-4.148-4.148 4.148q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.289q-0.148-0.148-0.148-0.355t0.148-0.355l5.797-5.789q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.789q0.148 0.148 0.148 0.355t-0.148 0.355z"></path></svg>', '<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.148 10.398l-1.297 1.289q-0.148 0.148-0.352 0.148t-0.352-0.148l-4.148-4.148-4.148 4.148q-0.148 0.148-0.352 0.148t-0.352-0.148l-1.297-1.289q-0.148-0.148-0.148-0.355t0.148-0.355l5.797-5.789q0.148-0.148 0.352-0.148t0.352 0.148l5.797 5.789q0.148 0.148 0.148 0.355t-0.148 0.355z"></path></svg>']
                    }), $(".owl-carousel").one("click", function () {
                        $(".owl-carousel").trigger("stop.owl.autoplay")
                    }), $(".owl-carousel").on("drag.owl.carousel", function () {
                        const t = $(".owl-carousel")[0];
                        bodyScrollLock.disableBodyScroll(t), $(".owl-carousel").one("dragged.owl.carousel", function () {
                            bodyScrollLock.enableBodyScroll(t)
                        })
                    }), $(".owl-carousel").on("mousedown", ".shg-ig-posts-link", function (t) {
                        t.preventDefault();
                        var e = this;
                        $(e).find(".shg-ig-feed-overlay").addClass("hovered"), $(e).one("mouseup.follow", function (t) {
                            $(t.currentTarget).trigger("click")
                        }), $(e).one("mouseup.unhover", function () {
                            $(e).find(".shg-ig-feed-overlay").removeClass("hovered")
                        }), setTimeout(function () {
                            $(e).off("mouseup.follow"), $(e).one("click.follow", function (t) {
                                t.preventDefault()
                            })
                        }, 500)
                    })
                }
            }).run() : n.remove()
        })).apply(this, arguments)
    }

    function o() {
        return (o = _asyncToGenerator(function* () {
            yield function () {
                return e.apply(this, arguments)
            }()
        })).apply(this, arguments)
    }
    t = function () {
        function t(t) {
            var e, o;
            if (this.options = {
                    target: "instafeed",
                    get: "popular",
                    resolution: "standard_resolution",
                    sortBy: "most-recent",
                    links: !0,
                    limit: 12,
                    mock: !1
                }, "object" == typeof t)
                for (e in t) o = t[e], this.options[e] = o;
            this.unique = this._genKey()
        }
        return t.prototype.run = function () {
            var e, o;
            if ("string" != typeof this.options.clientId && "string" != typeof this.options.accessToken) throw new Error("Missing clientId or accessToken.");
            if ("string" != typeof this.options.accessToken && "string" != typeof this.options.clientId) throw new Error("Missing clientId or accessToken.");
            return null != this.options.before && "function" == typeof this.options.before && this.options.before.call(this), "undefined" != typeof document && null !== document && ((o = document.createElement("script")).id = "instafeed-fetcher", o.src = this._buildUrl(), document.getElementsByTagName("head")[0].appendChild(o), e = "instafeedCache" + this.unique, window[e] = new t(this.options), window[e].unique = this.unique), !0
        }, t.prototype.parse = function (t) {
            var e, o, n, i, s, r, a, c, l, p, u, h, d;
            if ("object" != typeof t) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "Invalid JSON data"), !1;
                throw new Error("Invalid JSON response")
            }
            if (200 !== t.meta.code) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, t.meta.error_message), !1;
                throw new Error("Error from Instagram: " + t.meta.error_message)
            }
            if (0 === t.data.length) {
                if (null != this.options.error && "function" == typeof this.options.error) return this.options.error.call(this, "No images were returned from Instagram"), !1;
                throw new Error("No images were returned from Instagram")
            }
            if (null != this.options.success && "function" == typeof this.options.success && this.options.success.call(this, t), "most-recent" !== this.options.sortBy) switch (c = "least" === (l = "random" === this.options.sortBy ? ["", "random"] : this.options.sortBy.split("-"))[0], l[1]) {
                case "random":
                    t.data.sort(function () {
                        return .5 - Math.random()
                    });
                    break;
                case "recent":
                    t.data = this._sortBy(t.data, "created_time", c);
                    break;
                case "liked":
                    t.data = this._sortBy(t.data, "likes.count", c);
                    break;
                case "commented":
                    t.data = this._sortBy(t.data, "comments.count", c);
                    break;
                default:
                    throw new Error("Invalid option for sortBy: '" + this.options.sortBy + "'.")
            }
            if ("undefined" != typeof document && null !== document && !1 === this.options.mock) {
                if (document.getElementById(this.options.target).innerHTML = "", (s = t.data).length > this.options.limit && (s = s.slice(0, this.options.limit + 1 || 9e9)), null != this.options.template && "string" == typeof this.options.template) {
                    for (n = "", "", p = 0, h = s.length; p < h; p++) i = s[p], n += this._makeTemplate(this.options.template, {
                        model: i,
                        id: i.id,
                        link: i.link,
                        image: i.images[this.options.resolution].url,
                        caption: this._getObjectProperty(i, "caption.text"),
                        likes: i.likes.count,
                        comments: i.comments.count,
                        location: this._getObjectProperty(i, "location.name")
                    });
                    document.getElementById(this.options.target).innerHTML = n
                } else {
                    for (o = document.createDocumentFragment(), u = 0, d = s.length; u < d; u++) i = s[u], (r = document.createElement("img")).src = i.images[this.options.resolution].url, !0 === this.options.links ? ((e = document.createElement("a")).href = i.link, e.appendChild(r), o.appendChild(e)) : o.appendChild(r);
                    document.getElementById(this.options.target).appendChild(o)
                }
                document.getElementsByTagName("head")[0].removeChild(document.getElementById("instafeed-fetcher")), a = "instafeedCache" + this.unique, window[a] = void 0;
                try {
                    delete window[a]
                } catch (t) {}
            }
            return null != this.options.after && "function" == typeof this.options.after && this.options.after.call(this), !0
        }, t.prototype._buildUrl = function () {
            var t, e;
            switch ("https://api.instagram.com/v1", this.options.get) {
                case "popular":
                    t = "media/popular";
                    break;
                case "tagged":
                    if ("string" != typeof this.options.tagName) throw new Error("No tag name specified. Use the 'tagName' option.");
                    t = "tags/" + this.options.tagName + "/media/recent";
                    break;
                case "location":
                    if ("number" != typeof this.options.locationId) throw new Error("No location specified. Use the 'locationId' option.");
                    t = "locations/" + this.options.locationId + "/media/recent";
                    break;
                case "user":
                    if ("number" != typeof this.options.userId) throw new Error("No user specified. Use the 'userId' option.");
                    if ("string" != typeof this.options.accessToken) throw new Error("No access token. Use the 'accessToken' option.");
                    t = "users/" + this.options.userId + "/media/recent";
                    break;
                default:
                    throw new Error("Invalid option for get: '" + this.options.get + "'.")
            }
            return e = "https://api.instagram.com/v1/" + t, null != this.options.accessToken ? e += "?access_token=" + this.options.accessToken : e += "?client_id=" + this.options.clientId, (e += "&count=" + this.options.limit) + "&callback=instafeedCache" + this.unique + ".parse"
        }, t.prototype._genKey = function () {
            var t;
            return "" + (t = function () {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            })() + t() + t() + t()
        }, t.prototype._makeTemplate = function (t, e) {
            var o, n, i, s, r;
            for (n = /(?:\{{2})([\w\[\]\.]+)(?:\}{2})/, o = t; n.test(o);) i = o.match(n)[1], s = null != (r = this._getObjectProperty(e, i)) ? r : "", o = o.replace(n, "" + s);
            return o
        }, t.prototype._getObjectProperty = function (t, e) {
            var o, n;
            for (n = (e = e.replace(/\[(\w+)\]/g, ".$1")).split("."); n.length;) {
                if (o = n.shift(), !(null != t && o in t)) return null;
                t = t[o]
            }
            return t
        }, t.prototype._sortBy = function (t, e, o) {
            var n;
            return n = function (t, n) {
                var i, s;
                return i = this._getObjectProperty(t, e), s = this._getObjectProperty(n, e), o ? i > s ? 1 : -1 : i < s ? 1 : -1
            }, t.sort(n.bind(this)), t
        }, t
    }(), window.Instafeed = t, $(function () {
        return o.apply(this, arguments)
    }())
}).call(this);