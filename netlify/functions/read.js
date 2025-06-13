const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async () => {
  const { data, error } = await supabase
    .from('catatan')
    .select('*')
    .order('id', { ascending: false });
  return {
    statusCode: error ? 500 : 200,
    body: JSON.stringify(error || data)
  };
};
