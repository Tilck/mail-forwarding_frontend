'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.ShipmentItem = Vue.component('ShipmentItem', {
	template: '#shipment-component-tpl',
	// опции
	props: {
		item: Object,
		parcels: Array,
		dragOptions: Object
	},
	data: function data() {
		return {
			myParcels: null
		};
	},

	computed: {
		parcelsLength: function parcelsLength() {
			return this.myParcels && this.myParcels.length;
		}
	},
	methods: {
		onMove: function onMove(_ref) {
			var relatedContext = _ref.relatedContext,
			    draggedContext = _ref.draggedContext;

			console.log('test 3');
			console.log(draggedContext);
			console.log(relatedContext);
			if (relatedContext.component.$options.parent._props.item != undefined) {
				draggedContext.element.shipmentId = relatedContext.component.$options.parent._props.item.id;
			} else {
				draggedContext.element.shipmentId = null;
			}
			// return false
			// const relatedElement = relatedContext.element;
			// const draggedElement = draggedContext.element;
			// return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
		}
	},
	mounted: function mounted() {
		this.myParcels = this.parcels;
	}
});

window.StickerItem = Vue.component('StickerItem', {
	template: '#sticker-component-tpl',
	// опции
	props: {
		item: Object
	},
	data: function data() {
		return {};
	},

	methods: {
		hello: function hello() {
			console.log(this.item.name);
		}
	}
});
window.addParcel = Vue.component('addParcel', {
	template: '#addParcel-template',
	// опции
	props: {
		parcels: Array
	},
	data: function data() {
		return {
			parcelCode: '',
			parcelID: []
		};
	},

	methods: {
		addParcelOpen: function addParcelOpen() {
			// console.log(this.parcelCode);
			// // this.active = false;
			// this.active = true;
		},
		addParcelClose: function addParcelClose() {
			fetch('https://jsonplaceholder.typicode.com/posts/').then(function (response) {
				return response.json();
			}).then(function (json) {
				console.log(json);
				// for (var key in json) {
				//     console.log("Ключ: " + key + " значение: " + json[key]);
				// }
			});

			this.$parent.parcels.push({
				id: this.parcelCode,
				status: 'to-send',
				date: new Date().getTime(),
				shipmentId: null
			});
			this.$parent.emptyParcels = this.$parent.parcels.filter(function (parcel) {
				return !parcel.shipmentId;
			});

			this.$parent.active = false;
		}
	}
});

document.addEventListener('DOMContentLoaded', function () {

	var app = new Vue({
		el: '#app',
		components: {
			// draggable
			StickerItem: StickerItem,
			ShipmentItem: ShipmentItem,
			addParcel: addParcel
		},
		props: {
			item: Object
		},
		data: function data() {
			return {
				message: 'hello',
				editable: true,
				parcels: [{
					id: 1,
					status: 'pending',
					date: new Date().getTime(),
					shipmentId: 2
				}, {
					id: 2,
					status: 'pending',
					date: new Date().getTime(),
					shipmentId: 4
				}, {
					id: 3,
					status: 'pending',
					date: new Date().getTime(),
					shipmentId: 4
				}, {
					id: 4,
					status: 'pending',
					date: new Date().getTime(),

					shipmentId: 2
				}, {
					id: 5,
					status: 'pending',
					date: new Date().getTime(),
					shipmentId: 2
				}, {
					id: 6,
					status: 'to-send',
					date: new Date().getTime(),
					shipmentId: null
				}, {
					id: 7,
					status: 'to-send',
					date: new Date().getTime(),
					shipmentId: null
				}, {
					id: 8,
					status: 'to-send',
					date: new Date().getTime(),
					shipmentId: null
				}],
				emptyParcelsList: null,
				emptyParcels: null,
				shipments: [{
					id: 1,
					status: 'wait'
				}, {
					id: 2,
					status: 'to-send'
				}, {
					id: 3,
					status: 'wait'
				}, {
					id: 4,
					status: 'wait'
				}, {
					id: 5,
					status: 'deliver'
				}, {
					id: 6,
					status: 'deliver'
				}, {
					id: 7,
					status: 'archive'
				}, {
					id: 8,
					status: 'archive'
				}],
				waitingShipments: null,
				toSendShipments: null,
				active: false
			};
		},

		computed: {
			dragShipmentsOptions: function dragShipmentsOptions() {
				return {
					animation: 100,
					group: 'shipment',
					// disabled: !this.editable,
					ghostClass: 'ghost',
					draggable: '.shipment'
				};
			},
			dragParcelsOptions: function dragParcelsOptions() {
				return {
					animation: 100,
					group: 'parcel',
					// disabled: !this.editable,
					ghostClass: 'ghost',
					draggable: '.card'
				};
			},
			onEnd: function onEnd(data) {
				console.log('data', data);
			},

			// waitingShipments: {
			// 	get() {
			// 		return this.shipments.filter(shipment => {
			// 			return shipment.status === 'wait'
			// 		})
			// 	},
			// 	set(newValue) {
			// 		// this.parcels = newValue
			// 	}
			// },
			// toSendShipments: {
			// 	get() {
			// 		return this.shipments.filter(shipment => {
			// 			return shipment.status === 'to-send'
			// 		})
			// 	},
			// 	set(newValue) {
			// 		console.log('newValue')
			// 		// this.parcels = newValue
			// 	}
			// },
			deliverShipments: function deliverShipments() {
				return this.shipments.filter(function (shipment) {
					return shipment.status === 'deliver';
				});
			},
			archiveShipments: function archiveShipments() {
				return this.shipments.filter(function (shipment) {
					return shipment.status === 'archive';
				});
			}
		},
		methods: {
			onMove: function onMove(_ref2) {
				var relatedContext = _ref2.relatedContext,
				    draggedContext = _ref2.draggedContext;

				console.log('test 1');
				console.log(draggedContext);
				draggedContext.element.shipmentId = relatedContext.component.$options.parent._props.item.id;
				// return false
				// const relatedElement = relatedContext.element;
				// const draggedElement = draggedContext.element;
				// return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			onMoveShip: function onMoveShip(_ref3) {
				var relatedContext = _ref3.relatedContext,
				    draggedContext = _ref3.draggedContext;

				console.log('test 2');
				// return false
				// const relatedElement = relatedContext.element;
				// const draggedElement = draggedContext.element;
				// return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
			},
			getParcels: function getParcels(shipmentId) {

				return this.parcels.filter(function (parcel) {
					return parcel.shipmentId === shipmentId;
				});
			},

			addParcelOpen: function addParcelOpen() {
				this.active = true;
			}
			// getModifiedValue(arr1, arr2) {
			// 	let arrLarger = arr1.length > arr2.length ? arr1 : arr2,
			// 		arrSmaller = arr1.length < arr2.length ? arr1 : arr2;
			// 	arrSmaller.map(item => {
			// 		console.log('before', arrLarger.length)
			// 		arrLarger = arrLarger.filter(_item => {
			// 			return _item.id !== item.id
			// 		})
			// 		console.log('after', arrLarger.length)
			// 	})
			// 	return arrLarger[0];
			// }
		},
		mounted: function mounted() {
			this.emptyParcels = this.parcels.filter(function (parcel) {
				return !parcel.shipmentId;
			});

			this.waitingShipments = this.shipments.filter(function (shipment) {
				return shipment.status === 'wait';
			});

			this.toSendShipments = this.shipments.filter(function (shipment) {
				return shipment.status === 'to-send';
			});
		}
	});
}, false);

/*! Sortable 1.7.0 - MIT | git://github.com/rubaxa/Sortable.git */
!function (a) {
	"use strict";
	"function" == typeof define && define.amd ? define(a) : "undefined" != typeof module && "undefined" != typeof module.exports ? module.exports = a() : window.Sortable = a();
}(function () {
	"use strict";
	function a(b, c) {
		if (!b || !b.nodeType || 1 !== b.nodeType) throw "Sortable: `el` must be HTMLElement, and not " + {}.toString.call(b);this.el = b, this.options = c = t({}, c), b[V] = this;var d = { group: Math.random(), sort: !0, disabled: !1, store: null, handle: null, scroll: !0, scrollSensitivity: 30, scrollSpeed: 10, draggable: /[uo]l/i.test(b.nodeName) ? "li" : ">*", ghostClass: "sortable-ghost", chosenClass: "sortable-chosen", dragClass: "sortable-drag", ignore: "a, img", filter: null, preventOnFilter: !0, animation: 0, setData: function setData(a, b) {
				a.setData("Text", b.textContent);
			}, dropBubble: !1, dragoverBubble: !1, dataIdAttr: "data-id", delay: 0, forceFallback: !1, fallbackClass: "sortable-fallback", fallbackOnBody: !1, fallbackTolerance: 0, fallbackOffset: { x: 0, y: 0 }, supportPointer: a.supportPointer !== !1 };for (var e in d) {
			!(e in c) && (c[e] = d[e]);
		}ka(c);for (var g in this) {
			"_" === g.charAt(0) && "function" == typeof this[g] && (this[g] = this[g].bind(this));
		}this.nativeDraggable = !c.forceFallback && ca, f(b, "mousedown", this._onTapStart), f(b, "touchstart", this._onTapStart), c.supportPointer && f(b, "pointerdown", this._onTapStart), this.nativeDraggable && (f(b, "dragover", this), f(b, "dragenter", this)), ia.push(this._onDragOver), c.store && this.sort(c.store.get(this));
	}function b(a, b) {
		"clone" !== a.lastPullMode && (b = !0), B && B.state !== b && (i(B, "display", b ? "none" : ""), b || B.state && (a.options.group.revertClone ? (C.insertBefore(B, D), a._animate(y, B)) : C.insertBefore(B, y)), B.state = b);
	}function c(a, b, c) {
		if (a) {
			c = c || X;do {
				if (">*" === b && a.parentNode === c || r(a, b)) return a;
			} while (a = d(a));
		}return null;
	}function d(a) {
		var b = a.host;return b && b.nodeType ? b : a.parentNode;
	}function e(a) {
		a.dataTransfer && (a.dataTransfer.dropEffect = "move"), a.preventDefault();
	}function f(a, b, c) {
		a.addEventListener(b, c, aa);
	}function g(a, b, c) {
		a.removeEventListener(b, c, aa);
	}function h(a, b, c) {
		if (a) if (a.classList) a.classList[c ? "add" : "remove"](b);else {
			var d = (" " + a.className + " ").replace(T, " ").replace(" " + b + " ", " ");a.className = (d + (c ? " " + b : "")).replace(T, " ");
		}
	}function i(a, b, c) {
		var d = a && a.style;if (d) {
			if (void 0 === c) return X.defaultView && X.defaultView.getComputedStyle ? c = X.defaultView.getComputedStyle(a, "") : a.currentStyle && (c = a.currentStyle), void 0 === b ? c : c[b];b in d || (b = "-webkit-" + b), d[b] = c + ("string" == typeof c ? "" : "px");
		}
	}function j(a, b, c) {
		if (a) {
			var d = a.getElementsByTagName(b),
			    e = 0,
			    f = d.length;if (c) for (; e < f; e++) {
				c(d[e], e);
			}return d;
		}return [];
	}function k(a, b, c, d, e, f, g, h) {
		a = a || b[V];var i = X.createEvent("Event"),
		    j = a.options,
		    k = "on" + c.charAt(0).toUpperCase() + c.substr(1);i.initEvent(c, !0, !0), i.to = e || b, i.from = f || b, i.item = d || b, i.clone = B, i.oldIndex = g, i.newIndex = h, b.dispatchEvent(i), j[k] && j[k].call(a, i);
	}function l(a, b, c, d, e, f, g, h) {
		var i,
		    j,
		    k = a[V],
		    l = k.options.onMove;return i = X.createEvent("Event"), i.initEvent("move", !0, !0), i.to = b, i.from = a, i.dragged = c, i.draggedRect = d, i.related = e || b, i.relatedRect = f || b.getBoundingClientRect(), i.willInsertAfter = h, a.dispatchEvent(i), l && (j = l.call(k, i, g)), j;
	}function m(a) {
		a.draggable = !1;
	}function n() {
		ea = !1;
	}function o(a, b) {
		var c = a.lastElementChild,
		    d = c.getBoundingClientRect();return b.clientY - (d.top + d.height) > 5 || b.clientX - (d.left + d.width) > 5;
	}function p(a) {
		for (var b = a.tagName + a.className + a.src + a.href + a.textContent, c = b.length, d = 0; c--;) {
			d += b.charCodeAt(c);
		}return d.toString(36);
	}function q(a, b) {
		var c = 0;if (!a || !a.parentNode) return -1;for (; a && (a = a.previousElementSibling);) {
			"TEMPLATE" === a.nodeName.toUpperCase() || ">*" !== b && !r(a, b) || c++;
		}return c;
	}function r(a, b) {
		if (a) {
			b = b.split(".");var c = b.shift().toUpperCase(),
			    d = new RegExp("\\s(" + b.join("|") + ")(?=\\s)", "g");return !("" !== c && a.nodeName.toUpperCase() != c || b.length && ((" " + a.className + " ").match(d) || []).length != b.length);
		}return !1;
	}function s(a, b) {
		var c, d;return function () {
			void 0 === c && (c = arguments, d = this, Z(function () {
				1 === c.length ? a.call(d, c[0]) : a.apply(d, c), c = void 0;
			}, b));
		};
	}function t(a, b) {
		if (a && b) for (var c in b) {
			b.hasOwnProperty(c) && (a[c] = b[c]);
		}return a;
	}function u(a) {
		return _ && _.dom ? _.dom(a).cloneNode(!0) : $ ? $(a).clone(!0)[0] : a.cloneNode(!0);
	}function v(a) {
		for (var b = a.getElementsByTagName("input"), c = b.length; c--;) {
			var d = b[c];d.checked && ha.push(d);
		}
	}function w(a) {
		return Z(a, 0);
	}function x(a) {
		return clearTimeout(a);
	}if ("undefined" == typeof window || !window.document) return function () {
		throw new Error("Sortable.js requires a window with a document");
	};var y,
	    z,
	    A,
	    B,
	    C,
	    D,
	    E,
	    F,
	    G,
	    H,
	    I,
	    J,
	    K,
	    L,
	    M,
	    N,
	    O,
	    P,
	    Q,
	    R,
	    S = {},
	    T = /\s+/g,
	    U = /left|right|inline/,
	    V = "Sortable" + new Date().getTime(),
	    W = window,
	    X = W.document,
	    Y = W.parseInt,
	    Z = W.setTimeout,
	    $ = W.jQuery || W.Zepto,
	    _ = W.Polymer,
	    aa = !1,
	    ba = !1,
	    ca = "draggable" in X.createElement("div"),
	    da = function (a) {
		return !navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i) && (a = X.createElement("x"), a.style.cssText = "pointer-events:auto", "auto" === a.style.pointerEvents);
	}(),
	    ea = !1,
	    fa = Math.abs,
	    ga = Math.min,
	    ha = [],
	    ia = [],
	    ja = s(function (a, b, c) {
		if (c && b.scroll) {
			var d,
			    e,
			    f,
			    g,
			    h,
			    i,
			    j = c[V],
			    k = b.scrollSensitivity,
			    l = b.scrollSpeed,
			    m = a.clientX,
			    n = a.clientY,
			    o = window.innerWidth,
			    p = window.innerHeight;if (G !== c && (F = b.scroll, G = c, H = b.scrollFn, F === !0)) {
				F = c;do {
					if (F.offsetWidth < F.scrollWidth || F.offsetHeight < F.scrollHeight) break;
				} while (F = F.parentNode);
			}F && (d = F, e = F.getBoundingClientRect(), f = (fa(e.right - m) <= k) - (fa(e.left - m) <= k), g = (fa(e.bottom - n) <= k) - (fa(e.top - n) <= k)), f || g || (f = (o - m <= k) - (m <= k), g = (p - n <= k) - (n <= k), (f || g) && (d = W)), S.vx === f && S.vy === g && S.el === d || (S.el = d, S.vx = f, S.vy = g, clearInterval(S.pid), d && (S.pid = setInterval(function () {
				return i = g ? g * l : 0, h = f ? f * l : 0, "function" == typeof H ? H.call(j, h, i, a) : void (d === W ? W.scrollTo(W.pageXOffset + h, W.pageYOffset + i) : (d.scrollTop += i, d.scrollLeft += h));
			}, 24)));
		}
	}, 30),
	    ka = function ka(a) {
		function b(a, b) {
			return void 0 !== a && a !== !0 || (a = c.name), "function" == typeof a ? a : function (c, d) {
				var e = d.options.group.name;return b ? a : a && (a.join ? a.indexOf(e) > -1 : e == a);
			};
		}var c = {},
		    d = a.group;d && "object" == (typeof d === 'undefined' ? 'undefined' : _typeof(d)) || (d = { name: d }), c.name = d.name, c.checkPull = b(d.pull, !0), c.checkPut = b(d.put), c.revertClone = d.revertClone, a.group = c;
	};try {
		window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function get() {
				ba = !1, aa = { capture: !1, passive: ba };
			} }));
	} catch (a) {}return a.prototype = { constructor: a, _onTapStart: function _onTapStart(a) {
			var b,
			    d = this,
			    e = this.el,
			    f = this.options,
			    g = f.preventOnFilter,
			    h = a.type,
			    i = a.touches && a.touches[0],
			    j = (i || a).target,
			    l = a.target.shadowRoot && a.path && a.path[0] || j,
			    m = f.filter;if (v(e), !y && !(/mousedown|pointerdown/.test(h) && 0 !== a.button || f.disabled) && !l.isContentEditable && (j = c(j, f.draggable, e), j && E !== j)) {
				if (b = q(j, f.draggable), "function" == typeof m) {
					if (m.call(this, a, j, this)) return k(d, l, "filter", j, e, e, b), void (g && a.preventDefault());
				} else if (m && (m = m.split(",").some(function (a) {
					if (a = c(l, a.trim(), e)) return k(d, a, "filter", j, e, e, b), !0;
				}))) return void (g && a.preventDefault());f.handle && !c(l, f.handle, e) || this._prepareDragStart(a, i, j, b);
			}
		}, _prepareDragStart: function _prepareDragStart(a, b, c, d) {
			var e,
			    g = this,
			    i = g.el,
			    l = g.options,
			    n = i.ownerDocument;c && !y && c.parentNode === i && (P = a, C = i, y = c, z = y.parentNode, D = y.nextSibling, E = c, N = l.group, L = d, this._lastX = (b || a).clientX, this._lastY = (b || a).clientY, y.style["will-change"] = "all", e = function e() {
				g._disableDelayedDrag(), y.draggable = g.nativeDraggable, h(y, l.chosenClass, !0), g._triggerDragStart(a, b), k(g, C, "choose", y, C, C, L);
			}, l.ignore.split(",").forEach(function (a) {
				j(y, a.trim(), m);
			}), f(n, "mouseup", g._onDrop), f(n, "touchend", g._onDrop), f(n, "touchcancel", g._onDrop), f(n, "selectstart", g), l.supportPointer && f(n, "pointercancel", g._onDrop), l.delay ? (f(n, "mouseup", g._disableDelayedDrag), f(n, "touchend", g._disableDelayedDrag), f(n, "touchcancel", g._disableDelayedDrag), f(n, "mousemove", g._disableDelayedDrag), f(n, "touchmove", g._disableDelayedDrag), l.supportPointer && f(n, "pointermove", g._disableDelayedDrag), g._dragStartTimer = Z(e, l.delay)) : e());
		}, _disableDelayedDrag: function _disableDelayedDrag() {
			var a = this.el.ownerDocument;clearTimeout(this._dragStartTimer), g(a, "mouseup", this._disableDelayedDrag), g(a, "touchend", this._disableDelayedDrag), g(a, "touchcancel", this._disableDelayedDrag), g(a, "mousemove", this._disableDelayedDrag), g(a, "touchmove", this._disableDelayedDrag), g(a, "pointermove", this._disableDelayedDrag);
		}, _triggerDragStart: function _triggerDragStart(a, b) {
			b = b || ("touch" == a.pointerType ? a : null), b ? (P = { target: y, clientX: b.clientX, clientY: b.clientY }, this._onDragStart(P, "touch")) : this.nativeDraggable ? (f(y, "dragend", this), f(C, "dragstart", this._onDragStart)) : this._onDragStart(P, !0);try {
				X.selection ? w(function () {
					X.selection.empty();
				}) : window.getSelection().removeAllRanges();
			} catch (a) {}
		}, _dragStarted: function _dragStarted() {
			if (C && y) {
				var b = this.options;h(y, b.ghostClass, !0), h(y, b.dragClass, !1), a.active = this, k(this, C, "start", y, C, C, L);
			} else this._nulling();
		}, _emulateDragOver: function _emulateDragOver() {
			if (Q) {
				if (this._lastX === Q.clientX && this._lastY === Q.clientY) return;this._lastX = Q.clientX, this._lastY = Q.clientY, da || i(A, "display", "none");var a = X.elementFromPoint(Q.clientX, Q.clientY),
				    b = a,
				    c = ia.length;if (a && a.shadowRoot && (a = a.shadowRoot.elementFromPoint(Q.clientX, Q.clientY), b = a), b) do {
					if (b[V]) {
						for (; c--;) {
							ia[c]({ clientX: Q.clientX, clientY: Q.clientY, target: a, rootEl: b });
						}break;
					}a = b;
				} while (b = b.parentNode);da || i(A, "display", "");
			}
		}, _onTouchMove: function _onTouchMove(b) {
			if (P) {
				var c = this.options,
				    d = c.fallbackTolerance,
				    e = c.fallbackOffset,
				    f = b.touches ? b.touches[0] : b,
				    g = f.clientX - P.clientX + e.x,
				    h = f.clientY - P.clientY + e.y,
				    j = b.touches ? "translate3d(" + g + "px," + h + "px,0)" : "translate(" + g + "px," + h + "px)";if (!a.active) {
					if (d && ga(fa(f.clientX - this._lastX), fa(f.clientY - this._lastY)) < d) return;this._dragStarted();
				}this._appendGhost(), R = !0, Q = f, i(A, "webkitTransform", j), i(A, "mozTransform", j), i(A, "msTransform", j), i(A, "transform", j), b.preventDefault();
			}
		}, _appendGhost: function _appendGhost() {
			if (!A) {
				var a,
				    b = y.getBoundingClientRect(),
				    c = i(y),
				    d = this.options;A = y.cloneNode(!0), h(A, d.ghostClass, !1), h(A, d.fallbackClass, !0), h(A, d.dragClass, !0), i(A, "top", b.top - Y(c.marginTop, 10)), i(A, "left", b.left - Y(c.marginLeft, 10)), i(A, "width", b.width), i(A, "height", b.height), i(A, "opacity", "0.8"), i(A, "position", "fixed"), i(A, "zIndex", "100000"), i(A, "pointerEvents", "none"), d.fallbackOnBody && X.body.appendChild(A) || C.appendChild(A), a = A.getBoundingClientRect(), i(A, "width", 2 * b.width - a.width), i(A, "height", 2 * b.height - a.height);
			}
		}, _onDragStart: function _onDragStart(a, b) {
			var c = this,
			    d = a.dataTransfer,
			    e = c.options;c._offUpEvents(), N.checkPull(c, c, y, a) && (B = u(y), B.draggable = !1, B.style["will-change"] = "", i(B, "display", "none"), h(B, c.options.chosenClass, !1), c._cloneId = w(function () {
				C.insertBefore(B, y), k(c, C, "clone", y);
			})), h(y, e.dragClass, !0), b ? ("touch" === b ? (f(X, "touchmove", c._onTouchMove), f(X, "touchend", c._onDrop), f(X, "touchcancel", c._onDrop), e.supportPointer && (f(X, "pointermove", c._onTouchMove), f(X, "pointerup", c._onDrop))) : (f(X, "mousemove", c._onTouchMove), f(X, "mouseup", c._onDrop)), c._loopId = setInterval(c._emulateDragOver, 50)) : (d && (d.effectAllowed = "move", e.setData && e.setData.call(c, d, y)), f(X, "drop", c), c._dragStartId = w(c._dragStarted));
		}, _onDragOver: function _onDragOver(d) {
			var e,
			    f,
			    g,
			    h,
			    j = this.el,
			    k = this.options,
			    m = k.group,
			    p = a.active,
			    q = N === m,
			    r = !1,
			    s = k.sort;if (void 0 !== d.preventDefault && (d.preventDefault(), !k.dragoverBubble && d.stopPropagation()), !y.animated && (R = !0, p && !k.disabled && (q ? s || (h = !C.contains(y)) : O === this || (p.lastPullMode = N.checkPull(this, p, y, d)) && m.checkPut(this, p, y, d)) && (void 0 === d.rootEl || d.rootEl === this.el))) {
				if (ja(d, k, this.el), ea) return;if (e = c(d.target, k.draggable, j), f = y.getBoundingClientRect(), O !== this && (O = this, r = !0), h) return b(p, !0), z = C, void (B || D ? C.insertBefore(y, B || D) : s || C.appendChild(y));if (0 === j.children.length || j.children[0] === A || j === d.target && o(j, d)) {
					if (0 !== j.children.length && j.children[0] !== A && j === d.target && (e = j.lastElementChild), e) {
						if (e.animated) return;g = e.getBoundingClientRect();
					}b(p, q), l(C, j, y, f, e, g, d) !== !1 && (y.contains(j) || (j.appendChild(y), z = j), this._animate(f, y), e && this._animate(g, e));
				} else if (e && !e.animated && e !== y && void 0 !== e.parentNode[V]) {
					I !== e && (I = e, J = i(e), K = i(e.parentNode)), g = e.getBoundingClientRect();var t = g.right - g.left,
					    u = g.bottom - g.top,
					    v = U.test(J.cssFloat + J.display) || "flex" == K.display && 0 === K["flex-direction"].indexOf("row"),
					    w = e.offsetWidth > y.offsetWidth,
					    x = e.offsetHeight > y.offsetHeight,
					    E = (v ? (d.clientX - g.left) / t : (d.clientY - g.top) / u) > .5,
					    F = e.nextElementSibling,
					    G = !1;if (v) {
						var H = y.offsetTop,
						    L = e.offsetTop;G = H === L ? e.previousElementSibling === y && !w || E && w : e.previousElementSibling === y || y.previousElementSibling === e ? (d.clientY - g.top) / u > .5 : L > H;
					} else r || (G = F !== y && !x || E && x);var M = l(C, j, y, f, e, g, d, G);M !== !1 && (1 !== M && M !== -1 || (G = 1 === M), ea = !0, Z(n, 30), b(p, q), y.contains(j) || (G && !F ? j.appendChild(y) : e.parentNode.insertBefore(y, G ? F : e)), z = y.parentNode, this._animate(f, y), this._animate(g, e));
				}
			}
		}, _animate: function _animate(a, b) {
			var c = this.options.animation;if (c) {
				var d = b.getBoundingClientRect();1 === a.nodeType && (a = a.getBoundingClientRect()), i(b, "transition", "none"), i(b, "transform", "translate3d(" + (a.left - d.left) + "px," + (a.top - d.top) + "px,0)"), b.offsetWidth, i(b, "transition", "all " + c + "ms"), i(b, "transform", "translate3d(0,0,0)"), clearTimeout(b.animated), b.animated = Z(function () {
					i(b, "transition", ""), i(b, "transform", ""), b.animated = !1;
				}, c);
			}
		}, _offUpEvents: function _offUpEvents() {
			var a = this.el.ownerDocument;g(X, "touchmove", this._onTouchMove), g(X, "pointermove", this._onTouchMove), g(a, "mouseup", this._onDrop), g(a, "touchend", this._onDrop), g(a, "pointerup", this._onDrop), g(a, "touchcancel", this._onDrop), g(a, "pointercancel", this._onDrop), g(a, "selectstart", this);
		}, _onDrop: function _onDrop(b) {
			var c = this.el,
			    d = this.options;clearInterval(this._loopId), clearInterval(S.pid), clearTimeout(this._dragStartTimer), x(this._cloneId), x(this._dragStartId), g(X, "mouseover", this), g(X, "mousemove", this._onTouchMove), this.nativeDraggable && (g(X, "drop", this), g(c, "dragstart", this._onDragStart)), this._offUpEvents(), b && (R && (b.preventDefault(), !d.dropBubble && b.stopPropagation()), A && A.parentNode && A.parentNode.removeChild(A), C !== z && "clone" === a.active.lastPullMode || B && B.parentNode && B.parentNode.removeChild(B), y && (this.nativeDraggable && g(y, "dragend", this), m(y), y.style["will-change"] = "", h(y, this.options.ghostClass, !1), h(y, this.options.chosenClass, !1), k(this, C, "unchoose", y, z, C, L), C !== z ? (M = q(y, d.draggable), M >= 0 && (k(null, z, "add", y, z, C, L, M), k(this, C, "remove", y, z, C, L, M), k(null, z, "sort", y, z, C, L, M), k(this, C, "sort", y, z, C, L, M))) : y.nextSibling !== D && (M = q(y, d.draggable), M >= 0 && (k(this, C, "update", y, z, C, L, M), k(this, C, "sort", y, z, C, L, M))), a.active && (null != M && M !== -1 || (M = L), k(this, C, "end", y, z, C, L, M), this.save()))), this._nulling();
		}, _nulling: function _nulling() {
			C = y = z = A = D = B = E = F = G = P = Q = R = M = I = J = O = N = a.active = null, ha.forEach(function (a) {
				a.checked = !0;
			}), ha.length = 0;
		}, handleEvent: function handleEvent(a) {
			switch (a.type) {case "drop":case "dragend":
					this._onDrop(a);break;case "dragover":case "dragenter":
					y && (this._onDragOver(a), e(a));break;case "mouseover":
					this._onDrop(a);break;case "selectstart":
					a.preventDefault();}
		}, toArray: function toArray() {
			for (var a, b = [], d = this.el.children, e = 0, f = d.length, g = this.options; e < f; e++) {
				a = d[e], c(a, g.draggable, this.el) && b.push(a.getAttribute(g.dataIdAttr) || p(a));
			}return b;
		}, sort: function sort(a) {
			var b = {},
			    d = this.el;this.toArray().forEach(function (a, e) {
				var f = d.children[e];c(f, this.options.draggable, d) && (b[a] = f);
			}, this), a.forEach(function (a) {
				b[a] && (d.removeChild(b[a]), d.appendChild(b[a]));
			});
		}, save: function save() {
			var a = this.options.store;a && a.set(this);
		}, closest: function closest(a, b) {
			return c(a, b || this.options.draggable, this.el);
		}, option: function option(a, b) {
			var c = this.options;return void 0 === b ? c[a] : (c[a] = b, void ("group" === a && ka(c)));
		}, destroy: function destroy() {
			var a = this.el;a[V] = null, g(a, "mousedown", this._onTapStart), g(a, "touchstart", this._onTapStart), g(a, "pointerdown", this._onTapStart), this.nativeDraggable && (g(a, "dragover", this), g(a, "dragenter", this)), Array.prototype.forEach.call(a.querySelectorAll("[draggable]"), function (a) {
				a.removeAttribute("draggable");
			}), ia.splice(ia.indexOf(this._onDragOver), 1), this._onDrop(), this.el = a = null;
		} }, f(X, "touchmove", function (b) {
		a.active && b.preventDefault();
	}), a.utils = { on: f, off: g, css: i, find: j, is: function is(a, b) {
			return !!c(a, b, a);
		}, extend: t, throttle: s, closest: c, toggleClass: h, clone: u, index: q, nextTick: w, cancelNextTick: x }, a.create = function (b, c) {
		return new a(b, c);
	}, a.version = "1.7.0", a;
});
"use strict";
console.log('drag init');

function _toConsumableArray(t) {
	if (Array.isArray(t)) {
		for (var n = 0, e = Array(t.length); n < t.length; n++) {
			e[n] = t[n];
		}return e;
	}
	return Array.from(t);
}

var _extends = Object.assign || function (t) {
	for (var n = 1; n < arguments.length; n++) {
		var e = arguments[n];
		for (var o in e) {
			Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
		}
	}
	return t;
};
!function () {
	function t(t, n, e) {
		return void 0 == e ? t : (t = null == t ? {} : t, t[n] = e, t);
	}

	function n(n) {
		function e(t) {
			t.parentElement.removeChild(t);
		}

		function o(t, n, e) {
			var o = 0 === e ? t.children[0] : t.children[e - 1].nextSibling;
			t.insertBefore(n, o);
		}

		function i(t, n) {
			return t.map(function (t) {
				return t.elm;
			}).indexOf(n);
		}

		function r(t, n, e) {
			if (!t) return [];
			var o = t.map(function (t) {
				return t.elm;
			}),
			    i = [].concat(_toConsumableArray(n)).map(function (t) {
				return o.indexOf(t);
			});
			return e ? i.filter(function (t) {
				return t !== -1;
			}) : i;
		}

		function s(t, n) {
			var e = this;
			this.$nextTick(function () {
				return e.$emit(t.toLowerCase(), n);
			});
		}

		function a(t) {
			var n = this;
			return function (e) {
				null !== n.realList && n["onDrag" + t](e), s.call(n, t, e);
			};
		}

		var l = ["Start", "Add", "Remove", "Update", "End"],
		    u = ["Choose", "Sort", "Filter", "Clone"],
		    c = ["Move"].concat(l, u).map(function (t) {
			return "on" + t;
		}),
		    d = null,
		    f = {
			options: Object,
			list: { type: Array, required: !1, "default": null },
			value: { type: Array, required: !1, "default": null },
			noTransitionOnDrag: { type: Boolean, "default": !1 },
			clone: {
				type: Function, "default": function _default(t) {
					return t;
				}
			},
			element: { type: String, "default": "div" },
			move: { type: Function, "default": null },
			componentData: { type: Object, required: !1, "default": null }
		},
		    h = {
			name: "draggable", props: f, data: function data() {
				return { transitionMode: !1, noneFunctionalComponentMode: !1, init: !1 };
			}, render: function render(n) {
				var e = this.$slots["default"];
				if (e && 1 === e.length) {
					var o = e[0];
					o.componentOptions && "transition-group" === o.componentOptions.tag && (this.transitionMode = !0);
				}
				var i = e,
				    r = this.$slots.footer;
				r && (i = e ? [].concat(_toConsumableArray(e), _toConsumableArray(r)) : [].concat(_toConsumableArray(r)));
				var s = null,
				    a = function a(n, e) {
					s = t(s, n, e);
				};
				if (a("attrs", this.$attrs), this.componentData) {
					var l = this.componentData,
					    u = l.on,
					    c = l.props;
					a("on", u), a("props", c);
				}
				return n(this.element, s, i);
			}, mounted: function mounted() {
				var t = this;
				if (this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase(), this.noneFunctionalComponentMode && this.transitionMode) throw new Error("Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: " + this.element);
				var e = {};
				l.forEach(function (n) {
					e["on" + n] = a.call(t, n);
				}), u.forEach(function (n) {
					e["on" + n] = s.bind(t, n);
				});
				var o = _extends({}, this.options, e, {
					onMove: function onMove(n, e) {
						return t.onDragMove(n, e);
					}
				});
				!("draggable" in o) && (o.draggable = ">*"), this._sortable = new n(this.rootContainer, o), this.computeIndexes();
			}, beforeDestroy: function beforeDestroy() {
				this._sortable.destroy();
			}, computed: {
				rootContainer: function rootContainer() {
					return this.transitionMode ? this.$el.children[0] : this.$el;
				}, isCloning: function isCloning() {
					return !!this.options && !!this.options.group && "clone" === this.options.group.pull;
				}, realList: function realList() {
					return this.list ? this.list : this.value;
				}
			}, watch: {
				options: {
					handler: function handler(t) {
						for (var n in t) {
							c.indexOf(n) == -1 && this._sortable.option(n, t[n]);
						}
					}, deep: !0
				}, realList: function realList() {
					this.computeIndexes();
				}
			}, methods: {
				getChildrenNodes: function getChildrenNodes() {
					if (this.init || (this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && 1 == this.$children.length, this.init = !0), this.noneFunctionalComponentMode) return this.$children[0].$slots["default"];
					var t = this.$slots["default"];
					return this.transitionMode ? t[0].child.$slots["default"] : t;
				}, computeIndexes: function computeIndexes() {
					var t = this;
					this.$nextTick(function () {
						t.visibleIndexes = r(t.getChildrenNodes(), t.rootContainer.children, t.transitionMode);
					});
				}, getUnderlyingVm: function getUnderlyingVm(t) {
					var n = i(this.getChildrenNodes() || [], t);
					if (n === -1) return null;
					var e = this.realList[n];
					return { index: n, element: e };
				}, getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(t) {
					var n = t.__vue__;
					return n && n.$options && "transition-group" === n.$options._componentTag ? n.$parent : n;
				}, emitChanges: function emitChanges(t) {
					var n = this;
					this.$nextTick(function () {
						n.$emit("change", t);
					});
				}, alterList: function alterList(t) {
					if (this.list) t(this.list);else {
						var n = [].concat(_toConsumableArray(this.value));
						t(n), this.$emit("input", n);
					}
				}, spliceList: function m() {
					var t = arguments,
					    m = function m(n) {
						return n.splice.apply(n, t);
					};
					this.alterList(m);
				}, updatePosition: function p(t, n) {
					var p = function p(e) {
						return e.splice(n, 0, e.splice(t, 1)[0]);
					};
					this.alterList(p);
				}, getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(t) {
					var n = t.to,
					    e = t.related,
					    o = this.getUnderlyingPotencialDraggableComponent(n);
					if (!o) return { component: o };
					var i = o.realList,
					    r = { list: i, component: o };
					if (n !== e && i && o.getUnderlyingVm) {
						var s = o.getUnderlyingVm(e);
						if (s) return _extends(s, r);
					}
					return r;
				}, getVmIndex: function getVmIndex(t) {
					var n = this.visibleIndexes,
					    e = n.length;
					return t > e - 1 ? e : n[t];
				}, getComponent: function getComponent() {
					return this.$slots["default"][0].componentInstance;
				}, resetTransitionData: function resetTransitionData(t) {
					if (this.noTransitionOnDrag && this.transitionMode) {
						var n = this.getChildrenNodes();
						n[t].data = null;
						var e = this.getComponent();
						e.children = [], e.kept = void 0;
					}
				}, onDragStart: function onDragStart(t) {
					this.context = this.getUnderlyingVm(t.item), t.item._underlying_vm_ = this.clone(this.context.element), d = t.item;
				}, onDragAdd: function onDragAdd(t) {
					var n = t.item._underlying_vm_;
					if (void 0 !== n) {
						e(t.item);
						var o = this.getVmIndex(t.newIndex);
						this.spliceList(o, 0, n), this.computeIndexes();
						var i = { element: n, newIndex: o };
						this.emitChanges({ added: i });
					}
				}, onDragRemove: function onDragRemove(t) {
					if (o(this.rootContainer, t.item, t.oldIndex), this.isCloning) return void e(t.clone);
					var n = this.context.index;
					this.spliceList(n, 1);
					var i = { element: this.context.element, oldIndex: n };
					this.resetTransitionData(n), this.emitChanges({ removed: i });
				}, onDragUpdate: function onDragUpdate(t) {
					e(t.item), o(t.from, t.item, t.oldIndex);
					var n = this.context.index,
					    i = this.getVmIndex(t.newIndex);
					this.updatePosition(n, i);
					var r = { element: this.context.element, oldIndex: n, newIndex: i };
					this.emitChanges({ moved: r });
				}, computeFutureIndex: function computeFutureIndex(t, n) {
					if (!t.element) return 0;
					var e = [].concat(_toConsumableArray(n.to.children)).filter(function (t) {
						return "none" !== t.style.display;
					}),
					    o = e.indexOf(n.related),
					    i = t.component.getVmIndex(o),
					    r = e.indexOf(d) != -1;
					return r || !n.willInsertAfter ? i : i + 1;
				}, onDragMove: function onDragMove(t, n) {
					var e = this.move;
					if (!e || !this.realList) return !0;
					var o = this.getRelatedContextFromMoveEvent(t),
					    i = this.context,
					    r = this.computeFutureIndex(o, t);
					return _extends(i, { futureIndex: r }), _extends(t, { relatedContext: o, draggedContext: i }), e(t, n);
				}, onDragEnd: function onDragEnd(t) {
					this.computeIndexes(), d = null;
				}
			}
		};
		return h;
	}

	if (Array.from || (Array.from = function (t) {
		return [].slice.call(t);
	}), (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) == "object") {
		var e = require("sortablejs");
		module.exports = n(e);
	} else if ("function" == typeof define && define.amd) define(["sortablejs"], function (t) {
		return n(t);
	});else if (window && window.Vue && window.Sortable) {
		var o = n(window.Sortable);
		Vue.component("draggable", o);
	}
}();