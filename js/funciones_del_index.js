document.addEventListener("DOMContentLoaded", () => {
  const tablaProductos = document.querySelector("#productos-table tbody");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageInfo = document.getElementById("page-info");

  let currentPage = 1;
  const limit = 10;
  let totalProductos = 0;

  function fetchProductos(page) {
      const skip = (page - 1) * limit;

      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
          .then(response => response.json())
          .then(data => {
              totalProductos = data.total;
              const productos = data.products;

              tablaProductos.innerHTML = '';

              productos.forEach(product => {
                  const row = document.createElement('tr');  

                  // Celda del ID
                  const idCelda = document.createElement('td');
                  idCelda.textContent = product.id;
                  row.appendChild(idCelda);

                  // Celda de la imagen
                  const imgCelda = document.createElement('td');
                  const img = document.createElement('img');
                  img.src = product.thumbnail;
                  img.alt = product.title;
                  img.width = 50; // Para ajustar el tamaño
                  imgCelda.appendChild(img);
                  row.appendChild(imgCelda);

                  // Celda del título
                  const tituloCelda = document.createElement('td');
                  tituloCelda.textContent = product.title;
                  row.appendChild(tituloCelda);

                  // Celda de la descripción
                  const descCelda = document.createElement('td');
                  descCelda.textContent = product.description;
                  row.appendChild(descCelda);

                  // Celda del precio
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

                  // Evento del botón "Agregar"
                  addButton.addEventListener('click', () => {
                      addToCart(product);
                  });

                  // Agrego la fila a la tabla
                  tablaProductos.appendChild(row);
              });

              pageInfo.textContent = `Page ${currentPage}`;          
              prevBtn.disabled = currentPage === 1;
              nextBtn.disabled = (currentPage * limit) >= totalProductos;
          })
          .catch(error => console.error('Error fetching products:', error));
  }

  // Función para agregar al carrito usando localStorage
  function addToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.title} ha sido agregado al carrito!`);
  }

  prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
          currentPage--;
          fetchProductos(currentPage);
      }
  });

  nextBtn.addEventListener("click", () => {
      if ((currentPage * limit) < totalProductos) {
          currentPage++;
          fetchProductos(currentPage);
      }
  });

  fetchProductos(currentPage);
});