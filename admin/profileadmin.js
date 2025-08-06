   // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Logout functionality
        document.getElementById('logoutButton').addEventListener('click', function() {
            // Show confirmation dialog
            if (confirm('Are you sure you want to logout?')) {
                // Perform logout action (redirect to login page)
                window.location.href = 'login.html';
            }
        });

        // Also handle logout from dropdown
        document.getElementById('logoutDropdown').addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                window.location.href = 'login.html';
            }
        });

        // Simulate profile data loading
        document.addEventListener('DOMContentLoaded', function() {
            // You would typically fetch this data from an API
            console.log('Profile page loaded');
            
            // Example of dynamic data update
            const lastLoginElement = document.querySelector('.detail-group:nth-child(3) p');
            const now = new Date();
            const options = { 
                weekday: 'long', 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            };
            lastLoginElement.textContent = `Today, ${now.toLocaleTimeString('en-US', options)} from 192.168.1.100`;
        });