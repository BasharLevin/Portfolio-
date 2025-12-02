// ---------- Project data ----------

const projects = [
  {
    id: "ea-seed-rl-llm",
    title: "RL + LLM Agent Controller",
    context: "KTH x EA SEED · Unity FPS",
    category: "AI/ML",
    tags: ["RL", "LLM", "Unity"],
    short:
      "An FPS agent where a language model picks high-level mode (navigation or combat) and ML-Agents handles the low-level behaviour.",
    whatIDid: [
      "Wrote a C# controller that sends compact state to an LLM and gets back a mode decision.",
      "Added a cooldown/cache so the game doesn’t spam the API every frame.",
      "Hooked the LLM decisions into two separate ML-Agents policies (navigation and combat).",
      "Debugged issues when multiple enemies are visible at once (mode switching conflicts)."
    ],
    techStack: ["Unity", "C#", "Unity ML-Agents", "OpenAI API"],
    media: {
      // your actual video file
      videoUrl: "media/ea_seed/ea_rl.mp4",
      images: [
        "media/ea_seed/ea_seed.png"
      ] // you can add thumbnails later if you want
    },
    links: {
      github: "https://github.com/YOUR_GITHUB_USERNAME",
      report: ""
    }
  },
  {
    id: "shopping-ai-app",
    title: "AI Shopping List App",
    context: "Personal project · Flutter (iOS & Android)",
    category: "Apps",
    tags: ["Flutter", "AI", "Maps"],
    short:
      "Mobile app where you chat with an AI to get recipes and turn ingredients into interactive shopping lists.",
    whatIDid: [
      "Built the AI chat view that can suggest recipes and list all ingredients.",
      "Added a one-tap 'Create List' action that converts AI output into checklist items.",
      "Made a home screen with categories, tips, and quick access to lists.",
      "Integrated Google Maps to show nearby stores with custom markers.",
      "Implemented a checklist screen with bought/pending states and simple animations."
    ],
    techStack: ["Flutter", "Dart", "Google Maps SDK"],
    media: {
      videoUrl: "",
      images: [
        "media/shopping-app/IMG_0893.PNG",
        "media/shopping-app/IMG_0897.PNG",
        "media/shopping-app/IMG_0892.PNG",
        "media/shopping-app/IMG_0896.PNG"
      ]
    },
    links: {
      github: "https://github.com/YOUR_GITHUB_USERNAME",
      demo: ""
    }
  },
  
    {
    id: "gnu-radio-thesis",
    title: "WiFi & LTE Physical Layer Simulation and SDR Comparison",
    context: "BSc Thesis · Mid Sweden University",
    category: "SDR",
    tags: ["SDR", "GNU Radio", "MATLAB"],
    short:
        "Simulated and analyzed WiFi and LTE physical layers using MATLAB and GNU Radio, comparing performance and SDR feasibility.",
    whatIDid: [
        "Simulated OFDM-based PHY layers for WiFi and LTE.",
        "Implemented modulation, demodulation, channel models, and BER analysis.",
        "Built equivalent GNU Radio flowgraphs to compare with MATLAB results.",
        "Evaluated differences between simulation vs. real-time SDR processing.",
        "Compared platform performance, flexibility, and practical limitations."
    ],
    techStack: ["MATLAB", "GNU Radio", "SDR hardware", "Python"],
    media: {
        videoUrl: "",
        images: [
            "media/thesis/Screenshot 2025-12-02 at 13.28.14.png"
        ]
    },
    links: {
        thesis: "https://www.diva-portal.org/smash/record.jsf?pid=diva2%3A1876946&dswid=1191"
    }
    },

  {
    id: "barber-booking",
    title: "Barber Shop Booking System",
    context: "Prototype for a real barbershop",
    category: "Web/SaaS",
    tags: ["Web", "Booking"],
    short:
      "Simple booking flow for a barbershop with time selection, appointment history, and a small spin-to-win widget.",
    whatIDid: [
      "Implemented a day/time picker for booking slots across the week.",
      "Built an appointments page showing upcoming and past bookings.",
      "Added a basic spin-to-win dialog to hand out discounts and free services."
    ],
    techStack: ["JS / TS", "Backend framework", "HTML/CSS"],
    media: {
      videoUrl: "",
      images: [
        "media/booking/IMG_0899.jpg",
        "media/booking/IMG_0900.jpg",
        "media/booking/IMG_0901.jpg"
      ]
    },
    links: {
      github: "https://github.com/YOUR_GITHUB_USERNAME",
      demo: ""
    }
  },
  {
    id: "guitar-shop-system",
    title: "Guitar Shop Booking System",
    context: "Course project · MIUN",
    category: "Web/SaaS",
    tags: ["Web", "CRUD"],
    short:
      "Booking and management system for a guitar shop: customers, instruments, and appointments.",
    whatIDid: [
      "Modelled customers, instruments, and bookings in a relational database.",
      "Implemented basic CRUD views for staff to manage bookings and data.",
      "Kept the structure clean so it’s easy to extend with more features."
    ],
    techStack: ["Backend framework", "SQL", "HTML/CSS"],
    media: {
      videoUrl: "",
      images: []
    },
    links: {
      github: "https://github.com/javaapputveckling/gitarrworkshop.git",
      report: ""
    }
  }
];

// ---------- DOM hooks ----------

const projectsGrid = document.getElementById("projects-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("project-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");
const modalBackdrop = document.querySelector(".modal-backdrop");

// ---------- Rendering ----------

function renderProjects(filterTag = "all") {
  projectsGrid.innerHTML = "";

  const filtered = projects.filter((p) => {
    if (filterTag === "all") return true;
    if (p.category === filterTag) return true;
    if (Array.isArray(p.tags)) return p.tags.includes(filterTag);
    return false;
  });

  filtered.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.id = project.id;

    const thumbSrc =
      project.media && project.media.images && project.media.images.length
        ? project.media.images[0]
        : null;

    card.innerHTML = `
      <div class="project-thumb">
        ${
          thumbSrc
            ? `<img src="${thumbSrc}" alt="${project.title} thumbnail">`
            : `<div class="project-thumb-placeholder">No image</div>`
        }
      </div>
      <div class="project-main">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-context">${project.context}</p>
        <p class="project-body">${project.short}</p>
        <div class="project-tags">
          ${project.tags.map((t) => `<span class="project-tag">${t}</span>`).join("")}
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(project.id));
    projectsGrid.appendChild(card);
  });
}

function openModal(id) {
  const p = projects.find((x) => x.id === id);
  if (!p) return;

  modalBody.innerHTML = `
    <h2 class="modal-title">${p.title}</h2>
    <p class="modal-context">${p.context}</p>

    <h3>Overview</h3>
    <p>${p.short}</p>

    <h3>What I worked on</h3>
    <ul>
      ${p.whatIDid.map((line) => `<li>${line}</li>`).join("")}
    </ul>

    <h3>Tech stack</h3>
    <p>${p.techStack.join(", ")}</p>

    ${renderMedia(p.media)}
    ${renderLinks(p.links)}
  `;

  modal.classList.remove("hidden");
}

function renderMedia(media = {}) {
  if (!media) return "";

  let html = "";

  if (media.videoUrl) {
    html += `
      <h3>Video</h3>
      <video class="modal-video" controls>
        <source src="${media.videoUrl}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `;
  }

  if (media.images && media.images.length) {
    html += `
      <h3>Screenshots</h3>
      <div class="modal-gallery">
        ${media.images
          .map(
            (src) =>
              `<img src="${src}" alt="Screenshot from ${src.split("/").pop()}">`
          )
          .join("")}
      </div>
    `;
  }

  return html;
}

function renderLinks(links = {}) {
  const items = [];

  if (links.github) {
    items.push(
      `<a href="${links.github}" target="_blank" class="pill">View code on GitHub</a>`
    );
  }
  if (links.demo) {
    items.push(
      `<a href="${links.demo}" target="_blank" class="pill">Open live demo</a>`
    );
  }
  if (links.thesis || links.report) {
    items.push(
      `<a href="${links.thesis || links.report}" target="_blank" class="pill">
        Read thesis / report
      </a>`
    );
  }

  if (!items.length) return "";
  return `<h3>Links</h3><div class="contact-links">${items.join("")}</div>`;
}

// ---------- Modal events ----------

function closeModal() {
  modal.classList.add("hidden");
  const video = modalBody.querySelector("video");
  if (video) video.pause();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ---------- Filters ----------

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tag = btn.dataset.tag;
    renderProjects(tag);
  });
});

// ---------- Footer year ----------

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Initial render ----------

renderProjects("all");
