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

        // Dynamic form fields for audit scope
        document.getElementById('auditScope').addEventListener('change', function() {
            const departmentField = document.getElementById('departmentField');
            if (this.value === 'department') {
                departmentField.style.display = 'block';
            } else {
                departmentField.style.display = 'none';
            }
        });

        // Real-time search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            // In a real app, you would make an API call here
            console.log('Searching for:', searchTerm);
            // For demo purposes, we'll just filter the table
            filterTable(searchTerm);
        });

        function filterTable(searchTerm) {
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }

        // Asset status chart
        function renderAssetStatusChart() {
            const ctx = document.createElement('canvas');
            ctx.id = 'assetStatusChart';
            document.querySelector('.stats-cards').after(ctx);
            
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['In Use', 'In Stock', 'Under Maintenance', 'Lost/Damaged'],
                    datasets: [{
                        data: [892, 288, 56, 12],
                        backgroundColor: [
                            'rgba(26, 62, 114, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(246, 178, 107, 0.8)',
                            'rgba(217, 83, 79, 0.8)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Asset Status Distribution',
                            font: {
                                size: 16,
                                family: 'Poppins'
                            }
                        }
                    },
                    cutout: '70%'
                }
            });
        }

        // Asset value over time chart
        function renderAssetValueChart() {
            const ctx = document.createElement('canvas');
            ctx.id = 'assetValueChart';
            document.querySelector('.asset-table-container').before(ctx);
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Total Asset Value ($)',
                        data: [125000, 135000, 142000, 148000, 155000, 163000, 170000],
                        fill: true,
                        backgroundColor: 'rgba(26, 62, 114, 0.1)',
                        borderColor: 'rgba(26, 62, 114, 1)',
                        tension: 0.3,
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Asset Value Over Time',
                            font: {
                                size: 16,
                                family: 'Poppins'
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }

        // Initialize charts when page loads
        document.addEventListener('DOMContentLoaded', function() {
            renderAssetStatusChart();
            renderAssetValueChart();
            
            // Simulate real-time updates
            setInterval(updateStats, 5000);
            
            // Initialize tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });

        // Simulate real-time stats updates
        function updateStats() {
            const stats = [
                { id: 'totalAssets', min: 1240, max: 1260 },
                { id: 'assignedAssets', min: 890, max: 900 },
                { id: 'maintenanceAssets', min: 50, max: 60 },
                { id: 'lostAssets', min: 10, max: 15 }
            ];
            
            stats.forEach(stat => {
                const element = document.querySelector(`.stat-card:nth-child(${stats.indexOf(stat) + 1}) h3`);
                if (element) {
                    const currentValue = parseInt(element.textContent.replace(/,/g, ''));
                    const newValue = currentValue + Math.floor(Math.random() * 3) - 1; // Random small change
                    const clampedValue = Math.max(stat.min, Math.min(stat.max, newValue));
                    element.textContent = clampedValue.toLocaleString();
                    
                    // Add animation effect
                    element.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 300);
                }
            });
            
            // Simulate new audit log entry
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            
            const logTitles = [
                'New Monitor Request',
                'Software License Renewal',
                'Printer Maintenance',
                'Keyboard Replacement'
            ];
            
            const logDescriptions = [
                'Request for a new 27" monitor for design team',
                'Adobe Creative Cloud license needs renewal',
                'Printer in marketing department needs servicing',
                'Water spill damaged keyboard in accounting'
            ];
            
            const randomIndex = Math.floor(Math.random() * logTitles.length);
            
            const newLog = document.createElement('div');
            newLog.className = 'audit-log-item';
            newLog.innerHTML = `
                <div class="audit-log-icon">
                    <i class="fas fa-random"></i>
                </div>
                <div class="audit-log-content">
                    <div class="audit-log-title">${logTitles[randomIndex]}</div>
                    <div class="audit-log-desc">${logDescriptions[randomIndex]}</div>
                    <div class="audit-log-time">${timeString}</div>
                </div>
                <div class="action-btns">
                    <button class="btn btn-success btn-sm"><i class="fas fa-check"></i> Approve</button>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-times"></i> Reject</button>
                </div>
            `;
            
            const auditLog = document.querySelector('.audit-log');
            if (auditLog) {
                auditLog.insertBefore(newLog, auditLog.firstChild.nextSibling);
                
                // Flash animation for new entry
                newLog.style.backgroundColor = 'rgba(26, 62, 114, 0.05)';
                setTimeout(() => {
                    newLog.style.backgroundColor = '';
                }, 1000);
            }
        }

        // Export functionality
        document.querySelector('.btn-outline').addEventListener('click', function() {
            // In a real app, this would generate a CSV or PDF
            alert('Export functionality would generate a report here');
            
            // For demo, we'll create a simple CSV
            const rows = document.querySelectorAll('tbody tr');
            let csvContent = "data:text/csv;charset=utf-8,";
            
            // Add headers
            const headers = [];
            document.querySelectorAll('thead th').forEach(th => {
                if (th.textContent !== 'Actions') {
                    headers.push(th.textContent);
                }
            });
            csvContent += headers.join(',') + "\r\n";
            
            // Add data rows
            rows.forEach(row => {
                if (row.style.display !== 'none') {
                    const cells = [];
                    row.querySelectorAll('td').forEach((td, index) => {
                        if (index < 5) { // Skip actions column
                            cells.push(td.textContent.replace(',', ''));
                        }
                    });
                    csvContent += cells.join(',') + "\r\n";
                }
            });
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "assets_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Bulk assign with employee search
        const employeeSearch = new Awesomplete(document.getElementById('bulkEmployeeName'), {
            list: [
                "Rajesh Kumar (IT)",
                "Priya Sharma (Marketing)",
                "Ankit Verma (Finance)",
                "Sita Devi (HR)",
                "Rahul Singh (Support)",
                "Amit Patel (Sales)",
                "Neha Gupta (Operations)",
                "Vikram Joshi (Engineering)"
            ],
            minChars: 1,
            autoFirst: true
        });

        // Asset QR code generator (simulated)
        document.querySelectorAll('.action-btn.assign').forEach(btn => {
            btn.addEventListener('click', function() {
                const assetId = this.closest('tr').querySelector('td:first-child').textContent;
                document.getElementById('assetId').value = assetId;
                
                // In a real app, this would generate a QR code for the asset
                console.log(`QR code generated for asset ${assetId}`);
            });
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
            .dark-mode .card,
            .dark-mode .asset-table-container,
            .dark-mode .audit-log,
            .dark-mode .quick-action-card,
            .dark-mode .header {
                background-color: #2d2d2d;
                color: #e0e0e0;
            }
            .dark-mode .stat-info h3,
            .dark-mode .stat-info p,
            .dark-mode .table-title,
            .dark-mode .audit-log-title,
            .dark-mode .quick-action-card h4 {
                color: #e0e0e0;
            }
            .dark-mode .search-bar {
                background-color: #2d2d2d;
                border-color: #444;
            }
            .dark-mode .search-bar input {
                color: #e0e0e0;
            }
            .dark-mode table {
                color: #e0e0e0;
            }
            .dark-mode th {
                color: #4b8bbe;
            }
            .dark-mode td {
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
        `;
        document.head.appendChild(style);