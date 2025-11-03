// Login functionality for Urban AirWatch Platform

/**
 * Handle NGO login form submission
 */
function handleNGOLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const orgName = formData.get('org-name');
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember');
    
    console.log('NGO Login Attempt:', {
        orgName,
        email,
        remember: !!remember
    });
    
    // Simulate login process
    showLoadingState(event.target);
    
    setTimeout(() => {
        // In a real application, this would make an API call
        // For demo purposes, we'll just redirect
        alert(`Welcome, ${orgName}!\n\nLogin successful. Redirecting to dashboard...`);
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

/**
 * Handle Government login form submission
 */
function handleGovtLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const deptName = formData.get('dept-name');
    const govtId = formData.get('govt-id');
    const email = formData.get('govt-email');
    const password = formData.get('govt-password');
    const remember = formData.get('remember');
    
    console.log('Government Login Attempt:', {
        department: deptName,
        officialId: govtId,
        email,
        remember: !!remember
    });
    
    // Simulate login process
    showLoadingState(event.target);
    
    setTimeout(() => {
        // In a real application, this would make an API call
        // For demo purposes, we'll just redirect
        const deptNames = {
            'cpcb': 'Central Pollution Control Board',
            'spcb': 'State Pollution Control Board',
            'moef': 'Ministry of Environment',
            'niti': 'NITI Aayog',
            'ncap': 'National Clean Air Programme'
        };
        
        alert(`Welcome, ${deptNames[deptName]}!\n\nSecure login successful. Redirecting to dashboard...`);
        window.location.href = 'index.html';
    }, 1500);
    
    return false;
}

/**
 * Show loading state on form submission
 */
function showLoadingState(form) {
    const button = form.querySelector('button[type="submit"]');
    if (button) {
        button.disabled = true;
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
        
        // Store original HTML for potential error handling
        button.dataset.originalHtml = originalHTML;
    }
}

/**
 * Reset form loading state
 */
function resetLoadingState(form) {
    const button = form.querySelector('button[type="submit"]');
    if (button && button.dataset.originalHtml) {
        button.disabled = false;
        button.innerHTML = button.dataset.originalHtml;
    }
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate government email domain
 */
function validateGovtEmail(email) {
    const govtDomains = ['.gov.in', '.nic.in', '.gov'];
    return govtDomains.some(domain => email.toLowerCase().endsWith(domain));
}

/**
 * Handle forgot password
 */
function handleForgotPassword(event, type) {
    event.preventDefault();
    alert(`Password reset link will be sent to your registered ${type} email address.`);
}