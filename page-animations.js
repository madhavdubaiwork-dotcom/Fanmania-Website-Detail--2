(function () {
  const initCursorGlow = () => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let frame = 0;
    let x = 0;
    let y = 0;

    document.addEventListener("pointermove", (event) => {
      x = event.clientX;
      y = event.clientY;

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          frame = 0;
        });
      }

      glow.classList.add("is-active");
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
      glow.classList.remove("is-active");
    });
  };

  const initMotion = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    document.documentElement.classList.add("motion-ready");

    const motionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    });

    const motionTargets = document.querySelectorAll(".motion-in, .reveal, .js-reveal");
    motionTargets.forEach((element) => motionObserver.observe(element));

    document.querySelectorAll([
      "section",
      "article",
      "aside",
      "figure",
      ".feature-card",
      ".category",
      ".brand-panel",
      ".product-card",
      ".next-step",
      ".timeline-glass",
      ".artwork",
      ".contact-copy",
      ".contact-layout form",
      ".field",
      ".license-list span",
      ".inquiry-types span",
      ".journey-panel",
      ".journey-detail"
    ].join(", ")).forEach((element) => {
      if (!element.classList.contains("motion-in") && !element.classList.contains("reveal") && !element.classList.contains("js-reveal")) {
        element.classList.add("motion-in");
        motionObserver.observe(element);
      }
    });
  };

  const init = () => {
    initCursorGlow();
    initMotion();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
