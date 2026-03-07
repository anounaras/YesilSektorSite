document.getElementById("navbar").innerHTML = `
<header style="
  background: rgba(20, 20, 22, 0.85);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  box-shadow: 0 2px 12px rgba(0,0,0,0.45);
  animation: slideDown 0.9s ease forwards;
  opacity: 0;
">
  <div class="nav-container" style="
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Poppins', sans-serif;
  ">
  
    <h1 style="font-size: 22px; color: white; margin: 0;">
      YTÜ Blog Hub
    </h1>

    <nav style="display: flex; align-items: center;">
      <a href="index.html">Ana Sayfa</a>
      <a href="bloglar.html">Bloglar</a>
      <a href="contact.html">İletişim</a>
      <a href="login.html" class="login-btn">Giriş Yap</a>
    </nav>

  </div>
</header>

<style>

  /* Navbar animasyonu */
  @keyframes slideDown {
      0% { opacity: 0; transform: translateY(-35px); }
      100% { opacity: 1; transform: translateY(0); }
  }

  /* GENEL NAVBAR LİNKLERİ */
  nav a {
      text-decoration: none;
      color: #cccccc;
      margin-left: 25px;
      font-size: 15px;
      font-weight: 400;
      transition: 0.3s;
      position: relative;
      padding-bottom: 4px;
  }

  /* Giriş Yap hariç tüm linkler */
  nav a:not(.login-btn) {
      position: relative;
  }

  /* Hover efekti — Neon + büyüme */
  nav a:not(.login-btn):hover {
      color: #4fc3f7;
      transform: scale(1.15);
  }

  /* Alt çizgi animasyonu */
  nav a:not(.login-btn)::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 0%;
      height: 2px;
      background: #4fc3f7;
      box-shadow: 0 0 10px #4fc3f7;
      transition: 0.35s ease;
      border-radius: 3px;
  }

  nav a:not(.login-btn):hover::after {
      width: 100%;
  }

  /* --- GİRİŞ YAP BUTONU --- */
  .login-btn {
      background: linear-gradient(45deg, #3fa9f5, #0e83ff);
      padding: 10px 18px;
      border-radius: 10px;
      color: white !important;
      font-weight: 600;
      box-shadow: 0 0 12px rgba(0,140,255,0.4);
      transition: 0.3s;
  }

  .login-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 0 18px rgba(0,140,255,0.85);
  }

</style>
`;
