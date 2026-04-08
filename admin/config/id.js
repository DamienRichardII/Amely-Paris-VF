const { data, error } = await supabase
  .from('quote_requests')
  .select('*')
  .eq('id', devisId)
  .single()

const { error } = await supabase
  .from('quote_requests')
  .update({ status: newStatus })
  .eq('id', devisId)