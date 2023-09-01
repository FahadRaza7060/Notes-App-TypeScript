import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    "https://whvamsugwmmfvoercwof.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndodmFtc3Vnd21tZnZvZXJjd29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0OTYwOTAsImV4cCI6MjAwOTA3MjA5MH0.yhdH78rA0Qey-D3I0z727TB4EYo04U7ExVbQdE6xXJo"
)