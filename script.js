// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get the button element
    const startButton = document.querySelector('button');
    const testSection = document.getElementById('testSection');
    
    // Add click event listener to start button
    startButton.addEventListener('click', function() {
        console.log("Start button clicked");
        
        // Track the event in PostHog
        if (window.posthog) {
            posthog.capture('mission_started', {
                mission_type: 'pineapple_revolution',
                timestamp: new Date().toISOString()
            });
            console.log("PostHog event sent: mission_started");
        } else {
            console.log("PostHog not loaded yet");
        }
        
        // Show the test section
        testSection.classList.remove('hidden');
        // Hide the start button
        this.style.display = 'none';
        
        console.log("Mission started - event sent to PostHog");
        
        // Now set up the pizza choice buttons AFTER they are visible
        setupPizzaChoices();
    });

    function setupPizzaChoices() {
        // Pizza Choice Buttons
        document.querySelectorAll('.pizza-choice').forEach(button => {
            button.addEventListener('click', function() {
                const choice = this.textContent;
                console.log(`Pizza choice clicked: ${choice}`);
                
                // Track the pizza choice in PostHog
                if (window.posthog) {
                    posthog.capture('pizza_choice_made', {
                        choice: choice,
                        is_correct: choice !== 'Pineapple',
                        mission_stage: 'loyalty_test'
                    });
                    console.log("PostHog event sent: pizza_choice_made");
                }
                
                // Visual feedback
                if (choice === 'Pineapple') {
                    this.style.backgroundColor = '#ff4444';
                    alert('I LIED 🚨 TRAITOR DETECTED! 🚨\nPineapple does not belong on pizza! SEIZE THEM!');
                } else {
                    this.style.backgroundColor = '#44ff44';
                }
                
                console.log(`Choice tracked: ${choice}`);
            });
        });
    }
});