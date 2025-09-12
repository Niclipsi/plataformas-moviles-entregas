 const listaProductos = document.getElementById('lista-productos');
    const formProducto = document.getElementById('form-producto');
    const btnLimpiar = document.getElementById('btn-limpiar');
    const btnOrdenar = document.getElementById('btn-ordenar');

   let  productos = JSON.parse(localStorage.getItem('productos')) || [];
   function guardarP() {
    localStorage.setItem('productos', JSON.stringify(productos));    
   }
   function renderProductos() {
        listaProductos.innerHTML = '';
        productos.forEach((producto, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            const span = document.createElement('span');
            span.classList = 'producto-nombre';
            span.textContent = producto.nombre;  
            if (producto.compra) {
                span.style.textDecoration = 'line-through';
            }     
            const btnComprar = document.createElement('button');
            btnComprar.className = 'btn btn-success btn-sm';            
            btnComprar.textContent = producto.compra ? 'Desmarcar' : 'Comprar';
            btnComprar.addEventListener('click', () => {
                producto.compra = !producto.compra;
                guardarP();
                renderProductos();
            });
            //edición con doble click 
            span.addEventListener('dblclick', () => {
                const nuevoNombre = prompt('Editar nombre del producto:', producto.nombre);
                if (nuevoNombre) {
                    producto.nombre = nuevoNombre;
                    guardarP();
                    renderProductos();
                }
            });
            const btnEliminar = document.createElement('button'); 
            btnEliminar.className = 'btn btn-danger btn-sm';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => {
                productos.splice(index, 1);
                guardarP();
                renderProductos();
            });
            li.appendChild(span);
            li.appendChild(btnComprar);
            li.appendChild(btnEliminar);
            listaProductos.appendChild(li);                                  
        });  
            
                
        }

   function agregarProducto(nombreP) {
        productos.push({nombre: nombreP, compra: false});
        localStorage.setItem('productos', JSON.stringify(productos));
        guardarP();
        renderProductos();
    }
    formProducto.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputProducto = document.getElementById('productos-campo');
        const nombreP = inputProducto.value.trim();
        if (nombreP) {
            agregarProducto(nombreP);
        }    
        inputProducto.value = '';   
    });

    btnLimpiar.addEventListener('click', () => { 
        productos = [];
        guardarP();
        renderProductos();
    });   
    btnOrdenar.addEventListener('click', () => {
        productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
        guardarP();
        renderProductos();
    });

    renderProductos();