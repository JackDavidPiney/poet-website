// nav.js - Complete navigation with mobile support
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
                    <li><a href="index.html#home">Home</a></li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">Strategies <span class="arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="first_hour_strategy.html">First Hour Effect</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle">Tools <span class="arrow">▼</span></a>
                        <ul class="dropdown-menu">
                            <li><a href="factsheet-generator.html">Factsheets</a></li>
                        </ul>
                    </li>
                    <li><a href="index.html#approach">Approach</a></li>
                    <li><a href="index.html#contact">Contact</a></li>
                </ul>
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
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if (dropdownToggle && window.innerWidth <= 768) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = e.target.closest('.dropdown');
            dropdown.classList.toggle('active');
        });
    }
});