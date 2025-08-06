 // Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Initialize DataTable
        $(document).ready(function() {
            $('#ticketsTable').DataTable({
                responsive: true,
                order: [[0, 'desc']],
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search tickets...",
                }
            });
        });
        
        // File upload handling for admin
        const adminFileUploadBox = document.getElementById('adminFileUploadBox');
        const adminFileInput = document.getElementById('adminFileInput');
        const adminFilePreview = document.getElementById('adminFilePreview');
        
        adminFileUploadBox.addEventListener('click', () => {
            adminFileInput.click();
        });
        
        adminFileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                adminFilePreview.style.display = 'block';
                adminFilePreview.innerHTML = '';
                
                for (let i = 0; i < e.target.files.length; i++) {
                    const file = e.target.files[i];
                    const fileElement = document.createElement('div');
                    fileElement.className = 'd-flex justify-content-between align-items-center mb-2';
                    fileElement.innerHTML = `
                        <div>
                            <i class="fas fa-file me-2"></i>
                            ${file.name}
                        </div>
                        <button class="btn btn-sm btn-outline-danger">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    adminFilePreview.appendChild(fileElement);
                }
            }
        });
        
        // Form submission for admin ticket creation
        document.getElementById('submitTicketBtn').addEventListener('click', function() {
            // Validate form
            const form = document.getElementById('adminTicketForm');
            if (form.checkValidity()) {
                // Show success message
                alert('Ticket created successfully!');
                
                // Close modal
                const modal = bootstrap.Modal.getInstance(document.getElementById('createTicketModal'));
                modal.hide();
                
                // Reset form
                form.reset();
                adminFilePreview.style.display = 'none';
                adminFilePreview.innerHTML = '';
            } else {
                form.reportValidity();
            }
        });
        
        // Filter functionality
        document.getElementById('resetFilters').addEventListener('click', function() {
            document.getElementById('statusFilter').value = '';
            document.getElementById('priorityFilter').value = '';
            document.getElementById('departmentFilter').value = '';
            document.getElementById('technicianFilter').value = '';
            document.getElementById('dateFrom').value = '';
            document.getElementById('dateTo').value = '';
            
            // In a real application, you would trigger a table refresh here
            alert('Filters have been reset');
        });
        
        // Initialize charts
        const ticketVolumeCtx = document.getElementById('ticketVolumeChart').getContext('2d');
        const ticketVolumeChart = new Chart(ticketVolumeCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [{
                    label: 'Tickets Created',
                    data: [120, 190, 170, 210, 240, 230, 260],
                    backgroundColor: 'rgba(26, 62, 114, 0.7)',
                    borderColor: 'rgba(26, 62, 114, 1)',
                    borderWidth: 1
                }, {
                    label: 'Tickets Resolved',
                    data: [110, 180, 160, 200, 220, 210, 240],
                    backgroundColor: 'rgba(75, 139, 190, 0.7)',
                    borderColor: 'rgba(75, 139, 190, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        const resolutionCtx = document.getElementById('resolutionChart').getContext('2d');
        const resolutionChart = new Chart(resolutionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Within SLA', 'Near SLA', 'Over SLA'],
                datasets: [{
                    data: [85, 10, 5],
                    backgroundColor: [
                        'rgba(92, 184, 92, 0.7)',
                        'rgba(246, 178, 107, 0.7)',
                        'rgba(217, 83, 79, 0.7)'
                    ],
                    borderColor: [
                        'rgba(92, 184, 92, 1)',
                        'rgba(246, 178, 107, 1)',
                        'rgba(217, 83, 79, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });