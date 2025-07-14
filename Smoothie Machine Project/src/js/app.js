document.addEventListener('DOMContentLoaded', function() {
    setupApp();
});

function setupApp() {
    const form = document.getElementById('smoothie-form');
    
    form.addEventListener('submit', handleFormSubmit);
    form.addEventListener('change', updatePrice); // update price when user changes something
    
    // make sure user can only pick 2 fruits
    form.addEventListener('change', function(e) {
        if (e.target.name === 'fruits') {
            const checkedFruits = document.querySelectorAll('input[name="fruits"]:checked');
            
            if (checkedFruits.length > 2) {
                e.target.checked = false; // uncheck if too many
                alert('You can only select 2 fruits maximum!');
            }
        }
    });
}

function handleFormSubmit(event) {
    event.preventDefault(); // stop form from reloading page
    
    const formData = getFormData();
    
    // check if everything is filled out correctly
    if (validateForm(formData)) {
        const smoothie = new Smoothie(
            formData.customerName,
            formData.size,
            formData.base,
            formData.fruits,
            formData.addons
        );
        
        displayOrder(smoothie); // show the order
    }
}

// get all the form data
function getFormData() {
    const form = document.getElementById('smoothie-form');
    
    const customerName = form.querySelector('#customer-name').value;
    
    // get selected size
    const sizeRadio = form.querySelector('input[name="size"]:checked');
    const size = sizeRadio ? sizeRadio.value : '';
    
    const base = form.querySelector('#base').value;
    
    // get checked fruits
    const fruitCheckboxes = form.querySelectorAll('input[name="fruits"]:checked');
    const fruits = [];
    fruitCheckboxes.forEach(function(checkbox) {
        fruits.push(checkbox.value);
    });
    
    // get checked addons
    const addonCheckboxes = form.querySelectorAll('input[name="addons"]:checked');
    const addons = [];
    addonCheckboxes.forEach(function(checkbox) {
        addons.push(checkbox.value);
    });
    
    return {
        customerName: customerName,
        size: size,
        base: base,
        fruits: fruits,
        addons: addons
    };
}

function validateForm(formData) {
    let isValid = true;
    let errorMessage = '';
    
    // check name is filled
    if (!formData.customerName.trim()) {
        errorMessage += 'Please enter your name.\n';
        isValid = false;
    }
    
    // check base is selected
    if (!formData.base) {
        errorMessage += 'Please select a base for your smoothie.\n';
        isValid = false;
    }
    
    // make sure exactly 2 fruits selected
    if (formData.fruits.length !== 2) {
        errorMessage += 'Please select exactly 2 fruits.\n';
        isValid = false;
    }
    
    if (!isValid) {
        alert(errorMessage); // show errors
    }
    
    return isValid;
}

function displayOrder(smoothie) {
    const resultSection = document.getElementById('order-result');
    const detailsDiv = document.getElementById('smoothie-details');
    
    detailsDiv.innerHTML = smoothie.displayInfo();
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// updates price as user selects things
function updatePrice() {
    try {
        const formData = getFormData();
        
        // create temp smoothie to get price
        const tempSmoothie = new Smoothie(
            formData.customerName || 'temp',
            formData.size || 'medium',
            formData.base || 'milk',
            formData.fruits,
            formData.addons
        );
        
        const priceElement = document.getElementById('total-price');
        priceElement.textContent = tempSmoothie.price.toFixed(2);
        
    } catch (error) {
        // if error just show default price
        const priceElement = document.getElementById('total-price');
        priceElement.textContent = '7.99';
    }
}

// reset everything to start over
function resetOrder() {
    document.getElementById('order-result').style.display = 'none';
    document.getElementById('smoothie-form').reset();
    
    document.getElementById('total-price').textContent = '7.99';
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll back to top
} 