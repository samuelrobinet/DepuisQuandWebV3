/* L'Urne Vide — compteur et chronologie.
   Pour ajouter un référendum : ajouter une entrée EN TÊTE de REFERENDUMS
   (le plus récent en premier). Le compteur repart alors de sa date. */

const REFERENDUMS = [
  {
    date: [2005, 5, 29], titre: "Traité établissant une Constitution pour l'Europe",
    president: 'Jacques Chirac', pm: 'Jean-Pierre Raffarin',
    oui: 45.33, non: 54.67, participation: 69.34,
    texte: "Ratification du traité constitutionnel européen, censé remplacer les traités existants. Le « Non » l'emporte, un tournant pour la construction européenne."
  },
  {
    date: [2000, 9, 24], titre: 'Quinquennat présidentiel',
    president: 'Jacques Chirac', pm: 'Lionel Jospin',
    oui: 73.21, non: 26.79, participation: 30.19,
    texte: "Passage du mandat présidentiel de 7 à 5 ans, pour l'aligner sur celui de l'Assemblée nationale. Adopté, avec une abstention record."
  },
  {
    date: [1992, 9, 20], titre: 'Traité de Maastricht',
    president: 'François Mitterrand', pm: 'Pierre Bérégovoy',
    oui: 51.05, non: 48.95, participation: 69.70,
    texte: "Ratification du traité qui crée l'Union européenne et prépare la monnaie unique. Adopté de justesse."
  },
  {
    date: [1988, 11, 6], titre: 'Statut de la Nouvelle-Calédonie',
    president: 'François Mitterrand', pm: 'Michel Rocard',
    oui: 79.99, non: 20.01, participation: 36.88,
    texte: "Approbation des accords de Matignon : dix ans de transition avant un vote d'autodétermination."
  },
  {
    date: [1972, 4, 23], titre: 'Élargissement de la Communauté européenne',
    president: 'Georges Pompidou', pm: 'Jacques Chaban-Delmas',
    oui: 68.32, non: 31.68, participation: 39.49,
    texte: "Entrée du Royaume-Uni, de l'Irlande, du Danemark et de la Norvège dans la Communauté européenne. Adopté malgré une forte abstention."
  },
  {
    date: [1969, 4, 27], titre: 'Régionalisation et réforme du Sénat',
    president: 'Charles de Gaulle', pm: 'Maurice Couve de Murville',
    oui: 47.59, non: 52.41, participation: 80.13,
    texte: "Création des régions et réforme du Sénat. Rejeté : de Gaulle démissionne le lendemain, comme il l'avait annoncé."
  },
  {
    date: [1962, 10, 28], titre: 'Élection du président au suffrage universel direct',
    president: 'Charles de Gaulle', pm: 'Georges Pompidou',
    oui: 62.25, non: 37.75, participation: 76.99,
    texte: "Le président sera élu directement par les citoyens et non plus par un collège électoral. Une réforme majeure des institutions."
  },
  {
    date: [1962, 4, 8], titre: "Accords d'Évian sur l'Algérie",
    president: 'Charles de Gaulle', pm: 'Michel Debré',
    oui: 90.81, non: 9.19, participation: 75.59,
    texte: "Approbation des accords qui mettent fin à la guerre d'Algérie et ouvrent la voie à son indépendance."
  },
  {
    date: [1961, 1, 8], titre: 'Autodétermination en Algérie',
    president: 'Charles de Gaulle', pm: 'Michel Debré',
    oui: 75.26, non: 24.74, participation: 76.39,
    texte: "Mandat donné au président pour négocier l'autodétermination de l'Algérie."
  },
  {
    date: [1958, 9, 28], titre: 'Constitution de la Ve République',
    president: 'René Coty', pm: 'Charles de Gaulle (président du Conseil)',
    oui: 82.60, non: 17.40, participation: 84.93,
    texte: "Premier référendum du régime : la nouvelle Constitution est approuvée et fonde la Ve République."
  }
];

const MOIS_COURT = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const nf = (n, d = 0) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d });
const toDate = ([y, m, d]) => new Date(y, m - 1, d);

/* Durée exacte en années, mois, jours entre deux dates */
function decompose(from, to) {
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) {
    m -= 1;
    d += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (m < 0) { y -= 1; m += 12; }
  return { y, m, d };
}

function daysBetween(from, to) {
  const a = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b - a) / 86400000);
}

function updateCounter() {
  const last = toDate(REFERENDUMS[0].date);
  const now = new Date();
  const days = daysBetween(last, now);
  const { y, m, d } = decompose(last, now);
  document.getElementById('days').textContent = nf(days);
  document.getElementById('statDays').textContent = nf(days);
  document.getElementById('years').textContent = y;
  document.getElementById('months').textContent = m;
  document.getElementById('rest').textContent = d;
}

function renderTimeline() {
  const list = document.getElementById('timeline');
  list.innerHTML = '';
  for (const r of REFERENDUMS) {
    const [y, mo, d] = r.date;
    const adopte = r.oui > r.non;
    const li = document.createElement('li');
    li.className = 'ref';
    li.innerHTML = `
      <p class="ref__date">${d} ${MOIS_COURT[mo - 1]}<small>${y}</small></p>
      <div class="ref__body">
        <div class="ref__head">
          <h3 class="ref__title">${r.titre}</h3>
          <span class="ref__tag ${adopte ? 'ref__tag--adopte' : 'ref__tag--rejete'}">${adopte ? 'Adopté' : 'Rejeté'}</span>
        </div>
        <p class="ref__meta">Président : ${r.president} · Premier ministre : ${r.pm} · Participation : ${nf(r.participation, 2)} %</p>
        <p class="ref__text">${r.texte}</p>
        <div class="bar" role="img" aria-label="Oui ${nf(r.oui, 2)} %, Non ${nf(r.non, 2)} %">
          <span class="bar__oui" style="width:${r.oui}%">Oui ${nf(r.oui, 2)} %</span>
          <span class="bar__non" style="width:${r.non}%">Non ${nf(r.non, 2)} %</span>
        </div>
      </div>`;
    list.appendChild(li);
  }
}

function renderStats() {
  const avg = REFERENDUMS.reduce((s, r) => s + r.participation, 0) / REFERENDUMS.length;
  document.getElementById('statCount').textContent = REFERENDUMS.length;
  document.getElementById('statTurnout').textContent = nf(avg, 1) + ' %';
}

/* Menu : resserrement au défilement, section active, menu mobile */
function initMenu() {
  const bar = document.querySelector('.topbar');
  const btn = document.getElementById('menuBtn');
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];

  const onScroll = () => bar.classList.toggle('is-scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    const open = bar.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  links.forEach((a) => a.addEventListener('click', () => {
    bar.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  }));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((a) => {
      const s = document.querySelector(a.getAttribute('href'));
      if (s) io.observe(s);
    });
  }
}

renderTimeline();
renderStats();
initMenu();
updateCounter();
/* Met à jour le compteur à minuit sans recharger la page */
setInterval(updateCounter, 60 * 1000);
