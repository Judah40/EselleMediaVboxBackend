const { createClient } = require("@supabase/supabase-js");
const { supabaseUrl, supabaseKey } = require("./default.config");

exports.supabaseClient = createClient(supabaseUrl, supabaseKey);
