document.querySelector('a[href="http://localhost:8000#ajanlatunk"]').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default anchor behavior
    const target = document.querySelector('#ajanlatunk'); // Find the target element
    const offset = 150; // Adjust this value to your desired offset
    
    const bodyRect = document.body.getBoundingClientRect().top; // Get body top position
    const elementRect = target.getBoundingClientRect().top; // Get target element top position
    const elementPosition = elementRect - bodyRect; // Calculate the position relative to the page
    const offsetPosition = elementPosition - offset; // Apply the offset
  
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth' // Add smooth scroll if desired
    });
  });
  