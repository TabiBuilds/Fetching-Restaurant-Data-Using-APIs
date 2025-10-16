// ============================================
// TUTORIAL 6: LOAD REAL DATA
// From static data to async data loading
// ============================================

// Global variable to store loaded restaurant data
let restaurants = [];

// ============================================
// DEBUGGING FUNCTIONS
// ============================================

// Reset everything
function resetTutorial() {
  restaurants = [];
  toggleMethodButtons(false);
  updateStatus('ready', 'Ready to load data');

  // Clear all displays
  document.querySelector('#restaurant-list').innerHTML = '<p class="placeholder">Load data first, then click to display all restaurants</p>';
  document.querySelector('#filtered-list').innerHTML = '<p class="placeholder">Load data first, then click to show only affordable restaurants</p>';
  document.querySelector('#mapped-list').innerHTML = '<p class="placeholder">Load data first, then click to show just the restaurant names</p>';
  document.querySelector('#error-display').innerHTML = '<p class="placeholder">Click to see error handling in action</p>';

  console.log('Tutorial reset');
}

// Check if data is loaded
function checkDataStatus() {
    console.log('=== Data Status ===');
    console.log('Restaurants loaded:', restaurants.length);
    if (restaurants.length > 0) {
        console.log('First restaurant:', restaurants[0].name);
        console.log('All restaurant names:', restaurants.map(r => r.name));
    }
    console.log('==================');
}

// Manually load data (for testing)
async function manualLoadData() {
  try {
        const response = await fetch('restaurants.json');
        if (!response.ok) throw new Error('Load failed');
        const data = await response.json();
        restaurants = data;
        console.log(`Manually loaded ${restaurants.length} restaurants`);
        toggleMethodButtons(true);
        updateStatus('success', `Successfully loaded ${restaurants.length} restaurants`);
  } catch (error) {
        console.error('Manual load failed:', error);
        updateStatus('error', 'Failed to load data');
  }
}

// =======================
// Main Event Listener
// =======================

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Tutorial 6: Async data loading ready!');
  resetTutorial(); // Call resetTutorial() here to initialize UI

  // Get UI elements
  const loadButton = document.querySelector('#load-data-button');
  const statusDisplay = document.querySelector('#loading-status');
  const statusMessage = statusDisplay.querySelector('.status-message');

  // Get the method buttons (start disabled)
  const displayButton = document.querySelector('#display-button');
  const filterButton = document.querySelector('#filter-button');
  const mapButton = document.querySelector('#map-button');
  const errorButton = document.querySelector('#error-button');

// ============================================
// MAIN DATA LOADING FUNCTION
// ============================================

// This is the key new skill - loading data asynchronously
  loadButton.addEventListener('click', async () => {
    
    // Step 1: Show loading state
    // Hint: Change statusDisplay classes and statusMessage text
    // Hint: Disable the load button while loading
    statusDisplay.className = 'status-display loading';
    statusMessage.textContent = 'Loading data...';
    loadButton.disabled = true;

    try {
        // Step 2: Use fetch() to load data
        // Hint: const response = await fetch('restaurants.json');
        // Hint: Check if response.ok before continuing
        const response = await fetch('restaurants.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } 
            
        // Step 3: Convert response to JSON
        // Hint: const data = await response.json();     
        const data = await response.json();
      
        // Log for debugging
        console.log('Loaded data:', data); // Log full data for debugging

        // Step 4: Store data in global variable
        // Hint: restaurants = data;
        restaurants = data;
        
        // Log for debugging
        console.log(`Loaded ${restaurants.length} restaurants`); // Log number of restaurants loaded

        // Enable method buttons now that data is loaded
        toggleMethodButtons(true);

        // Update status to success
        updateStatus('success', `Successfully loaded ${restaurants.length} restaurants`);

        // Step 5: Show success state and enable buttons
        // Hint: Update statusDisplay classes and message
        // Hint: Enable all the method buttons
        statusDisplay.className = 'status-display success';
        statusMessage.textContent = `Successfully loaded ${restaurants.length} restaurants`;
        loadButton.disabled = false;  
    } 
    catch (error) {
        // Step 6: Handle errors gracefully
        // Hint: Show error state with user-friendly message
        // Hint: Log the actual error for debugging

        // Update status to error
        statusDisplay.className = 'status-display error';
        statusMessage.textContent = 'Failed to load data. Please try again.';

        // Re-enable load button to allow retry
        loadButton.disabled = false;
        toggleMethodButtons(false);

        // Logging the actual error for debugging
        console.error('Data load failed:', error); 
    }
  });

// ============================================
// ARRAY METHOD FUNCTIONS - Same as Tutorial 5
// ============================================
    
// Display all restaurants (same as Tutorial 5, but using loaded data)
    displayButton.addEventListener('click', () => {
        const listContainer = document.querySelector('#restaurant-list');
        listContainer.innerHTML = '';

        // Check if we have data first
        if (restaurants.length === 0) {
        listContainer.innerHTML = '<p class="placeholder">No data loaded yet</p>';
        return;
        }

        // Step 7: Use the same forEach logic from Tutorial 5
        // Hint: restaurants.forEach(function(restaurant) { })
        restaurants.forEach(restaurant => {
            const li = document.createElement('li');
            li.textContent = `${restaurant.name} - ${restaurant.cuisine} - ${restaurant.price}`;
            listContainer.appendChild(li);
        }
    );
});

// Filter cheap restaurants (same logic, loaded data)
filterButton.addEventListener('click', function() {
    const filteredList = document.querySelector('#filtered-list');
        
    if (restaurants.length === 0) {
        filteredList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
        return;
    }
        
    // Step 8: Use the same filter logic from Tutorial 5
    // Hint: const cheapRestaurants = restaurants.filter(function(restaurant) { })
    const cheapRestaurants = restaurants.filter(function(restaurant) {
        return restaurant.price === '$' || restaurant.price === '$$';
    });
        
    if (cheapRestaurants.length === 0) {
        filteredList.innerHTML = '<p class="placeholder">No affordable restaurants found</p>';
        return;
    }
        
    cheapRestaurants.forEach(function(restaurant) {
        const listItem = document.createElement('li');
        listItem.textContent = `${restaurant.name} - ${restaurant.cuisine} - ${restaurant.price}`;
        filteredList.appendChild(listItem);
    });
});

// Show restaurant names (same logic, loaded data)
mapButton.addEventListener('click', function() {
    const mappedList = document.querySelector('#mapped-list');
        
    if (restaurants.length === 0) {
        mappedList.innerHTML = '<p class="placeholder">No data loaded yet</p>';
        return;
    }
        
    // Step 9: Use the same map logic from Tutorial 5
    // Hint: const names = restaurants.map(function(restaurant) { })
    const names = restaurants.map(function(restaurant) {
        return restaurant.name;
    });
        
    names.forEach(function(name) {
        const listItem = document.createElement('li');
        listItem.textContent = name;
        mappedList.appendChild(listItem);
    });   
});

// ============================================
// ERROR HANDLING DEMO
// ============================================
    
// This demonstrates what happens when fetch() fails
errorButton.addEventListener('click', async () => {
    const errorDisplay = document.querySelector('#error-display');
    
    errorDisplay.innerHTML = '<div class="status-display loading"><p class="status-message">Trying to load from bad URL...</p></div>';

    try {
        // This will fail because the URL doesn't exist
        const response = await fetch('nonexistent-file.json');
      
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        const data = await response.json();
        errorDisplay.innerHTML = '<p class="placeholder">This should not appear</p>';
    } 
    catch (error) {
        // Step 10: Show user-friendly error message
        // Hint: Create error message div with helpful text
        
        errorDisplay.innerHTML = `
        <div class="status-display error">
          <p class="status-message">Oops! The data failed to load. Please try again.</p>
          <button id="retry-button">Retry</button>
        </div>`;
      
        // Add retry button functionality
        document.querySelector('#retry-button').addEventListener('click', () => {
        errorDisplay.innerHTML = '<p class="placeholder">Click to see error handling in action</p>';
      });

      // Logging the actual error for debugging
      console.error('Demonstrated error:', error);
    }
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Helper function to enable/disable method buttons
function toggleMethodButtons(enabled) {
    const buttons = [
        document.querySelector('#display-button'),
        document.querySelector('#filter-button'),
        document.querySelector('#map-button')
    ];
    
    buttons.forEach(button => {
        button.disabled = !enabled;
    });
}

// Helper function to update status display
function updateStatus(state, message) {
    const statusDisplay = document.querySelector('#loading-status');
    const statusMessage = statusDisplay.querySelector('.status-message');
    
    // Remove all state classes
    statusDisplay.classList.remove('loading', 'success', 'error');
    
    // Add new state class
    if (state !== 'ready') {
        statusDisplay.classList.add(state);
    }
    
    statusMessage.textContent = message;
}

// Call these functions in the browser console:
// checkDataStatus() - see if data is loaded
// manualLoadData() - load data without clicking button
// resetTutorial() - reset everything for testing