// Visakhapatnam News CMS Application

// Initial data and configuration
const CMS_CONFIG = {
    site_name: "Visakhapatnam News CMS",
    version: "1.0.0",
    admin_user: {
        username: "admin",
        password: "admin123",
        name: "Admin User",
        role: "Administrator"
    }
};

// Data stores
let newsData = [
    {
        id: 1,
        title: "టీటీడీ కల్యాణ మండపంలో నిర్వహించ తలపెట్టిన శ్రీ వెంకటేశ్వర స్వామి వ్రత మహోత్సవం",
        content: "వెంకటేశ్వర స్వామి వ్రత మహోత్సవం గురించి వివరణాత్మక వార్తా కథనం...",
        category: "Religious",
        date: "2024-05-10",
        author: "News Desk",
        featured: true,
        status: "published"
    },
    {
        id: 2,
        title: "జర్నలిస్టుల రక్షణ కోసం కేంద్ర ప్రభుత్వం మీడియా కమిషన్ ఏర్పాటు",
        content: "మీడియా కమిషన్ ఏర్పాటు గురించి వివరణాత్మక వార్తా కథనం...",
        category: "Politics",
        date: "2024-02-22",
        author: "Political Correspondent",
        featured: false,
        status: "published"
    },
    {
        id: 3,
        title: "Ensure the increased availability of wagons for traffic use",
        content: "Transportation infrastructure improvements in Visakhapatnam...",
        category: "Transportation",
        date: "2024-02-16",
        author: "Transport Reporter",
        featured: false,
        status: "published"
    }
];

let profilesData = [
    {
        id: 1,
        name: "Sampathirao Dilip Raj",
        designation: "BJYM AP State Leader",
        party: "Bharateeya Janatha Party",
        bio: "Active political leader working for youth development",
        phone: "+91-XXXXXXXXXX",
        email: "contact@example.com"
    },
    {
        id: 2,
        name: "Dr.Boddepalli Raghu",
        designation: "Doctor Cell Chairman",
        party: "Jana Sena",
        bio: "Medical professional and political activist",
        phone: "+91-XXXXXXXXXX",
        email: "contact@example.com"
    },
    {
        id: 3,
        name: "Konda Rajiv Gandhi",
        designation: "Vizag - City Youth President",
        party: "YSR Congress Party",
        bio: "Youth leader focusing on city development",
        phone: "+91-XXXXXXXXXX",
        email: "contact@example.com"
    }
];

let servicesData = [
    {
        id: 1,
        name: "INHS Kalyani Hospital",
        category: "Hospitals",
        address: "INS Kalinga, Visakhapatnam",
        phone: "0891-2xxxxxx",
        email: "info@inhskalyani.in",
        description: "Naval Hospital providing quality healthcare services",
        services: ["Emergency Care", "Specialist Consultations", "Surgery"],
        hours: "24/7 Emergency, OPD: 8 AM - 6 PM"
    },
    {
        id: 2,
        name: "Kailash Giri",
        category: "Tourism",
        address: "Kailash Giri Hill, Visakhapatnam",
        phone: "0891-2xxxxxx",
        email: "tourism@vizag.gov.in",
        description: "Popular hill station with panoramic city views",
        services: ["Cable Car", "View Points", "Garden", "Food Court"],
        hours: "6 AM - 10 PM"
    },
    {
        id: 3,
        name: "Naval Science & Technological Laboratory",
        category: "Education",
        address: "NSTL, Visakhapatnam",
        phone: "0891-2xxxxxx",
        email: "info@nstl.drdo.in",
        description: "Premier defense research laboratory",
        services: ["Research", "Development", "Testing"],
        hours: "9 AM - 5 PM (Weekdays)"
    }
];

let tourismData = [
    {
        id: 1,
        name: "Kailash Giri",
        description: "Popular hill station with panoramic city views and cable car rides",
        location: "Kailash Giri Hill, Visakhapatnam",
        hours: "6 AM - 10 PM",
        entryFee: "₹50 per person"
    },
    {
        id: 2,
        name: "Rushikonda Beach",
        description: "Beautiful golden sand beach perfect for water sports and relaxation",
        location: "Rushikonda, Visakhapatnam",
        hours: "24 hours",
        entryFee: "Free"
    },
    {
        id: 3,
        name: "RK Beach",
        description: "Main beach of Visakhapatnam with submarine museum and various attractions",
        location: "Beach Road, Visakhapatnam",
        hours: "24 hours",
        entryFee: "Free"
    }
];

const categories = {
    news: ["Politics", "Entertainment", "Government", "Health", "Economy", "Education", "Arts & Culture", "Transportation", "Religious", "Sports"],
    services: ["Hotels", "Hospitals", "Schools", "Restaurants", "Shopping", "Real Estate", "Jobs", "Tourism", "Transport", "Medical"],
    parties: ["YSR Congress Party", "Bharateeya Janatha Party", "Jana Sena", "Indian National Congress", "Others"],
    special_sections: ["Kids Zone", "Youth Special", "Entertainment", "Ladies Special", "Songs", "Movie Zone", "Wall Papers", "Jokes", "Telugu Stories"]
};

// Application state
let currentUser = null;
let currentSection = 'dashboard';
let nextId = { news: 4, profiles: 4, services: 4, tourism: 4 };

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const cmsInterface = document.getElementById('cms-interface');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const sidebarToggle = document.getElementById('sidebar-toggle');
const cmsSidebar = document.getElementById('cms-sidebar');
const themeToggle = document.getElementById('theme-toggle');
const modal = document.getElementById('modal');
const confirmDialog = document.getElementById('confirm-dialog');

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    checkAuth();
    initializeTheme();
}

function setupEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);
    
    // Logout
    logoutBtn.addEventListener('click', handleLogout);
    
    // Sidebar toggle
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            navigateToSection(section);
        });
    });
    
    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // Confirmation dialog
    document.getElementById('confirm-cancel').addEventListener('click', closeConfirmDialog);
    document.getElementById('confirm-ok').addEventListener('click', handleConfirmAction);
    
    // Quick action buttons
    document.querySelectorAll('[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.dataset.action;
            handleQuickAction(action);
        });
    });
    
    // Add buttons
    document.getElementById('add-news-btn').addEventListener('click', () => showNewsForm());
    document.getElementById('add-profile-btn').addEventListener('click', () => showProfileForm());
    document.getElementById('add-service-btn').addEventListener('click', () => showServiceForm());
    document.getElementById('add-tourism-btn').addEventListener('click', () => showTourismForm());
    
    // Search and filters - Fixed event handlers
    document.getElementById('news-search').addEventListener('input', handleNewsFilter);
    document.getElementById('news-category-filter').addEventListener('change', handleNewsFilter);
    document.getElementById('news-status-filter').addEventListener('change', handleNewsFilter);
    
    document.getElementById('profiles-search').addEventListener('input', handleProfilesFilter);
    document.getElementById('profiles-party-filter').addEventListener('change', handleProfilesFilter);
    
    document.getElementById('services-search').addEventListener('input', handleServicesFilter);
    document.getElementById('services-category-filter').addEventListener('change', handleServicesFilter);
}

function checkAuth() {
    if (currentUser) {
        showCMS();
    } else {
        showLogin();
    }
}

function showLogin() {
    loginScreen.classList.remove('hidden');
    cmsInterface.classList.add('hidden');
}

function showCMS() {
    loginScreen.classList.add('hidden');
    cmsInterface.classList.remove('hidden');
    initializeCMS();
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === CMS_CONFIG.admin_user.username && password === CMS_CONFIG.admin_user.password) {
        currentUser = CMS_CONFIG.admin_user;
        showNotification('Login successful!', 'success');
        showCMS();
    } else {
        showNotification('Invalid credentials. Please try again.', 'error');
    }
}

function handleLogout() {
    showConfirmDialog(
        'Confirm Logout',
        'Are you sure you want to logout?',
        () => {
            currentUser = null;
            showLogin();
            showNotification('Logged out successfully', 'info');
        }
    );
}

function toggleSidebar() {
    cmsSidebar.classList.toggle('open');
    cmsInterface.classList.toggle('sidebar-collapsed');
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-color-scheme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-color-scheme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-color-scheme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function navigateToSection(section) {
    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
    
    // Show content section
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`).classList.add('active');
    
    currentSection = section;
    
    // Load section data
    switch(section) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'news':
            loadNewsSection();
            break;
        case 'profiles':
            loadProfilesSection();
            break;
        case 'services':
            loadServicesSection();
            break;
        case 'tourism':
            loadTourismSection();
            break;
        case 'media':
            loadMediaSection();
            break;
        case 'categories':
            loadCategoriesSection();
            break;
    }
}

function initializeCMS() {
    loadDashboard();
    loadNewsSection();
    loadProfilesSection();
    loadServicesSection();
    loadTourismSection();
    loadCategoriesSection();
    populateFilterOptions();
}

function loadDashboard() {
    // Update statistics
    document.getElementById('total-news').textContent = newsData.length;
    document.getElementById('total-profiles').textContent = profilesData.length;
    document.getElementById('total-services').textContent = servicesData.length;
    
    // Load recent activity
    const activityList = document.getElementById('activity-list');
    const activities = [
        { text: 'New news article published', time: '2 hours ago' },
        { text: 'Profile updated for political leader', time: '4 hours ago' },
        { text: 'Service listing added', time: '1 day ago' },
        { text: 'Media files uploaded', time: '2 days ago' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div>${activity.text}</div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

function loadNewsSection() {
    renderNewsTable(newsData);
}

function loadProfilesSection() {
    renderProfilesTable(profilesData);
}

function loadServicesSection() {
    renderServicesTable(servicesData);
}

function loadTourismSection() {
    const grid = document.getElementById('tourism-grid');
    grid.innerHTML = tourismData.map(place => `
        <div class="tourism-card">
            <div class="tourism-card-image" style="background: linear-gradient(135deg, var(--color-bg-1), var(--color-bg-8)); display: flex; align-items: center; justify-content: center; color: var(--color-primary);">
                <div style="text-align: center;">
                    <i class="fas fa-map-marked-alt" style="font-size: 2rem; margin-bottom: var(--space-8);"></i>
                    <div style="font-size: var(--font-size-sm);">${place.name}</div>
                </div>
            </div>
            <div class="tourism-card-content">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-8);">
                    <i class="fas fa-map-marker-alt"></i> ${place.location}
                </div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-bottom: var(--space-12);">
                    <strong>Hours:</strong> ${place.hours} | <strong>Entry:</strong> ${place.entryFee}
                </div>
                <div class="tourism-card-actions">
                    <button class="action-btn action-btn--edit" onclick="editTourism(${place.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteTourism(${place.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function loadMediaSection() {
    const gallery = document.getElementById('media-gallery');
    gallery.innerHTML = `
        <div class="media-placeholder">
            <i class="fas fa-images"></i>
            <p>No media files uploaded yet</p>
            <button class="btn btn--primary" style="margin-top: var(--space-16);">
                <i class="fas fa-upload"></i> Upload Files
            </button>
        </div>
    `;
}

function loadCategoriesSection() {
    const grid = document.getElementById('categories-grid');
    const categoryCards = Object.entries(categories).map(([key, items]) => `
        <div class="category-card">
            <h4>${key.charAt(0).toUpperCase() + key.slice(1)} Categories</h4>
            <p>${items.length} categories available</p>
            <div style="margin-top: var(--space-12);">
                <button class="btn btn--sm btn--outline">
                    <i class="fas fa-edit"></i> Manage
                </button>
            </div>
        </div>
    `);
    
    grid.innerHTML = categoryCards.join('');
}

function populateFilterOptions() {
    // News category filter
    const newsCategoryFilter = document.getElementById('news-category-filter');
    newsCategoryFilter.innerHTML = '<option value="">All Categories</option>' +
        categories.news.map(cat => `<option value="${cat}">${cat}</option>`).join('');
    
    // Profiles party filter
    const profilesPartyFilter = document.getElementById('profiles-party-filter');
    profilesPartyFilter.innerHTML = '<option value="">All Parties</option>' +
        categories.parties.map(party => `<option value="${party}">${party}</option>`).join('');
    
    // Services category filter
    const servicesCategoryFilter = document.getElementById('services-category-filter');
    servicesCategoryFilter.innerHTML = '<option value="">All Categories</option>' +
        categories.services.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

// Fixed filter functions
function handleNewsFilter() {
    const search = document.getElementById('news-search').value.toLowerCase();
    const category = document.getElementById('news-category-filter').value;
    const status = document.getElementById('news-status-filter').value;
    
    let filtered = newsData;
    
    if (search) {
        filtered = filtered.filter(news => 
            news.title.toLowerCase().includes(search) ||
            news.author.toLowerCase().includes(search) ||
            news.content.toLowerCase().includes(search)
        );
    }
    
    if (category) {
        filtered = filtered.filter(news => news.category === category);
    }
    
    if (status) {
        filtered = filtered.filter(news => news.status === status);
    }
    
    renderNewsTable(filtered);
}

function handleProfilesFilter() {
    const search = document.getElementById('profiles-search').value.toLowerCase();
    const party = document.getElementById('profiles-party-filter').value;
    
    let filtered = profilesData;
    
    if (search) {
        filtered = filtered.filter(profile => 
            profile.name.toLowerCase().includes(search) ||
            profile.designation.toLowerCase().includes(search)
        );
    }
    
    if (party) {
        filtered = filtered.filter(profile => profile.party === party);
    }
    
    renderProfilesTable(filtered);
}

function handleServicesFilter() {
    const search = document.getElementById('services-search').value.toLowerCase();
    const category = document.getElementById('services-category-filter').value;
    
    let filtered = servicesData;
    
    if (search) {
        filtered = filtered.filter(service => 
            service.name.toLowerCase().includes(search) ||
            service.address.toLowerCase().includes(search) ||
            service.description.toLowerCase().includes(search)
        );
    }
    
    if (category) {
        filtered = filtered.filter(service => service.category === category);
    }
    
    renderServicesTable(filtered);
}

// Render functions
function renderNewsTable(data) {
    const tbody = document.getElementById('news-table-body');
    tbody.innerHTML = data.map(news => `
        <tr>
            <td class="text-truncate" style="max-width: 200px;">${news.title}</td>
            <td>${news.category}</td>
            <td>${news.author}</td>
            <td>${formatDate(news.date)}</td>
            <td><span class="status-badge status-badge--${news.status}">${news.status}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn action-btn--edit" onclick="editNews(${news.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteNews(${news.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderProfilesTable(data) {
    const tbody = document.getElementById('profiles-table-body');
    tbody.innerHTML = data.map(profile => `
        <tr>
            <td>${profile.name}</td>
            <td>${profile.designation}</td>
            <td>${profile.party}</td>
            <td>
                <div>${profile.phone}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${profile.email}</div>
            </td>
            <td>
                <div class="table-actions">
                    <button class="action-btn action-btn--edit" onclick="editProfile(${profile.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteProfile(${profile.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderServicesTable(data) {
    const tbody = document.getElementById('services-table-body');
    tbody.innerHTML = data.map(service => `
        <tr>
            <td>${service.name}</td>
            <td>${service.category}</td>
            <td class="text-truncate" style="max-width: 150px;">${service.address}</td>
            <td>
                <div>${service.phone}</div>
                <div style="font-size: var(--font-size-sm); color: var(--color-text-secondary);">${service.email}</div>
            </td>
            <td>
                <div class="table-actions">
                    <button class="action-btn action-btn--edit" onclick="editService(${service.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-btn--delete" onclick="deleteService(${service.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Backward compatibility - keeping old filter function names
function filterNews() { handleNewsFilter(); }
function filterProfiles() { handleProfilesFilter(); }
function filterServices() { handleServicesFilter(); }

function updateNewsTable(data) { renderNewsTable(data); }
function updateProfilesTable(data) { renderProfilesTable(data); }
function updateServicesTable(data) { renderServicesTable(data); }

// Form functions
function showNewsForm(news = null) {
    const isEdit = !!news;
    const title = isEdit ? 'Edit News Article' : 'Add News Article';
    
    const form = `
        <form id="news-form">
            <div class="form-group">
                <label class="form-label" for="news-title">Title</label>
                <input type="text" id="news-title" class="form-control" value="${news?.title || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="news-content">Content</label>
                <textarea id="news-content" class="form-control" rows="6" required>${news?.content || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="news-category">Category</label>
                <select id="news-category" class="form-control" required>
                    <option value="">Select Category</option>
                    ${categories.news.map(cat => `<option value="${cat}" ${news?.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="news-author">Author</label>
                <input type="text" id="news-author" class="form-control" value="${news?.author || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="news-date">Date</label>
                <input type="date" id="news-date" class="form-control" value="${news?.date || new Date().toISOString().split('T')[0]}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="news-status">Status</label>
                <select id="news-status" class="form-control" required>
                    <option value="draft" ${news?.status === 'draft' ? 'selected' : ''}>Draft</option>
                    <option value="published" ${news?.status === 'published' ? 'selected' : ''}>Published</option>
                </select>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'}</button>
            </div>
        </form>
    `;
    
    showModal(title, form);
    
    document.getElementById('news-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEdit) {
            updateNews(news.id);
        } else {
            createNews();
        }
    });
}

function showProfileForm(profile = null) {
    const isEdit = !!profile;
    const title = isEdit ? 'Edit Profile' : 'Add Profile';
    
    const form = `
        <form id="profile-form">
            <div class="form-group">
                <label class="form-label" for="profile-name">Name</label>
                <input type="text" id="profile-name" class="form-control" value="${profile?.name || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="profile-designation">Designation</label>
                <input type="text" id="profile-designation" class="form-control" value="${profile?.designation || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="profile-party">Party</label>
                <select id="profile-party" class="form-control" required>
                    <option value="">Select Party</option>
                    ${categories.parties.map(party => `<option value="${party}" ${profile?.party === party ? 'selected' : ''}>${party}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="profile-bio">Bio</label>
                <textarea id="profile-bio" class="form-control" rows="4">${profile?.bio || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="profile-phone">Phone</label>
                <input type="tel" id="profile-phone" class="form-control" value="${profile?.phone || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="profile-email">Email</label>
                <input type="email" id="profile-email" class="form-control" value="${profile?.email || ''}" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'}</button>
            </div>
        </form>
    `;
    
    showModal(title, form);
    
    document.getElementById('profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEdit) {
            updateProfile(profile.id);
        } else {
            createProfile();
        }
    });
}

function showServiceForm(service = null) {
    const isEdit = !!service;
    const title = isEdit ? 'Edit Service' : 'Add Service';
    
    const form = `
        <form id="service-form">
            <div class="form-group">
                <label class="form-label" for="service-name">Name</label>
                <input type="text" id="service-name" class="form-control" value="${service?.name || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="service-category">Category</label>
                <select id="service-category" class="form-control" required>
                    <option value="">Select Category</option>
                    ${categories.services.map(cat => `<option value="${cat}" ${service?.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label" for="service-address">Address</label>
                <textarea id="service-address" class="form-control" rows="2" required>${service?.address || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="service-phone">Phone</label>
                <input type="tel" id="service-phone" class="form-control" value="${service?.phone || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="service-email">Email</label>
                <input type="email" id="service-email" class="form-control" value="${service?.email || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="service-description">Description</label>
                <textarea id="service-description" class="form-control" rows="3">${service?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="service-hours">Hours</label>
                <input type="text" id="service-hours" class="form-control" value="${service?.hours || ''}" placeholder="e.g., 9 AM - 6 PM">
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'}</button>
            </div>
        </form>
    `;
    
    showModal(title, form);
    
    document.getElementById('service-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEdit) {
            updateService(service.id);
        } else {
            createService();
        }
    });
}

function showTourismForm(place = null) {
    const isEdit = !!place;
    const title = isEdit ? 'Edit Tourist Attraction' : 'Add Tourist Attraction';
    
    const form = `
        <form id="tourism-form">
            <div class="form-group">
                <label class="form-label" for="tourism-name">Name</label>
                <input type="text" id="tourism-name" class="form-control" value="${place?.name || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="tourism-description">Description</label>
                <textarea id="tourism-description" class="form-control" rows="4" required>${place?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label" for="tourism-location">Location</label>
                <input type="text" id="tourism-location" class="form-control" value="${place?.location || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="tourism-hours">Visiting Hours</label>
                <input type="text" id="tourism-hours" class="form-control" value="${place?.hours || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="tourism-fee">Entry Fee</label>
                <input type="text" id="tourism-fee" class="form-control" value="${place?.entryFee || ''}" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn--outline" onclick="closeModal()">Cancel</button>
                <button type="submit" class="btn btn--primary">${isEdit ? 'Update' : 'Create'}</button>
            </div>
        </form>
    `;
    
    showModal(title, form);
    
    document.getElementById('tourism-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (isEdit) {
            updateTourism(place.id);
        } else {
            createTourism();
        }
    });
}

// CRUD Operations
function createNews() {
    const newsItem = {
        id: nextId.news++,
        title: document.getElementById('news-title').value,
        content: document.getElementById('news-content').value,
        category: document.getElementById('news-category').value,
        author: document.getElementById('news-author').value,
        date: document.getElementById('news-date').value,
        status: document.getElementById('news-status').value,
        featured: false
    };
    
    newsData.push(newsItem);
    loadNewsSection();
    loadDashboard();
    closeModal();
    showNotification('News article created successfully!', 'success');
}

function editNews(id) {
    const news = newsData.find(n => n.id === id);
    if (news) {
        showNewsForm(news);
    }
}

function updateNews(id) {
    const index = newsData.findIndex(n => n.id === id);
    if (index !== -1) {
        newsData[index] = {
            ...newsData[index],
            title: document.getElementById('news-title').value,
            content: document.getElementById('news-content').value,
            category: document.getElementById('news-category').value,
            author: document.getElementById('news-author').value,
            date: document.getElementById('news-date').value,
            status: document.getElementById('news-status').value
        };
        
        loadNewsSection();
        loadDashboard();
        closeModal();
        showNotification('News article updated successfully!', 'success');
    }
}

function deleteNews(id) {
    showConfirmDialog(
        'Delete News Article',
        'Are you sure you want to delete this news article? This action cannot be undone.',
        () => {
            const index = newsData.findIndex(n => n.id === id);
            if (index !== -1) {
                newsData.splice(index, 1);
                loadNewsSection();
                loadDashboard();
                showNotification('News article deleted successfully!', 'info');
            }
        }
    );
}

function createProfile() {
    const profileItem = {
        id: nextId.profiles++,
        name: document.getElementById('profile-name').value,
        designation: document.getElementById('profile-designation').value,
        party: document.getElementById('profile-party').value,
        bio: document.getElementById('profile-bio').value,
        phone: document.getElementById('profile-phone').value,
        email: document.getElementById('profile-email').value
    };
    
    profilesData.push(profileItem);
    loadProfilesSection();
    loadDashboard();
    closeModal();
    showNotification('Profile created successfully!', 'success');
}

function editProfile(id) {
    const profile = profilesData.find(p => p.id === id);
    if (profile) {
        showProfileForm(profile);
    }
}

function updateProfile(id) {
    const index = profilesData.findIndex(p => p.id === id);
    if (index !== -1) {
        profilesData[index] = {
            ...profilesData[index],
            name: document.getElementById('profile-name').value,
            designation: document.getElementById('profile-designation').value,
            party: document.getElementById('profile-party').value,
            bio: document.getElementById('profile-bio').value,
            phone: document.getElementById('profile-phone').value,
            email: document.getElementById('profile-email').value
        };
        
        loadProfilesSection();
        loadDashboard();
        closeModal();
        showNotification('Profile updated successfully!', 'success');
    }
}

function deleteProfile(id) {
    showConfirmDialog(
        'Delete Profile',
        'Are you sure you want to delete this profile? This action cannot be undone.',
        () => {
            const index = profilesData.findIndex(p => p.id === id);
            if (index !== -1) {
                profilesData.splice(index, 1);
                loadProfilesSection();
                loadDashboard();
                showNotification('Profile deleted successfully!', 'info');
            }
        }
    );
}

function createService() {
    const serviceItem = {
        id: nextId.services++,
        name: document.getElementById('service-name').value,
        category: document.getElementById('service-category').value,
        address: document.getElementById('service-address').value,
        phone: document.getElementById('service-phone').value,
        email: document.getElementById('service-email').value,
        description: document.getElementById('service-description').value,
        hours: document.getElementById('service-hours').value,
        services: []
    };
    
    servicesData.push(serviceItem);
    loadServicesSection();
    loadDashboard();
    closeModal();
    showNotification('Service created successfully!', 'success');
}

function editService(id) {
    const service = servicesData.find(s => s.id === id);
    if (service) {
        showServiceForm(service);
    }
}

function updateService(id) {
    const index = servicesData.findIndex(s => s.id === id);
    if (index !== -1) {
        servicesData[index] = {
            ...servicesData[index],
            name: document.getElementById('service-name').value,
            category: document.getElementById('service-category').value,
            address: document.getElementById('service-address').value,
            phone: document.getElementById('service-phone').value,
            email: document.getElementById('service-email').value,
            description: document.getElementById('service-description').value,
            hours: document.getElementById('service-hours').value
        };
        
        loadServicesSection();
        loadDashboard();
        closeModal();
        showNotification('Service updated successfully!', 'success');
    }
}

function deleteService(id) {
    showConfirmDialog(
        'Delete Service',
        'Are you sure you want to delete this service? This action cannot be undone.',
        () => {
            const index = servicesData.findIndex(s => s.id === id);
            if (index !== -1) {
                servicesData.splice(index, 1);
                loadServicesSection();
                loadDashboard();
                showNotification('Service deleted successfully!', 'info');
            }
        }
    );
}

function createTourism() {
    const tourismItem = {
        id: nextId.tourism++,
        name: document.getElementById('tourism-name').value,
        description: document.getElementById('tourism-description').value,
        location: document.getElementById('tourism-location').value,
        hours: document.getElementById('tourism-hours').value,
        entryFee: document.getElementById('tourism-fee').value
    };
    
    tourismData.push(tourismItem);
    loadTourismSection();
    closeModal();
    showNotification('Tourist attraction created successfully!', 'success');
}

function editTourism(id) {
    const place = tourismData.find(t => t.id === id);
    if (place) {
        showTourismForm(place);
    }
}

function updateTourism(id) {
    const index = tourismData.findIndex(t => t.id === id);
    if (index !== -1) {
        tourismData[index] = {
            ...tourismData[index],
            name: document.getElementById('tourism-name').value,
            description: document.getElementById('tourism-description').value,
            location: document.getElementById('tourism-location').value,
            hours: document.getElementById('tourism-hours').value,
            entryFee: document.getElementById('tourism-fee').value
        };
        
        loadTourismSection();
        closeModal();
        showNotification('Tourist attraction updated successfully!', 'success');
    }
}

function deleteTourism(id) {
    showConfirmDialog(
        'Delete Tourist Attraction',
        'Are you sure you want to delete this tourist attraction? This action cannot be undone.',
        () => {
            const index = tourismData.findIndex(t => t.id === id);
            if (index !== -1) {
                tourismData.splice(index, 1);
                loadTourismSection();
                showNotification('Tourist attraction deleted successfully!', 'info');
            }
        }
    );
}

// Quick Actions
function handleQuickAction(action) {
    switch(action) {
        case 'add-news':
            navigateToSection('news');
            setTimeout(() => showNewsForm(), 100);
            break;
        case 'add-profile':
            navigateToSection('profiles');
            setTimeout(() => showProfileForm(), 100);
            break;
        case 'add-service':
            navigateToSection('services');
            setTimeout(() => showServiceForm(), 100);
            break;
    }
}

// Modal functions
function showModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    modal.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
}

// Confirmation dialog
let confirmCallback = null;

function showConfirmDialog(title, message, callback) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').textContent = message;
    confirmCallback = callback;
    confirmDialog.classList.remove('hidden');
}

function closeConfirmDialog() {
    confirmDialog.classList.add('hidden');
    confirmCallback = null;
}

function handleConfirmAction() {
    if (confirmCallback) {
        confirmCallback();
    }
    closeConfirmDialog();
}

// Notification system
function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${iconMap[type]} notification-icon"></i>
        <span class="notification-message">${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Handle close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (container.contains(notification)) {
            removeNotification(notification);
        }
    }, 5000);
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        if (!modal.classList.contains('hidden')) {
            closeModal();
        }
        if (!confirmDialog.classList.contains('hidden')) {
            closeConfirmDialog();
        }
    }
});

// Mobile responsiveness
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        cmsSidebar.classList.remove('open');
    }
});

console.log('Visakhapatnam News CMS loaded successfully!');