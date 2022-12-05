const botonVer = document.getElementById("botonVer");

botonVer.onclick = (e) => {
  e.preventDefault();
  let id = document.getElementById("id").value;
  location.assign(`/api/productos/${id}`);
};
