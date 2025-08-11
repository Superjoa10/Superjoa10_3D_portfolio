// Function to fill AI chatbot form when user clicks from bot.html
function fillAIForm() {
    // Store form data in localStorage before navigation
    localStorage.setItem('fillForm', JSON.stringify({
        subject: 'Chatbot WhatsApp com IA',
        message: 'Estou interessado no serviço de Chatbot WhatsApp com integração de IA. Gostaria de mais informações sobre implementação, custos e como pode ser personalizado para meu negócio.'
    }));
    
    // Navigate to main page contact section
    window.location.href = '/#contact';
}

// Function to fill automation form
function fillAutomationForm() {
    // Small delay to ensure the page scrolls to contact section first
    setTimeout(function() {
        document.querySelector('input[name="subject"]').value = 'Automação de processos';
        document.querySelector('textarea[name="message"]').value = 'Estou entrando em contato sobre a possível criação de uma automação de processo para mim ou minha empresa, gostaria de mais detalhes ou de marcar uma reunião.';
    }, 100);
}

// Flash popup functionality
document.addEventListener('DOMContentLoaded', function() {
    var flashPopup = document.getElementById('flash-popup');
    var flashMessage = document.getElementById('flash-popup-message');
    var flashPopupClose = document.getElementById('flash-popup-close');

    // Function to show flash messages (will be called from HTML template)
    window.showFlashMessages = function(messages) {
        if (messages && messages.length > 0) {
            var messageText = messages.map(function(msg) { return msg[1]; }).join('<br>');
            
            flashMessage.innerHTML = messageText;
            flashPopup.style.display = 'block';
            
            // Auto-hide the popup after 5 seconds
            setTimeout(function() {
                flashPopup.style.display = 'none';
                flashMessage.innerHTML = ''; // Clear the message content
            }, 5000);
            
            // Close button functionality
            flashPopupClose.onclick = function() {
                flashPopup.style.display = 'none';
                flashMessage.innerHTML = ''; // Clear the message content
            };
        }
    };
});

// Ticker animation functionality
document.addEventListener('DOMContentLoaded', function () {
    const ticker = document.querySelector('.ticker-transition');
    if (ticker) {
        const tickerItems = Array.from(ticker.children);
      
        // Duplicate items for seamless scrolling
        tickerItems.forEach(item => {
          const clone = item.cloneNode(true);
          ticker.appendChild(clone);
        });
      
        let tickerWidth = 0;
        tickerItems.forEach(item => {
          tickerWidth += item.offsetWidth;
        });
      
        let position = 0;
      
        function animateTicker() {
          position -= 1; // Adjust speed by changing this value
          if (Math.abs(position) >= tickerWidth) {
            position = 0;
          }
          ticker.style.transform = `translateX(${position}px)`;
          requestAnimationFrame(animateTicker);
        }
      
        animateTicker();
    }
});

// Function to fill form from localStorage (for navigation from other pages)
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's form data stored in localStorage
    const storedData = localStorage.getItem('fillForm');
    
    if (storedData) {
        const formData = JSON.parse(storedData);
        
        setTimeout(function() {
            const subjectField = document.querySelector('input[name="subject"]');
            const messageField = document.querySelector('textarea[name="message"]');
            
            if (subjectField && formData.subject) {
                subjectField.value = formData.subject;
            }
            if (messageField && formData.message) {
                messageField.value = formData.message;
            }
            
            // Clear the stored data after using it
            localStorage.removeItem('fillForm');
        }, 1000); // Wait 1 second for form to be ready
    }
});