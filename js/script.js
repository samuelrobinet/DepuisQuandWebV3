/**
 * ===================================
 * Depuis Quand ? - Main JavaScript
 * ===================================
 * Version: 2.0
 * Author: DepuisQuand Team
 * Last Updated: 2026
 */

// ===================================
// Configuration
// ===================================
const CONFIG = {
    referendumDate: new Date(2005, 4, 29), // 29 mai 2005
    animationDuration: 1000,
    scrollOffset: 80
};

// ===================================
// Initialisation au chargement
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Fonction principale d'initialisation
 */
function initializeApp() {
    // Calcul du temps écoulé
    calculateTimeSince();
    
    // Navigation sticky
    initializeNavbar();
    
    // Smooth scroll
    initializeSmoothScroll();
    
    // Animations AOS
    initializeAOS();
    
    // Animations des barres de progression
    animateProgressBars();
    
    // Mise à jour des statistiques
    updateStatistics();
    
    // Event listeners
    setupEventListeners();
    
    console.log('✅ Application initialisée avec succès');
}

// ===================================
// Calcul du temps écoulé
// ===================================
function calculateTimeSince() {
    const referendumDate = new Date(CONFIG.referendumDate);
    const today = new Date();
    
    // Reset des heures pour un calcul précis
    today.setHours(0, 0, 0, 0);
    referendumDate.setHours(0, 0, 0, 0);
    
    // Calcul du nombre total de jours
    const totalDays = Math.floor((today - referendumDate) / (1000 * 60 * 60 * 24));
    
    // Calcul détaillé : années, mois, jours
    const timeDifference = calculateDetailedTime(referendumDate, today);
    
    // Affichage
    displayTimeSince(timeDifference, totalDays);
}

/**
 * Calcule le temps détaillé entre deux dates
 */
function calculateDetailedTime(startDate, endDate) {
    let years = 0;
    let months = 0;
    let days = 0;
    
    let tempDate = new Date(startDate);
    
    // Calcul des années complètes
    tempDate.setFullYear(tempDate.getFullYear() + 1);
    while (tempDate <= endDate) {
        years++;
        tempDate.setFullYear(tempDate.getFullYear() + 1);
    }
    tempDate.setFullYear(tempDate.getFullYear() - 1);
    
    // Calcul des mois complets
    tempDate.setMonth(tempDate.getMonth() + 1);
    while (tempDate <= endDate) {
        months++;
        tempDate.setMonth(tempDate.getMonth() + 1);
    }
    tempDate.setMonth(tempDate.getMonth() - 1);
    
    // Calcul des jours complets
    while (tempDate < endDate) {
        days++;
        tempDate.setDate(tempDate.getDate() + 1);
    }
    
    return { years, months, days };
}

/**
 * Affiche le temps écoulé dans l'interface
 */
function displayTimeSince(timeDiff, totalDays) {
    const timeCounter = document.getElementById('timeSince');
    const timeDetails = document.getElementById('timeDetails');
    const daysStat = document.getElementById('daysSince');
    
    if (timeCounter) {
        // Animation du texte
        timeCounter.style.opacity = '0';
        
        setTimeout(() => {
            timeCounter.innerHTML = `
                <div class="d-flex flex-column align-items-center">
                    <div class="mb-2">
                        <span class="counter-digit">${timeDiff.years}</span> 
                        <span class="counter-label">ans</span>
                    </div>
                    <div class="mb-2">
                        <span class="counter-digit">${timeDiff.months}</span> 
                        <span class="counter-label">mois</span>
                    </div>
                    <div>
                        <span class="counter-digit">${timeDiff.days}</span> 
                        <span class="counter-label">jours</span>
                    </div>
                </div>
            `;
            
            timeCounter.style.opacity = '1';
            timeCounter.style.transition = 'opacity 0.5s ease';
        }, 300);
    }
    
    if (timeDetails) {
        timeDetails.innerHTML = `
            <i class="fas fa-calendar-day me-2"></i>
            Soit un total de <strong>${totalDays.toLocaleString('fr-FR')}</strong> jours
        `;
    }
    
    if (daysStat) {
        animateCounter(daysStat, totalDays);
    }
}

/**
 * Anime un compteur numérique
 */
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('fr-FR');
    }, stepTime);
}

// ===================================
// Navigation
// ===================================
function initializeNavbar() {
    const navbar = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });
}

// ===================================
// Smooth Scroll
// ===================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - CONFIG.scrollOffset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// ===================================
// Animations AOS
// ===================================
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// ===================================
// Animation des barres de progression
// ===================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('aria-valuenow');
                
                // Animation
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s ease-in-out';
        observer.observe(bar);
    });
}

// ===================================
// Mise à jour des statistiques
// ===================================
function updateStatistics() {
    const referendums = [
        { year: 2005, participation: 69.34 },
        { year: 2000, participation: 30.19 },
        { year: 1992, participation: 69.70 },
        { year: 1988, participation: 36.88 },
        { year: 1972, participation: 39.49 },
        { year: 1969, participation: 80.13 },
        { year: 1962, participation: 76.99 }, // octobre
        { year: 1962, participation: 75.59 }, // avril
        { year: 1961, participation: 76.39 },
        { year: 1958, participation: 84.93 }
    ];
    
    const totalReferendums = referendums.length;
    const avgParticipation = (referendums.reduce((sum, r) => sum + r.participation, 0) / totalReferendums).toFixed(1);
    
    const totalRefElement = document.getElementById('totalReferendums');
    if (totalRefElement) {
        animateCounter(totalRefElement, totalReferendums);
    }
}

// ===================================
// Event Listeners
// ===================================
function setupEventListeners() {
    // Détection du scroll pour animations
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Direction du scroll
        if (scrollTop > lastScrollTop) {
            // Scroll vers le bas
            document.body.classList.add('scrolling-down');
            document.body.classList.remove('scrolling-up');
        } else {
            // Scroll vers le haut
            document.body.classList.add('scrolling-up');
            document.body.classList.remove('scrolling-down');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);
    
    // Gestion du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('Fenêtre redimensionnée');
        }, 250);
    });
}

// ===================================
// Utilitaires
// ===================================

/**
 * Formate une date au format français
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
}

/**
 * Débounce pour optimiser les événements
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Vérifie si un élément est visible dans le viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===================================
// Export pour réutilisation
// ===================================
window.DepuisQuand = {
    calculateTimeSince,
    animateCounter,
    formatDate,
    debounce,
    isElementInViewport
};

console.log('📊 DepuisQuand.js chargé avec succès');