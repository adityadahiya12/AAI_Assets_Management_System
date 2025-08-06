        // Initialize AOS animation
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        // Switch between access control tabs
        function switchTab(tabId) {
            // Hide all tab contents
            document.querySelectorAll('.access-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all tabs
            document.querySelectorAll('.access-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
           
            
            // Activate selected tab
            document.getElementById(tabId).classList.add('active');
            event.currentTarget.classList.add('active');
        }

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Initialize charts
        document.addEventListener('DOMContentLoaded', function() {
            // Threat Activity Chart (example)
            const threatCtx = document.createElement('canvas');
            threatCtx.id = 'threatActivityChart';
            document.querySelector('.threat-map-container').appendChild(threatCtx);
            
            const threatChart = new Chart(threatCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Critical Threats',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(217, 83, 79, 0.2)',
                        borderColor: 'rgba(217, 83, 79, 1)',
                        borderWidth: 2,
                        tension: 0.4
                    }, {
                        label: 'High Severity',
                        data: [5, 10, 6, 8, 4, 7],
                        backgroundColor: 'rgba(240, 173, 78, 0.2)',
                        borderColor: 'rgba(240, 173, 78, 1)',
                        borderWidth: 2,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Threat Activity Trend'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Security Events Doughnut Chart (example)
            const securityCtx = document.createElement('canvas');
            securityCtx.id = 'securityEventsChart';
            document.querySelector('.threat-map-container').appendChild(securityCtx);
            
            const securityChart = new Chart(securityCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Critical', 'High', 'Medium', 'Low'],
                    datasets: [{
                        data: [12, 28, 42, 156],
                        backgroundColor: [
                            'rgba(217, 83, 79, 0.7)',
                            'rgba(240, 173, 78, 0.7)',
                            'rgba(91, 192, 222, 0.7)',
                            'rgba(92, 184, 92, 0.7)'
                        ],
                        borderColor: [
                            'rgba(217, 83, 79, 1)',
                            'rgba(240, 173, 78, 1)',
                            'rgba(91, 192, 222, 1)',
                            'rgba(92, 184, 92, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                        title: {
                            display: true,
                            text: 'Security Events Distribution'
                        }
                    }
                }
            });
        });

        // Simulate real-time threat updates
        setInterval(function() {
            const threatCards = document.querySelectorAll('.security-card');
            threatCards.forEach(card => {
                const valueElement = card.querySelector('h3');
                const currentValue = parseInt(valueElement.textContent);
                const change = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
                const newValue = Math.max(0, currentValue + change);
                valueElement.textContent = newValue;
                
                // Update trend indicator
                const trendElement = card.querySelector('.trend');
                if (change > 0) {
                    trendElement.classList.add('up');
                    trendElement.classList.remove('down');
                    trendElement.innerHTML = `<i class="fas fa-arrow-up"></i> ${change} from last update`;
                } else if (change < 0) {
                    trendElement.classList.add('down');
                    trendElement.classList.remove('up');
                    trendElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${Math.abs(change)} from last update`;
                } else {
                    trendElement.classList.remove('up', 'down');
                    trendElement.innerHTML = `<i class="fas fa-equals"></i> No change`;
                }
            });
            
            // Add a random new threat to the activity log
            if (Math.random() > 0.7) { // 30% chance of new threat
                const threats = [
                    {type: 'Brute force attempt', severity: 'critical', source: 'External'},
                    {type: 'Suspicious file download', severity: 'high', source: 'Internal'},
                    {type: 'Unauthorized API call', severity: 'medium', source: 'External'},
                    {type: 'Policy violation', severity: 'low', source: 'Internal'}
                ];
                
                const threat = threats[Math.floor(Math.random() * threats.length)];
                const now = new Date();
                const timeString = `Today, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
                
                const tableBody = document.querySelector('.threat-table tbody');
                const newRow = document.createElement('tr');
                
                newRow.innerHTML = `
                    <td>${timeString}</td>
                    <td>${threat.type}</td>
                    <td>${threat.source} (${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)})</td>
                    <td><span class="threat-severity severity-${threat.severity}">${threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}</span></td>
                    <td>New</td>
                `;
                
                tableBody.prepend(newRow);
                
                // Keep only the last 10 rows
                while (tableBody.children.length > 10) {
                    tableBody.removeChild(tableBody.lastChild);
                }
            }
        }, 5000); // Update every 5 seconds