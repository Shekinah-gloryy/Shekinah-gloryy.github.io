 
 
 // Trigger Rick Roll download on the grey button


 document.getElementById('rick-download').addEventListener('click', function () {
    const link = document.createElement('a');
    link.href = 'Contents/Rickroll.gif';
    link.download = 'Tron_Ares_Leaked.gif'; // This is infact the rickroll
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  // Force <a>"watch it now" link to open in a new tab
  const watchLink = document.querySelector('a[href="Contents/Rickroll.gif"]');
  if (watchLink) {
    watchLink.setAttribute('target', '_blank');
    watchLink.setAttribute('rel', 'noopener noreferrer'); // security best practice
  }