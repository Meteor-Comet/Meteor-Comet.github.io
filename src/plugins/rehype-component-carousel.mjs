/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * 将 <!-- slide --> 注释分割为独立幻灯片
 * @param {import('hast').Content[]} children
 */
function splitSlides(children) {
	const slides = [];
	let current = [];

	for (const child of children) {
		if (
			child.type === "comment" &&
			typeof child.value === "string" &&
			child.value.trim() === "slide"
		) {
			if (current.length > 0) slides.push(current);
			current = [];
		} else {
			current.push(child);
		}
	}

	if (current.length > 0) slides.push(current);
	return slides;
}

/**
 * Creates a Carousel component.
 * 与 GithubCardComponent / AdmonitionComponent 完全同构
 *
 * @param {Object} properties - The properties of the component.
 * @param {import('mdast').RootContent[]} children - Slide content separated by <!-- slide -->
 * @returns {import('mdast').Parent} The created Carousel component.
 */
export function CarouselComponent(properties, children) {
	const slides = splitSlides(children || []);

	if (slides.length === 0) {
		return h("div", { class: "carousel-error" }, [
			'Invalid directive. ("carousel" directive must contain at least one slide)',
		]);
	}

	const uuid = `carousel-${Math.random().toString(36).slice(-6)}`;

	const slideNodes = slides.map((slideChildren, i) =>
		h(
			"div",
			{ class: `carousel-slide${i === 0 ? " active" : ""}`, "data-index": i },
			slideChildren,
		),
	);

	const prevBtn = h(
		"button",
		{ class: "carousel-prev", "aria-label": "Previous slide" },
		"‹",
	);
	const nextBtn = h(
		"button",
		{ class: "carousel-next", "aria-label": "Next slide" },
		"›",
	);

	const indicators = h(
		"div",
		{ class: "carousel-indicators" },
		slides.map((_, i) =>
			h("span", {
				class: `carousel-dot${i === 0 ? " active" : ""}`,
				"data-index": i,
			}),
		),
	);

	const nScript = h(
		`script#${uuid}-script`,
		{ type: "text/javascript", defer: true },
		`
      (function() {
        var c = document.getElementById('${uuid}');
        if (!c) return;
        var slides = c.querySelectorAll('.carousel-slide');
        var dots = c.querySelectorAll('.carousel-dot');
        var cur = 0;
        function show(i) {
          slides.forEach(function(s, n) { s.classList.toggle('active', n === i); });
          dots.forEach(function(d, n) { d.classList.toggle('active', n === i); });
          cur = i;
        }
        c.querySelector('.carousel-prev').addEventListener('click', function() {
          show((cur - 1 + slides.length) % slides.length);
        });
        c.querySelector('.carousel-next').addEventListener('click', function() {
          show((cur + 1) % slides.length);
        });
        dots.forEach(function(dot) {
          dot.addEventListener('click', function() { show(parseInt(dot.dataset.index)); });
        });
        console.log("[CAROUSEL] Initialized ${uuid} with " + slides.length + " slides.");
      })();
    `,
	);

	return h(`div#${uuid}`, { class: "carousel-container" }, [
		h("div", { class: "carousel-track" }, slideNodes),
		prevBtn,
		nextBtn,
		indicators,
		nScript,
	]);
}