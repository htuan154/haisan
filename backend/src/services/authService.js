const { createSupabaseServiceClient, createSupabaseClient } = require('../utils/supabase');
const {
  hashPassword,
  verifyPassword,
  signAccessToken,
  sanitizeAccount,
} = require('../utils/auth');
const { ROLE } = require('../models/enums');

function getSupabase() {
  try {
    return createSupabaseServiceClient();
  } catch {
    return createSupabaseClient();
  }
}

async function findAccountByIdentity(supabase, { email, phone_number }) {
  if (email) {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('email', email)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }
  }

  if (phone_number) {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('phone_number', phone_number)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data) {
      return data;
    }
  }

  return null;
}

async function register(payload) {
  const supabase = getSupabase();

  const {
    email,
    phone_number,
    password,
    full_name,
    representative_name,
    address,
    role = 'Customer',
  } = payload;

  if (!full_name || !password) {
    throw new Error('full_name and password are required.');
  }

  if (!email && !phone_number) {
    throw new Error('email or phone_number is required.');
  }

  if (!ROLE.includes(role)) {
    throw new Error('Invalid role value.');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const existingAccount = await findAccountByIdentity(supabase, { email, phone_number });

  if (existingAccount) {
    throw new Error('Account already exists with the same email or phone number.');
  }

  const password_hash = await hashPassword(password);

  const { data, error } = await supabase
    .from('accounts')
    .insert({
      email: email || null,
      phone_number: phone_number || null,
      password_hash,
      full_name,
      representative_name: representative_name || null,
      address: address || null,
      role,
    })
    .select('*')
    .single();

  if (error) {
    throw error;
  }

  const account = sanitizeAccount(data);
  const accessToken = signAccessToken(account);

  return {
    account,
    accessToken,
  };
}

async function login(payload) {
  const supabase = getSupabase();

  const { email, phone_number, password } = payload;

  if ((!email && !phone_number) || !password) {
    throw new Error('email or phone_number, and password are required.');
  }

  const account = await findAccountByIdentity(supabase, { email, phone_number });
  if (!account) {
    throw new Error('Invalid credentials.');
  }

  if (!account.is_active) {
    throw new Error('Account is inactive.');
  }

  const isPasswordValid = await verifyPassword(password, account.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials.');
  }

  const safeAccount = sanitizeAccount(account);
  const accessToken = signAccessToken(safeAccount);

  return {
    account: safeAccount,
    accessToken,
  };
}

module.exports = {
  register,
  login,
};
