// Base de datos simulada para almacenar los registros
let database = [];

// Obtener elementos del DOM
const registrationForm = document.getElementById("registration-form");
const queryForm = document.getElementById("query-form");
const resultContainer = document.getElementById("result-container");

// Cargar datos desde el archivo JSON
const loadDatabase = () => {
  fetch("database.json")
    .then((response) => response.json())
    .then((data) => {
      database = data;
    })
    .catch((error) => {
      console.error("Error al cargar la base de datos:", error);
    });
};

// Guardar datos en el archivo JSON
const saveDatabase = () => {
  fetch("database.json", {
    method: "PUT",
    body: JSON.stringify(database),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al guardar la base de datos");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Base de datos guardada correctamente:", data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Cargar la base de datos al cargar la página
loadDatabase();

// Evento de registro de datos
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const photo = document.getElementById("photo").files[0];
  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Almacenar los datos en la base de datos
  const record = {
    id: id,
    name: name,
    email: email,
    phone: phone,
    photo: URL.createObjectURL(photo), // Almacenar la URL de la imagen
  };
  database.push(record);

  // Limpiar el formulario
  registrationForm.reset();

  // Guardar la base de datos actualizada en el archivo JSON
  saveDatabase();

  // Mostrar mensaje de éxito
  resultContainer.innerHTML = "<p>Datos guardados correctamente</p>";
});

// Evento de consulta de datos
queryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const queryId = document.getElementById("query-id").value;

  // Buscar el registro en la base de datos por ID
  const record = database.find((record) => record.id === queryId);

  // Mostrar los datos del registro en el contenedor de resultados
if (record) {
  resultContainer.innerHTML = `
    <div>
      <h3 style="color: red;">ID: ${record.id}</h3>
      <p style="font-size: 18px; font-weight: bold;">Nombre: ${record.name}</p>
      <p style="font-size: 16px;">Correo: ${record.email}</p>
      <p style="font-size: 16px;">Teléfono: ${record.phone}</p>
      <img src="${record.photo}" alt="Foto">
    </div>
  `;
} else {
  resultContainer.innerHTML = `<p style="font-size: 18px; color: #777;">No se encontraron resultados</p>`;
}
});

// Obtener el input de tipo "file", el span para mostrar el nombre del archivo y el formulario
const input = document.getElementById('photo');
const selectedFileName = document.getElementById('selected-file-name');
const form = document.getElementById('registration-form');

// Escuchar el evento change del input de tipo "file"
input.addEventListener('change', (event) => {
  // Obtener el nombre del archivo seleccionado
  const fileName = event.target.files[0]?.name || '';
  // Mostrar el nombre del archivo en el span
  selectedFileName.textContent = fileName;
});

// Escuchar el evento submit del formulario
form.addEventListener('submit', (event) => {
  // Limpiar el valor del span del nombre del archivo
  selectedFileName.textContent = '';
  // Aquí puedes agregar tu lógica de envío de formulario
});
