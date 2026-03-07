document.addEventListener("DOMContentLoaded", () => {
  
    const title = document.getElementById("authTitle");
    const email = document.getElementById("authEmail");
    const pass = document.getElementById("authPassword");
    const username = document.getElementById("authUsername");
    const btn = document.getElementById("authSubmitBtn");
  
    const switchToRegister = document.getElementById("switchToRegister");
  
    let mode = "login";
  
    switchToRegister.addEventListener("click", (e) => {
      e.preventDefault();
      mode = (mode === "login") ? "register" : "login";
  
      if (mode === "register") {
        title.textContent = "Kayıt Ol";
        username.style.display = "block";
        btn.textContent = "Kayıt Ol";
        switchToRegister.textContent = "Giriş yap";
      } else {
        title.textContent = "Giriş Yap";
        username.style.display = "none";
        btn.textContent = "Giriş Yap";
        switchToRegister.textContent = "Kayıt ol";
      }
    });
  
    btn.addEventListener("click", () => {
      if (mode === "login") {
        alert("Giriş başarılı (örnek)!");
      } else {
        alert("Kayıt başarılı (örnek)!");
      }
    });
  
  });
  