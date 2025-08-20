// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeMenu = document.getElementById('close-menu');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
const pages = document.querySelectorAll('.page');
const categoryBtns = document.querySelectorAll('.category-btn');
const newsGrid = document.getElementById('news-grid');
const newsLoading = document.getElementById('news-loading');
const newsError = document.getElementById('news-error');
const retryBtn = document.getElementById('retry-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const heroSlides = document.querySelectorAll('.hero-slide');
const prevSlide = document.getElementById('prev-slide');
const nextSlide = document.getElementById('next-slide');
const contactForm = document.getElementById('contact-form');

// Current state
let currentPage = 'home';
let currentCategory = 'general';
let currentSlide = 0;
let articles = [];

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Page Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-page');
        navigateToPage(page);
        
        // Close mobile menu if open
        if (mobileOverlay.classList.contains('active')) {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

function navigateToPage(page) {
    // Hide all pages
    pages.forEach(p => p.classList.remove('active'));
    
    // Show the selected page
    document.getElementById(`${page}-page`).classList.add('active');
    currentPage = page;
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // If navigating to home, fetch news
    if (page === 'home') {
        fetchNews();
    }
}

// Category Filter
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        fetchNews();
    });
});

// Search Functionality
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        searchNews(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            searchNews(query);
        }
    }
});

// Hero Slider
function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroSlides[index].classList.add('active');
    currentSlide = index;
}

prevSlide.addEventListener('click', () => {
    let newSlide = currentSlide - 1;
    if (newSlide < 0) newSlide = heroSlides.length - 1;
    showSlide(newSlide);
});

nextSlide.addEventListener('click', () => {
    let newSlide = currentSlide + 1;
    if (newSlide >= heroSlides.length) newSlide = 0;
    showSlide(newSlide);
});

// Auto advance slides
setInterval(() => {
    let newSlide = currentSlide + 1;
    if (newSlide >= heroSlides.length) newSlide = 0;
    showSlide(newSlide);
}, 5000);

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Fetch News from API
async function fetchNews() {
    newsGrid.innerHTML = '';
    newsLoading.style.display = 'flex';
    newsError.style.display = 'none';
    
    try {
        // In a real implementation, you would use your NewsAPI key here
        // const apiKey = 'YOUR_API_KEY';
        // const response = await fetch(`https://newsapi.org/v2/top-headlines?country=pk&category=${currentCategory}&apiKey=${apiKey}`);
        
        // For demonstration purposes, we'll use a mock response
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        // Mock data for demonstration
        const mockNews = [
            {
                title: "Pakistan's Economic Growth Exceeds Expectations",
                description: "The latest economic reports indicate that Pakistan's GDP growth has surpassed government projections, with significant improvements in manufacturing and agriculture sectors.",
                urlToImage: "https://images.unsplash.com/photo-1566378246598-5b11a0d486cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                publishedAt: "2023-07-15T08:30:00Z",
                source: { name: "Dawn News" },
                url: "#",
                category: "general"
            },
            {
                title: "New Technology Park Inaugurated in Islamabad",
                description: "Prime Minister inaugurated a state-of-the-art technology park aimed at fostering innovation and providing opportunities for IT startups and entrepreneurs.",
                urlToImage: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                publishedAt: "2023-07-14T14:45:00Z",
                source: { name: "The News" },
                url: "#",
                category: "technology"
            },
            {
                title: "Pakistan Cricket Team Announces Squad for World Cup",
                description: "The national selection committee has revealed the 15-member squad that will represent Pakistan in the upcoming ICC World Cup tournament.",
                urlToImage: "https://www.pcb.com.pk/timthumb.php?src=images/news_images/featured_images/cb303443a112.jpeg&w=675",
                publishedAt: "2023-07-14T10:15:00Z",
                source: { name: "Geo Sports" },
                url: "#",
                category: "sports"
            },
            {
                title: "Healthcare Initiative Launched in Rural Areas",
                description: "The government has launched a new healthcare initiative aimed at improving medical facilities in remote and underserved regions of the country.",
                urlToImage: "https://www.unicef.org/pakistan/sites/unicef.org.pakistan/files/styles/hero_extended/public/UNICEF%20x%20Human%20Story%20x%20RHC%20Ganda%20Singh%20Wala%20%2851%29.JPG.webp?itok=KqO96cVm",
                publishedAt: "2023-07-13T16:20:00Z",
                source: { name: "Health Times" },
                url: "#",
                category: "health"
            },
            {
                title: "Pakistan's Film Industry Sees Revival",
                description: "Cinema attendance and local film production have shown significant growth this year, indicating a revival of the Pakistani film industry.",
                urlToImage: "https://i.dawn.com/primary/2024/12/301615176f67f70.jpg?r=162500",
                publishedAt: "2023-07-13T09:30:00Z",
                source: { name: "Entertainment PK" },
                url: "#",
                category: "entertainment"
            },
            {
                title: "Tech Startups Attract Record Investments",
                description: "Pakistan's technology startups have attracted record levels of venture capital funding in the first half of 2023, signaling growing investor confidence.",
                urlToImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
                publishedAt: "2023-07-12T11:45:00Z",
                source: { name: "Tech News PK" },
                url: "#",
                category: "technology"
            }
        ];
        
        // Filter by category if not general
        if (currentCategory !== 'general') {
            articles = mockNews.filter(article => article.category === currentCategory);
        } else {
            articles = mockNews;
        }
        
        displayNews(articles);
        
    } catch (error) {
        console.error('Error fetching news:', error);
        newsError.style.display = 'block';
    } finally {
        newsLoading.style.display = 'none';
    }
}

// Search News
function searchNews(query) {
    const filteredNews = articles.filter(article => 
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase())
    );
    
    displayNews(filteredNews);
}

// Display News Articles
function displayNews(articlesToDisplay) {
    newsGrid.innerHTML = '';
    
    if (articlesToDisplay.length === 0) {
        newsGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <p>No news articles found. Try a different search term.</p>
            </div>
        `;
        return;
    }
    
    articlesToDisplay.forEach(article => {
        const articleEl = document.createElement('article');
        articleEl.classList.add('news-card');
        
        articleEl.innerHTML = `
            <img src="${article.urlToImage}" alt="${article.title}" class="news-img">
            <div class="news-content">
                <span class="category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank" class="read-more">Read More</a>
                <div class="news-meta">
                    <span>${article.source.name}</span>
                    <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        
        newsGrid.appendChild(articleEl);
    });
}

// Retry Fetching News
retryBtn.addEventListener('click', fetchNews);

// Initialize
fetchNews();