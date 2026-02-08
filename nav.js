// nav.js - Complete navigation with mobile support
// 3-zone layout: Logo (left) | Home, Tools, Strategies (center) | $POET button (right)
document.addEventListener('DOMContentLoaded', () => {
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
                    <li><a href="index.html">Home</a></li>
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
                            <li><a href="first_hour_strategy.html">First Hour Effect</a></li>
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
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking links (except dropdown toggle)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.classList.contains('dropdown-toggle')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
    
    // Mobile dropdown toggle
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = e.target.closest('.dropdown');
                dropdown.classList.toggle('active');
            }
        });
    });
});
