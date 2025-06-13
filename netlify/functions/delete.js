const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, error } = await supabase
    .from('catatan')
    .delete()
    .eq('id', id);
  return {
    statusCode: error ? 500 : 200,
    body: JSON.stringify(error || data)
  };
};
