document.addEventListener("DOMContentLoaded", function() {
  var installBtn = document.getElementById("installBtn");

  var downloadURL = ""; // download url (*/ω＼*)

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
