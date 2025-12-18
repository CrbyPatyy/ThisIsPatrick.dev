# Environment Variables Setup

This file documents the environment variables needed for the portfolio site.

## Setup Instructions

1. Create a file named `.env.local` in the root of this project
2. Add the following content:

```env
# Resend API Key - Get yours at https://resend.com/api-keys
RESEND_API_KEY=re_paste_your_api_key_here

# Your email address to receive contact form submissions  
CONTACT_EMAIL=Patrickpilapilvillanueva@gmail.com
```

3. Replace `re_paste_your_api_key_here` with your actual Resend API key
4. Restart the dev server after adding the file

## Getting Your Resend API Key

1. Go to [resend.com](https://resend.com)
2. Sign up/Login
3. Go to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file
