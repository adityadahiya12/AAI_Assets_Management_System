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
            
            // If opening view modal, populate with data from the clicked row
            if (modalId === 'viewVendorModal') {
                const row = event.target.closest('tr');
                if (row) {
                    const cells = row.querySelectorAll('td');
                    document.getElementById('viewVendorId').textContent = cells[0].textContent;
                    document.getElementById('viewVendorName').textContent = cells[1].textContent;
                    document.getElementById('viewVendorCategory').textContent = cells[2].textContent;
                    document.getElementById('viewVendorStatus').textContent = cells[3].textContent;
                    document.getElementById('viewVendorRating').innerHTML = cells[4].innerHTML;
                    document.getElementById('viewContractEnd').textContent = cells[5].textContent;
                }
            }
            
            // If opening edit modal, populate with data from the clicked row
            if (modalId === 'editVendorModal') {
                const row = event.target.closest('tr');
                if (row) {
                    const cells = row.querySelectorAll('td');
                    document.getElementById('editVendorId').value = cells[0].textContent;
                    document.getElementById('editVendorName').value = cells[1].textContent;
                    document.getElementById('editVendorCategory').value = cells[2].textContent.toLowerCase().replace(' ', '-');
                    document.getElementById('editVendorStatus').value = cells[3].textContent.toLowerCase();
                    
                    // Extract rating from stars (simplified for demo)
                    const stars = cells[4].querySelectorAll('.fa-star').length;
                    const halfStar = cells[4].querySelector('.fa-star-half-alt') ? 0.5 : 0;
                    document.getElementById('editVendorRating').value = stars + halfStar;
                }
            }
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

        // Real-time search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterVendorTable(searchTerm);
        });

        function filterVendorTable(searchTerm) {
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

        // Vendor performance chart
        function renderVendorPerformanceChart() {
            const ctx = document.createElement('canvas');
            ctx.id = 'vendorPerformanceChart';
            document.querySelector('.stats-cards').after(ctx);
            
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tech Solutions', 'Office Supplies', 'Global IT', 'Facility Maint', 'Security Sys'],
                    datasets: [{
                        label: 'On-Time Delivery %',
                        data: [94, 89, 97, 85, 76],
                        backgroundColor: 'rgba(26, 62, 114, 0.8)',
                        borderWidth: 0
                    }, {
                        label: 'Quality Rating (scaled)',
                        data: [96, 84, 98, 78, 82],
                        backgroundColor: 'rgba(75, 192, 192, 0.8)',
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Top Vendor Performance Metrics',
                            font: {
                                size: 16,
                                family: 'Poppins'
                            }
                        },
                        legend: {
                            position: 'bottom',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        // Contract renewal alerts
        function checkContractRenewals() {
            const today = new Date();
            const renewalRows = document.querySelectorAll('tbody tr');
            
            renewalRows.forEach(row => {
                const endDateCell = row.querySelector('td:nth-child(6)');
                if (endDateCell) {
                    const endDate = new Date(endDateCell.textContent);
                    const diffTime = endDate - today;
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    
                    if (diffDays <= 30 && diffDays > 0) {
                        // Add warning class for contracts expiring soon
                        endDateCell.classList.add('text-warning');
                        endDateCell.innerHTML += ' <i class="fas fa-exclamation-circle" title="Contract expiring soon"></i>';
                    } else if (diffDays <= 0) {
                        // Add danger class for expired contracts
                        endDateCell.classList.add('text-danger');
                        endDateCell.innerHTML += ' <i class="fas fa-exclamation-triangle" title="Contract expired"></i>';
                    }
                }
            });
        }

        // Confirm vendor deletion
        function confirmDelete(vendorId) {
            if (confirm(`Are you sure you want to delete vendor ${vendorId}? This action cannot be undone.`)) {
                // In a real app, this would make an API call to delete the vendor
                const row = event.target.closest('tr');
                if (row) {
                    row.style.opacity = '0.5';
                    setTimeout(() => {
                        row.remove();
                        // Show success notification
                        showNotification(`Vendor ${vendorId} deleted successfully`, 'success');
                    }, 500);
                }
            }
        }

        // Show notification
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
                <button class="notification-close" onclick="this.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }

        // Form submission handling
        document.getElementById('vendorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would submit to an API
            showNotification('Vendor added successfully', 'success');
            closeModal('addVendorModal');
            // Reset form
            this.reset();
        });

        document.getElementById('editVendorForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, this would submit to an API
            showNotification('Vendor updated successfully', 'success');
            closeModal('editVendorModal');
        });

        // Initialize features when page loads
        document.addEventListener('DOMContentLoaded', function() {
            renderVendorPerformanceChart();
            checkContractRenewals();
            
            // Initialize tooltips
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
            
            // Simulate real-time updates
            setInterval(updateVendorStats, 10000);
        });

        // Simulate real-time vendor stats updates
        function updateVendorStats() {
            const stats = [
                { id: 'activeVendors', min: 40, max: 45 },
                { id: 'activeContracts', min: 150, max: 160 },
                { id: 'pendingApprovals', min: 5, max: 10 },
                { id: 'avgRating', min: 4.5, max: 4.9 }
            ];
            
            stats.forEach(stat => {
                const element = document.querySelector(`.stat-card:nth-child(${stats.indexOf(stat) + 1}) h3`);
                if (element) {
                    const currentValue = parseFloat(element.textContent);
                    const newValue = currentValue + (Math.random() * 0.2 - 0.1); // Random small change
                    const clampedValue = Math.max(stat.min, Math.min(stat.max, newValue));
                    
                    // Format based on stat type
                    if (stat.id === 'avgRating') {
                        element.textContent = clampedValue.toFixed(1);
                    } else {
                        element.textContent = Math.round(clampedValue);
                    }
                    
                    // Add animation effect
                    element.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        }

        // Add notification styles
        const notificationStyles = document.createElement('style');
        notificationStyles.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 999;
                animation: slideIn 0.3s ease-out;
                border-left: 4px solid var(--aai-primary);
            }
            
            .notification-success {
                border-left-color: var(--aai-success);
            }
            
            .notification-error {
                border-left-color: var(--aai-danger);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--aai-secondary);
                cursor: pointer;
                margin-left: 15px;
            }
            
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .text-warning {
                color: var(--aai-accent);
            }
            
            .text-danger {
                color: var(--aai-danger);
            }
        `;
        document.head.appendChild(notificationStyles);
  