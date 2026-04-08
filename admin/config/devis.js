const { data, error } = await supabase
  .from('quote_requests')
  .select('*')
  .order('created_at', { ascending: false })