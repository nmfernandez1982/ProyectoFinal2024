document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#product-table tbody");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const pageInfo = document.getElementById("page-info");
  
    let currentPage = 1;
    const limit = 10;
    let totalProducts = 0;
  
    function fetchProducts(page) {
      const skip = (page - 1) * limit;
  
      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
        .then(response => response.json())
        .then(data => {
          totalProducts = data.total;
          const products = data.products;
  
          tableBody.innerHTML = '';
  
          products.forEach(product => {
            //creo la fila
            const row = document.createElement('tr');  

            //creo la celda del id
            const idCelda = document.createElement('td');
            idCelda.textContent = product.id;
            row.appendChild(idCelda);

            //creo la celda del imagen y el alt
            const imgCelda = document.createElement('td');
            const img = document.createElement('img');
            img.src = product.thumbnail;
            img.alt = product.title;
            imgCelda.appendChild(img);
            row.appendChild(imgCelda);

            
            //creo la celda del titulo
            const tituloCelda = document.createElement('td');
            tituloCelda.textContent = product.title;
            row.appendChild(tituloCelda);
  
            //creo la celda de la descripcion
            const descCelda = document.createElement('td');
            descCelda.textContent = product.description;
            row.appendChild(descCelda);
  
            const precioCelda = document.createElement('td');
            precioCelda.textContent = `$${product.price}`;
            row.appendChild(precioCelda);

            // Botón "Agregar al carrito"
            const actionCell = document.createElement('td');
            const addButton = document.createElement('button');
            addButton.textContent = 'Agregar';
            addButton.classList.add('btn', 'btn-success');
            actionCell.appendChild(addButton);
            row.appendChild(actionCell);



            //agrego la fila a la tabla
            tableBody.appendChild(row);
          });
  
          pageInfo.textContent = `Page ${currentPage}`;          
          prevBtn.disabled = currentPage === 1;
          nextBtn.disabled = (currentPage * limit) >= totalProducts;
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  
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
  
    fetchProducts(currentPage);
  });
  