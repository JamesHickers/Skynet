document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm');
  const fileInput = document.getElementById('fileInput');

  if (!form || !fileInput) {
    console.warn('Upload form or file input not found on this page.');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!fileInput.files.length) {
      alert('No file selected!');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    const response = await fetch('/upload', { // Local dev endpoint
    // const response = await fetch('https://yourdomain.com/upload', { // 🌐 Uncomment when your server’s live
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok) {
      alert('Uploaded! File URL: ' + result.url);
    } else {
      alert('Upload failed: ' + result.error);
    }
  });
});
