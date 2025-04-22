document.addEventListener('DOMContentLoaded', function() {
    // Cookie functions
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Initialize particles based on theme
    function initParticles() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const particleColor = isDarkMode ? "#5cb82d" : "#3e8914";
        const lineColor = isDarkMode ? "#5cb82d" : "#3e8914";
        
        // Check if particlesJS is defined before using it
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": particleColor
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": lineColor,
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        } else {
            console.warn('particlesJS is not defined. Make sure the particles.js library is included.');
        }
    }

    // Translations
    const translations = {
        en: {
            brand: "AgriTech Monitor",
            nav: {
                home: "Home",
                sensors: "Sensors",
                thresholds: "Thresholds",
                devices: "Devices",
                history: "History",
                language: "Language"
            },
            home: {
                hero: {
                    title: "Smart Agriculture Monitoring",
                    subtitle: "Monitor your farm's conditions and control devices from anywhere, anytime.",
                    button: "Get Started"
                },
                features: {
                    title: "Our Features",
                    sensors: {
                        title: "Sensor Monitoring",
                        description: "Track temperature, soil humidity, CO2 levels, luminosity, and water tank levels in real-time."
                    },
                    devices: {
                        title: "Device Control",
                        description: "Remotely control fans, pumps, and lights to optimize growing conditions."
                    },
                    history: {
                        title: "History Tracking",
                        description: "View and export your activity history to analyze patterns and improve efficiency."
                    }
                }
            },
            sensors: {
                title: "Sensor Monitoring",
                temperature: {
                    title: "Temperature"
                },
                soil: {
                    title: "Soil Humidity"
                },
                co2: {
                    title: "CO2 Level"
                },
                light: {
                    title: "Luminosity"
                },
                water: {
                    title: "Water Tank Level"
                },
                optimal: "Optimal range",
                refresh: "Refresh Sensors"
            },
            thresholds: {
                title: "Sensor Thresholds",
                description: "Set minimum and maximum thresholds for your sensors. You will receive alerts when values go outside these ranges.",
                min: "Min",
                max: "Max",
                save: "Save Thresholds",
                reset: "Reset to Default",
                saved: "Thresholds saved successfully!",
                resetConfirm: "Are you sure you want to reset all thresholds to default values?"
            },
            devices: {
                title: "Device Control",
                fan: {
                    title: "Ventilation Fan",
                    description: "Controls air circulation and temperature"
                },
                pump: {
                    title: "Irrigation System",
                    description: "Controls water distribution to plants"
                },
                light: {
                    title: "Grow Light",
                    description: "Controls supplemental lighting for plants"
                },
                toggle: "Toggle",
                status: {
                    on: "ON",
                    off: "OFF"
                }
            },
            history: {
                title: "Activity History",
                clear: "Clear History",
                export: "Export as CSV",
                table: {
                    date: "Date & Time",
                    action: "Action",
                    device: "Device/Sensor",
                    value: "Value/Status"
                },
                noData: "No history available",
                confirmClear: "Are you sure you want to clear all history?",
                noDataExport: "No history data to export",
                pagination: {
                    prev: "Previous",
                    next: "Next",
                    page: "Page"
                }
            },
            footer: {
                tagline: "Smart solutions for modern agriculture",
                copyright: "© 2025 AgriTech Monitor. All rights reserved."
            },
            actions: {
                turnedOn: "Turned ON",
                turnedOff: "Turned OFF",
                sensorReading: "Sensor Reading",
                allSensors: "All Sensors",
                thresholdSet: "Threshold Set"
            }
        },
        fr: {
            brand: "AgriTech Moniteur",
            nav: {
                home: "Accueil",
                sensors: "Capteurs",
                thresholds: "Seuils",
                devices: "Appareils",
                history: "Historique",
                language: "Langue"
            },
            home: {
                hero: {
                    title: "Surveillance Agricole Intelligente",
                    subtitle: "Surveillez les conditions de votre ferme et contrôlez les appareils de n'importe où, à tout moment.",
                    button: "Commencer"
                },
                features: {
                    title: "Nos Fonctionnalités",
                    sensors: {
                        title: "Surveillance des Capteurs",
                        description: "Suivez la température, l'humidité du sol, les niveaux de CO2, la luminosité et les niveaux du réservoir d'eau en temps réel."
                    },
                    devices: {
                        title: "Contrôle des Appareils",
                        description: "Contrôlez à distance les ventilateurs, les pompes et les lumières pour optimiser les conditions de croissance."
                    },
                    history: {
                        title: "Suivi de l'Historique",
                        description: "Consultez et exportez votre historique d'activité pour analyser les tendances et améliorer l'efficacité."
                    }
                }
            },
            sensors: {
                title: "Surveillance des Capteurs",
                temperature: {
                    title: "Température"
                },
                soil: {
                    title: "Humidité du Sol"
                },
                co2: {
                    title: "Niveau de CO2"
                },
                light: {
                    title: "Luminosité"
                },
                water: {
                    title: "Niveau du Réservoir d'Eau"
                },
                optimal: "Plage optimale",
                refresh: "Actualiser les Capteurs"
            },
            thresholds: {
                title: "Seuils des Capteurs",
                description: "Définissez les seuils minimum et maximum pour vos capteurs. Vous recevrez des alertes lorsque les valeurs sortent de ces plages.",
                min: "Min",
                max: "Max",
                save: "Enregistrer les Seuils",
                reset: "Réinitialiser",
                saved: "Seuils enregistrés avec succès!",
                resetConfirm: "Êtes-vous sûr de vouloir réinitialiser tous les seuils aux valeurs par défaut?"
            },
            devices: {
                title: "Contrôle des Appareils",
                fan: {
                    title: "Ventilateur",
                    description: "Contrôle la circulation d'air et la température"
                },
                pump: {
                    title: "Système d'Irrigation",
                    description: "Contrôle la distribution d'eau aux plantes"
                },
                light: {
                    title: "Lampe de Croissance",
                    description: "Contrôle l'éclairage supplémentaire pour les plantes"
                },
                toggle: "Basculer",
                status: {
                    on: "MARCHE",
                    off: "ARRÊT"
                }
            },
            history: {
                title: "Historique d'Activité",
                clear: "Effacer l'Historique",
                export: "Exporter en CSV",
                table: {
                    date: "Date et Heure",
                    action: "Action",
                    device: "Appareil/Capteur",
                    value: "Valeur/État"
                },
                noData: "Aucun historique disponible",
                confirmClear: "Êtes-vous sûr de vouloir effacer tout l'historique?",
                noDataExport: "Aucune donnée d'historique à exporter",
                pagination: {
                    prev: "Précédent",
                    next: "Suivant",
                    page: "Page"
                }
            },
            footer: {
                tagline: "Solutions intelligentes pour l'agriculture moderne",
                copyright: "© 2025 AgriTech Moniteur. Tous droits réservés."
            },
            actions: {
                turnedOn: "Activé",
                turnedOff: "Désactivé",
                sensorReading: "Lecture des Capteurs",
                allSensors: "Tous les Capteurs",
                thresholdSet: "Seuil Défini"
            }
        }
    };
    
    // DOM Elements
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarCollapse = document.getElementById('navbarNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    const getStartedBtn = document.getElementById('getStartedBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageMenu = document.getElementById('languageMenu');
    const languageBtns = document.querySelectorAll('.language-btn');
    
    // Device switches
    const fanSwitch = document.getElementById('fanSwitch');
    const pumpSwitch = document.getElementById('pumpSwitch');
    const lightSwitch = document.getElementById('lightSwitch');
    
    // Device status elements
    const fanStatus = document.getElementById('fanStatus');
    const pumpStatus = document.getElementById('pumpStatus');
    const lightStatus = document.getElementById('lightStatus');
    
    // Device icons
    const fanIcon = document.getElementById('fanIcon');
    const pumpIcon = document.getElementById('pumpIcon');
    const lightIcon = document.getElementById('lightIcon');
    
    // History elements
    const clearHistoryBtn = document.getElementById('clearHistory');
    const exportCSVBtn = document.getElementById('exportCSV');
    const historyBody = document.getElementById('historyBody');
    const historyPagination = document.getElementById('historyPagination');
    
    // Sensor elements
    const refreshSensorsBtn = document.getElementById('refreshSensors');
    
    // Threshold elements
    const saveThresholdsBtn = document.getElementById('saveThresholds');
    const resetThresholdsBtn = document.getElementById('resetThresholds');
    
    // Threshold sliders and inputs
    const thresholdSensors = ['temp', 'soil', 'co2', 'light', 'water'];
    
    thresholdSensors.forEach(sensor => {
        const minRange = document.getElementById(`${sensor}MinRange`);
        const maxRange = document.getElementById(`${sensor}MaxRange`);
        const minValue = document.getElementById(`${sensor}MinValue`);
        const maxValue = document.getElementById(`${sensor}MaxValue`);
        const minInput = document.getElementById(`${sensor}MinInput`);
        const maxInput = document.getElementById(`${sensor}MaxInput`);
        const sliderRange = document.getElementById(`${sensor}SliderRange`);
        
        if (minRange && maxRange && sliderRange) {
            // Update slider range visual
            function updateSliderRange() {
                const min = parseInt(minRange.value);
                const max = parseInt(maxRange.value);
                const minPos = (min - minRange.min) / (minRange.max - minRange.min) * 100;
                const maxPos = (max - minRange.min) / (minRange.max - minRange.min) * 100;
                
                sliderRange.style.left = minPos + '%';
                sliderRange.style.width = (maxPos - minPos) + '%';
                
                if (minValue) minValue.textContent = min;
                if (maxValue) maxValue.textContent = max;
                if (minInput) minInput.value = min;
                if (maxInput) maxInput.value = max;
            }
            
            // Initialize slider range
            updateSliderRange();
            
            // Add event listeners
            minRange.addEventListener('input', function() {
                if (parseInt(minRange.value) > parseInt(maxRange.value)) {
                    minRange.value = maxRange.value;
                }
                updateSliderRange();
            });
            
            maxRange.addEventListener('input', function() {
                if (parseInt(maxRange.value) < parseInt(minRange.value)) {
                    maxRange.value = minRange.value;
                }
                updateSliderRange();
            });
            
            if (minInput) {
                minInput.addEventListener('change', function() {
                    let value = parseInt(minInput.value);
                    const min = parseInt(minRange.min);
                    const max = parseInt(maxInput.value);
                    
                    if (isNaN(value)) value = min;
                    if (value < min) value = min;
                    if (value > max) value = max;
                    
                    minInput.value = value;
                    minRange.value = value;
                    updateSliderRange();
                });
            }
            
            if (maxInput) {
                maxInput.addEventListener('change', function() {
                    let value = parseInt(maxInput.value);
                    const min = parseInt(minInput.value);
                    const max = parseInt(maxRange.max);
                    
                    if (isNaN(value)) value = max;
                    if (value < min) value = min;
                    if (value > max) value = max;
                    
                    maxInput.value = value;
                    maxRange.value = value;
                    updateSliderRange();
                });
            }
        }
    });
    
    // Save thresholds
    if (saveThresholdsBtn) {
        saveThresholdsBtn.addEventListener('click',async function() {
            const thresholds = {};
            
            thresholdSensors.forEach(sensor => {
                const minInput = document.getElementById(`${sensor}MinInput`);
                const maxInput = document.getElementById(`${sensor}MaxInput`);
                
                if (minInput && maxInput) {
                    thresholds[sensor] = {
                        min: parseInt(minInput.value),
                        max: parseInt(maxInput.value)
                    };
                }
            });
            
            const data = JSON.stringify(thresholds);
            // Save to localStorage
            localStorage.setItem('agriTechThresholds', data);
            console.log(data);
            await fetch('/thresholds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });

            // Log to history
            const now = new Date();
            historyData.unshift({
                datetime: now.toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US'),
                action: translations[currentLang].actions.thresholdSet,
                device: translations[currentLang].actions.allSensors,
                value: JSON.stringify(thresholds)
            });
            
            localStorage.setItem('agriTechHistory', JSON.stringify(historyData));
            
            if (document.getElementById('history').classList.contains('active')) {
                renderHistoryTable();
            }
            
            // Show success message
            alert(translations[currentLang].thresholds.saved);
        });
    }
    
    // Reset thresholds
    if (resetThresholdsBtn) {
        resetThresholdsBtn.addEventListener('click', function() {
            if (confirm(translations[currentLang].thresholds.resetConfirm)) {
                // Reset to default values
                const defaults = {
                    temp: { min: 15, max: 30 },
                    soil: { min: 40, max: 80 },
                    co2: { min: 350, max: 600 },
                    light: { min: 30, max: 80 },
                    water: { min: 20, max: 90 }
                };
                
                thresholdSensors.forEach(sensor => {
                    const minRange = document.getElementById(`${sensor}MinRange`);
                    const maxRange = document.getElementById(`${sensor}MaxRange`);
                    const minInput = document.getElementById(`${sensor}MinInput`);
                    const maxInput = document.getElementById(`${sensor}MaxInput`);
                    
                    if (minRange && maxRange && minInput && maxInput) {
                        minRange.value = defaults[sensor].min;
                        maxRange.value = defaults[sensor].max;
                        minInput.value = defaults[sensor].min;
                        maxInput.value = defaults[sensor].max;
                        
                        // Trigger update
                        const event = new Event('input');
                        minRange.dispatchEvent(event);
                        maxRange.dispatchEvent(event);
                    }
                });
                
                // Remove from localStorage
                localStorage.removeItem('agriTechThresholds');
            }
        });
    }
    
    // History data
    let historyData = JSON.parse(localStorage.getItem('agriTechHistory')) || [];
    
    // Current language
    let currentLang = getCookie('agriTechLanguage') || 'en';
    
    // Pagination settings
    const itemsPerPage = 10;
    let currentPage = 1;
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
        
        // Save preference to cookie
        const isDarkMode = document.body.classList.contains('dark-mode');
        setCookie('darkMode', isDarkMode, 30);
        
        // Reinitialize particles for theme
        initParticles();
    });

    // Check for saved theme preference
    if (getCookie('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    }

    // Mobile navigation
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarCollapse.classList.toggle('show');
        });
    }
    
    // Language dropdown
    if (languageDropdown) {
        languageDropdown.addEventListener('click', function(e) {
            e.preventDefault();
            languageMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!languageDropdown.contains(e.target) && !languageMenu.contains(e.target)) {
                languageMenu.classList.remove('show');
            }
        });
    }
    
    // Apply translations
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            
            let translation = translations[currentLang];
            for (const k of keys) {
                if (translation[k] !== undefined) {
                    translation = translation[k];
                } else {
                    console.warn(`Translation key not found: ${key}`);
                    return;
                }
            }
            
            if (typeof translation === 'string') {
                element.textContent = translation;
            }
        });
        
        // Update device status text based on current state
        updateDeviceStatusDisplay('fan', fanSwitch.checked);
        updateDeviceStatusDisplay('pump', pumpSwitch.checked);
        updateDeviceStatusDisplay('light', lightSwitch.checked);
        
        // Update language buttons
        languageBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update document language
        document.documentElement.lang = currentLang;
        
        // Re-render history table with translated content
        renderHistoryTable();
    }
    
    // Change language
    function changeLanguage(lang) {
        currentLang = lang;
        setCookie('agriTechLanguage', lang, 30);
        applyTranslations();
    }
    
    // Language selector
    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
            languageMenu.classList.remove('show');
        });
    });
    
    // Navigation
    function showPage(pageId) {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        document.getElementById(pageId).classList.add('active');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu
        if (navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }

        // Save active page to cookie
        setCookie('activePage', pageId, 7);

        // Refresh device states when showing the devices page
        if (pageId === 'devices') {
            updateDeviceStates();
        }
        
        // Reset pagination to first page when showing history
        if (pageId === 'history') {
            currentPage = 1;
            renderHistoryTable();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });
    
    getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('sensors');
    });
    
    // Fetch value from server
    async function getValue(path) {
        try {
            const response = await fetch(`/${path}`);
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error(`Error fetching ${path}:`, error);
            return null;
        }
    }

    // Update device status display
    function updateDeviceStatusDisplay(device, state) {
        let statusElement, switchElement, iconElement;
        switch (device) {
            case 'fan':
                statusElement = fanStatus;
                switchElement = fanSwitch;
                iconElement = fanIcon;
                break;
            case 'pump':
                statusElement = pumpStatus;
                switchElement = pumpSwitch;
                iconElement = pumpIcon;
                break;
            case 'light':
                statusElement = lightStatus;
                switchElement = lightSwitch;
                iconElement = lightIcon;
                break;
        }

        switchElement.checked = state;
        if (state) {
            statusElement.textContent = translations[currentLang].devices.status.on;
            statusElement.classList.remove('status-off');
            statusElement.classList.add('status-on');
            iconElement.classList.add('active');
        } else {
            statusElement.textContent = translations[currentLang].devices.status.off;
            statusElement.classList.remove('status-on');
            statusElement.classList.add('status-off');
            iconElement.classList.remove('active');
        }
    }

    // Update device state on server
    async function updateDevice(device, state) {
        try {
            const response = await fetch('/activate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ device, state })
            });
            const result = await response.json();
            console.log(`Updated ${device} state:`, result);
        } catch (error) {
            console.error(`Error updating ${device}:`, error);
        }
    }

    // Fetch and update all device states
    async function updateDeviceStates() {
        const fanState = await getValue('state/fan');
        const pumpState = await getValue('state/pump');
        const lightState = await getValue('state/light');

        if (fanState !== null) updateDeviceStatusDisplay('fan', fanState);
        if (pumpState !== null) updateDeviceStatusDisplay('pump', pumpState);
        if (lightState !== null) updateDeviceStatusDisplay('light', lightState);
    }

    // Device control with history logging
    function logDeviceStatus(device, state) {
        const now = new Date();
        const action = state ? 
            translations[currentLang].actions.turnedOn : 
            translations[currentLang].actions.turnedOff;
        
        historyData.unshift({
            datetime: now.toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US'),
            action: action,
            device: translations[currentLang].devices[device].title,
            value: state ? translations[currentLang].devices.status.on : translations[currentLang].devices.status.off
        });
        
        localStorage.setItem('agriTechHistory', JSON.stringify(historyData));
        
        if (document.getElementById('history').classList.contains('active')) {
            renderHistoryTable();
        }
    }

    fanSwitch.addEventListener('change', async () => {
        const state = fanSwitch.checked;
        updateDeviceStatusDisplay('fan', state);
        await updateDevice('fan', state);
        logDeviceStatus('fan', state);
    });
    
    pumpSwitch.addEventListener('change', async () => {
        const state = pumpSwitch.checked;
        updateDeviceStatusDisplay('pump', state);
        await updateDevice('pump', state);
        logDeviceStatus('pump', state);
    });
    
    lightSwitch.addEventListener('change', async () => {
        const state = lightSwitch.checked;
        updateDeviceStatusDisplay('light', state);
        await updateDevice('light', state);
        logDeviceStatus('light', state);
    });
    
    // Pagination functions
    function generatePagination(totalPages) {
        historyPagination.innerHTML = '';
        
        if (totalPages <= 1) {
            return;
        }
        
        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = 'pagination-item';
        const prevBtn = document.createElement('button');
        prevBtn.className = `pagination-link ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="bi bi-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderHistoryTable();
            }
        });
        prevLi.appendChild(prevBtn);
        historyPagination.appendChild(prevLi);
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageLi = document.createElement('li');
            pageLi.className = 'pagination-item';
            const pageBtn = document.createElement('button');
            pageBtn.className = `pagination-link ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderHistoryTable();
            });
            pageLi.appendChild(pageBtn);
            historyPagination.appendChild(pageLi);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = 'pagination-item';
        const nextBtn = document.createElement('button');
        nextBtn.className = `pagination-link ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i class="bi bi-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderHistoryTable();
            }
        });
        nextLi.appendChild(nextBtn);
        historyPagination.appendChild(nextLi);
    }
    
    // History functions
    function renderHistoryTable() {
        historyBody.innerHTML = '';
        
        if (historyData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = `<td colspan="4" class="text-center">${translations[currentLang].history.noData}</td>`;
            historyBody.appendChild(row);
            historyPagination.innerHTML = '';
            return;
        }
        
        // Calculate pagination
        const totalPages = Math.ceil(historyData.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, historyData.length);
        
        // Display current page data
        for (let i = startIndex; i < endIndex; i++) {
            const entry = historyData[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.datetime}</td>
                <td>${entry.action}</td>
                <td>${entry.device}</td>
                <td>${entry.value}</td>
            `;
            historyBody.appendChild(row);
        }
        
        // Generate pagination controls
        generatePagination(totalPages);
    }
    
    clearHistoryBtn.addEventListener('click', () => {
        if (confirm(translations[currentLang].history.confirmClear)) {
            historyData = [];
            localStorage.setItem('agriTechHistory', JSON.stringify(historyData));
            renderHistoryTable();
        }
    });
    
    exportCSVBtn.addEventListener('click', () => {
        if (historyData.length === 0) {
            alert(translations[currentLang].history.noDataExport);
            return;
        }
        
        const headers = [
            translations[currentLang].history.table.date,
            translations[currentLang].history.table.action,
            translations[currentLang].history.table.device,
            translations[currentLang].history.table.value
        ];
        
        const csvHeader = headers.map(header => `"${header}"`).join(',') + '\n';
        const csvRows = historyData.map(entry => {
            return `"${entry.datetime}","${entry.action}","${entry.device}","${entry.value}"`;
        }).join('\n');
        
        const csvContent = csvHeader + csvRows;
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.setAttribute('href', url);
        link.setAttribute('download', `agritech_history_${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Update sensor readings
    async function updateSensors() {
        // Show loading state
        refreshSensorsBtn.innerHTML = `<span class="loading-spinner"></span><span data-i18n="sensors.refresh">${translations[currentLang].sensors.refresh}</span>`;
        
        // For demo purposes, generate random values
        // In a real application, these would come from API calls
        const temp = Math.floor(Math.random() * 20) + 15; // 15-35°C
        const soil = Math.floor(Math.random() * 50) + 30; // 30-80%
        const co2 = Math.floor(Math.random() * 300) + 350; // 350-650 ppm
        const light = Math.floor(Math.random() * 50) + 30; // 30-80%
        const water = Math.floor(Math.random() * 60) + 40; // 40-100%
        
        // Get thresholds from localStorage
        const savedThresholds = JSON.parse(localStorage.getItem('agriTechThresholds')) || {};
        
        // Update circular gauges
        updateGauge('temp', temp, 0, 50);
        updateGauge('soil', soil, 0, 100);
        updateGauge('co2', co2, 300, 1000);
        updateGauge('light', light, 0, 100);
        updateGauge('water', water, 0, 100);
        
        // Update values
        document.getElementById('tempValue').textContent = `${temp}°C`;
        document.getElementById('soilValue').textContent = `${soil}%`;
        document.getElementById('co2Value').textContent = `${co2} ppm`;
        document.getElementById('lightValue').textContent = `${light}%`;
        document.getElementById('waterValue').textContent = `${water}%`;
        
        // Check thresholds and highlight if out of range
        checkThreshold('temp', temp, savedThresholds.temp);
        checkThreshold('soil', soil, savedThresholds.soil);
        checkThreshold('co2', co2, savedThresholds.co2);
        checkThreshold('light', light, savedThresholds.light);
        checkThreshold('water', water, savedThresholds.water);
        
        const now = new Date();
        historyData.unshift({
            datetime: now.toLocaleString(currentLang === 'fr' ? 'fr-FR' : 'en-US'),
            action: translations[currentLang].actions.sensorReading,
            device: translations[currentLang].actions.allSensors,
            value: `T:${temp}°C, SH:${soil}%, CO2:${co2}ppm, L:${light}%, W:${water}%`
        });
        
        if (historyData.length > 100) {
            historyData = historyData.slice(0, 100);
        }
        
        localStorage.setItem('agriTechHistory', JSON.stringify(historyData));
        
        if (document.getElementById('history').classList.contains('active')) {
            renderHistoryTable();
        }
        
        // Restore button text
        setTimeout(() => {
            refreshSensorsBtn.innerHTML = `<i class="bi bi-arrow-repeat"></i><span data-i18n="sensors.refresh">${translations[currentLang].sensors.refresh}</span>`;
        }, 500);
    }
    
    // Update circular gauge
    function updateGauge(sensor, value, min, max) {
        const gauge = document.getElementById(`${sensor}Gauge`);
        if (!gauge) return;
        
        // Calculate angle (0 to 360 degrees)
        const percentage = (value - min) / (max - min);
        const angle = Math.min(360, Math.max(0, percentage * 360));
        
        // Convert angle to transform rotation
        gauge.style.transform = `rotate(${angle}deg)`;
    }
    
    // Check if value is within threshold range
    function checkThreshold(sensor, value, threshold) {
        if (!threshold) return;
        
        const sensorCard = document.getElementById(`${sensor}Value`).closest('.sensor-card');
        if (!sensorCard) return;
        
        if (value < threshold.min || value > threshold.max) {
            sensorCard.classList.add('threshold-alert');
        } else {
            sensorCard.classList.remove('threshold-alert');
        }
    }
    
    refreshSensorsBtn.addEventListener('click', updateSensors);
    
    // Weather API implementation
    async function fetchWeather() {
        const weatherWidget = document.getElementById('weatherWidget');
        const weatherIcon = weatherWidget.querySelector('.weather-icon i');
        const weatherTemp = weatherWidget.querySelector('.weather-temp');
        const weatherDesc = weatherWidget.querySelector('.weather-desc');
        
        try {
            // First get user's approximate location
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            const { latitude, longitude } = position.coords;
            
            // Use OpenWeatherMap API (you would need to sign up for an API key)
            // For demo purposes, we'll use a mock response
            // const apiKey = 'your_api_key';
            // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            // const data = await response.json();
            
            // Mock response for demo
            const mockData = {
                main: { temp: 22.5 },
                weather: [{ 
                    description: 'Partly cloudy',
                    main: 'Clouds',
                    icon: '03d'
                }]
            };
            const data = mockData;
            
            // Update weather widget
            weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
            weatherDesc.textContent = data.weather[0].description;
            
            // Set appropriate icon
            const weatherMain = data.weather[0].main.toLowerCase();
            let iconClass = 'bi-cloud';
            
            if (weatherMain.includes('clear')) {
                iconClass = 'bi-sun';
            } else if (weatherMain.includes('cloud')) {
                iconClass = 'bi-cloud';
            } else if (weatherMain.includes('rain')) {
                iconClass = 'bi-cloud-rain';
            } else if (weatherMain.includes('thunderstorm')) {
                iconClass = 'bi-cloud-lightning-rain';
            } else if (weatherMain.includes('snow')) {
                iconClass = 'bi-snow';
            } else if (weatherMain.includes('mist') || weatherMain.includes('fog')) {
                iconClass = 'bi-cloud-fog';
            }
            
            weatherIcon.className = `bi ${iconClass}`;
            
        } catch (error) {
            console.error('Error fetching weather:', error);
            weatherTemp.textContent = '--°C';
            weatherDesc.textContent = 'Weather unavailable';
            weatherIcon.className = 'bi bi-cloud-slash';
        }
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', async () => {
        // Initialize particles
        initParticles();
        
        // Check for saved active page
        const savedPage = getCookie('activePage');
        if (savedPage) {
            showPage(savedPage);
        }
        
        // Apply translations
        applyTranslations();
        
        // Load saved thresholds
        const savedThresholds = JSON.parse(localStorage.getItem('agriTechThresholds'));
        if (savedThresholds) {
            thresholdSensors.forEach(sensor => {
                if (savedThresholds[sensor]) {
                    const minRange = document.getElementById(`${sensor}MinRange`);
                    const maxRange = document.getElementById(`${sensor}MaxRange`);
                    const minInput = document.getElementById(`${sensor}MinInput`);
                    const maxInput = document.getElementById(`${sensor}MaxInput`);
                    
                    if (minRange && maxRange && minInput && maxInput) {
                        minRange.value = savedThresholds[sensor].min;
                        maxRange.value = savedThresholds[sensor].max;
                        minInput.value = savedThresholds[sensor].min;
                        maxInput.value = savedThresholds[sensor].max;
                        
                        // Trigger update
                        const event = new Event('input');
                        minRange.dispatchEvent(event);
                    }
                }
            });
        }
        
        // Update sensors and device states
        await updateSensors();
        await updateDeviceStates();
        
        // Render history table
        renderHistoryTable();
        
        // Fetch weather data
        fetchWeather();

        // Auto-refresh weather every hour
        setInterval(fetchWeather, 3600000);
        
        // Auto-refresh sensors every 30 seconds
        setInterval(updateSensors, 30000);
    });
});