import { createClient } from '@supabase/supabase-js'

const URL = 'https://yumfkennibidosobzsjx.supabase.co'
const API_KEY = 'sb_publishable_qsosjRVPQ8oHohWixarBXg_wwy20NIv'

export const supabase = createClient(URL, API_KEY)
