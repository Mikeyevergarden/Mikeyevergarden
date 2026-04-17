const yearTarget = document.getElementById("year");
const revealNodes = Array.from(document.querySelectorAll(".reveal"));
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = Array.from(document.querySelectorAll("[data-section]"));

if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.18
    }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            const activeId = entry.target.id;
            navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                link.classList.toggle("is-active", href === `#${activeId}`);
            });
        });
    },
    {
        threshold: 0.45,
        rootMargin: "-20% 0px -35% 0px"
    }
);

sections.forEach((section) => sectionObserver.observe(section));
