// Custom JavaScript for SKB.io - Modern Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Code Copy Functionality
    enhanceCodeCopy();
    
    // Smooth Scroll for Anchor Links
    enhanceSmoothScroll();
    
    // Enhanced Image Loading
    enhanceImageLoading();
    
    // Keyboard Navigation
    enhanceKeyboardNavigation();
    
    // Reading Progress Indicator
    addReadingProgress();
    
    // Enhanced Search
    enhanceSearch();
    
    // Theme Toggle Enhancement
    enhanceThemeToggle();
    
    // Lazy Loading for Images
    initLazyLoading();
});

// Enhanced Code Copy with Toast Notifications
function enhanceCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        if (pre.querySelector('.copy-button')) return; // Already enhanced
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button absolute top-2 right-2 p-2 text-xs bg-gray-800 text-white rounded opacity-0 transition-opacity duration-200 hover:bg-gray-700';
        copyButton.innerHTML = '📋 Copy';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        // Show/hide button on hover
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        // Copy functionality
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                copyButton.innerHTML = '✅ Copied!';
                copyButton.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                    copyButton.style.backgroundColor = '#1f2937';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
                copyButton.innerHTML = '❌ Failed';
                copyButton.style.backgroundColor = '#ef4444';
                
                setTimeout(() => {
                    copyButton.innerHTML = '📋 Copy';
                    copyButton.style.backgroundColor = '#1f2937';
                }, 2000);
            }
        });
    });
}

// Enhanced Smooth Scroll
function enhanceSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

// Enhanced Image Loading with Placeholder
function enhanceImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Keyboard Navigation Enhancement
function enhanceKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals/dropdowns
        if (e.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.blur) {
                activeElement.blur();
            }
        }
        
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.tagName === 'A') {
                e.preventDefault();
                const links = Array.from(document.querySelectorAll('a[href]'));
                const currentIndex = links.indexOf(focusedElement);
                let nextIndex;
                
                if (e.key === 'ArrowUp') {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
                } else {
                    nextIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
                }
                
                links[nextIndex].focus();
            }
        }
    });
}

// Reading Progress Indicator
function addReadingProgress() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress fixed top-0 left-0 w-0 h-1 bg-blue-500 z-50 transition-all duration-300';
    document.body.appendChild(progressBar);
    
    const updateProgress = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

// Enhanced Search Functionality
function enhanceSearch() {
    const searchInput = document.querySelector('input[type="search"]');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            // Add search highlighting or other enhancements here
            console.log('Search query:', this.value);
        }, 300);
    });
    
    // Add search suggestions or autocomplete here
    searchInput.addEventListener('focus', function() {
        this.classList.add('search-focused');
    });
    
    searchInput.addEventListener('blur', function() {
        this.classList.remove('search-focused');
    });
}

// Enhanced Theme Toggle
function enhanceThemeToggle() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function() {
        // Add smooth transition effect
        document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for potential use in other scripts
window.SKBCustom = {
    enhanceCodeCopy,
    enhanceSmoothScroll,
    enhanceImageLoading,
    enhanceKeyboardNavigation,
    addReadingProgress,
    enhanceSearch,
    enhanceThemeToggle,
    initLazyLoading,
    debounce,
    throttle
};
