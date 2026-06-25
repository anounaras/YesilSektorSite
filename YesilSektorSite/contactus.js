function sendEmail() {
    const templateParams = {
        name : document.querySelector("#name").value,
        emai : document.querySelector("#email").value,
        subject : document.querySelector("#subject").value,
        message : document.querySelector("#message").value,
    };

    emailjs.send("service_ppi2n0i","template_qdjz3s4", templateParams)
        .then(() => alert("Form Başarıyla Gönderildi!").catch(() => alert("Form gönderilemedi")));
}