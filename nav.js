// nav.js - Single source of truth for site navigation
// All pages load this file. No page has inline <nav> HTML.
document.addEventListener('DOMContentLoaded', () => {
    // Detect if we're on the homepage
    const isHome = window.location.pathname === '/' || 
                   window.location.pathname.endsWith('index.html') ||
                   window.location.pathname.endsWith('/');

    const homeLink = isHome ? '#home' : 'index.html';

    const navHTML = `
        <nav>
            <div class="nav-container">
                <a href="index.html" class="logo">POET</a>
                <div class="menu-toggle" id="menuToggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul class="nav-links" id="navLinks">
                    <li><a href="${homeLink}">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">Tools <span class="arrow">&#9660;</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="factsheet-generator.html">Factsheet Generator</a></li>
                            <li><a href="playbook.html">Playbook</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">Strategies <span class="arrow">&#9660;</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="mean_reversion_strategy.html">$SOL Mean Reversion</a></li>
                        </ul>
                    </li>
                    <li class="mobile-poet-link"><a href="https://jup.ag/tokens/4jnqfSMWE1opwNT9m98s5QFKyNasypjeoieJsGsdjupx" target="_blank" rel="noopener">$POET</a></li>
                </ul>
                <div class="nav-right">
                    <a href="https://jup.ag/tokens/4jnqfSMWE1opwNT9m98s5QFKyNasypjeoieJsGsdjupx" target="_blank" rel="noopener" class="nav-btn-poet">$POET</a>
                </div>
            </div>
        </nav>
    `;

    // Inject nav after background elements if present, otherwise at top of body
    const noiseOverlay = document.querySelector('.noise-overlay');
    if (noiseOverlay) {
        noiseOverlay.insertAdjacentHTML('afterend', navHTML);
    } else {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link (except dropdown toggles)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (!link.classList.contains('dropdown-toggle')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Mobile dropdown toggles (all of them, not just the first)
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = e.target.closest('.dropdown');
                // Close other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
            }
        });
    });
});
