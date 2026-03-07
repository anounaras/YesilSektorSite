// script.js — tüm sayfalarda yüklenecek

/* -------------------------
   tsParticles başlat (hero arka plan)
   ------------------------- */
   if (window.tsParticles) {
    tsParticles.load("tsparticles", {
      fpsLimit: 60,
      interactivity: { events: { onHover: { enable: false, mode: "repulse" } } },
      particles: {
        number: { value: 40, density: { enable: true, area: 900 } },
        color: { value: ["#ff8a00", "#e52e71", "#6fa8ff"] },
        shape: { type: "circle" },
        opacity: { value: 0.12 },
        size: { value: { min: 1, max: 6 } },
        move: { enable: true, speed: 0.8, outModes: "out" }
      },
      detectRetina: true
    });
  }
  
  /* -------------------------
     Hero mouse parallax (hafif)
     ------------------------- */
  (function heroParallax(){
    const hero = document.querySelector('.hero');
    const decor = document.querySelector('.hero-decor');
    if(!hero || !decor) return;
  
    hero.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      decor.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    });
  })();
  
  /* -------------------------
     Navbar küçülme on scroll
     ------------------------- */
  (function headerShrink(){
    const header = document.getElementById('siteHeader');
    if(!header) return;
    window.addEventListener('scroll', () => {
      if(window.scrollY > 40) header.classList.add('shrink');
      else header.classList.remove('shrink');
    });
  })();
  
  /* -------------------------
     Reveal on scroll (IntersectionObserver)
     ------------------------- */
  (function revealOnScroll(){
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
  
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  })();
  
  /* -------------------------
     BLOGS: localStorage CRUD & render
     ------------------------- */
  const STORAGE_KEY = 'ytublog_posts_v1';
  
  function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
  
  function getPosts(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  }
  
  function savePosts(posts){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
  
  /* Render posts into #userBlogContainer if present */
  function renderPosts(){
    const container = document.getElementById('userBlogContainer');
    if(!container) return;
    container.innerHTML = '';
  
    const posts = getPosts().slice().reverse(); // yeni öne gelsin
  
    posts.forEach(post => {
      const card = document.createElement('article');
      card.className = 'blog-card reveal';
      card.innerHTML = `
        <img src="${escapeHTML(post.image || fallbackImage())}" loading="lazy" alt="${escapeHTML(post.title)}">
        <div class="card-body">
          <h3>${escapeHTML(post.title)}</h3>
          <p>${escapeHTML(truncate(post.content, 220))}</p>
          <div class="blog-meta">
            <small>${new Date(post.createdAt).toLocaleString()}</small>
            <div>
              <button class="small-btn" data-action="edit" data-id="${post.id}">Düzenle</button>
              <button class="small-btn" data-action="delete" data-id="${post.id}">Sil</button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  
    // re-attach reveal observer
    document.querySelectorAll('.reveal').forEach(el => el.classList.remove('visible'));
    setTimeout(()=>{ document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')); }, 30);
  }
  
  /* helpers */
  function truncate(s, n){ if(s.length <= n) return s; return s.slice(0,n-1)+'…'; }
  function fallbackImage(){ return 'https://source.unsplash.com/featured/800x400/?technology'; }
  function escapeHTML(s){ return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }
  
  /* DOM: add post / edit / delete */
  (function blogFormHandlers(){
    const addBtn = document.getElementById('addPostBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const titleEl = document.getElementById('postTitle');
    const imgEl = document.getElementById('postImage');
    const contentEl = document.getElementById('postContent');
    let editingId = null;
  
    if(!addBtn) return renderPosts(); // sayfada form yoksa sadece render et
  
    // init
    renderPosts();
  
    addBtn.addEventListener('click', () => {
      const title = titleEl.value.trim();
      const image = imgEl.value.trim();
      const content = contentEl.value.trim();
  
      if(!title || !content){ alert('Başlık ve içerik gerekli.'); return; }
  
      const posts = getPosts();
      if(editingId){
        // update
        const idx = posts.findIndex(p=>p.id===editingId);
        if(idx>-1){
          posts[idx].title = title;
          posts[idx].image = image || posts[idx].image;
          posts[idx].content = content;
          posts[idx].updatedAt = Date.now();
          savePosts(posts);
        }
        editingId = null;
        addBtn.textContent = 'Yazıyı Ekle';
        cancelBtn.style.display = 'none';
      } else {
        // create
        const newPost = { id: uid(), title, image: image || '', content, createdAt: Date.now() };
        posts.push(newPost);
        savePosts(posts);
      }
  
      // clear
      titleEl.value = ''; imgEl.value = ''; contentEl.value = '';
      renderPosts();
      // smooth scroll to list
      document.getElementById('userBlogContainer').scrollIntoView({ behavior:'smooth', block:'start' });
    });
  
    // cancel edit
    cancelBtn.addEventListener('click', () => {
      editingId = null;
      titleEl.value=''; imgEl.value=''; contentEl.value='';
      addBtn.textContent = 'Yazıyı Ekle';
      cancelBtn.style.display = 'none';
    });
  
    // delegate edit/delete buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-action]');
      if(!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id;
      if(action === 'delete'){
        if(!confirm('Bu yazıyı silmek istediğine emin misin?')) return;
        let posts = getPosts();
        posts = posts.filter(p => p.id !== id);
        savePosts(posts);
        renderPosts();
      } else if(action === 'edit'){
        const posts = getPosts();
        const p = posts.find(x=>x.id===id);
        if(!p) return;
        editingId = id;
        titleEl.value = p.title;
        imgEl.value = p.image || '';
        contentEl.value = p.content;
        addBtn.textContent = 'Güncelle';
        cancelBtn.style.display = 'inline-block';
        // scroll to form
        document.getElementById('blogFormWrap').scrollIntoView({ behavior:'smooth', block:'center' });
      }
    });
  })();
  // Auth sayfasındaki giriş / kayıt arası geçiş
const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

function showRegister() {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
}

function showLogin() {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
}
/* ---------- AUTH (REGISTER / LOGIN) HANDLER ---------- */
/* Paste this at the very end of your script.js file */

(function () {
    // Storage keys
    const USERS_KEY = 'ytublog_users_v1';
    const SESSION_KEY = 'ytublog_session_v1';
  
    // Helpers
    function getUsers() {
      try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
      catch { return []; }
    }
    function saveUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
    function setSession(user) { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
    function clearSession() { localStorage.removeItem(SESSION_KEY); }
    function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } }
  
    function findByEmailOrName(val) {
      const users = getUsers();
      return users.find(u => (u.email && u.email.toLowerCase() === String(val).toLowerCase()) || (u.name && u.name.toLowerCase() === String(val).toLowerCase()));
    }
  
    // Hash-like basic obfuscation for demo (not secure, just superficial)
    function obfuscate(str) {
      try { return btoa(String(str)); } catch { return String(str); }
    }
    function deobfuscate(str) {
      try { return atob(String(str)); } catch { return String(str); }
    }
  
    /* ---------- REGISTER / LOGIN UI ELEMENTS (supports multiple html variants) ---------- */
    // register elements - support both "authUsername/authEmail/authPassword/authSubmitBtn"
    const regNameEl = document.getElementById('regName') || document.getElementById('authUsername') || document.getElementById('regUser');
    const regEmailEl = document.getElementById('regEmail') || document.getElementById('authEmail') || document.getElementById('regMail');
    const regPassEl = document.getElementById('regPass') || document.getElementById('authPassword') || document.getElementById('regPass');
  
    // login elements - support both "loginEmail/loginPass/loginUser/loginPass"
    const loginEmailEl = document.getElementById('loginUser') || document.getElementById('loginEmail') || document.getElementById('authEmail');
    const loginPassEl = document.getElementById('loginPass') || document.getElementById('loginPass') || document.getElementById('authPassword');
  
    // Buttons
    const registerBtn = document.querySelector('#registerBox button.auth-btn') || document.querySelector('#authSubmitBtn') || document.querySelector('button#createAccount') || document.querySelector('button.auth-btn.register');
    const loginBtn = document.querySelector('#loginBox button.auth-btn') || document.querySelector('button.auth-btn') || document.querySelector('button#loginBtn') || document.querySelector('button.auth-btn.login');
  
    /* ---------- REGISTER ACTION ---------- */
    function handleRegister(e) {
      e && e.preventDefault && e.preventDefault();
  
      const name = regNameEl ? regNameEl.value.trim() : '';
      const email = regEmailEl ? regEmailEl.value.trim().toLowerCase() : '';
      const pass = regPassEl ? regPassEl.value : '';
  
      // validation
      if (!name || !email || !pass) return alert('Lütfen tüm alanları doldurunuz.');
      if (pass.length < 6) return alert('Şifre en az 6 karakter olmalı.');
      // simple email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Geçerli bir e-posta giriniz.');
  
      const users = getUsers();
      if (users.find(u => u.email && u.email.toLowerCase() === email)) {
        return alert('Bu e-posta ile kayıtlı bir kullanıcı zaten var. Giriş yapmayı deneyin.');
      }
  
      const newUser = {
        id: Date.now().toString(36),
        name,
        email,
        pass: obfuscate(pass),
        createdAt: Date.now()
      };
  
      users.push(newUser);
      saveUsers(users);
  
      // set session & redirect (or update UI)
      setSession({ id: newUser.id, name: newUser.name, email: newUser.email });
      alert('Kayıt başarılı! Yönlendiriliyorsun...');
      // redirect to index if exists, else stay
      if (location.pathname.endsWith('auth.html') || location.pathname.endsWith('/auth')) {
        location.href = 'index.html';
      } else {
        updateHeaderAuth();
      }
    }
  
    /* ---------- LOGIN ACTION ---------- */
    function handleLogin(e) {
      e && e.preventDefault && e.preventDefault();
  
      const identifier = loginEmailEl ? loginEmailEl.value.trim() : '';
      const pass = loginPassEl ? loginPassEl.value : '';
  
      if (!identifier || !pass) return alert('Lütfen kullanıcı ve şifre giriniz.');
  
      const users = getUsers();
      // search by email or name
      const user = users.find(u => (u.email && u.email.toLowerCase() === identifier.toLowerCase()) || (u.name && u.name.toLowerCase() === identifier.toLowerCase()));
      if (!user) return alert('Kullanıcı bulunamadı. E-posta veya kullanıcı adını kontrol et.');
  
      if (deobfuscate(user.pass) !== pass) return alert('Şifre hatalı.');
  
      setSession({ id: user.id, name: user.name, email: user.email });
      alert('Giriş başarılı! Yönlendiriliyorsun...');
      if (location.pathname.endsWith('auth.html') || location.pathname.endsWith('/auth')) {
        location.href = 'index.html';
      } else {
        updateHeaderAuth();
      }
    }
  
    /* ---------- Attach listeners if buttons exist ---------- */
    try {
      if (registerBtn) {
        // some HTML uses same class for login/register buttons, ensure we're binding register only to register box
        registerBtn.addEventListener('click', (ev) => {
          // determine if inside registerBox
          const box = registerBtn.closest('#registerBox') || registerBtn.closest('.auth-box');
          // if the button text indicates register, use register
          const txt = (registerBtn.textContent || '').toLowerCase();
          if (txt.includes('kayıt') || txt.includes('oluştur') || (regEmailEl && regNameEl)) {
            handleRegister(ev);
          } else {
            // fallback: treat as login
            handleLogin(ev);
          }
        });
      }
  
      if (loginBtn) {
        loginBtn.addEventListener('click', (ev) => {
          const txt = (loginBtn.textContent || '').toLowerCase();
          if (txt.includes('giriş') || txt.includes('login')) {
            handleLogin(ev);
          } else {
            handleRegister(ev);
          }
        });
      }
    } catch (err) {
      console.warn('Auth attach err', err);
    }
  
    /* ---------- Header update (show username / logout) ---------- */
    function updateHeaderAuth() {
      const session = getSession();
      const nav = document.querySelector('.nav-container') || document.querySelector('nav');
      if (!nav) return;
  
      // remove existing auth-display if any
      const old = document.getElementById('authDisplaySpan');
      if (old) old.remove();
  
      if (session && session.name) {
        const span = document.createElement('span');
        span.id = 'authDisplaySpan';
        span.style.marginLeft = '18px';
        span.style.color = '#cfefff';
        span.style.fontWeight = '600';
        span.innerHTML = `Hoşgeldin, ${escapeHtml(session.name)} &nbsp; <a href="#" id="logoutLink" style="color:#9ed7ff; text-decoration:none; margin-left:10px;">Çıkış</a>`;
        // append to nav-container
        nav.appendChild(span);
  
        const logoutLink = document.getElementById('logoutLink');
        if (logoutLink) {
          logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            clearSession();
            // reload page to update UI
            location.reload();
          });
        }
      } else {
        // no session - optionally add login link
        // nothing to do
      }
    }
  
    // small helper
    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }
  
    /* ---------- Auto-run to update header if on any page ---------- */
    try { updateHeaderAuth(); } catch (e) { /* ignore */ }
  
    /* ---------- Expose functions globally (optional) ---------- */
    window.authHelpers = { handleRegister, handleLogin, getUsers, getSession, clearSession, updateHeaderAuth };
  
  })();
document.addEventListener('DOMContentLoaded', function() {
    // HTML'den elemanları seçme
    const openBtn = document.getElementById('open-contact-btn');
    const closeBtn = document.getElementById('close-btn');
    const modal = document.getElementById('contact-modal');

    // 1. AÇMA İŞLEMİ (Sabit butona tıklanınca)
    openBtn.addEventListener('click', function() {
        modal.style.display = 'block'; // Modalı görünür yap
        // Animasyon için 'active' sınıfını ekle (CSS'teki kayma animasyonu başlar)
        setTimeout(() => {
            modal.classList.add('active');
        }, 10); // Küçük bir gecikme CSS geçişi için gerekli

        // Sabit butonu gizle (isteğe bağlı)
        openBtn.style.display = 'none';
    });

    // 2. KAPATMA İŞLEMİ (X butonuna tıklanınca)
    closeBtn.addEventListener('click', function() {
        // Animasyonu tersine çevir
        modal.classList.remove('active');
        
        // Animasyon bitince display:none yap (400ms CSS geçiş süremiz var)
        setTimeout(() => {
            modal.style.display = 'none';
            openBtn.style.display = 'block'; // Sabit butonu tekrar göster
        }, 400); 
    });

    // 3. Modalı Kapatma (Modal dışına tıklanınca)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                openBtn.style.display = 'block';
            }, 400);
        }
    });
});