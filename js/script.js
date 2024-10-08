document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#product-table tbody");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pageInfo = document.getElementById("page-info");
  
    let currentPage = 1;
    const limit = 10;
    let totalProducts = 0;
  
    // Function to fetch and display products
    function fetchProducts(page) {
      const skip = (page - 1) * limit;
  
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(response => response.json())
        .then(data => {
          totalProducts = data.total;
          const products = data.products;
  
          // Clear the current table rows
          tableBody.innerHTML = '';
  
          // Populate table with new products
          products.forEach(product => {
            const row = document.createElement('tr');
  
            // Product image
            const imgCell = document.createElement('td');
            const img = document.createElement('img');
            img.src = product.thumbnail;
            img.alt = product.title;
            imgCell.appendChild(img);
            row.appendChild(imgCell);
  
            // Product title
            const titleCell = document.createElement('td');
            titleCell.textContent = product.title;
            row.appendChild(titleCell);
  
            // Product description
            const descCell = document.createElement('td');
            descCell.textContent = product.description;
            row.appendChild(descCell);
  
            // Product price
            const priceCell = document.createElement('td');
            priceCell.textContent = `$${product.price}`;
            row.appendChild(priceCell);
  
            // Append row to table body
            tableBody.appendChild(row);
          });
  
          // Update page info
          pageInfo.textContent = `Page ${currentPage}`;
          
          // Enable or disable buttons based on page
          prevBtn.disabled = currentPage === 1;
          nextBtn.disabled = (currentPage * limit) >= totalProducts;
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  
    // Event listeners for pagination buttons
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchProducts(currentPage);
      }
    });
  
    nextBtn.addEventListener("click", () => {
      if ((currentPage * limit) < totalProducts) {
        currentPage++;
        fetchProducts(currentPage);
      }
    });
  
    // Initial load
    fetchProducts(currentPage);
  });
  