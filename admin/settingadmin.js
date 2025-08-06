// Initialize AOS animation
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        window.onclick = function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target == modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }

        // Back to top button
        window.onscroll = function() {
            const backToTop = document.getElementById('backToTop');
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        };

        document.getElementById('backToTop').addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Color picker functionality
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // In a real app, you would update the theme color here
                console.log('Selected color:', this.style.backgroundColor);
            });
        });

        // Toggle switch functionality
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.addEventListener('change', function() {
                const settingId = this.id;
                const isChecked = this.checked;
                
                // In a real app, you would save this preference
                console.log(`Setting ${settingId} changed to ${isChecked}`);
            });
        });

        // Confirm user deletion
        function confirmDelete(username) {
            if (confirm(`Are you sure you want to delete ${username}? This action cannot be undone.`)) {
                // In a real app, you would delete the user here
                console.log(`User ${username} deleted`);
                alert(`${username} has been deleted successfully.`);
            }
        }

        // Dark mode toggle
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'btn btn-aai-outline ms-2';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        darkModeToggle.style.marginLeft = '10px';
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        document.querySelector('.header-actions').appendChild(darkModeToggle);

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i> Light Mode' : 
                '<i class="fas fa-moon"></i> Dark Mode';
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', isDark);
        }

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        }

        // Add dark mode styles
        const style = document.createElement('style');
        style.textContent = `
            .dark-mode {
                background-color: #121212;
                color: #e0e0e0;
            }
            .dark-mode .main-content {
                background-color: #1e1e1e;
            }
            .dark-mode .settings-card,
            .dark-mode .admin-table,
            .dark-mode .header {
                background-color: #2d2d2d;
                color: #e0e0e0;
            }
            .dark-mode .settings-card h3,
            .dark-mode .settings-section h4,
            .dark-mode .settings-row .label h5 {
                color: #e0e0e0;
            }
            .dark-mode .search-bar {
                background-color: #2d2d2d;
                border-color: #444;
            }
            .dark-mode .search-bar input {
                color: #e0e0e0;
            }
            .dark-mode .admin-table {
                color: #e0e0e0;
            }
            .dark-mode .admin-table th {
                color: white;
            }
            .dark-mode .admin-table td {
                border-bottom-color: #444;
            }
            .dark-mode .modal-content {
                background-color: #2d2d2d;
                color: #e0e0e0;
            }
            .dark-mode .form-control {
                background-color: #3d3d3d;
                border-color: #444;
                color: #e0e0e0;
            }
            .dark-mode .text-muted {
                color: #aaa !important;
            }
        `;
        document.head.appendChild(style);
  