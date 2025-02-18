class TimeAndUserManager {
    constructor() {
        this.timeDisplay = document.getElementById('currentTime');
        this.userDisplay = document.getElementById('currentUser');
        this.currentUser = '@fardinkhannur';
        
        // Initialize display
        this.initializeDisplay();
        
        // Start time updates
        this.startTimeUpdate();
    }

    initializeDisplay() {
        // Set initial user
        this.updateUser(this.currentUser);
        
        // Set initial time
        this.updateTime();
    }

    updateTime() {
        const now = new Date();
        
        // Format the date and time according to UTC
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');

        // Create the formatted string: YYYY-MM-DD HH:MM:SS
        const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
        // Update the display
        if (this.timeDisplay) {
            this.timeDisplay.textContent = formattedTime;
        }
    }

    updateUser(username) {
        this.currentUser = username;
        if (this.userDisplay) {
            // Remove @ if it exists and add it back to ensure consistent formatting
            const formattedUsername = username.replace('@', '');
            this.userDisplay.textContent = `@${formattedUsername}`;
        }
    }

    startTimeUpdate() {
        // Update time every second
        this.updateTime(); // Initial update
        setInterval(() => this.updateTime(), 1000);
    }

    getCurrentUser() {
        return this.currentUser;
    }

    getCurrentTime() {
        return this.timeDisplay ? this.timeDisplay.textContent : '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const timeAndUserManager = new TimeAndUserManager();
    
    // Make the manager globally accessible if needed
    window.timeAndUserManager = timeAndUserManager;
});

// Add error handling for missing elements
function checkRequiredElements() {
    const required = ['currentTime', 'currentUser'];
    const missing = required.filter(id => !document.getElementById(id));
    
    if (missing.length > 0) {
        console.error(`Missing required elements: ${missing.join(', ')}`);
        return false;
    }
    return true;
}