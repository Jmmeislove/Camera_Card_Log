
const form = document.getElementById('card-form');
const title = document.getElementById('dynamic-title');
const cardImage = document.getElementById('card-image');
const reelNumberDiv = document.getElementById('reel-number');
const cardIdDiv = document.getElementById('card-id');

const cardTypeImages = {
  'Sony SxS': 'images/sony-sxs.png',
  'Sony AXS': 'images/sony-axs.png',
  'Compact Flash2': 'images/cf2.png',
  'CFast': 'images/cfast.png',
  'Compact Flash': 'images/cf.png',
  'SD Card': 'images/sd-card.png',
  'Sony XQD': 'images/xqd.png',
  'RED Mini-Mag': 'images/red-mag.png',
  'CFexpress Type A': 'images/cfexpress-a.png',
  'CFexpress Type B': 'images/cfexpress-b.png',
  'P2 Card': 'images/p2-card.png',
  'Atomos Master Caddy': 'images/atomos.png',
  'Blackmagic SSD': 'images/blackmagic-ssd.png'
};

form.addEventListener('input', () => {
  const shootInfo = form['Shoot Info'].value;
  const reelNumber = form['Reel Number'].value;
  const cardType = form['Card Type'].value;
  const cardId = form['Card ID'].value;

  title.textContent = `${shootInfo} - ${reelNumber} - ${cardType}`;

  cardImage.src = cardTypeImages[cardType] || 'images/sd-card.png';
  reelNumberDiv.textContent = reelNumber;
  cardIdDiv.textContent = cardId;
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => data[key] = value);

  try {
    await fetch('https://script.google.com/macros/s/AKfycby00wx3s80rBwz92Drjhyz47ckoJ1o4jK2tMdP9RpqIzdCPWMZZIsIxP-CjIxksArkG/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    alert('Data submitted successfully!');
    form.reset();
  } catch (error) {
    console.error('Error submitting data', error);
    alert('Failed to submit data');
  }
});

window.generateJPEG = () => {
  html2canvas(document.querySelector('.image-container')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'camera-card.jpg';
    link.href = canvas.toDataURL();
    link.click();
  });
};
