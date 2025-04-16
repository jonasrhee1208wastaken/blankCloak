// module.js
function cloak(url) {
  if (typeof window === 'undefined') {
    throw new Error('This function can only be run in a browser environment.');
  }

  let maskedWindow = window.open();

  const doc = maskedWindow.document;
  doc.title = '';

  let embed = doc.createElement('embed');

  embed.src = url.includes('https://') || url.includes('http://') ? url : 'https://' + url;
  embed.width = '100%';
  embed.height = '100%';
  embed.style.position = 'fixed';
  embed.style.top = '0';
  embed.style.left = '0';

  let script = doc.createElement('script');
  script.innerHTML = `
    window.onbeforeunload = function() {
      return "Reloading will destroy the iframe.";
    };
  `;

  doc.body.appendChild(embed);
  doc.body.appendChild(script);

  window.location.href = 'https://google.com';
  window.close();
}

module.exports = cloak;
