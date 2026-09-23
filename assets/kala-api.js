/* Kala Art Wrap — tiny client for the CRM API (Supabase RPC, isolated `kaw_crm` schema).
   The publishable key is safe to ship: every table is locked, and only the
   `kaw_*` functions are callable. Admin functions require a CRM session token. */
(() => {
  const SUPABASE_URL = 'https://owarzgwthkfltqxtxikj.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_OHLm8aeQYwQideh-_5lz2w_TUT-OxIW';

  const MESSAGES = {
    name_required: 'Please tell us your name.',
    consent_required: 'Please tick the consent box so we can contact you.',
    contact_required: 'Please add your WhatsApp number or email so we can reply.',
    phone_invalid: 'That phone number doesn’t look right — please check it.',
    email_invalid: 'That email doesn’t look right — please check it.',
    too_many_requests: 'You’ve sent a few enquiries already — we’ll get back to you soon!',
    invalid_login: 'Wrong email or password.',
    locked_try_later: 'Too many attempts. Please wait 15 minutes and try again.',
    invalid_setup_code: 'That setup code is not valid.',
    already_set_up: 'The CRM is already set up — please log in.',
    password_too_short: 'Password must be at least 8 characters.',
    not_authorized: 'Your session has expired. Please log in again.',
    not_found: 'That lead no longer exists.'
  };

  async function rpc(fn, args = {}) {
    let res;
    try {
      res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
        method: 'POST',
        headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
      });
    } catch {
      const e = new Error('You seem to be offline. Please check your connection.');
      e.code = 'network';
      throw e;
    }
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!res.ok) {
      const key = data && data.message;
      const e = new Error(MESSAGES[key] || 'Something went wrong. Please try again.');
      e.code = key || res.status;
      throw e;
    }
    return data;
  }

  window.KalaAPI = { rpc, MESSAGES };
})();
