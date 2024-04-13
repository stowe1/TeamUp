import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzeefjhtouhnswupofhp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6ZWVmamh0b3VobnN3dXBvZmhwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMjk4MDY5OCwiZXhwIjoyMDI4NTU2Njk4fQ.6gYRbH_bEHk0kmntL52JLwOwd6AfeoKyaz6KwHMnX1Y'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

