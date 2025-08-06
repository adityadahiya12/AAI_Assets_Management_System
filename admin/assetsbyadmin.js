// Sidebar Toggle
        document.querySelector('.sidebar-toggle').addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('collapsed');
            document.querySelector('.main-content').classList.toggle('expanded');
            document.querySelector('.header').classList.toggle('expanded');
        });
        
        // Initialize Asset Status Chart with ApexCharts
        var options = {
            series: [892, 288, 56, 12],
            chart: {
                type: 'donut',
                height: 250
            },
            labels: ['In Use', 'Available', 'Maintenance', 'Lost/Damaged'],
            colors: ['#4361ee', '#4cc9f0', '#f8961e', '#ef233c'],
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%'
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };
        
        var chart = new ApexCharts(document.querySelector("#assetStatusChart"), options);
        chart.render();
        
        // Dark Mode Toggle
        document.getElementById('darkModeToggle').addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                this.innerHTML = '<i class="fas fa-sun"></i>';
                chart.updateOptions({
                    theme: {
                        mode: 'dark'
                    }
                });
            } else {
                localStorage.setItem('darkMode', 'disabled');
                this.innerHTML = '<i class="fas fa-moon"></i>';
                chart.updateOptions({
                    theme: {
                        mode: 'light'
                    }
                });
            }
        });
        
        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            chart.updateOptions({
                theme: {
                    mode: 'dark'
                }
            });
        }
        
        // Simulate real-time updates
        function updateStats() {
            const stats = [
                { id: 0, min: 1240, max: 1260 },
                { id: 1, min: 890, max: 900 },
                { id: 2, min: 50, max: 60 },
                { id: 3, min: 10, max: 15 }
            ];
            
            stats.forEach(stat => {
                const element = document.querySelectorAll('.stat-card .count')[stat.id];
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
            
            // Update chart data
            chart.updateSeries([
                parseInt(document.querySelectorAll('.stat-card .count')[1].textContent.replace(/,/g, '')),
                parseInt(document.querySelectorAll('.stat-card .count')[0].textContent.replace(/,/g, '')) - 
                parseInt(document.querySelectorAll('.stat-card .count')[1].textContent.replace(/,/g, '')) - 
                parseInt(document.querySelectorAll('.stat-card .count')[2].textContent.replace(/,/g, '')) - 
                parseInt(document.querySelectorAll('.stat-card .count')[3].textContent.replace(/,/g, '')),
                parseInt(document.querySelectorAll('.stat-card .count')[2].textContent.replace(/,/g, '')),
                parseInt(document.querySelectorAll('.stat-card .count')[3].textContent.replace(/,/g, ''))
            ]);
        }
        
        // Update stats every 5 seconds
        setInterval(updateStats, 5000);
        
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Calendar navigation (simplified for demo)
        document.querySelectorAll('.calendar-nav button').forEach(button => {
            button.addEventListener('click', function() {
                // In a real app, this would update the calendar view
                console.log('Calendar navigation clicked');
            });
        });
        
        // QR Scanner simulation
        document.querySelector('.qr-scanner-container').addEventListener('click', function() {
            alert('QR Scanner would activate the camera in a real application');
        });
        
        // Asset Map simulation
        document.querySelector('.asset-map').addEventListener('click', function() {
            alert('Asset Map would show a real map with asset locations in a real application');
        });