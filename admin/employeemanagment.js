// Initialize AOS animation
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
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

        // Toggle employee details
        function toggleDetails(employeeId) {
            const detailsRow = document.getElementById(`details-${employeeId}`);
            detailsRow.classList.toggle('d-none');
            
            // Scroll to the details if opening
            if (!detailsRow.classList.contains('d-none')) {
                detailsRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        // Edit employee function
        function editEmployee(employeeId) {
            // In a real application, this would fetch employee data from an API
            console.log(`Editing employee with ID: ${employeeId}`);
            
            // For demo purposes, we'll just populate with sample data
            if (employeeId === 'AAI1001') {
                document.getElementById('editFirstName').value = 'Riya';
                document.getElementById('editLastName').value = 'Singh';
                document.getElementById('editEmployeeEmail').value = 'riya@aai.gov.in';
                document.getElementById('editEmployeeDepartment').value = 'operations';
                document.getElementById('editEmployeeRole').value = 'supervisor';
                document.getElementById('editEmployeeStatus').value = 'active';
                document.getElementById('editEmployeeId').value = 'AAI1001';
                document.getElementById('editJoinDate').value = '2024-01-15';
                document.getElementById('editEmployeeNotes').value = 'Operations team supervisor with 5 years experience.';
            } else if (employeeId === 'AAI1002') {
                document.getElementById('editFirstName').value = 'Amit';
                document.getElementById('editLastName').value = 'Kumar';
                document.getElementById('editEmployeeEmail').value = 'amit@aai.gov.in';
                document.getElementById('editEmployeeDepartment').value = 'engineering';
                document.getElementById('editEmployeeRole').value = 'technician';
                document.getElementById('editEmployeeStatus').value = 'active';
                document.getElementById('editEmployeeId').value = 'AAI1002';
                document.getElementById('editJoinDate').value = '2024-02-10';
                document.getElementById('editEmployeeNotes').value = 'Senior technician in engineering division.';
            } else if (employeeId === 'AAI1003') {
                document.getElementById('editFirstName').value = 'Priya';
                document.getElementById('editLastName').value = 'Sharma';
                document.getElementById('editEmployeeEmail').value = 'priya@aai.gov.in';
                document.getElementById('editEmployeeDepartment').value = 'it';
                document.getElementById('editEmployeeRole').value = 'admin';
                document.getElementById('editEmployeeStatus').value = 'active';
                document.getElementById('editEmployeeId').value = 'AAI1003';
                document.getElementById('editJoinDate').value = '2024-03-01';
                document.getElementById('editEmployeeNotes').value = 'IT administrator with full system access.';
            } else if (employeeId === 'AAI1004') {
                document.getElementById('editFirstName').value = 'Raj';
                document.getElementById('editLastName').value = 'Jain';
                document.getElementById('editEmployeeEmail').value = 'raj@aai.gov.in';
                document.getElementById('editEmployeeDepartment').value = 'commercial';
                document.getElementById('editEmployeeRole').value = 'handler';
                document.getElementById('editEmployeeStatus').value = 'suspended';
                document.getElementById('editEmployeeId').value = 'AAI1004';
                document.getElementById('editJoinDate').value = '2024-01-20';
                document.getElementById('editEmployeeNotes').value = 'Account suspended pending investigation.';
            }
        }

        // Reactivate employee function
        function reactivateEmployee(employeeId) {
            if (confirm(`Are you sure you want to reactivate employee ${employeeId}?`)) {
                // In a real application, this would call an API to update the status
                const statusBadge = document.querySelector(`tr:has(td:contains(${employeeId})) .badge-suspended`);
                if (statusBadge) {
                    statusBadge.classList.remove('badge-suspended');
                    statusBadge.classList.add('badge-active');
                    statusBadge.textContent = 'Active';
                    
                    // Change the reactivate button to view button
                    const reactivateBtn = document.querySelector(`tr:has(td:contains(${employeeId})) .action-btn.reactivate`);
                    if (reactivateBtn) {
                        reactivateBtn.classList.remove('reactivate');
                        reactivateBtn.classList.add('view');
                        reactivateBtn.innerHTML = '<i class="fas fa-eye"></i> View';
                        reactivateBtn.setAttribute('onclick', `toggleDetails('${employeeId}')`);
                    }
                    
                    // Show success message
                    alert(`Employee ${employeeId} has been reactivated successfully.`);
                }
            }
        }

        // Form submission handlers
        document.getElementById('addEmployeeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would submit to an API
            // For demo, we'll just show a success message
            const employeeId = document.getElementById('employeeId').value;
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            
            alert(`New employee ${firstName} ${lastName} (${employeeId}) added successfully!`);
            
            // Reset form and close modal
            this.reset();
            bootstrap.Modal.getInstance(document.getElementById('addEmployeeModal')).hide();
        });

        document.getElementById('editEmployeeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would submit to an API
            // For demo, we'll just show a success message
            const employeeId = document.getElementById('editEmployeeId').value;
            const firstName = document.getElementById('editFirstName').value;
            const lastName = document.getElementById('editLastName').value;
            
            alert(`Employee ${firstName} ${lastName} (${employeeId}) details updated successfully!`);
            
            // Close modal
            bootstrap.Modal.getInstance(document.getElementById('editEmployeeModal')).hide();
        });

        // Filter functionality
        document.getElementById('searchInput').addEventListener('input', function() {
            filterEmployees();
        });

        // Department filter
        document.getElementById('departmentFilter').addEventListener('change', function() {
            filterEmployees();
        });

        // Role filter
        document.getElementById('roleFilter').addEventListener('change', function() {
            filterEmployees();
        });

        // Status filter
        document.getElementById('statusFilter').addEventListener('change', function() {
            filterEmployees();
        });

        // Apply filters button
        document.getElementById('applyFilters').addEventListener('click', function() {
            filterEmployees();
        });

        // Combined filter function
        function filterEmployees() {
            const department = document.getElementById('departmentFilter').value.toLowerCase();
            const role = document.getElementById('roleFilter').value.toLowerCase();
            const status = document.getElementById('statusFilter').value.toLowerCase();
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const joinDateFrom = document.getElementById('joinDateFrom').value;
            const joinDateTo = document.getElementById('joinDateTo').value;
            const location = document.getElementById('locationFilter').value.toLowerCase();
            
            const rows = document.querySelectorAll('.employee-table tbody tr:not([id^="details-"])');
            
            rows.forEach(row => {
                const rowDepartment = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                const rowRole = row.querySelector('td:nth-child(4) span').textContent.toLowerCase();
                const rowStatus = row.querySelector('td:nth-child(6) span').textContent.toLowerCase();
                const rowText = row.textContent.toLowerCase();
                const rowId = row.querySelector('td:first-child').textContent.trim();
                
                const departmentMatch = department === '' || rowDepartment.includes(department);
                const roleMatch = role === '' || rowRole.includes(role);
                const statusMatch = status === '' || rowStatus.includes(status);
                const searchMatch = searchTerm === '' || rowText.includes(searchTerm);
                // Note: Location and date filtering would require additional data attributes in a real app
                
                if (departmentMatch && roleMatch && statusMatch && searchMatch) {
                    row.style.display = '';
                    // Show the details row if it's currently visible
                    const detailsRow = document.getElementById(`details-${rowId}`);
                    if (detailsRow && !detailsRow.classList.contains('d-none')) {
                        detailsRow.style.display = '';
                    }
                } else {
                    row.style.display = 'none';
                    // Hide the details row if it exists
                    const detailsRow = document.getElementById(`details-${rowId}`);
                    if (detailsRow) {
                        detailsRow.style.display = 'none';
                    }
                }
            });
            
            // Update the count of visible employees
            const visibleCount = document.querySelectorAll('.employee-table tbody tr:not([id^="details-"]):not([style*="display: none"])').length;
            document.querySelector('.employee-title').innerHTML = `<i class="fas fa-users me-2"></i> Employee Directory (${visibleCount} employees)`;
        }

        // Export functionality
        document.querySelector('.btn-outline').addEventListener('click', function() {
            // In a real app, this would generate a CSV or PDF
            const rows = document.querySelectorAll('.employee-table tbody tr:not([id^="details-"])');
            let csvContent = "data:text/csv;charset=utf-8,";
            
            // Add headers
            csvContent += "Employee ID,Name,Department,Role,Email,Status\r\n";
            
            // Add data rows
            rows.forEach(row => {
                if (row.style.display !== 'none') {
                    const id = row.querySelector('td:nth-child(1)').textContent.trim();
                    const name = row.querySelector('td:nth-child(2) strong').textContent.trim();
                    const department = row.querySelector('td:nth-child(3)').textContent.trim();
                    const role = row.querySelector('td:nth-child(4) span').textContent.trim();
                    const email = row.querySelector('td:nth-child(5)').textContent.trim();
                    const status = row.querySelector('td:nth-child(6) span').textContent.trim();
                    
                    csvContent += `"${id}","${name}","${department}","${role}","${email}","${status}"\r\n`;
                }
            });
            
            // Create download link
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "employee_directory_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Refresh button functionality
        document.querySelector('.btn-outline:nth-of-type(2)').addEventListener('click', function() {
            // In a real app, this would refresh data from the server
            alert('Refreshing employee data...');
            // Reset filters
            document.getElementById('searchInput').value = '';
            document.getElementById('departmentFilter').value = '';
            document.getElementById('roleFilter').value = '';
            document.getElementById('statusFilter').value = '';
            document.getElementById('joinDateFrom').value = '';
            document.getElementById('joinDateTo').value = '';
            document.getElementById('locationFilter').value = '';
            
            // Show all rows
            const rows = document.querySelectorAll('.employee-table tbody tr');
            rows.forEach(row => {
                row.style.display = '';
            });
            
            // Update count
            document.querySelector('.employee-title').innerHTML = `<i class="fas fa-users me-2"></i> Employee Directory (${rows.length/2} employees)`;
        });