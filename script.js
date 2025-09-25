// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar and back to top button
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    if (navbar) {
        const scrollY = window.scrollY;
        const maxScroll = 150; // Maximum scroll distance for full transition
        
        // Calculate progress from 0 to 1
        const progress = Math.min(scrollY / maxScroll, 1);
        
        // Start with the original colors and gradually transition to slightly darker
        const startColors = {
            r1: 153, g1: 27, b1: 27,  // #991b1b
            r2: 127, g2: 29, b2: 29,  // #7f1d1d  
            r3: 93, g3: 42, b3: 42,   // #5d2a2a
            r4: 127, g4: 29, b4: 29   // #7f1d1d
        };
        
        const endColors = {
            r1: 127, g1: 29, b1: 29,  // #7f1d1d
            r2: 93, g2: 42, b2: 42,   // #5d2a2a
            r3: 69, g3: 10, b3: 10    // #450a0a
        };
        
        // Interpolate between start and end colors
        const currentColors = {
            r1: Math.round(startColors.r1 + (endColors.r1 - startColors.r1) * progress),
            g1: Math.round(startColors.g1 + (endColors.g1 - startColors.g1) * progress),
            b1: Math.round(startColors.b1 + (endColors.b1 - startColors.b1) * progress),
            r2: Math.round(startColors.r2 + (endColors.r2 - startColors.r2) * progress),
            g2: Math.round(startColors.g2 + (endColors.g2 - startColors.g2) * progress),
            b2: Math.round(startColors.b2 + (endColors.b2 - startColors.b2) * progress),
            r3: Math.round(startColors.r3 + (endColors.r3 - startColors.r3) * progress),
            g3: Math.round(startColors.g3 + (endColors.g3 - startColors.g3) * progress),
            b3: Math.round(startColors.b3 + (endColors.b3 - startColors.b3) * progress)
        };
        
        // Apply the interpolated background
        if (progress < 1) {
            navbar.style.background = `linear-gradient(135deg, 
                rgb(${currentColors.r1}, ${currentColors.g1}, ${currentColors.b1}), 
                rgb(${currentColors.r2}, ${currentColors.g2}, ${currentColors.b2}), 
                rgb(${currentColors.r3}, ${currentColors.g3}, ${currentColors.b3}))`;
            navbar.style.backgroundSize = '200% 200%';
            navbar.style.animation = 'gradientShift 25s ease infinite';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #7f1d1d, #5d2a2a, #450a0a)';
            navbar.style.animation = 'none';
        }
        
        // Interpolate shadow and border effects
        const shadowOpacity = 0.4 + (0.1 * progress);
        const glowOpacity = 0.05 + (0.03 * progress);
        const borderOpacity = 0.2 + (0.1 * progress);
        const shadowBlur = 20 + (5 * progress);
        const shadowSpread = 30 + (10 * progress);
        
        navbar.style.boxShadow = `0 ${4 + progress * 2}px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity}), 0 0 ${shadowSpread}px rgba(220, 38, 38, ${glowOpacity})`;
        navbar.style.borderBottom = `1px solid rgba(220, 38, 38, ${borderOpacity})`;
    }
    
    // Show/hide back to top button
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Create and add back to top button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.title = 'Back to top';
    document.body.appendChild(backToTop);
    
    // Add click event to scroll to top
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createBackToTopButton();
});

// Add animation to menu items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items and feature cards
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.menu-item, .feature-card, .value-card, .team-member');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Photo Carousel Functionality - Now handled by dynamic loader below

// Add smooth page transition - prevent white flash and jittering
(function() {
    // Create initial overlay immediately to prevent content flash
    const initialOverlay = document.createElement('div');
    initialOverlay.id = 'initial-overlay';
    initialOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a1a1a, #2d1b1b);
        z-index: 9999;
        opacity: 1;
        pointer-events: none;
    `;
    document.documentElement.appendChild(initialOverlay);
    
    // Set initial dark background immediately
    document.documentElement.style.backgroundColor = '#1a1a1a';
    document.body.style.backgroundColor = '#1a1a1a';
})();

document.addEventListener('DOMContentLoaded', function() {
    const initialOverlay = document.getElementById('initial-overlay');
    
    if (initialOverlay) {
        // Add transition after DOM is ready
        initialOverlay.style.transition = 'opacity 0.8s ease-in-out';
        
        // Fade out the overlay smoothly
        setTimeout(() => {
            initialOverlay.style.opacity = '0';
            // Show body content when overlay starts fading
            document.body.classList.add('loaded');
            setTimeout(() => {
                if (document.documentElement.contains(initialOverlay)) {
                    document.documentElement.removeChild(initialOverlay);
                }
            }, 800);
        }, 300);
    } else {
        // Fallback: show body immediately if no overlay
        document.body.classList.add('loaded');
    }
});

// Add smooth page transitions for navigation links and buttons
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href$=".html"], .btn[href$=".html"], .nav-logo-link[href$=".html"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('href');
            
            // Ensure dark background before transition
            document.documentElement.style.backgroundColor = '#1a1a1a';
            document.body.style.backgroundColor = '#1a1a1a';
            
            // Create transition overlay
            const transitionOverlay = document.createElement('div');
            transitionOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1a1a1a, #2d1b1b);
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.6s ease-in-out;
                pointer-events: none;
            `;
            document.body.appendChild(transitionOverlay);
            
            // Fade in overlay
            requestAnimationFrame(() => {
                transitionOverlay.style.opacity = '1';
            });
            
            // Navigate after transition
    setTimeout(() => {
                window.location.href = targetPage;
            }, 600);
        });
    });
});

// Fallback menu data for local testing
const FALLBACK_MENU_DATA = `Section_EN;SubSection_EN;Section_PL;SubSection_PL;Product_EN;Product_PL;Product_CHI;Price
Broths 兄弟會;N/A;BULIONY 汤底;N/A;N/A;N/A;N/A;N/A
Broths 兄弟會;Sizes 尺⼨;BULIONY 汤底;ROZMIARY 尺⼨;N/A;N/A;N/A;N/A
Broths 兄弟會;Sizes 尺⼨;BULIONY 汤底;ROZMIARY 尺⼨; SMALL BROTH 1 PERSON; BULION MAŁY 1 OS.;⼩湯;18 PLN
Broths 兄弟會;Sizes 尺⼨;BULIONY 汤底;ROZMIARY 尺⼨; LARGE BROTH 2-6 PEOPLE; BULION DUŻY 2-6 OS.;⼤湯; 38 PLN
Broths 兄弟會;Sizes 尺⼨;BULIONY 汤底;ROZMIARY 尺⼨; MAXI BROTH <6 PEOPLE; BULION MAXI <6 OS.;⼤湯; 48 PLN
Broths 兄弟會;Flavors ⼝味;BULIONY 汤底;SMAKI ⼝味;SPICY BROTH; BULION OSTRY;辣湯;N/A
Broths 兄弟會;Flavors ⼝味;BULIONY 汤底;SMAKI ⼝味; SPICY-SOUR BROTH; BULION OSTRO-KWAŚNY;酸辣湯;N/A
Broths 兄弟會;Flavors ⼝味;BULIONY 汤底;SMAKI ⼝味; MUSHROOM BROTH; BULION GRZYBOWY;蘑菇湯;N/A
Broths 兄弟會;Flavors ⼝味;BULIONY 汤底;SMAKI ⼝味; TOMATO BROTH; BULION POMIDOROWY;番茄湯;N/A
Broths 兄弟會;Flavors ⼝味;BULIONY 汤底;SMAKI ⼝味; TOM YUM BROTH; BULION TOM YUM;冬蔭功湯;N/A
INGREDIENTS 原料;N/A;SKŁADNIKI 原料;N/A;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Seafood 海鮮;SKŁADNIKI 原料;OWOCE MORZA 海鮮;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Seafood 海鮮;SKŁADNIKI 原料;OWOCE MORZA 海鮮;WHOLE SHRIMP; KREWETKI CAŁE;明虾;38 PLN
INGREDIENTS 原料;Seafood 海鮮;SKŁADNIKI 原料;OWOCE MORZA 海鮮; COCKTAIL SHRIMP; KREWETKI KOKTAJLOWE;虾仁; 35 PLN
INGREDIENTS 原料;Seafood 海鮮;SKŁADNIKI 原料;OWOCE MORZA 海鮮; FISH SLICES; PLASTRY RYBY;鲜⻥⽚; 28 PLN
INGREDIENTS 原料;Seafood 海鮮;SKŁADNIKI 原料;OWOCE MORZA 海鮮; FISH TOFU; TOFU RYBNE;⿂⾖腐; 22 PLN
INGREDIENTS 原料;Seafood 海鮮;SKŁADNIKI 原料;OWOCE MORZA 海鮮; CRAB STICKS; PALUSZKI KRABOWE;蟹⾁棒; 22 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; ENOKI MUSHROOMS;GRZYBY ENOKI;⾦針菇;22 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; SHIMEJI MUSHROOMS; GRZYBY SHIMEJI;姬菇; 22 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; FRESH SHITAKE; ŚWIEŻE SHITAKE;新鮮⾹菇; 22 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; MUN MUSHROOMS (WHITE); GRZYBY MUN (BIAŁE);蒙吉（⽩⾊）; 17 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; MUN MUSHROOMS (BLACK); GRZYBY MUN (CZARNE);蒙吉（⿊⾊）; 15 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; CHINESE CABBAGE; KAPUSTA PEKIŃSKA;⽩菜; 15 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; CORN; KUKURYDZA;⽟⽶; 22 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; CAULIFLOWER; KALAFIOR;花椰菜; 22 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; BAMBOO; BAMBUS;⽵⼦; 25 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; BEEN SPROUTS; KIEŁKI FASOLI;⾖芽; 16 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; SEAWEED; ALGI MORSKIE;海藻; 18 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; SPINACH; SZPINAK;菠菜; 25 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; WHITE RADISH; RZODKIEW BIAŁA;⽩蘿蔔; 16 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; SLICED POTATOES; ZIEMNIAKI W PLASTERKACH;洋芋⽚; 12 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; CURLY POTATOES; ZIEMNIAKI KRĘCONE;捲曲⾺鈴薯; 15 PLN
INGREDIENTS 原料;Vegetables 蔬菜;SKŁADNIKI 原料;Warzywa 蔬菜; PAK CHOI; PAK CHOI;⽩菜; 25 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁;LAMB;BARANINA;⽺⾁;46 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁; BEEF; WOŁOWINA;⽜⾁; 43 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁; BLACK TRIPE; FLAKI CZARNE;⿊⽜肚; 48 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁; WHITE TRIPE; FLAKI BIAŁE;⽩肚; 38 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁; SPICY BEEF; PIKANTNA WOŁOWINA;辣⽜⾁; 35 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁; PORK LOIN; POLĘDWICA WIEPRZOWA;豬裡肌⾁; 42 PLN
INGREDIENTS 原料;Meat ⾁;SKŁADNIKI 原料;MIĘSA ⾁; BEEF LOIN; POLĘDWICA WOŁOWA;西冷⽜排; 58 PLN
INGREDIENTS 原料;TOFU ⾖腐;SKŁADNIKI 原料;TOFU ⾖腐;N/A;N/A;N/A;N/A
INGREDIENTS 原料;TOFU ⾖腐;SKŁADNIKI 原料;TOFU ⾖腐;FRESH TOFU;ŚWIEŻE TOFU;鮮⾖腐;22 PLN
INGREDIENTS 原料;TOFU ⾖腐;SKŁADNIKI 原料;TOFU ⾖腐; TOFU SLICES; TOFU W PASKACH;⾖腐條; 18 PLN
INGREDIENTS 原料;TOFU ⾖腐;SKŁADNIKI 原料;TOFU ⾖腐; FRIED TOFU; TOFU SMAŻONE ;炸⾖腐; 18 PLN
INGREDIENTS 原料;Meatballs ⾁丸;SKŁADNIKI 原料;PULPETY ⾁丸;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Meatballs ⾁丸;SKŁADNIKI 原料;PULPETY ⾁丸;BEEF MEATBALLS; PULPETY WOŁOWE;⽜⾁丸;36 PLN
INGREDIENTS 原料;Meatballs ⾁丸;SKŁADNIKI 原料;PULPETY ⾁丸; FISH MEATBALLS; PULPETY RYBNE;⿂丸;36 PLN
INGREDIENTS 原料;Noodles 義⼤利麵;SKŁADNIKI 原料;MAKARONY ⾯⻝;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Noodles 義⼤利麵;SKŁADNIKI 原料;MAKARONY ⾯⻝;WHEAT NOODLES; MAKARON PSZENNY ;⼩⿆麵⻝;20 PLN
INGREDIENTS 原料;Noodles 義⼤利麵;SKŁADNIKI 原料;MAKARONY ⾯⻝; KONJAC NOODLES;MAKARON KONJAC;蒟蒻意麵; 18 PLN
INGREDIENTS 原料;Noodles 義⼤利麵;SKŁADNIKI 原料;MAKARONY ⾯⻝; RICE NOODLES; KLUSKI RYŻOWE;粽⼦; 24 PLN
INGREDIENTS 原料;Sets 套;SKŁADNIKI 原料;ZESTAWY 套;N/A;N/A;N/A;N/A
INGREDIENTS 原料;Sets 套;SKŁADNIKI 原料;ZESTAWY 套;SET - 1 PERSON; ZESTAW - 1 OS.;单⼈套餐;120 PLN
INGREDIENTS 原料;Sets 套;SKŁADNIKI 原料;ZESTAWY 套;SET FOR TWO ; ZESTAW DLA DWOJGA;双⼈套餐; 189 PLN`;

// CSV Menu Parser
async function loadMenuData() {
    // Determine the correct path to the CSV file based on current location
    const currentPath = window.location.pathname;
    let csvPath;
    
    if (currentPath.includes('/en/menu/') || currentPath.includes('/en/about/')) {
        // We're in en/menu/ or en/about/ - need to go up 2 levels
        csvPath = '../../MenuContent/HotPot_Menu.csv';
    } else if (currentPath.includes('/menu/') || currentPath.includes('/about/')) {
        // We're in menu/ or about/ - need to go up 1 level
        csvPath = '../MenuContent/HotPot_Menu.csv';
    } else if (currentPath.includes('/en/')) {
        // We're in en/ - need to go up 1 level
        csvPath = '../MenuContent/HotPot_Menu.csv';
    } else {
        // We're in root - direct path
        csvPath = 'MenuContent/HotPot_Menu.csv';
    }
    
    console.log('Current path:', currentPath);
    console.log('CSV path:', csvPath);
    
    // Always try to load the actual CSV file first
    try {
        console.log('Attempting to load live CSV file...');
        const response = await fetch(csvPath);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const csvText = await response.text();
        console.log('Live CSV loaded successfully!');
        console.log('CSV content length:', csvText.length);
        console.log('CSV content preview:', csvText.substring(0, 200));
        const parsedData = parseCSV(csvText);
        console.log('Parsed live data:', parsedData);
        return parsedData;
    } catch (error) {
        console.error('Failed to load live CSV:', error.message);
        console.log('Attempting fallback paths...');
        
        // Try alternative paths as fallback
        const fallbackPaths = [
            'MenuContent/HotPot_Menu.csv',
            '../MenuContent/HotPot_Menu.csv',
            '../../MenuContent/HotPot_Menu.csv'
        ];
        
        for (const fallbackPath of fallbackPaths) {
            try {
                console.log('Trying fallback path:', fallbackPath);
                const response = await fetch(fallbackPath);
                if (response.ok) {
                    const csvText = await response.text();
                    console.log('Fallback CSV loaded successfully from:', fallbackPath);
                    return parseCSV(csvText);
                }
            } catch (fallbackError) {
                console.log('Fallback path failed:', fallbackPath, fallbackError.message);
            }
        }
        
        console.log('All CSV loading attempts failed, using hardcoded data...');
        console.warn('Using fallback menu data. This may indicate a server configuration issue.');
        return parseCSV(FALLBACK_MENU_DATA);
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const headers = lines[0].split(';');
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(';');
            const row = {};
            headers.forEach((header, index) => {
                row[header.trim()] = values[index] ? values[index].trim() : '';
            });
            data.push(row);
        }
    }
    
    return data;
}

function generateMenuStructure(menuData, language = 'en') {
    const sections = {};
    
    menuData.forEach(row => {
        const sectionName = language === 'pl' ? row.Section_PL?.trim() : row.Section_EN?.trim();
        const subSectionName = language === 'pl' ? row.SubSection_PL?.trim() : row.SubSection_EN?.trim();
        const productName = language === 'pl' ? row.Product_PL?.trim() : row.Product_EN?.trim();
        const productChi = row.Product_CHI?.trim();
        const price = row.Price?.trim();
        
        // Skip empty rows or section headers without products
        if (!sectionName || sectionName === 'N/A' || sectionName === '') return;
        
        // Initialize section if it doesn't exist
        if (!sections[sectionName]) {
            sections[sectionName] = {
                name: sectionName,
                subSections: {}
            };
        }
        
        // Handle subsections
        if (subSectionName && subSectionName !== 'N/A') {
            if (!sections[sectionName].subSections[subSectionName]) {
                sections[sectionName].subSections[subSectionName] = {
                    name: subSectionName,
                    products: []
                };
            }
            
            // Handle products
            if (productName && productName !== 'N/A' && productName.trim()) {
                sections[sectionName].subSections[subSectionName].products.push({
                    name: productName.trim(),
                    chinese: productChi ? productChi.trim() : '',
                    price: price
                });
            }
        } else {
            // Handle products directly under sections (like Sets)
            if (productName && productName !== 'N/A' && productName.trim()) {
                if (!sections[sectionName].subSections['_direct']) {
                    sections[sectionName].subSections['_direct'] = {
                        name: '',
                        products: []
                    };
                }
                sections[sectionName].subSections['_direct'].products.push({
                    name: productName.trim(),
                    chinese: productChi ? productChi.trim() : '',
                    price: price
                });
            }
        }
    });
    
    return sections;
}

function renderMenu(menuStructure) {
    const menuContainer = document.querySelector('.menu-content .container');
    if (!menuContainer) return;
    
    let menuHTML = '';
    
    Object.values(menuStructure).forEach(section => {
        menuHTML += `
            <div class="menu-section main-section">
                <h2>${section.name}</h2>
        `;
        
        Object.values(section.subSections).forEach(subSection => {
            if (subSection.name) {
                menuHTML += `
                    <div class="sub-section">
                        <h3>${subSection.name}</h3>
                        <div class="menu-grid three-columns">
                `;
            } else {
                menuHTML += `
                    <div class="menu-grid three-columns">
                `;
            }
            
            subSection.products.forEach(product => {
                const displayPrice = product.price === 'N/A' ? '-' : product.price;
                const productDisplay = product.chinese ? 
                    `${product.name} &nbsp; ${product.chinese}` : 
                    product.name;
                
                menuHTML += `
                    <div class="menu-item">
                        <span class="item-name">${productDisplay}</span>
                        <span class="price">${displayPrice}</span>
                    </div>
                `;
            });
            
            menuHTML += `
                        </div>
                    ${subSection.name ? '</div>' : ''}
            `;
        });
        
        menuHTML += `
            </div>
        `;
    });
    
    menuContainer.innerHTML = menuHTML;
}

function showMenuError(errorMessage = null) {
    const menuContainer = document.querySelector('.menu-content .container');
    if (!menuContainer) return;
    
    // Detect language for error message
    const htmlLang = document.documentElement.lang;
    const isPolish = htmlLang === 'pl';
    
    const errorContent = isPolish ? {
        title: "Menu tymczasowo niedostępne",
        message: "Przepraszamy, ale mamy problemy z załadowaniem naszego menu.",
        suggestion: "Spróbuj odświeżyć stronę lub wróć później.",
        technical: "Jeśli problem się powtarza, skontaktuj się z nami.",
        button: "Odśwież stronę"
    } : {
        title: "Menu temporarily unavailable",
        message: "We're sorry, but we're having trouble loading our menu.",
        suggestion: "Please try refreshing the page or come back later.",
        technical: "If the problem persists, please contact us.",
        button: "Refresh page"
    };
    
    menuContainer.innerHTML = `
        <div class="menu-error" style="
            text-align: center;
            padding: 60px 20px;
            background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
            border-radius: 15px;
            border: 2px solid #ff6b35;
            margin: 40px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        ">
            <div style="
                font-size: 4rem;
                margin-bottom: 20px;
                color: #ff6b35;
            ">⚠️</div>
            <h2 style="
                color: #ffffff;
                font-size: 2.5rem;
                margin-bottom: 20px;
                font-family: 'CHOWFUN', sans-serif;
            ">${errorContent.title}</h2>
            <p style="
                color: #cccccc;
                font-size: 1.2rem;
                margin-bottom: 15px;
                line-height: 1.6;
            ">${errorContent.message}</p>
            <p style="
                color: #aaaaaa;
                font-size: 1rem;
                margin-bottom: 20px;
            ">${errorContent.suggestion}</p>
            <p style="
                color: #888888;
                font-size: 0.9rem;
                margin-bottom: 30px;
                font-style: italic;
            ">${errorContent.technical}</p>
            <button onclick="window.location.reload()" style="
                background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 1.1rem;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'CHOWFUN', sans-serif;
                font-weight: bold;
                box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 7px 20px rgba(255, 107, 53, 0.4)'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 5px 15px rgba(255, 107, 53, 0.3)'">
                ${errorContent.button}
            </button>
            ${errorMessage ? `
                <details style="
                    margin-top: 30px;
                    text-align: left;
                    background: rgba(0,0,0,0.3);
                    padding: 15px;
                    border-radius: 10px;
                    border: 1px solid #444;
                ">
                    <summary style="
                        color: #ff6b35;
                        cursor: pointer;
                        font-weight: bold;
                        margin-bottom: 10px;
                    ">Technical Details</summary>
                    <pre style="
                        color: #cccccc;
                        font-size: 0.8rem;
                        white-space: pre-wrap;
                        word-break: break-all;
                    ">${errorMessage}</pre>
                </details>
            ` : ''}
        </div>
    `;
}

// Initialize dynamic menu
document.addEventListener('DOMContentLoaded', async function() {
    // Check if we're on a menu page
    if (document.querySelector('.menu-content')) {
        // Detect language from HTML lang attribute or URL
        const htmlLang = document.documentElement.lang;
        const isPolish = htmlLang === 'pl' || window.location.pathname.includes('_pl');
        
        try {
            // Add timeout to prevent hanging
            const menuDataPromise = loadMenuData();
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Menu loading timeout after 10 seconds')), 10000)
            );
            
            const menuData = await Promise.race([menuDataPromise, timeoutPromise]);
            
            if (menuData.length === 0) {
                showMenuError('No menu data available. The CSV file appears to be empty or invalid.');
                return;
            }
            
            const menuStructure = generateMenuStructure(menuData, isPolish ? 'pl' : 'en');
            renderMenu(menuStructure);
        } catch (error) {
            console.error('Error initializing menu:', error);
            if (error.message.includes('timeout')) {
                showMenuError('Menu loading timed out. Please check your internet connection and try again.');
            } else {
                showMenuError(`Menu loading failed: ${error.message}`);
            }
        }
    }
});

// Smart Language Switching
function switchLanguage() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part !== '');
    
    // Debug logging
    console.log('Current path:', currentPath);
    console.log('Path parts:', pathParts);
    
    // Determine if we're in the English folder
    const isCurrentlyEnglish = pathParts.includes('en');
    console.log('Is currently English:', isCurrentlyEnglish);
    
    let targetPath;
    
    if (isCurrentlyEnglish) {
        // We're in the en/ folder, go to Polish version
        console.log('English detection - pathParts includes en:', pathParts.includes('en'));
        console.log('English detection - pathParts includes menu:', pathParts.includes('menu'));
        console.log('English detection - pathParts includes about:', pathParts.includes('about'));
        
        if (pathParts.includes('en') && !pathParts.includes('menu') && !pathParts.includes('about')) {
            // We're at en/ (English home)
            targetPath = '../';
            console.log('Detected: English home');
        } else if (pathParts.includes('en') && pathParts.includes('menu')) {
            // We're at en/menu/
            targetPath = '../../menu/';
            console.log('Detected: English menu');
        } else if (pathParts.includes('en') && pathParts.includes('about')) {
            // We're at en/about/
            targetPath = '../../about/';
            console.log('Detected: English about');
        }
    } else {
        // We're in the Polish folder, go to English version
        console.log('Polish detection - pathParts includes menu:', pathParts.includes('menu'));
        console.log('Polish detection - pathParts includes about:', pathParts.includes('about'));
        
        if (!pathParts.includes('menu') && !pathParts.includes('about')) {
            // We're at the root (Polish home)
            targetPath = 'en/';
            console.log('Detected: Polish home');
        } else if (pathParts.includes('menu')) {
            // We're at menu/
            targetPath = '../en/menu/';
            console.log('Detected: Polish menu');
        } else if (pathParts.includes('about')) {
            // We're at about/
            targetPath = '../en/about/';
            console.log('Detected: Polish about');
        }
    }
    
    // Debug logging
    console.log('Target path:', targetPath);
    
    // Navigate to the equivalent page in the other language
    if (targetPath) {
        console.log('Navigating to:', targetPath);
        window.location.href = targetPath;
    } else {
        console.log('No target path found - language switching failed');
    }
}

// Add smart language switching to all language buttons
document.addEventListener('DOMContentLoaded', function() {
    const languageButtons = document.querySelectorAll('.lang-btn');
    
    languageButtons.forEach(button => {
        // Remove the href attribute to prevent default navigation
        button.removeAttribute('href');
        button.style.cursor = 'pointer';
        
        // Add click event for smart switching
        button.addEventListener('click', function(e) {
            e.preventDefault();
            switchLanguage();
        });
    });
});

// Dynamic Carousel Loader
function loadCarouselImages() {
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselDots = document.getElementById('carousel-dots');
    
    if (!carouselSlides || !carouselDots) return;
    
    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    let carouselPath;
    
    if (currentPath.includes('/en/menu/') || currentPath.includes('/en/about/')) {
        // We're in en/menu/ or en/about/ - need to go up 2 levels
        carouselPath = '../../Carousel/';
    } else if (currentPath.includes('/menu/') || currentPath.includes('/about/')) {
        // We're in menu/ or about/ - need to go up 1 level
        carouselPath = '../Carousel/';
    } else if (currentPath.includes('/en/')) {
        // We're in en/ - need to go up 1 level
        carouselPath = '../Carousel/';
    } else {
        // We're in root - direct path
        carouselPath = 'Carousel/';
    }
    
    // List of images in the Carousel folder
    const images = [
        carouselPath + 'IMG_8973.png',
        carouselPath + 'IMG_9135.png'
    ];
    
    // Clear existing content
    carouselSlides.innerHTML = '';
    carouselDots.innerHTML = '';
    
    // Create slides and dots
    images.forEach((imagePath, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = `Restaurant Image ${index + 1}`;
        img.loading = 'lazy';
        
        slide.appendChild(img);
        carouselSlides.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('span');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('data-slide', index);
        carouselDots.appendChild(dot);
    });
    
    // Reinitialize carousel functionality
    initializeCarousel();
}

// Initialize carousel functionality
function initializeCarousel() {
    const carousel = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!carousel || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Update carousel position for full-width slides
        const translateX = -(index * 100);
        carousel.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-play carousel with longer interval for better viewing
    let autoPlayInterval = setInterval(nextSlide, 6000);
    
    // Pause auto-play on hover
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 6000);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    }
}

// Load carousel when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    loadCarouselImages();
});
