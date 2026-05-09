DROP POLICY "Anyone can join the waitlist" ON public.waitlist_signups;

CREATE POLICY "Anyone can join the waitlist"
ON public.waitlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND length(email) BETWEEN 3 AND 255
  AND position('@' IN email) > 1
  AND (role IS NULL OR length(role) <= 50)
  AND (university IS NULL OR length(university) <= 120)
  AND (referral_code IS NULL OR length(referral_code) <= 50)
  AND (source IS NULL OR length(source) <= 50)
  AND (user_agent IS NULL OR length(user_agent) <= 500)
);
