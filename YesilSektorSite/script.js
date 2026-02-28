/* GEÇİŞ EFEKTİ*/
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if(top < window.innerHeight - 100){
      section.classList.add("active");
    }
  });
});
/* ÜSTTEKİ SCROLL BAR */
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / height) * 100;
  document.querySelector(".progress").style.width = progress + "%";
});
/* Yavaş Üste Çıkma Animasyonu */
document.getElementById("scrollTop").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        // aşağı kaydırıyorsa menüyü gizle
        navbar.style.top = "-120px"; // yüksekliği kadar yukarı çıkart
    } else {
        // yukarı kaydırıyorsa menüyü göster
        navbar.style.top = "0";
    }

    lastScroll = currentScroll;
});
window.addEventListener('load', () => {
    navbar.style.top = "-120px";
    setTimeout(() => {
        navbar.style.top = "0";
    }, 300); // 0.3 saniye sonra süzülerek geri gelir
});


window.addEventListener('keydown', function(e) {
    if(e.key === 'u' || e.key === 'U') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // yumuşak kaydırma
        });
    }
    if(e.key === 'd' || e.key === 'D') {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'  // yumuşak kaydırma
        });
    }
});




const form = document.querySelector('.form-container form');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // sayfanın başka yere gitmesini engelliyor

    // Form alanlarını kitliyoruz
    const inputs = form.querySelectorAll('input, textarea, button');
    inputs.forEach(input => input.disabled = true);

    // Gönderildi mesajı ekleme
    const message = document.createElement('p');
    message.textContent = "Mesajınız gönderildi! Teşekkürler!";
    message.style.color = "yellowgreen";
    message.style.textAlign = "center";
    message.style.fontWeight = "700";
    message.style.marginTop = "20px";
    form.appendChild(message);

    // İsteğe bağlı: formu hafifçe transparan yapabiliriz
    form.style.opacity = "0.9";
});

form.addEventListener('submit', function(e){
    e.preventDefault();
    form.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    form.style.transform = "scale(0.95)";
    form.style.opacity = "0.7";
});

if(name.value === "") {
    name.style.borderColor = "red";
    name.style.boxShadow = "0 0 10px red";
}

