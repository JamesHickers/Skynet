// CORS.js
(async () => {
  try {
    const res = await fetch("https://corsproxy.io/?https://catbox.moe/user/api.php", {
      method: "POST",
      body: new FormData(), // you can modify this
    });

    const data = await res.text(); // or .json() if you expect JSON
    console.log("It actually worked?", data);
  } catch (err) {
    console.error("CORS slapped you:", err);
  }
})();
