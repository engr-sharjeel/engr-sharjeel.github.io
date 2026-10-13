type FieldControl = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const forms = Array.from(document.querySelectorAll<HTMLFormElement>('[data-enquiry-form]'));

for (const form of forms) {
  const service = form.elements.namedItem('service');
  const preference = form.elements.namedItem('preferred_contact');
  const phone = form.elements.namedItem('phone');
  const summary = form.querySelector<HTMLElement>('[data-enquiry-errors]');
  const errorList = form.querySelector<HTMLUListElement>('[data-enquiry-error-list]');
  const submit = form.querySelector<HTMLButtonElement>('[data-enquiry-submit]');
  const phoneRequirement = form.querySelector<HTMLElement>('[data-phone-requirement]');
  if (!(service instanceof HTMLSelectElement) || !(preference instanceof HTMLSelectElement) || !(phone instanceof HTMLInputElement) || !summary || !errorList || !submit) continue;

  const controls = Array.from(form.elements).filter((item): item is FieldControl =>
    (item instanceof HTMLInputElement && item.type !== 'hidden' && item.name !== '_honey') || item instanceof HTMLSelectElement || item instanceof HTMLTextAreaElement);
  const knownServices = new Set(Array.from(service.options).map(option => option.value).filter(Boolean));
  const errors = new Map<string, string>();
  let submitting = false;
  const buttonLabel = submit.innerHTML;

  const fieldError = (name: string) => form.querySelector<HTMLElement>(`[data-field-error="${name}"]`);
  const phoneBased = () => preference.value === 'whatsapp' || preference.value === 'phone';
  const updatePhoneRequirement = () => {
    phone.required = phoneBased();
    if (phoneRequirement) phoneRequirement.textContent = phoneBased() ? '(required for your preferred reply)' : '(optional for Email)';
  };

  const validate = (control: FieldControl): string => {
    const value = control.value.trim();
    if (control.required && !value) {
      if (control.name === 'service') return 'Choose a service or Other / general enquiry.';
      if (control.name === 'name') return 'Enter your name.';
      if (control.name === 'email') return 'Enter your email address.';
      if (control.name === 'phone') return 'Enter a number for your Phone or WhatsApp reply.';
      if (control.name === 'message') return 'Describe the help you need.';
      return 'Complete this required field.';
    }
    if (control.name === 'service' && !knownServices.has(value)) return 'Choose a listed service or Other / general enquiry.';
    if (control.name === 'preferred_contact' && !['email', 'whatsapp', 'phone'].includes(value)) return 'Choose Email, WhatsApp or Phone.';
    if (!value) return '';
    if (control instanceof HTMLInputElement && control.maxLength > 0 && value.length > control.maxLength) return `Keep this field to ${control.maxLength} characters or fewer.`;
    if (control instanceof HTMLTextAreaElement && control.maxLength > 0 && value.length > control.maxLength) return `Keep this brief to ${control.maxLength} characters or fewer.`;
    if (control.name === 'email' && control instanceof HTMLInputElement) {
      if (control.validity.typeMismatch || /\s/.test(value) || !/^[^@]+@[^@]+$/.test(value)) return 'Enter a valid email address, such as name@example.com.';
    }
    if (control.name === 'phone') {
      const digits = value.replace(/\D/g, '');
      if (!/^\+?[\d\s().-]+(?:\s*(?:x|ext\.?)\s*\d+)?$/i.test(value) || digits.length < 7 || digits.length > 20) return 'Use an international phone number, including country code; spaces, brackets and hyphens are welcome.';
    }
    if (control.name === 'reference_url') {
      try {
        const url = new URL(value);
        if (!['http:', 'https:'].includes(url.protocol)) return 'Use a public link beginning with https:// or http://.';
      } catch {
        return 'Enter a complete reference link beginning with https:// or http://.';
      }
    }
    return '';
  };

  const showFieldError = (control: FieldControl, message: string) => {
    const output = fieldError(control.name);
    if (message) {
      errors.set(control.name, message);
      control.setAttribute('aria-invalid', 'true');
    } else {
      errors.delete(control.name);
      control.removeAttribute('aria-invalid');
    }
    if (output) {
      output.textContent = message;
      output.hidden = !message;
    }
  };

  const renderSummary = () => {
    errorList.replaceChildren();
    for (const control of controls) {
      const message = errors.get(control.name);
      if (!message) continue;
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${control.id}`;
      link.textContent = message;
      link.addEventListener('click', event => { event.preventDefault(); control.focus(); });
      item.append(link);
      errorList.append(item);
    }
    summary.hidden = errors.size === 0;
  };

  const resetSubmission = () => {
    submitting = false;
    submit.disabled = false;
    submit.innerHTML = buttonLabel;
    form.removeAttribute('aria-busy');
    form.removeAttribute('data-submitting');
    updatePhoneRequirement();
  };

  // Native constraints remain in the HTML when this enhancement is unavailable.
  form.noValidate = true;
  updatePhoneRequirement();
  const initialService = new URL(window.location.href).searchParams.get('service');
  if (initialService && knownServices.has(initialService)) service.value = initialService;

  preference.addEventListener('change', () => {
    updatePhoneRequirement();
    if (errors.has('phone')) { showFieldError(phone, validate(phone)); renderSummary(); }
  });
  for (const control of controls) {
    const recheck = () => {
      if (errors.has(control.name)) { showFieldError(control, validate(control)); renderSummary(); }
    };
    control.addEventListener('input', recheck);
    control.addEventListener('change', recheck);
  }

  form.addEventListener('submit', event => {
    if (submitting) { event.preventDefault(); return; }
    updatePhoneRequirement();
    for (const control of controls) showFieldError(control, validate(control));
    renderSummary();
    if (errors.size) {
      event.preventDefault();
      resetSubmission();
      summary.focus();
      return;
    }
    for (const control of controls) control.value = control.value.trim();
    submitting = true;
    submit.disabled = true;
    submit.textContent = 'Opening secure submission…';
    form.setAttribute('aria-busy', 'true');
    form.setAttribute('data-submitting', 'true');
    // Allow the documented native POST: only the provider accepts a submission.
  });

  window.addEventListener('pageshow', resetSubmission);
  form.addEventListener('reset', () => {
    errors.clear();
    for (const control of controls) showFieldError(control, '');
    renderSummary();
    // Reset default values first, then restore conditional requirements.
    queueMicrotask(resetSubmission);
  });

  for (const action of document.querySelectorAll<HTMLAnchorElement>('[data-service-select]')) {
    const serviceId = action.dataset.serviceSelect;
    if (!serviceId || !knownServices.has(serviceId)) continue;
    const target = new URL(action.href, window.location.href);
    if (target.origin !== location.origin || target.pathname !== location.pathname) continue;
    let destination: HTMLElement | null;
    try { destination = document.getElementById(decodeURIComponent(target.hash.slice(1))); } catch { continue; }
    if (!destination || (destination !== form && !destination.contains(form))) continue;
    action.addEventListener('click', event => {
      event.preventDefault();
      service.value = serviceId;
      showFieldError(service, '');
      renderSummary();
      window.history.replaceState(window.history.state, '', target.hash);
      destination.scrollIntoView({ block: 'start', behavior: 'instant' });
      service.focus({ preventScroll: true });
    });
  }
}
