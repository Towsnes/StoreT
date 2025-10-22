document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", handleSubmit);
});

function handleSubmit(e) {
    e.preventDefault();

    const name = document.querySelector('input[type="text"]').value.trim();
    const phone = document.querySelector('input[type="tel"]').value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const message = document.querySelector('textarea').value.trim();

    if (!name) return alert('⚠️ Vui lòng nhập tên!');
    if (!phone) return alert('⚠️ Vui lòng nhập số điện thoại!');
    
    if (isNaN(phone)) return alert('⚠️ Số điện thoại chỉ được chứa chữ số!');
    
    if (!email) return alert('⚠️ Vui lòng nhập email!');
    if (!email.endsWith('@gmail.com')) return alert('⚠️ Email phải có đuôi @gmail.com!');
    if (!message) return alert('⚠️ Vui lòng nhập nội dung tin nhắn!');

    alert(
        '✅ Tin nhắn đã được gửi thành công!\n\n' +
        `👤 Tên: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n💬 Nội dung: ${message}`
    );

    e.target.reset();
}
