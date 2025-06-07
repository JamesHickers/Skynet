document.addEventListener("DOMContentLoaded", function() {
  var installBtn = document.getElementById("installBtn");

  var downloadURL = "https://example.com/Skynet.exe"; // download url (*/ω＼*)

  if (installBtn) {
    installBtn.addEventListener("click", function() {
      var link = document.createElement("a");
      link.href = downloadURL;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
