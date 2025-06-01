function sortProducts() {
    const sortValue = document.getElementById('sort').value;
    const grid = document.querySelector('.product-grid');
    const products = Array.from(grid.querySelectorAll('.product'));

    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('p').innerText.replace('$', ''));
        const priceB = parseFloat(b.querySelector('p').innerText.replace('$', ''));

        if (sortValue === 'low') return priceA - priceB;
        if (sortValue === 'high') return priceB - priceA;
        return 0;
    });

    grid.innerHTML = '';
    products.forEach(product => grid.appendChild(product));
}

