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

        // Real-time search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const logItems = document.querySelectorAll('.audit-log-item');
            
            logItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });

        // Export functionality
        document.querySelector('.btn-aai-outline').addEventListener('click', function() {
            // In a real app, this would generate a CSV or PDF
            alert('Export functionality would generate a report here');
            
            // For demo, we'll create a simple CSV
            const rows = document.querySelectorAll('.audit-log-item');
            let csvContent = "data:text/csv;charset=utf-8,";
            
            // Add headers
            csvContent += "Timestamp,Action,Description,User,Department,IP\r\n";
            
            // Add data rows
            rows.forEach(row => {
                if (row.style.display !== 'none') {
                    const time = row.querySelector('.audit-log-time').textContent.replace(',', '');
                    const title = row.querySelector('.audit-log-title').textContent.replace(',', '');
                    const desc = row.querySelector('.audit-log-desc').textContent.replace(',', '');
                    
                    const metaItems = row.querySelectorAll('.audit-log-meta-item');
                    let user = '', department = '', ip = '';
                    
                    metaItems.forEach(item => {
                        const text = item.textContent;
                        if (text.includes('User:')) user = text.replace('User:', '').trim();
                        if (text.includes('Department:')) department = text.replace('Department:', '').trim();
                        if (text.includes('IP:')) ip = text.replace('IP:', '').trim();
                    });
                    
                    csvContent += `"${time}","${title}","${desc}","${user}","${department}","${ip}"\r\n`;
                }
            });
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "audit_logs_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

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
            .dark-mode .audit-log-container,
            .dark-mode .audit-filters,
            .dark-mode .header {
                background-color: #2d2d2d;
                color: #e0e0e0;
            }
            .dark-mode .audit-log-title,
            .dark-mode .audit-log-content .audit-log-title {
                color: #e0e0e0;
            }
            .dark-mode .search-bar {
                background-color: #2d2d2d;
                border-color: #444;
            }
            .dark-mode .search-bar input {
                color: #e0e0e0;
            }
            .dark-mode .filter-control {
                background-color: #3d3d3d;
                border-color: #444;
                color: #e0e0e0;
            }
            .dark-mode .audit-log-item {
                border-bottom-color: #444;
            }
            .dark-mode .page-link {
                background-color: #2d2d2d;
                color: #e0e0e0;
                border-color: #444;
            }
            .dark-mode .page-link:hover {
                background-color: var(--aai-primary);
                color: white;
            }
        `;
        document.head.appendChild(style);