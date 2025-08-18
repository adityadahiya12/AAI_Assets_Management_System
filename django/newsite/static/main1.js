
        // Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });

        // Initialize DataTable
        $(document).ready(function() {
            $('#assetsTable').DataTable({
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search assets...",
                }
            });
            
            $('#usersTable').DataTable({
                responsive: true,
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search users...",
                }
            });
        });

        // Asset Status Chart
        const assetStatusCtx = document.getElementById('assetStatusChart').getContext('2d');
        const assetStatusChart = new Chart(assetStatusCtx, {
            type: 'bar',
            data: {
                labels: ['Active', 'In Maintenance', 'Retired', 'New'],
                datasets: [{
                    label: 'Asset Status',
                    data: [2145, 702, 183, 217],
                    backgroundColor: [
                        'rgba(75, 139, 190, 0.7)',
                        'rgba(246, 178, 107, 0.7)',
                        'rgba(108, 117, 125, 0.7)',
                        'rgba(92, 184, 92, 0.7)'
                    ],
                    borderColor: [
                        'rgba(75, 139, 190, 1)',
                        'rgba(246, 178, 107, 1)',
                        'rgba(108, 117, 125, 1)',
                        'rgba(92, 184, 92, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });

        // Asset Distribution Chart
        const assetDistributionCtx = document.getElementById('assetDistributionChart').getContext('2d');
        const assetDistributionChart = new Chart(assetDistributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['IT Equipment', 'Security Devices', 'Access Cards', 'Tools', 'Other'],
                datasets: [{
                    data: [45, 25, 15, 10, 5],
                    backgroundColor: [
                        'rgba(26, 62, 114, 0.8)',
                        'rgba(75, 139, 190, 0.8)',
                        'rgba(246, 178, 107, 0.8)',
                        'rgba(233, 242, 249, 0.8)',
                        'rgba(13, 31, 61, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });

        // Maintenance Cost Chart
        const maintenanceCostCtx = document.getElementById('maintenanceCostChart').getContext('2d');
        const maintenanceCostChart = new Chart(maintenanceCostCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Maintenance Cost (in ₹ lakhs)',
                    data: [12, 19, 15, 22, 18, 25],
                    backgroundColor: 'rgba(246, 178, 107, 0.2)',
                    borderColor: 'rgba(246, 178, 107, 1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Asset Utilization Chart
        const assetUtilizationCtx = document.getElementById('assetUtilizationChart').getContext('2d');
        const assetUtilizationChart = new Chart(assetUtilizationCtx, {
            type: 'bar',
            data: {
                labels: ['IT Equipment', 'Security', 'Facilities', 'Transport', 'Other'],
                datasets: [{
                    label: 'Utilization Rate (%)',
                    data: [85, 92, 78, 65, 55],
                    backgroundColor: 'rgba(75, 139, 190, 0.7)',
                    borderColor: 'rgba(75, 139, 190, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });

        // Back to top button
        window.addEventListener('scroll', function() {
            var backToTop = document.querySelector('.back-to-top');
            var navbar = document.querySelector('.navbar');
            
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
                navbar.classList.add('scrolled');
            } else {
                backToTop.style.display = 'none';
                navbar.classList.remove('scrolled');
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Modal form handling
        document.getElementById('saveAssetBtn').addEventListener('click', function() {
            // Validate and save asset
            alert('Asset saved successfully!');
                        $('#addAssetModal').modal('hide');
        });

        document.getElementById('updateAssetBtn').addEventListener('click', function() {
            // Validate and update asset
            alert('Asset updated successfully!');
            $('#editAssetModal').modal('hide');
        });

        document.getElementById('confirmRetireBtn').addEventListener('click', function() {
            // Validate and retire asset
            alert('Asset retired successfully!');
            $('#retireAssetModal').modal('hide');
        });

        document.getElementById('applyFilterBtn').addEventListener('click', function() {
            // Apply filters to the table
            alert('Filters applied successfully!');
            $('#filterAssetsModal').modal('hide');
        });

        document.getElementById('resetFilterBtn').addEventListener('click', function() {
            // Reset all filters
            document.getElementById('filterAssetsForm').reset();
        });

        document.getElementById('startUploadBtn').addEventListener('click', function() {
            // Simulate bulk upload process
            const progressBar = document.querySelector('#uploadProgress .progress-bar');
            progressBar.style.width = '0%';
            document.getElementById('uploadProgress').classList.remove('d-none');
            
            let progress = 0;
            const uploadInterval = setInterval(() => {
                progress += 10;
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(uploadInterval);
                    alert('Bulk upload completed successfully!');
                    $('#bulkUploadModal').modal('hide');
                }
            }, 300);
        });

        document.getElementById('addNewUserBtn').addEventListener('click', function() {
            alert('Redirecting to user creation form...');
            // In a real application, this would open a form to add a new user
        });

        document.getElementById('generateReportBtn').addEventListener('click', function() {
            // Generate report
            alert('Report generation started. You will receive an email when it\'s ready.');
            $('#generateReportModal').modal('hide');
        });

        // Search functionality for assets
        document.getElementById('assetSearchInput').addEventListener('input', function() {
            const searchValue = this.value.toLowerCase();
            const table = document.getElementById('assetsTable');
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const cells = row.getElementsByTagName('td');
                let shouldShow = false;
                
                for (let j = 0; j < cells.length; j++) {
                    if (cells[j].textContent.toLowerCase().indexOf(searchValue) > -1) {
                        shouldShow = true;
                        break;
                    }
                }
                
                row.style.display = shouldShow ? '' : 'none';
            }
        });

        // Filter functionality for assets
        document.getElementById('assetStatusFilter').addEventListener('change', function() {
            const filterValue = this.value;
            const table = document.getElementById('assetsTable');
            const rows = table.getElementsByTagName('tr');
            
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const statusCell = row.getElementsByTagName('td')[4]; // Status is the 5th column
                
                if (!statusCell) continue;
                
                const statusBadge = statusCell.querySelector('.badge-status');
                const statusText = statusBadge ? statusBadge.textContent.trim() : '';
                
                if (filterValue === '' || statusText === filterValue) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
