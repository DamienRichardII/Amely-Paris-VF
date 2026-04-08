(function () {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  const submitBtn = document.getElementById('quoteSubmitBtn');
  const messageBox = document.getElementById('quoteFormMessage');

  function showMessage(text, type) {
    if (!messageBox) return;
    messageBox.textContent = text || '';
    messageBox.className = text ? 'form-message ' + type : 'form-message';
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Envoi en cours…' : 'Envoyer la demande';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!window.supabase) {
      showMessage("Le client Supabase n'est pas chargé.", 'error');
      return;
    }

    const formData = new FormData(form);

    const payload = {
      full_name: (formData.get('fullName') || '').toString().trim(),
      email: (formData.get('email') || '').toString().trim(),
      phone: (formData.get('phone') || '').toString().trim() || null,
      event_type: (formData.get('eventType') || '').toString().trim() || null,
      event_date: (formData.get('eventDate') || '').toString().trim() || null,
      guest_count: Number(formData.get('guestCount')) || null,
      location: (formData.get('location') || '').toString().trim() || null,
      budget: (formData.get('budget') || '').toString().trim() || null,
      message: (formData.get('message') || '').toString().trim()
    };

    if (!payload.full_name || !payload.email || !payload.message) {
      showMessage('Merci de remplir les champs obligatoires.', 'error');
      return;
    }

    setLoading(true);
    showMessage('', '');

    const { error } = await window.supabase
      .from('quote_requests')
      .insert([payload]);

    setLoading(false);

    if (error) {
      showMessage("Erreur lors de l'envoi de la demande : " + error.message, 'error');
      return;
    }

    showMessage('Votre demande de devis a bien été envoyée.', 'success');
    form.reset();
  });
})();
