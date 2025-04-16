function cloak(url) {
  // Check if the code is running in a browser environment
  if (typeof window === 'undefined') {
    throw new Error('This function can only be run in a browser environment.');
  }

  // Open a new browser window
  let maskedWindow = window.open();

  const doc = maskedWindow.document;
  // Set the title of the new document to an empty string
  doc.title = '';

  // Create an embed element to display the content
  let embed = doc.createElement('embed');

  // Set the source of the embed element, ensuring it starts with 'https://' or 'http://'
  embed.src = url.includes('https://') || url.includes('http://') ? url : 'https://' + url;
  embed.width = '100%';
  embed.height = '100%';
  embed.style.position = 'fixed';
  embed.style.top = '0';
  embed.style.left = '0';

  // Create a script element to handle the beforeunload event
  let script = doc.createElement('script');
  script.innerHTML = `
    window.onbeforeunload = function() {
      return "Reloading will destroy the iframe.";
    };
  `;

  // Append the embed and script elements to the document body
  doc.body.appendChild(embed);
  doc.body.appendChild(script);

  // Redirect the current window to Google
  window.location.href = 'https://google.com';
  // Close the current window
  window.close();
}
