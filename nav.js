// nav.js
fetch('nav.html')
  .then(response => response.text())
  .then(html => {
    const header = document.getElementById('site-header');
    if (header) header.innerHTML = html;
  });

let toastTimeout;

async function copyEmail(email) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(email);
      return;
    } catch {}
  }

  const field = document.createElement('textarea');
  field.value = email;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();

  if (!copied) throw new Error('Clipboard copy failed');
}

function showCopyToast(message, failed = false) {
  let toast = document.getElementById('site-copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-copy-toast';
    toast.className = 'site-copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.toggle('is-error', failed);
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
}

document.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy-email]');
  if (!button) return;

  const email = button.dataset.copyEmail;
  try {
    await copyEmail(email);
    showCopyToast(`已复制邮箱地址：${email}`);
  } catch {
    showCopyToast(`复制失败，请手动复制：${email}`, true);
  }
});