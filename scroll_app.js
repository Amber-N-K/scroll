
// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});


// ********** Sticky Nav ************

// IntersectionObserver instead of event scroll

const header = document.getElementById("home");
const navbar = document.getElementById("nav");
const navHeight = navbar.getBoundingClientRect().height;
const topLink = document.querySelector(".top-link");

const stickyNav = function(entries) {
  const scrollHeight = window.pageYOffset;
  const [entry] = entries;
  // Want sticky when header is out of view
  // when isIntersecting: false --> want to add sticky
  if (!entry.isIntersecting) { // no longer in header -- add sticky
    navbar.classList.add("fixed-nav");
    topLink.classList.add("show-link");
  } else { // in header -- remove sticky
    // when isIntersecting: true --> want to remove sticky
    navbar.classList.remove("fixed-nav");
    topLink.classList.remove("show-link");
  }  
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.25, // --> 25% of the header is no longer visible
  });
headerObserver.observe(header);



// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    // prevent default
    e.preventDefault();
    // navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);

    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
     const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;
 
    if (!fixedNav) {
      position = position - navHeight;
    }

    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
  });
});

