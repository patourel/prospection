// utils/fetchContact.js

export async function getBestContact(companyName) {
  const hunterApiKey = "d5e014a7d2dc0a18e0717b88b40617b57cd70257";
  const scrapingdogApiKey = "680361627eff7d27485c7727";

  // 1. Get domain from Hunter.io
  const domainRes = await fetch(`https://api.hunter.io/v2/domain-search?company=${encodeURIComponent(companyName)}&api_key=${hunterApiKey}`);
  const domainData = await domainRes.json();

  const domain = domainData.data?.domain;
  if (!domain) return null;

  // 2. Get emails from domain
  const emailRes = await fetch(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${hunterApiKey}`);
  const emailData = await emailRes.json();

  const contacts = emailData.data?.emails || [];

  // 3. Filter the best contact (example: sales, marketing, CEO)
  const best = contacts.find(c =>
    /marketing|sales|business|commercial|ceo|dirigeant|direction/i.test(c.position || "")
  ) || contacts[0];

  if (!best) return null;

  // 4. Scrapingdog fallback (if more info needed)
  const dogRes = await fetch(`https://api.scrapingdog.com/linkedin?api_key=${scrapingdogApiKey}&type=company&query=${encodeURIComponent(companyName)}`);
  const dogData = await dogRes.json();

  return {
    firstName: best.first_name,
    lastName: best.last_name,
    email: best.value,
    position: best.position || "Non précisé",
    company: companyName,
    domain
  };
}
// JavaScript Document