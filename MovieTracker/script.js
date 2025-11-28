// ===============================================
// MOVIE TRACKER - PREMIUM UI WITH ANIMATIONS
// Advanced interactions and visual effects
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    // ===============================================
    // PARTICLE BACKGROUND SYSTEM
    // ===============================================
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.hue = Math.random() * 60 + 30; // Gold to orange range
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.x -= dx * force * 0.02;
                this.y -= dy * force * 0.02;
            }

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(245, 175, 25, ${0.1 * (1 - distance / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationId = requestAnimationFrame(animateParticles);
    }

    // Initialize particles
    resizeCanvas();
    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // ===============================================
    // DOM ELEMENTS
    // ===============================================
    const watchedList = document.getElementById('watchedList');
    const wishlist = document.getElementById('wishlist');
    const movieForm = document.getElementById('movieForm');
    const movieTitle = document.getElementById('movieTitle');
    const movieYear = document.getElementById('movieYear');
    const movieGenre = document.getElementById('movieGenre');
    const movieListType = document.getElementById('movieListType');
    const watchedSection = document.getElementById('watchedSection');
    const wishlistSection = document.getElementById('wishlistSection');
    const statsSection = document.getElementById('statsSection');
    const statsDiv = document.getElementById('stats');
    const watchedTab = document.getElementById('watchedTab');
    const wishlistTab = document.getElementById('wishlistTab');
    const statsTab = document.getElementById('statsTab');

    // ===============================================
    // DATA MANAGEMENT
    // ===============================================
    let movies = JSON.parse(localStorage.getItem('movies')) || { watched: [], wishlist: [] };

    // ===============================================
    // TOAST NOTIFICATION SYSTEM
    // ===============================================
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        toast.innerHTML = `${icon} ${message}`;
        
        toastContainer.appendChild(toast);
        
        // Remove toast after animation
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // ===============================================
    // RENDER FUNCTIONS WITH ANIMATIONS
    // ===============================================
    function renderList(type, animate = true) {
        const list = type === 'watched' ? watchedList : wishlist;
        list.innerHTML = '';
        
        if (movies[type].length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <p>No movies ${type === 'watched' ? 'watched' : 'in wishlist'} yet!</p>
                <p style="font-size: 0.9rem; margin-top: 0.5rem;">Add your first movie above ✨</p>
            `;
            list.appendChild(emptyState);
            return;
        }
        
        movies[type].forEach((movie, idx) => {
            const li = document.createElement('li');
            if (animate) {
                li.style.animationDelay = `${idx * 0.1}s`;
            } else {
                li.style.opacity = '1';
                li.style.transform = 'none';
                li.style.animation = 'none';
            }
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'movie-info';
            infoDiv.innerHTML = `<span class="movie-title">${escapeHtml(movie.title)}</span>` +
                (movie.year ? `<span class="movie-meta">📅 ${escapeHtml(movie.year)}</span>` : '') +
                (movie.genre ? `<span class="movie-meta">🎭 ${escapeHtml(movie.genre)}</span>` : '');
            li.appendChild(infoDiv);
            
            // Actions with tooltips
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'movie-actions';
            
            // Move button
            const moveBtn = document.createElement('button');
            moveBtn.title = type === 'watched' ? 'Move to Wishlist' : 'Mark as Watched';
            moveBtn.innerHTML = type === 'watched' ? '🕒' : '✅';
            moveBtn.setAttribute('aria-label', moveBtn.title);
            moveBtn.onclick = () => moveMovie(type, idx);
            actionsDiv.appendChild(moveBtn);
            
            // Delete button
            const delBtn = document.createElement('button');
            delBtn.title = 'Delete';
            delBtn.innerHTML = '🗑️';
            delBtn.setAttribute('aria-label', 'Delete movie');
            delBtn.onclick = () => deleteMovie(type, idx);
            actionsDiv.appendChild(delBtn);
            
            li.appendChild(actionsDiv);
            list.appendChild(li);
        });
    }

    function renderStats() {
        const totalWatched = movies.watched.length;
        const totalWishlist = movies.wishlist.length;
        const genres = {};
        
        movies.watched.forEach(m => {
            if (m.genre) genres[m.genre] = (genres[m.genre] || 0) + 1;
        });
        
        let genreStats = '';
        if (Object.keys(genres).length) {
            genreStats = '<h4>🎭 Watched by Genre:</h4><ul>' +
                Object.entries(genres)
                    .sort((a, b) => b[1] - a[1])
                    .map(([g, c]) => `<li><strong>${escapeHtml(g)}</strong>: ${c} ${c === 1 ? 'movie' : 'movies'}</li>`)
                    .join('') + '</ul>';
        }
        
        const watchPercentage = totalWatched + totalWishlist > 0 
            ? Math.round((totalWatched / (totalWatched + totalWishlist)) * 100) 
            : 0;
        
        statsDiv.innerHTML = `
            <p>
                <strong>🎥 Total Watched</strong>
                <span style="font-size: 2rem; font-weight: 800; color: #00f260;">${totalWatched}</span>
            </p>
            <p>
                <strong>⭐ In Wishlist</strong>
                <span style="font-size: 2rem; font-weight: 800; color: #f5af19;">${totalWishlist}</span>
            </p>
            <p style="grid-column: 1 / -1;">
                <strong>📊 Completion Rate</strong>
                <div style="background: rgba(255,255,255,0.1); height: 10px; border-radius: 10px; margin-top: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #00f260, #0575e6); height: 100%; width: ${watchPercentage}%; border-radius: 10px; transition: width 1s ease;"></div>
                </div>
                <span style="font-size: 1.5rem; font-weight: 700; color: #4facfe; margin-top: 5px; display: inline-block;">${watchPercentage}%</span>
            </p>
            ${genreStats}
        `;
    }

    // ===============================================
    // UTILITY FUNCTIONS
    // ===============================================
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ===============================================
    // ACTIONS WITH ANIMATIONS
    // ===============================================
    function addMovie(e) {
        e.preventDefault();
        const title = movieTitle.value.trim();
        if (!title) {
            showToast('Please enter a movie title', 'error');
            movieTitle.focus();
            return;
        }
        
        const year = movieYear.value.trim();
        const genre = movieGenre.value.trim();
        const type = movieListType.value;
        
        // Add with animation
        movies[type].push({ title, year, genre });
        saveMovies();
        
        // Animate form reset
        const inputs = movieForm.querySelectorAll('input, select');
        inputs.forEach((input, i) => {
            setTimeout(() => {
                input.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    input.style.transform = '';
                }, 150);
            }, i * 50);
        });
        
        renderList(type);
        renderStats();
        movieForm.reset();
        movieTitle.focus();
        
        showToast(`"${title}" added to ${type === 'watched' ? 'watched list' : 'wishlist'}!`);
    }

    function deleteMovie(type, idx) {
        const movie = movies[type][idx];
        const list = type === 'watched' ? watchedList : wishlist;
        const item = list.children[idx];
        
        // Animate deletion
        if (item) {
            item.style.transform = 'translateX(100px) scale(0.8)';
            item.style.opacity = '0';
            item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        setTimeout(() => {
            movies[type].splice(idx, 1);
            saveMovies();
            renderList(type, false);
            renderStats();
            showToast(`"${movie.title}" deleted`, 'info');
        }, 400);
    }

    function moveMovie(type, idx) {
        const movie = movies[type][idx];
        const target = type === 'watched' ? 'wishlist' : 'watched';
        const list = type === 'watched' ? watchedList : wishlist;
        const item = list.children[idx];
        
        // Animate move
        if (item) {
            item.style.transform = 'translateY(-20px) scale(1.05)';
            item.style.boxShadow = '0 20px 60px rgba(245, 175, 25, 0.4)';
            item.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        
        setTimeout(() => {
            movies[type].splice(idx, 1);
            movies[target].push(movie);
            saveMovies();
            renderList('watched', false);
            renderList('wishlist', false);
            renderStats();
            
            const targetName = target === 'watched' ? 'watched list' : 'wishlist';
            showToast(`"${movie.title}" moved to ${targetName}!`);
        }, 300);
    }

    function saveMovies() {
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    // ===============================================
    // TAB SWITCHING WITH SMOOTH TRANSITIONS
    // ===============================================
    function showSection(section) {
        const sections = [watchedSection, wishlistSection, statsSection];
        const tabs = [watchedTab, wishlistTab, statsTab];
        
        // Remove active states
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Animate out current section
        sections.forEach(sec => {
            if (!sec.classList.contains('hidden')) {
                sec.classList.add('fade-out');
            }
        });
        
        // Delay showing new section for smooth transition
        setTimeout(() => {
            sections.forEach(sec => {
                sec.classList.add('hidden');
                sec.classList.remove('fade-out');
            });
            
            if (section === 'watched') {
                watchedSection.classList.remove('hidden');
                watchedTab.classList.add('active');
                renderList('watched');
            } else if (section === 'wishlist') {
                wishlistSection.classList.remove('hidden');
                wishlistTab.classList.add('active');
                renderList('wishlist');
            } else {
                statsSection.classList.remove('hidden');
                statsTab.classList.add('active');
                renderStats();
            }
        }, 150);
    }

    // ===============================================
    // INPUT ENHANCEMENT - Floating Label Effect
    // ===============================================
    const inputs = document.querySelectorAll('#movieForm input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // ===============================================
    // KEYBOARD NAVIGATION
    // ===============================================
    document.addEventListener('keydown', function(e) {
        // Quick tab switching with number keys
        if (e.altKey) {
            if (e.key === '1') {
                showSection('watched');
            } else if (e.key === '2') {
                showSection('wishlist');
            } else if (e.key === '3') {
                showSection('stats');
            }
        }
        
        // Focus search on Ctrl+F or Cmd+F
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            movieTitle.focus();
        }
    });

    // ===============================================
    // BUTTON RIPPLE EFFECT
    // ===============================================
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${e.clientX - rect.left}px;
                top: ${e.clientY - rect.top}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ===============================================
    // EVENT LISTENERS
    // ===============================================
    watchedTab.onclick = () => showSection('watched');
    wishlistTab.onclick = () => showSection('wishlist');
    statsTab.onclick = () => showSection('stats');
    movieForm.onsubmit = addMovie;

    // ===============================================
    // INITIAL RENDER
    // ===============================================
    renderList('watched');
    renderList('wishlist');
    renderStats();
    showSection('watched');

    // Welcome toast
    setTimeout(() => {
        showToast('Welcome to Movie Tracker! 🎬', 'info');
    }, 1000);
});
