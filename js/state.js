// State Detail Page JavaScript - Enhanced with Multi-Year Data

const CONFIG = {
    API: {
        OPENAQ_BASE: 'https://api.openaq.org/v2',
        TIMEOUT: 10000,
        CACHE_DURATION: 300000
    },
    AQI_CATEGORIES: [
        { min: 0, max: 50, label: 'Good', color: '#00e400' },
        { min: 51, max: 100, label: 'Satisfactory', color: '#ffff00' },
        { min: 101, max: 200, label: 'Moderate', color: '#ff7e00' },
        { min: 201, max: 300, label: 'Poor', color: '#ff0000' },
        { min: 301, max: 400, label: 'Very Poor', color: '#8f3f97' },
        { min: 401, max: 999, label: 'Severe', color: '#7e0023' }
    ]
};

const STATE_NGOS = {
    'Delhi': [
        { name: 'Centre for Science and Environment', desc: 'Research and advocacy on environment and development', url: 'https://www.cseindia.org' },
        { name: 'Climate Action Network South Asia', desc: 'Coalition working on climate change issues', url: 'https://www.cansouthasia.net' },
        { name: 'Delhi Greens', desc: 'Community-driven environmental initiatives', url: 'https://www.delhigreens.com' }
    ],
    'Maharashtra': [
        { name: 'Awaaz Foundation', desc: 'Works on noise and air pollution awareness', url: 'https://www.awaazfoundation.org' },
        { name: 'Bombay Environment Action Group', desc: 'Environmental conservation in Mumbai', url: 'https://www.beagonline.org' },
        { name: 'United Way Mumbai', desc: 'Social development and environmental projects', url: 'https://www.unitedwaymumbai.org' }
    ],
    'Karnataka': [
        { name: 'Environment Support Group', desc: 'Environmental advocacy and legal interventions', url: 'https://www.esgindia.org' },
        { name: 'Hasiru Dala', desc: 'Waste management and environmental solutions', url: 'https://www.hasirudala.in' },
        { name: 'Bangalore Environment Trust', desc: 'Urban environmental management', url: 'https://www.betindia.org' }
    ],
    'Tamil Nadu': [
        { name: 'Care Earth Trust', desc: 'Biodiversity and environmental conservation', url: 'https://www.careearth.org' },
        { name: 'Auroville Foundation', desc: 'Sustainable living and environmental practices', url: 'https://www.auroville.org' },
        { name: 'Nature Conservation Foundation', desc: 'Wildlife and habitat conservation', url: 'https://www.ncf-india.org' }
    ],
    'West Bengal': [
        { name: 'WWF India - Kolkata', desc: 'Wildlife and environmental conservation', url: 'https://www.wwfindia.org' },
        { name: 'Centre for Environment and Development', desc: 'Sustainable development initiatives', url: 'https://www.cedindia.org' },
        { name: 'Indian Centre for Sustainable Development', desc: 'Policy research and advocacy', url: 'https://www.icsdindia.org' }
    ],
    'Telangana': [
        { name: 'Society for Development of Environment and Human Resources', desc: 'Environmental education and awareness', url: 'https://www.sdehr.org' },
        { name: 'Forum for Better Hyderabad', desc: 'Urban environmental issues', url: 'https://www.betterhyd.org' },
        { name: 'Green Foundation', desc: 'Sustainable agriculture and biodiversity', url: 'https://www.greenfoundation.in' }
    ],
    'Gujarat': [
        { name: 'Centre for Environment Education', desc: 'Environmental education nationwide', url: 'https://www.ceeindia.org' },
        { name: 'Paryavaran Mitra', desc: 'Environmental conservation in Gujarat', url: 'https://www.paryavaranmitra.org.in' },
        { name: 'CEPT Research and Development Foundation', desc: 'Urban planning and environment', url: 'https://www.cept.ac.in' }
    ],
    'Rajasthan': [
        { name: 'Jaipur Foot', desc: 'Humanitarian and environmental initiatives', url: 'https://www.jaipurfoot.org' },
        { name: 'Foundation for Ecological Security', desc: 'Natural resource management', url: 'https://www.fes.org.in' },
        { name: 'Tiger Watch', desc: 'Wildlife and environmental conservation', url: 'https://www.tigerwatch.net' }
    ],
    'Uttar Pradesh': [
        { name: 'EcoFriends', desc: 'River conservation and environmental activism', url: 'https://www.ecofriends.org' },
        { name: 'Neer Foundation', desc: 'Water and environmental conservation', url: 'https://www.neerfoundation.org' },
        { name: 'Ganga Action Parivar', desc: 'River Ganga conservation', url: 'https://www.gangaaction.org' }
    ],
    'Punjab': [
        { name: 'Kheti Virasat Mission', desc: 'Sustainable agriculture and environment', url: 'https://www.kvmission.org' },
        { name: 'Punjab Pollution Control Board', desc: 'Pollution monitoring and control', url: 'https://www.ppcb.punjab.gov.in' },
        { name: 'Voice of Environment', desc: 'Environmental advocacy', url: 'https://www.voiceofenvironment.org' }
    ],
    'Madhya Pradesh': [
        { name: 'Kalpavriksh', desc: 'Environmental action and research', url: 'https://www.kalpavriksh.org' },
        { name: 'Vindhya Bachao', desc: 'Forest and environmental conservation', url: 'https://www.vindhyabachao.org' },
        { name: 'Ekta Parishad', desc: 'Land rights and environmental justice', url: 'https://www.ektaparishad.com' }
    ],
    'Bihar': [
        { name: 'Megh Pyne Abhiyan', desc: 'Water conservation and environment', url: 'https://www.meghpyne.org' },
        { name: 'Shristi', desc: 'Innovation and environmental solutions', url: 'https://www.sristindia.org' },
        { name: 'Manav Seva Sansthan', desc: 'Social and environmental development', url: 'https://www.manavseva.org' }
    ],
    'Odisha': [
        { name: 'Vasundhara', desc: 'Natural resource governance', url: 'https://www.vasundharaodisha.org' },
        { name: 'Living Farms', desc: 'Sustainable agriculture and biodiversity', url: 'https://www.livingfarms.org' },
        { name: 'Chilika Development Authority', desc: 'Wetland conservation', url: 'https://www.chilika.com' }
    ],
    'Kerala': [
        { name: 'Thanal', desc: 'Waste management and environmental health', url: 'https://www.thanal.co.in' },
        { name: 'Kerala Sastra Sahitya Parishad', desc: 'Science and environmental awareness', url: 'https://www.kssp.in' },
        { name: 'Centre for Water Resources Development', desc: 'Water conservation and management', url: 'https://www.cwrdm.org' }
    ],
    'Andhra Pradesh': [
        { name: 'Foundation for Ecological Security', desc: 'Natural resource management', url: 'https://www.fes.org.in' },
        { name: 'Hyderabad Urban Lab', desc: 'Urban environmental research', url: 'https://www.hydlab.org' },
        { name: 'Action for Food Production', desc: 'Sustainable agriculture', url: 'https://www.afpro.org' }
    ],
    'Jharkhand': [
        { name: 'PRADAN', desc: 'Livelihood and natural resource management', url: 'https://www.pradan.net' },
        { name: 'Xavier Institute of Social Service', desc: 'Environmental and social development', url: 'https://www.xiss.ac.in' },
        { name: 'Jharkhand State Pollution Control Board', desc: 'Pollution monitoring', url: 'https://www.jspcb.nic.in' }
    ],
    'Chhattisgarh': [
        { name: 'Kaushalya Foundation', desc: 'Sustainable development', url: 'https://www.kaushalyafoundation.org' },
        { name: 'Chhattisgarh Environment Conservation Board', desc: 'Environmental protection', url: 'https://www.cgecb.gov.in' },
        { name: 'Samarthan', desc: 'Natural resource governance', url: 'https://www.samarthan.org' }
    ],
    'Assam': [
        { name: 'Aaranyak', desc: 'Biodiversity conservation', url: 'https://www.aaranyak.org' },
        { name: 'Green Guard Nature Organisation', desc: 'Wildlife and habitat protection', url: 'https://www.greenguardnature.org' },
        { name: 'Help Earth', desc: 'Environmental awareness', url: 'https://www.helpearth.org' }
    ],
    'Himachal Pradesh': [
        { name: 'Himdhara Environment Research', desc: 'Mountain ecology research', url: 'https://www.himdhara.org' },
        { name: 'The Himalayan Institute', desc: 'Environmental conservation', url: 'https://www.himalayaninstitute.org' },
        { name: 'Ecosphere', desc: 'Sustainable mountain development', url: 'https://www.ecospherespiti.com' }
    ],
    'Goa': [
        { name: 'Goa Foundation', desc: 'Environmental protection and advocacy', url: 'https://www.goafoundation.org' },
        { name: 'Terra Conscious', desc: 'Sustainable living initiatives', url: 'https://www.terraconscious.com' },
        { name: 'Goa State Biodiversity Board', desc: 'Biodiversity conservation', url: 'https://www.gsbb.goa.gov.in' }
    ],
    'Chandigarh': [
        { name: 'Chandigarh Environment Society', desc: 'Urban environmental management', url: 'https://www.chenvironment.org' },
        { name: 'Society for Conservation', desc: 'Wildlife and nature conservation', url: 'https://www.conservationindia.org' },
        { name: 'Nature Club', desc: 'Environmental education', url: 'https://www.natureclubindia.org' }
    ]
};

// Global variables
let currentStateName = '';
let currentStateData = null;
let aqiChart = null;
let pmChart = null;
let pollutantChart = null;

// Data storage for different timeframes
let aqiDataStorage = {
    week: [],
    month: [],
    year: [],
    fiveYears: []
};

let pmDataStorage = {
    week: [],
    month: [],
    year: [],
    fiveYears: []
};

/**
 * Get AQI category based on value
 */
function getAQICategory(aqi) {
    for (let category of CONFIG.AQI_CATEGORIES) {
        if (aqi >= category.min && aqi <= category.max) {
            return category;
        }
    }
    return CONFIG.AQI_CATEGORIES[CONFIG.AQI_CATEGORIES.length - 1];
}

/**
 * Calculate AQI from PM2.5 value
 */
function calculateAQI(pm25) {
    if (pm25 <= 30) return Math.round((pm25 / 30) * 50);
    else if (pm25 <= 60) return Math.round(50 + ((pm25 - 30) / 30) * 50);
    else if (pm25 <= 90) return Math.round(100 + ((pm25 - 60) / 30) * 100);
    else if (pm25 <= 120) return Math.round(200 + ((pm25 - 90) / 30) * 100);
    else if (pm25 <= 250) return Math.round(300 + ((pm25 - 120) / 130) * 100);
    else return Math.round(400 + ((pm25 - 250) / 130) * 100);
}

/**
 * Generate simulated current data
 */
function generateSimulatedData(stateName) {
    const baseAQI = {
        'Delhi': 180, 'Maharashtra': 120, 'Karnataka': 90, 'Tamil Nadu': 95,
        'West Bengal': 130, 'Telangana': 110, 'Gujarat': 140, 'Rajasthan': 150,
        'Uttar Pradesh': 160, 'Punjab': 135, 'Madhya Pradesh': 125, 'Bihar': 145
    };
    const base = baseAQI[stateName] || 100;
    const aqi = Math.max(30, base + Math.floor(Math.random() * 40) - 20);
    return {
        aqi: aqi,
        pm25: aqi / 2.5,
        pm10: (aqi / 2.5) * 1.5,
        no2: Math.floor(Math.random() * 60) + 20,
        so2: Math.floor(Math.random() * 30) + 5,
        co: (Math.random() * 2 + 0.5).toFixed(1),
        o3: Math.floor(Math.random() * 100) + 30,
        timestamp: new Date().toISOString()
    };
}

/**
 * Generate realistic multi-year AQI trend data with seasonal patterns
 */
function generateMultiYearAQIData(days, baseAQI) {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Seasonal variation (winter worse, summer better in India)
        const month = date.getMonth();
        let seasonalFactor = 0;
        
        if (month >= 10 || month <= 1) { // Nov-Feb (Winter)
            seasonalFactor = 40;
        } else if (month >= 2 && month <= 4) { // Mar-May (Summer)
            seasonalFactor = -20;
        } else if (month >= 5 && month <= 8) { // Jun-Sep (Monsoon)
            seasonalFactor = -10;
        } else { // Sep-Oct (Post-monsoon)
            seasonalFactor = 20;
        }
        
        // Add random daily variation
        const dailyVariation = Math.floor(Math.random() * 30) - 15;
        
        // Long-term trend (slight improvement over years)
        const yearsPast = (now - date) / (365.25 * 24 * 60 * 60 * 1000);
        const longTermTrend = Math.floor(yearsPast * 3); // 3 AQI improvement per year
        
        const aqi = Math.max(30, Math.min(450, baseAQI + seasonalFactor + dailyVariation - longTermTrend));
        
        data.push({
            date: date,
            aqi: Math.round(aqi)
        });
    }
    
    return data;
}

/**
 * Generate realistic multi-year PM trend data
 */
function generateMultiYearPMData(days, basePM25, basePM10) {
    const data = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Seasonal variation
        const month = date.getMonth();
        let seasonalFactor = 0;
        
        if (month >= 10 || month <= 1) { // Winter
            seasonalFactor = 1.4;
        } else if (month >= 2 && month <= 4) { // Summer
            seasonalFactor = 0.8;
        } else if (month >= 5 && month <= 8) { // Monsoon
            seasonalFactor = 0.7;
        } else { // Post-monsoon
            seasonalFactor = 1.2;
        }
        
        // Random variation
        const pm25Variation = (Math.random() * 20) - 10;
        const pm10Variation = (Math.random() * 30) - 15;
        
        // Long-term improvement
        const yearsPast = (now - date) / (365.25 * 24 * 60 * 60 * 1000);
        const improvement = yearsPast * 2;
        
        const pm25 = Math.max(10, (basePM25 * seasonalFactor) + pm25Variation - improvement);
        const pm10 = Math.max(20, (basePM10 * seasonalFactor) + pm10Variation - (improvement * 1.5));
        
        data.push({
            date: date,
            pm25: Math.round(pm25 * 10) / 10,
            pm10: Math.round(pm10 * 10) / 10
        });
    }
    
    return data;
}

/**
 * Format date label based on timeframe
 */
function formatDateLabel(date, days) {
    if (days <= 7) {
        // Week view: show day name + date
        return date.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    } else if (days <= 31) {
        // Month view: show date
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    } else if (days <= 365) {
        // Year view: show month + date
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    } else {
        // Multi-year view: show month + year
        return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
    }
}

/**
 * Downsample data for better chart performance
 */
function downsampleData(data, maxPoints = 200) {
    if (data.length <= maxPoints) {
        return data;
    }
    
    const sampledData = [];
    const step = Math.ceil(data.length / maxPoints);
    
    for (let i = 0; i < data.length; i += step) {
        // Average the values in this window
        const windowEnd = Math.min(i + step, data.length);
        const window = data.slice(i, windowEnd);
        
        const avgEntry = {
            date: window[Math.floor(window.length / 2)].date
        };
        
        // Average all numeric properties
        Object.keys(window[0]).forEach(key => {
            if (key !== 'date' && typeof window[0][key] === 'number') {
                avgEntry[key] = window.reduce((sum, item) => sum + item[key], 0) / window.length;
            }
        });
        
        sampledData.push(avgEntry);
    }
    
    return sampledData;
}

/**
 * Generate all timeframe data on initialization
 */
function generateAllTimeframeData() {
    const baseAQI = currentStateData.aqi;
    const basePM25 = currentStateData.pm25;
    const basePM10 = currentStateData.pm10;
    
    // Generate AQI data
    aqiDataStorage.week = generateMultiYearAQIData(7, baseAQI);
    aqiDataStorage.month = generateMultiYearAQIData(30, baseAQI);
    aqiDataStorage.year = generateMultiYearAQIData(365, baseAQI);
    aqiDataStorage.fiveYears = generateMultiYearAQIData(1825, baseAQI);
    
    // Generate PM data
    pmDataStorage.week = generateMultiYearPMData(7, basePM25, basePM10);
    pmDataStorage.month = generateMultiYearPMData(30, basePM25, basePM10);
    pmDataStorage.year = generateMultiYearPMData(365, basePM25, basePM10);
    pmDataStorage.fiveYears = generateMultiYearPMData(1825, basePM25, basePM10);
}

/**
 * Create/Update AQI Chart
 */
function updateAQIChart() {
    const select = document.getElementById('aqiTimeRange');
    const days = parseInt(select.value);
    
    let data;
    if (days === 7) {
        data = aqiDataStorage.week;
    } else if (days === 30) {
        data = aqiDataStorage.month;
    } else if (days === 365) {
        data = aqiDataStorage.year;
    } else {
        data = downsampleData(aqiDataStorage.fiveYears, 300);
    }
    
    const ctx = document.getElementById('aqiChart').getContext('2d');
    
    if (aqiChart) {
        aqiChart.destroy();
    }
    
    aqiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => formatDateLabel(d.date, days)),
            datasets: [{
                label: 'AQI',
                data: data.map(d => d.aqi),
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: days <= 31 ? 4 : (days <= 365 ? 2 : 0),
                pointHoverRadius: 6,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: { 
                    display: true, 
                    position: 'top',
                    labels: {
                        font: { size: 13, weight: '600' },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 },
                    callbacks: {
                        label: function(context) {
                            const aqi = Math.round(context.parsed.y);
                            const category = getAQICategory(aqi);
                            return `AQI: ${aqi} (${category.label})`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { 
                        display: true, 
                        text: 'AQI Value',
                        font: { size: 13, weight: 'bold' }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        maxTicksLimit: days <= 31 ? 15 : 20
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

/**
 * Create/Update PM Chart
 */
function updatePMChart() {
    const select = document.getElementById('pmTimeRange');
    const days = parseInt(select.value);
    
    let data;
    if (days === 7) {
        data = pmDataStorage.week;
    } else if (days === 30) {
        data = pmDataStorage.month;
    } else if (days === 365) {
        data = pmDataStorage.year;
    } else {
        data = downsampleData(pmDataStorage.fiveYears, 300);
    }
    
    const ctx = document.getElementById('pmChart').getContext('2d');
    
    if (pmChart) {
        pmChart.destroy();
    }
    
    pmChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(d => formatDateLabel(d.date, days)),
            datasets: [
                {
                    label: 'PM2.5',
                    data: data.map(d => d.pm25),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: days <= 31 ? 4 : (days <= 365 ? 2 : 0),
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'PM10',
                    data: data.map(d => d.pm10),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: days <= 31 ? 4 : (days <= 365 ? 2 : 0),
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: { 
                    display: true, 
                    position: 'top',
                    labels: {
                        font: { size: 13, weight: '600' },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} µg/m³`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { 
                        display: true, 
                        text: 'Concentration (µg/m³)',
                        font: { size: 13, weight: 'bold' }
                    },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        maxRotation: 45,
                        minRotation: 45,
                        maxTicksLimit: days <= 31 ? 15 : 20
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

/**
 * Create Pollutant Composition Chart
 */
function createPollutantChart(data) {
    const ctx = document.getElementById('pollutantChart').getContext('2d');
    
    if (pollutantChart) {
        pollutantChart.destroy();
    }
    
    pollutantChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'NO₂', 'SO₂', 'CO', 'O₃'],
            datasets: [{
                label: 'Concentration',
                data: [data.pm25, data.pm10, data.no2, data.so2, data.co * 10, data.o3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 159, 64, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let value = context.parsed.y;
                            let unit = 'µg/m³';
                            if (context.label === 'CO') {
                                value = value / 10;
                                unit = 'mg/m³';
                            }
                            return `${context.label}: ${value.toFixed(1)} ${unit}`;
                        }
                    }
                }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Concentration (µg/m³)',
                        font: { size: 13, weight: 'bold' }
                    }
                }
            }
        }
    });
}

/**
 * Display current air quality data
 */
function displayData(data) {
    const category = getAQICategory(data.aqi);
    
    document.getElementById('aqiValue').textContent = data.aqi;
    document.getElementById('aqiLabel').textContent = category.label;
    document.getElementById('aqiHero').style.background = `linear-gradient(135deg, ${category.color}, ${adjustColor(category.color, -30)})`;
    
    const pollutants = [
        { name: 'PM2.5', value: data.pm25, unit: 'µg/m³' },
        { name: 'PM10', value: data.pm10, unit: 'µg/m³' },
        { name: 'NO₂', value: data.no2, unit: 'µg/m³' },
        { name: 'SO₂', value: data.so2, unit: 'µg/m³' },
        { name: 'CO', value: data.co, unit: 'mg/m³' },
        { name: 'O₃', value: data.o3, unit: 'µg/m³' }
    ];
    
    document.getElementById('pollutantGrid').innerHTML = pollutants.map(p => `
        <div class="pollutant-item">
            <div class="pollutant-name">${p.name}</div>
            <div class="pollutant-value">${Number(p.value).toFixed(1)}</div>
            <div class="pollutant-unit">${p.unit}</div>
        </div>
    `).join('');
}

/**
 * Display NGOs for the state
 */
function displayNGOs(stateName) {
    const ngos = STATE_NGOS[stateName] || STATE_NGOS['Delhi'];
    
    document.getElementById('ngoList').innerHTML = ngos.map(ngo => `
        <a href="${ngo.url}" target="_blank" class="ngo-card">
            <div class="ngo-name">
                <i class="fas fa-hand-holding-heart"></i>
                ${ngo.name}
                <i class="fas fa-external-link-alt ngo-link-icon"></i>
            </div>
            <div class="ngo-desc">${ngo.desc}</div>
        </a>
    `).join('');
}

/**
 * Adjust color brightness
 */
function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/**
 * Initialize page
 */
async function initPage() {
    const urlParams = new URLSearchParams(window.location.search);
    currentStateName = urlParams.get('name') || 'Delhi';
    
    document.getElementById('stateName').textContent = currentStateName;
    
    // Generate current state data
    currentStateData = generateSimulatedData(currentStateName);
    
    // Generate all timeframe data
    generateAllTimeframeData();
    
    // Display current data
    displayData(currentStateData);
    
    // Create charts with default timeframe (1 week)
    updateAQIChart();
    updatePMChart();
    createPollutantChart(currentStateData);
    
    // Display NGOs
    displayNGOs(currentStateName);
    
    // Hide loading, show content
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('contentArea').style.display = 'block';
    document.getElementById('lastUpdate').textContent = `Last updated: ${new Date().toLocaleString('en-IN')}`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initPage);