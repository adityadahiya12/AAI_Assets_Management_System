// Initialize AOS animations
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            var navbar = document.querySelector('.navbar');
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Create flight path animation
        function createFlightPaths() {
            const flightPath = document.getElementById('flightPath');
            const planeCount = 15;
            
            for (let i = 0; i < planeCount; i++) {
                const plane = document.createElement('div');
                plane.className = 'plane';
                plane.style.top = Math.random() * 100 + '%';
                plane.style.left = Math.random() * 100 + '%';
                plane.style.animationDuration = (10 + Math.random() * 20) + 's';
                plane.style.animationDelay = (Math.random() * 10) + 's';
                flightPath.appendChild(plane);
            }
        }
        
        // Initialize airport network map
        function initAirportNetworkMap() {
            // Initialize the map centered on India
            const map = L.map('airport-network-map').setView([20.5937, 78.9629], 5);
            
            // Add OpenStreetMap tiles with a light theme
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            
            // International airports in India with coordinates and IATA codes
            const airports = {
                "DEL": { name: "Indira Gandhi International Airport", city: "Delhi", coords: [28.5562, 77.1000] },
                "BOM": { name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", coords: [19.0887, 72.8679] },
                "MAA": { name: "Chennai International Airport", city: "Chennai", coords: [12.9941, 80.1707] },
                "BLR": { name: "Kempegowda International Airport", city: "Bangalore", coords: [13.1986, 77.7066] },
                "HYD": { name: "Rajiv Gandhi International Airport", city: "Hyderabad", coords: [17.2403, 78.4294] },
                "CCU": { name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", coords: [22.6547, 88.4467] },
                "COK": { name: "Cochin International Airport", city: "Kochi", coords: [10.1520, 76.4019] },
                "GOI": { name: "Dabolim Airport", city: "Goa", coords: [15.3808, 73.8343] },
                "TRV": { name: "Trivandrum International Airport", city: "Thiruvananthapuram", coords: [8.4821, 76.9204] },
                "AMD": { name: "Sardar Vallabhbhai Patel International Airport", city: "Ahmedabad", coords: [23.0772, 72.6346] }
            };
            
            // Sample flight connections between airports
            const flightConnections = [
                { from: "DEL", to: "BOM", flights: ["AI101", "6E205", "UK911"] },
                { from: "DEL", to: "MAA", flights: ["AI502", "6E721", "SG301"] },
                { from: "DEL", to: "BLR", flights: ["AI503", "6E611", "UK809"] },
                { from: "DEL", to: "HYD", flights: ["AI504", "6E221", "SG801"] },
                { from: "DEL", to: "CCU", flights: ["AI505", "6E531", "UK501"] },
                { from: "BOM", to: "MAA", flights: ["AI506", "6E231", "I5161"] },
                { from: "BOM", to: "BLR", flights: ["AI507", "6E241", "I5171"] },
                { from: "BOM", to: "HYD", flights: ["AI508", "6E251", "I5181"] },
                { from: "BOM", to: "CCU", flights: ["AI509", "6E261", "I5191"] },
                { from: "MAA", to: "BLR", flights: ["AI510", "6E271", "I5201"] },
                { from: "MAA", to: "COK", flights: ["AI511", "6E281", "I5211"] },
                { from: "MAA", to: "TRV", flights: ["AI512", "6E291", "I5221"] },
                { from: "BLR", to: "HYD", flights: ["AI513", "6E301", "I5231"] },
                { from: "BLR", to: "GOI", flights: ["AI514", "6E311", "I5241"] },
                { from: "HYD", to: "AMD", flights: ["AI515", "6E321", "I5251"] }
            ];
            
            // Sample flight data for arrivals and departures
            const flightData = {
                "DEL": {
                    arrivals: [
                        { flight: "AI101", from: "BOM", time: "08:15", status: "Arrived" },
                        { flight: "AI502", from: "MAA", time: "10:30", status: "Delayed" },
                        { flight: "6E205", from: "BOM", time: "11:45", status: "Arrived" },
                        { flight: "UK911", from: "BOM", time: "14:20", status: "Arrived" },
                        { flight: "AI504", from: "HYD", time: "16:10", status: "Scheduled" }
                    ],
                    departures: [
                        { flight: "AI102", to: "BOM", time: "09:30", status: "Departed" },
                        { flight: "AI503", to: "BLR", time: "11:15", status: "Boarding" },
                        { flight: "6E206", to: "BOM", time: "13:40", status: "Scheduled" },
                        { flight: "UK912", to: "BOM", time: "15:55", status: "Scheduled" },
                        { flight: "AI505", to: "CCU", time: "18:30", status: "Scheduled" }
                    ]
                },
                "BOM": {
                    arrivals: [
                        { flight: "AI102", from: "DEL", time: "10:45", status: "Arrived" },
                        { flight: "AI506", from: "MAA", time: "12:20", status: "Arrived" },
                        { flight: "6E206", from: "DEL", time: "14:55", status: "Scheduled" },
                        { flight: "UK912", from: "DEL", time: "17:10", status: "Scheduled" },
                        { flight: "AI508", from: "HYD", time: "19:25", status: "Scheduled" }
                    ],
                    departures: [
                        { flight: "AI101", to: "DEL", time: "07:00", status: "Departed" },
                        { flight: "AI507", to: "BLR", time: "10:15", status: "Departed" },
                        { flight: "6E205", to: "DEL", time: "11:00", status: "Departed" },
                        { flight: "UK911", to: "DEL", time: "13:30", status: "Boarding" },
                        { flight: "AI509", to: "CCU", time: "16:45", status: "Scheduled" }
                    ]
                },
                "MAA": {
                    arrivals: [
                        { flight: "AI502", from: "DEL", time: "10:30", status: "Arrived" },
                        { flight: "AI506", from: "BOM", time: "12:20", status: "Arrived" },
                        { flight: "6E721", from: "DEL", time: "14:10", status: "Delayed" }
                    ],
                    departures: [
                        { flight: "AI501", to: "DEL", time: "06:45", status: "Departed" },
                        { flight: "AI511", to: "COK", time: "09:30", status: "Boarding" },
                        { flight: "6E722", to: "DEL", time: "12:15", status: "Scheduled" }
                    ]
                },
                "BLR": {
                    arrivals: [
                        { flight: "AI503", from: "DEL", time: "12:45", status: "Arrived" },
                        { flight: "AI507", from: "BOM", time: "13:20", status: "Arrived" },
                        { flight: "6E611", from: "DEL", time: "15:30", status: "Scheduled" }
                    ],
                    departures: [
                        { flight: "AI504", to: "DEL", time: "08:30", status: "Departed" },
                        { flight: "AI513", to: "HYD", time: "11:45", status: "Boarding" },
                        { flight: "6E612", to: "DEL", time: "14:20", status: "Scheduled" }
                    ]
                }
            };
            
            // Add airport markers to the map
            const airportMarkers = {};
            Object.keys(airports).forEach(code => {
                const airport = airports[code];
                const marker = L.marker(airport.coords, {
                    icon: L.divIcon({
                        className: 'airport-marker',
                        html: code,
                        iconSize: [28, 28]
                    })
                }).addTo(map);
                
                marker.bindPopup(`
                    <div style="min-width: 200px">
                        <h4 style="margin: 0 0 5px 0; color: var(--aai-primary);">${airport.name}</h4>
                        <p style="margin: 0 0 5px 0; color: #666;"><i class="fas fa-map-marker-alt"></i> ${airport.city}</p>
                        <p style="margin: 0;"><strong>IATA:</strong> ${code}</p>
                    </div>
                `);
                
                airportMarkers[code] = marker;
            });
            
            // Draw flight connections
            const flightPaths = {};
            flightConnections.forEach(connection => {
                const fromAirport = airports[connection.from];
                const toAirport = airports[connection.to];
                
                // Create an arc between the airports
                const arc = L.arc(fromAirport.coords, toAirport.coords, {
                    color: '#1a3e72',
                    weight: 2,
                    vertices: 200,
                    opacity: 0.6,
                    dashArray: '10, 10'
                }).addTo(map);
                
                flightPaths[`${connection.from}-${connection.to}`] = arc;
                
                // Add popup with flight info
                arc.bindPopup(`
                    <div style="min-width: 200px">
                        <h4 style="margin: 0 0 10px 0; color: var(--aai-primary);">${connection.from} to ${connection.to}</h4>
                        <p style="margin: 0 0 5px 0;"><strong>Flights:</strong></p>
                        <p style="margin: 0;">${connection.flights.join(', ')}</p>
                    </div>
                `);
            });
            
            // Function to show flight route between two airports
            function showFlightRoute(origin, destination) {
                // Reset all paths to default style
                Object.values(flightPaths).forEach(path => {
                    path.setStyle({
                        color: '#1a3e72',
                        weight: 2,
                        opacity: 0.6
                    });
                });
                
                // Highlight the selected route
                const routeKey = `${origin}-${destination}`;
                const reverseRouteKey = `${destination}-${origin}`;
                
                if (flightPaths[routeKey]) {
                    flightPaths[routeKey].setStyle({
                        color: '#d32f2f',
                        weight: 4,
                        opacity: 1
                    });
                    map.fitBounds([
                        airports[origin].coords,
                        airports[destination].coords
                    ], { padding: [50, 50] });
                    
                    // Add plane animation
                    animatePlane(origin, destination);
                } else if (flightPaths[reverseRouteKey]) {
                    flightPaths[reverseRouteKey].setStyle({
                        color: '#d32f2f',
                        weight: 4,
                        opacity: 1
                    });
                    map.fitBounds([
                        airports[origin].coords,
                        airports[destination].coords
                    ], { padding: [50, 50] });
                    
                    // Add plane animation
                    animatePlane(origin, destination);
                } else {
                    alert("No direct flights found between these airports");
                }
            }
            
            // Function to animate a plane along the route
            function animatePlane(origin, destination) {
                // Remove any existing plane
                const existingPlane = document.querySelector('.plane-icon');
                if (existingPlane) existingPlane.remove();
                
                const fromCoords = airports[origin].coords;
                const toCoords = airports[destination].coords;
                
                // Calculate the bearing (direction) between the two points
                const bearing = getBearing(fromCoords[0], fromCoords[1], toCoords[0], toCoords[1]);
                
                // Create plane icon
                const plane = document.createElement('div');
                plane.className = 'plane-icon';
                plane.style.transform = `rotate(${bearing}deg)`;
                document.getElementById('airport-network-map').appendChild(plane);
                
                // Get the map container's position
                const mapContainer = document.querySelector('.airport-network-container');
                const mapRect = mapContainer.getBoundingClientRect();
                
                // Animate the plane
                const duration = 5000; // 5 seconds
                const startTime = performance.now();
                
                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Calculate current position
                    const currentLat = fromCoords[0] + (toCoords[0] - fromCoords[0]) * progress;
                    const currentLng = fromCoords[1] + (toCoords[1] - fromCoords[1]) * progress;
                    
                    // Convert lat/lng to pixel coordinates
                    const point = map.latLngToContainerPoint([currentLat, currentLng]);
                    
                    // Position the plane
                    plane.style.left = `${point.x}px`;
                    plane.style.top = `${point.y}px`;
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        plane.remove();
                    }
                }
                
                requestAnimationFrame(animate);
            }
            
            // Helper function to calculate bearing between two points
            function getBearing(lat1, lng1, lat2, lng2) {
                const φ1 = lat1 * Math.PI / 180;
                const φ2 = lat2 * Math.PI / 180;
                const Δλ = (lng2 - lng1) * Math.PI / 180;
                
                const y = Math.sin(Δλ) * Math.cos(φ2);
                const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
                const θ = Math.atan2(y, x);
                
                return ((θ * 180 / Math.PI) + 360) % 360;
            }
            
            // Function to display flight information for an airport
            function displayFlightInfo(airportCode) {
                const airportData = flightData[airportCode];
                if (!airportData) return;
                
                const departuresList = document.getElementById('departures');
                const arrivalsList = document.getElementById('arrivals');
                
                // Clear existing content
                departuresList.innerHTML = '';
                arrivalsList.innerHTML = '';
                
                // Add departure flights
                airportData.departures.forEach(flight => {
                    const flightItem = document.createElement('div');
                    flightItem.className = 'flight-item';
                    
                    const statusClass = flight.status.toLowerCase().includes('depart') ? 'status-departed' : 
                                        flight.status.toLowerCase().includes('board') ? 'status-scheduled' : 
                                        flight.status.toLowerCase().includes('delay') ? 'status-delayed' : 
                                        'status-scheduled';
                    
                    flightItem.innerHTML = `
                        <div>
                            <span class="flight-number">${flight.flight}</span><br>
                            <span class="flight-time">${flight.time} to ${flight.to}</span>
                        </div>
                        <span class="flight-status ${statusClass}">${flight.status}</span>
                    `;
                    
                    departuresList.appendChild(flightItem);
                });
                
                // Add arrival flights
                airportData.arrivals.forEach(flight => {
                    const flightItem = document.createElement('div');
                    flightItem.className = 'flight-item';
                    
                    const statusClass = flight.status.toLowerCase().includes('arriv') ? 'status-arrived' : 
                                        flight.status.toLowerCase().includes('delay') ? 'status-delayed' : 
                                        flight.status.toLowerCase().includes('scheduled') ? 'status-scheduled' : 
                                        'status-scheduled';
                    
                    flightItem.innerHTML = `
                        <div>
                            <span class="flight-number">${flight.flight}</span><br>
                            <span class="flight-time">${flight.time} from ${flight.from}</span>
                        </div>
                        <span class="flight-status ${statusClass}">${flight.status}</span>
                    `;
                    
                    arrivalsList.appendChild(flightItem);
                });
            }
            
            // Event listeners
            document.getElementById('show-route').addEventListener('click', () => {
                const origin = document.getElementById('origin').value;
                const destination = document.getElementById('destination').value;
                
                if (origin && destination) {
                    if (origin === destination) {
                        alert("Please select different airports for origin and destination");
                    } else {
                        showFlightRoute(origin, destination);
                        displayFlightInfo(origin);
                    }
                } else {
                    alert("Please select both origin and destination airports");
                }
            });
            
            // When an airport marker is clicked, show its flight info
            Object.keys(airportMarkers).forEach(code => {
                airportMarkers[code].on('click', () => {
                    document.getElementById('origin').value = code;
                    displayFlightInfo(code);
                });
            });
            
            // Initialize with Delhi airport info
            displayFlightInfo('DEL');
        }
        
        // Animate counter numbers
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            const speed = 200;
            
            counters.forEach(counter => {
                const target = +counter.innerText.replace(',', '');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment).toLocaleString();
                    setTimeout(animateCounters, 1);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            });
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            createFlightPaths();
            initAirportNetworkMap();
            
            // Animate counters when they come into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const statsSection = document.querySelector('.light-bg');
            if (statsSection) {
                observer.observe(statsSection);
            }
        });