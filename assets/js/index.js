const firstSection = document.getElementById("today-in-space");
const secSection = document.getElementById("launches");
const thirdSection = document.getElementById("planets");
const firstSectionBtn = document.querySelector('[href="#today-in-space"]');
const secSectionBtn = document.querySelector('[href="#launches"]');
const thirdSectionBtn = document.querySelector('[href="#planets"]');

// ? =================== first section======================
async function bringDataFirst(){
const response =await fetch("https://api.nasa.gov/planetary/apod?api_key=yoGS1AEOQds2st8iFEAxUSlkRUlOS7HzfzTO7bQe");
const data =await response.json();
return(data);
}
let datafirst =bringDataFirst();

function displayfirstSection(data){
let container = `
<div class="max-w-7xl mx-auto">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div>
              <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
                Today in Space
              </h2>
              <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
                 Astronomy Picture of the Day - ${data.date}
              </p>
            </div>
            <div class="flex items-center space-x-2 md:space-x-3">
              <label for="apod-date-input" class="date-input-wrapper">
                <input
                  type="date"
                  id="apod-date-input"
                  class="custom-date-input"
                  value="2024-03-14"
                  max=""
                  min="1995-06-16"
                />
                <span class="text-sm">${data.date}</span>
              </label>
              <button
                id="load-date-btn"
                class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
              >
                <i class="fas fa-search"></i>
                <span class="hidden sm:inline">Load</span>
              </button>
              <button
                id="today-apod-btn"
                class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
              >
                Today
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div class="xl:col-span-2">
              <div
                id="apod-image-container"
                class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
              >
                <div id="apod-loading" class="text-center hidden">
                  <i
                    class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                  ></i>
                  <p class="text-slate-400">Loading today's image...</p>
                </div>
                <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
                <img
                  id="apod-image"
                  class="w-full h-full object-cover"
                  src="${data.url}"
                  alt="Astronomy Picture of the Day"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="absolute bottom-6 left-6 right-6">
                    <button
                      class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                    >
                      <i class="fas fa-expand mr-2"></i>View Full Resolution
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <h3
                  id="apod-title"
                  class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
                >
                  ${data.title}
                </h3>
                <div
                  class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
                >
                  <span id="apod-date-detail"
                    ><i class="far fa-calendar mr-2"></i>${data.date}</span
                  >
                </div>
                <p
                  id="apod-explanation"
                  class="text-slate-300 leading-relaxed mb-4"
                >
                  ${data.explanation}
                </p>
                <div
                  id="apod-copyright"
                  class="text-xs text-slate-400 italic mb-4"
                >
                  ${data.copyright}
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                  Image Details
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Date</span>
                    <span id="apod-date-info" class="font-medium"
                      >${data.date}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Media Type</span>
                    <span id="apod-media-type" class="font-medium">${data.media_type}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Source</span>
                    <span class="font-medium">NASA APOD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;

firstSection.innerHTML = container;
}
async function runAll(){
const theData = await bringDataFirst();
displayfirstSection(theData);  
}
runAll();

firstSectionBtn.addEventListener("click", function() {
  firstSection.classList.remove("hidden");
  secSection.classList.add("hidden");
  thirdSection.classList.add("hidden");
});

// ? =================== sec section======================

secSectionBtn.addEventListener("click", function() {
  firstSection.classList.add("hidden");
  thirdSection.classList.add("hidden");
  secSection.classList.remove("hidden");
});

async function bringDataSec() {
  try {
    const response = await fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function displaySecSection(results) {
  if (!results || results.length === 0) return;

  const featured = results[0];
  const featuredDate = new Date(featured.net);

  let cards = "";

  for (let i = 1; i < results.length; i++) {

    const launch = results[i];
    const dateObj = new Date(launch.net);

    cards += `
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer">

        <div class="relative h-48 overflow-hidden">

          <img
            src="${launch.image?.image_url}"
            class="w-full h-full object-cover"
          >

          <div class="absolute top-3 right-3">
            <span class="px-3 py-1 bg-green-500/90 text-white rounded-full text-xs font-semibold">
              ${launch.status?.abbrev ?? ""}
            </span>
          </div>

        </div>

        <div class="p-5">

          <div class="mb-3">
            <h4 class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
              ${launch.name}
            </h4>

            <p class="text-sm text-slate-400 flex items-center gap-2">
              <i class="fas fa-building"></i>
              ${launch.launch_service_provider?.name ?? ""}
            </p>
          </div>

          <div class="space-y-2 mb-4">

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-calendar text-slate-500 w-4"></i>
              <span>${dateObj.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-clock text-slate-500 w-4"></i>
              <span>${dateObj.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:false})} UTC</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-rocket text-slate-500 w-4"></i>
              <span>${launch.rocket?.configuration?.name ?? ""}</span>
            </div>

            <div class="flex items-center gap-2 text-sm">
              <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
              <span class="line-clamp-1">${launch.pad.location.name}</span>
            </div>

          </div>

          <div class="flex items-center gap-2 pt-4 border-t border-slate-700">

            <button class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">
              Details
            </button>

            <button class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600">
              <i class="far fa-heart"></i>
            </button>

          </div>

        </div>

      </div>
    `;
  }

  secSection.innerHTML = `
<div class="max-w-7xl mx-auto">

<div class="mb-6 md:mb-8">
<h2 class="text-3xl font-bold">Upcoming Launches</h2>
<p class="text-slate-400">
Real-time tracking of the next missions to space
</p>
</div>

<div class="mb-8">

<div class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden">

<div class="grid lg:grid-cols-2 gap-6 p-8">

<div>

<div class="flex gap-3 mb-4">

<span class="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full">
Featured Launch
</span>

<span class="px-4 py-1 bg-green-500/20 text-green-400 rounded-full">
${featured.status?.abbrev}
</span>

</div>

<h2 class="text-3xl font-bold mb-3">
${featured.name}
</h2>

<p class="text-slate-400 mb-5">
${featured.launch_service_provider?.name}
</p>

<div class="grid grid-cols-2 gap-4 mb-5">

<div class="bg-slate-900/50 p-4 rounded-xl">
<p class="text-xs text-slate-400">Launch Date</p>
<p>${featuredDate.toLocaleDateString()}</p>
</div>

<div class="bg-slate-900/50 p-4 rounded-xl">
<p class="text-xs text-slate-400">Launch Time</p>
<p>${featuredDate.toLocaleTimeString()} UTC</p>
</div>

<div class="bg-slate-900/50 p-4 rounded-xl">
<p class="text-xs text-slate-400">Location</p>
<p>${featured.pad.location.name}</p>
</div>

<div class="bg-slate-900/50 p-4 rounded-xl">
<p class="text-xs text-slate-400">Rocket</p>
<p>${featured.rocket.configuration.name}</p>
</div>

</div>

<p class="text-slate-300 mb-5">
${featured.mission?.description ?? "No description available."}
</p>

<button class="px-6 py-3 bg-blue-500 rounded-xl">
View Full Details
</button>

</div>

<div>

<img
src="${featured.image?.image_url}"
class="w-full h-full object-cover rounded-2xl"
>

</div>

</div>

</div>

</div>

<h3 class="text-xl font-semibold mb-4">
All Upcoming Launches
</h3>

<div id="launches-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

${cards}

</div>

</div>
`;
}

async function runAll2() {
  const theData = await bringDataSec();
  displaySecSection(theData);  
}
runAll2();

// ? =================== third section======================

let planetsData = [];
const AU = 149597870.7;
function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "N/A";
  return Number(value).toLocaleString();
}

function formatMass(massObj) {
  if (!massObj) return "N/A";
  return `${massObj.massValue} × 10^${massObj.massExponent} kg`;
}

function formatVolume(volObj) {
  if (!volObj) return "N/A";
  return `${volObj.volValue} × 10^${volObj.volExponent} km³`;
}

function getPlanetColor(planetName) {
  const colors = {
    Mercury: "#eab308",
    Venus: "#f97316",
    Earth: "#3b82f6",
    Mars: "#ef4444",
    Jupiter: "#fb923c",
    Saturn: "#facc15",
    Uranus: "#06b6d4",
    Neptune: "#2563eb",
  };

  return colors[planetName] || "#94a3b8";
}

function getPlanetTypeBadge(type) {
  if (!type) return "bg-slate-500/50 text-slate-200";

  const t = type.toLowerCase();

  if (t.includes("terrestrial")) return "bg-orange-500/50 text-orange-200";
  if (t.includes("gas")) return "bg-purple-500/50 text-purple-200";
  if (t.includes("ice")) return "bg-cyan-500/50 text-cyan-200";
  if (t.includes("planet")) return "bg-blue-500/50 text-blue-200";

  return "bg-slate-500/50 text-slate-200";
}

function getPlanetFacts(planet) {
  const facts = [];

  if (planet.englishName === "Mercury") {
    facts.push("Closest planet to the Sun");
    facts.push("Has no moons");
    facts.push("A year lasts only 88 days");
    facts.push("Extreme temperatures between day and night");
  }

  if (planet.englishName === "Venus") {
    facts.push("Hottest planet in the Solar System");
    facts.push("Rotates backwards compared to most planets");
    facts.push("Has a thick toxic atmosphere");
    facts.push("Often called Earth’s twin because of similar size");
  }

  if (planet.englishName === "Earth") {
    facts.push("Only known planet that supports life");
    facts.push("71% of the surface is covered by water");
    facts.push("Has one natural moon");
    facts.push("Protected by a strong magnetic field");
  }

  if (planet.englishName === "Mars") {
    facts.push("Known as the Red Planet");
    facts.push("Home to Olympus Mons, the largest volcano in the Solar System");
    facts.push("Has two small moons: Phobos and Deimos");
    facts.push("A major target in the search for past life");
  }

  if (planet.englishName === "Jupiter") {
    facts.push("Largest planet in the Solar System");
    facts.push("Has a giant storm called the Great Red Spot");
    facts.push("Has many moons including Ganymede");
    facts.push("A gas giant made mostly of hydrogen and helium");
  }

  if (planet.englishName === "Saturn") {
    facts.push("Famous for its spectacular ring system");
    facts.push("Second largest planet in the Solar System");
    facts.push("Less dense than water");
    facts.push("A gas giant with dozens of moons");
  }

  if (planet.englishName === "Uranus") {
    facts.push("Rotates on its side");
    facts.push("An ice giant with a pale blue color");
    facts.push("Has faint rings");
    facts.push("One of the coldest planets in the Solar System");
  }

  if (planet.englishName === "Neptune") {
    facts.push("Farthest known planet from the Sun");
    facts.push("Has extremely strong winds");
    facts.push("An ice giant with a deep blue color");
    facts.push("Takes about 165 Earth years to orbit the Sun");
  }

  if (facts.length === 0) {
    facts.push("Interesting planetary body in our Solar System");
    facts.push("Contains unique orbital and physical properties");
  }

  return facts;
}

function renderPlanetCards(planets) {
  const planetsGrid = document.getElementById("planets-grid");
  let cardsHTML = "";

  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    const distanceAU = (planet.semimajorAxis / AU).toFixed(2);
    const color = getPlanetColor(planet.englishName);

    cardsHTML += `
      <div
        class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group hover:scale-[1.02]"
        data-planet-id="${planet.id}"
        style="--planet-color: ${color}"
        onmouseover="this.style.borderColor='${color}80'"
        onmouseout="this.style.borderColor='#334155'"
      >
        <div class="relative mb-3 h-24 flex items-center justify-center">
          <img
            class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
            src="${planet.image}"
            alt="${planet.englishName}"
          />
        </div>
        <h4 class="font-semibold text-center text-sm">${planet.englishName}</h4>
        <p class="text-xs text-slate-400 text-center">${distanceAU} AU</p>
      </div>
    `;
  }

  planetsGrid.innerHTML = cardsHTML;

  const cards = document.querySelectorAll(".planet-card");
  
  for (let j = 0; j < cards.length; j++) {
    cards[j].addEventListener("click", function () {
      const planetId = this.dataset.planetId;
      const selectedPlanet = planetsData.find((planet) => planet.id === planetId);

      if (selectedPlanet) {
        showPlanetDetails(selectedPlanet);
      }
    });
  }
}

function renderComparisonTable(planets) {
  const tbody = document.getElementById("planet-comparison-tbody");
  let rowsHTML = "";

  for (let i = 0; i < planets.length; i++) {
    const planet = planets[i];
    
    const distanceAU = (planet.semimajorAxis / AU).toFixed(2);
    const diameter = planet.meanRadius ? Math.round(planet.meanRadius * 2) : "N/A";
    const moonsCount = planet.moons ? planet.moons.length : 0;
    const color = getPlanetColor(planet.englishName);
    const badgeClass = getPlanetTypeBadge(planet.type || planet.bodyType);

    rowsHTML += `
      <tr class="hover:bg-slate-800/30 transition-colors">
        <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
          <div class="flex items-center space-x-2 md:space-x-3">
            <div
              class="w-6 h-6 md:w-8 md:h-8 rounded-full flex-shrink-0"
              style="background-color: ${color}"
            ></div>
            <span class="font-semibold text-sm md:text-base whitespace-nowrap">
              ${planet.englishName}
            </span>
          </div>
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${distanceAU}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${formatNumber(diameter)}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${planet.mass ? planet.mass.massValue : "N/A"}${planet.mass ? ` × 10^${planet.mass.massExponent}` : ""}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${planet.sideralOrbit ? planet.sideralOrbit + " days" : "N/A"}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 text-slate-300 text-sm md:text-base whitespace-nowrap">
          ${moonsCount}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          <span class="px-2 py-1 rounded text-xs ${badgeClass}">
            ${planet.type || planet.bodyType || "Known since antiquity"}
          </span>
        </td>
      </tr>
    `;
  }

  tbody.innerHTML = rowsHTML;
}

function showPlanetDetails(planet) {
  if (!planet) return;

  const imageEl = document.getElementById("planet-detail-image");
  const nameEl = document.getElementById("planet-detail-name");
  const descEl = document.getElementById("planet-detail-description");

  if (!imageEl || !nameEl || !descEl) {
    console.error("Planet detail elements not found in HTML.");
    return;
  }

  imageEl.src = planet.image || "";
  imageEl.alt = planet.englishName || "planet image";

  nameEl.textContent = planet.englishName || "Known since antiquity Planet";
  descEl.textContent = planet.description || "No description available.";

  document.getElementById("planet-distance").textContent =
    planet.semimajorAxis ? (planet.semimajorAxis / 1000000).toFixed(1) + "M km" : "N/A";

  document.getElementById("planet-radius").textContent =
    planet.meanRadius ? formatNumber(planet.meanRadius) + " km" : "N/A";

  document.getElementById("planet-mass").textContent = formatMass(planet.mass);

  document.getElementById("planet-density").textContent =
    planet.density ? planet.density + " g/cm³" : "N/A";

  document.getElementById("planet-orbital-period").textContent =
    planet.sideralOrbit ? planet.sideralOrbit + " days" : "N/A";

  document.getElementById("planet-rotation").textContent =
    planet.sideralRotation ? planet.sideralRotation + " hours" : "N/A";

  document.getElementById("planet-moons").textContent =
    planet.moons ? planet.moons.length : 0;

  document.getElementById("planet-gravity").textContent =
    planet.gravity ? planet.gravity + " m/s²" : "N/A";

  document.getElementById("planet-discoverer").textContent =
    planet.discoveredBy || "Known since antiquity";

  document.getElementById("planet-discovery-date").textContent =
    planet.discoveryDate || "Ancient times";

  document.getElementById("planet-body-type").textContent =
    planet.type || planet.bodyType || "Planet";

  document.getElementById("planet-volume").textContent = formatVolume(planet.vol);

  document.getElementById("planet-perihelion").textContent =
    planet.perihelion ? (planet.perihelion / 1000000).toFixed(1) + "M km" : "N/A";

  document.getElementById("planet-aphelion").textContent =
    planet.aphelion ? (planet.aphelion / 1000000).toFixed(1) + "M km" : "N/A";

  document.getElementById("planet-eccentricity").textContent =
    planet.eccentricity ?? "N/A";

  document.getElementById("planet-inclination").textContent =
    planet.inclination !== undefined ? planet.inclination + "°" : "N/A";

  document.getElementById("planet-axial-tilt").textContent =
    planet.axialTilt !== undefined ? planet.axialTilt + "°" : "N/A";

  document.getElementById("planet-temp").textContent =
    planet.avgTemp !== undefined ? planet.avgTemp + "°C" : "N/A";

  document.getElementById("planet-escape").textContent =
    planet.escape ? (planet.escape / 1000).toFixed(1) + " km/s" : "N/A";

  // quick facts
  const factsList = document.getElementById("planet-facts");
  const facts = getPlanetFacts(planet);

  factsList.innerHTML = facts
    .map(
      (fact) => `
      <li class="flex items-start">
        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
        <span class="text-slate-300">${fact}</span>
      </li>
    `
    )
    .join("");
}

async function displaysec3() {
  thirdSectionBtn.addEventListener("click", function () {
    firstSection.classList.add("hidden");
    secSection.classList.add("hidden");
    thirdSection.classList.remove("hidden");
  });

  try {
    const res = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
    const data = await res.json();

    planetsData = data.bodies || [];

    renderPlanetCards(planetsData);
    renderComparisonTable(planetsData);

    if (planetsData.length > 0) {
      showPlanetDetails(planetsData[0]);
    }
  } catch (error) {
    console.error("Error fetching planets:", error);
  }
}

displaysec3();