const query = new URLSearchParams(location.search).get("q");
if (query) {
  const target = new URL("https://kagi.com/search");
  target.searchParams.set("q", query);
  location.replace(target.href);
} else {
  document.querySelector("#status").textContent = "No search term received.";
}
