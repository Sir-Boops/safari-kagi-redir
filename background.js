async function installRules() {
  const response = await fetch(browser.runtime.getURL("redirects.json"));
  const conditions = await response.json();
  const target = browser.runtime.getURL("handoff.html") + "?q=\\1";
  await browser.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [2, 3],
    addRules: conditions.map((condition, index) => ({
      id: index + 2,
      priority: 10,
      condition,
      action: {type: "redirect", redirect: {regexSubstitution: target}}
    }))
  });
}

browser.runtime.onInstalled.addListener(() => {
  installRules().catch(console.error);
});
browser.runtime.onStartup.addListener(() => {
  installRules().catch(console.error);
});
