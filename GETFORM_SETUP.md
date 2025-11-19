# Getform.io Setup Instructions

This project uses [Getform.io](https://getform.io/) to collect phone number submissions.

## Setup Steps

1. **Create a Getform.io Account**
   - Go to https://getform.io/
   - Click "Get started for free"
   - Sign up for a free account

2. **Create a New Form**
   - Once logged in, click "Create Form" or "New Form"
   - Give it a name like "Telos House Phone Numbers"

3. **Get Your Form Endpoint**
   - After creating the form, you'll get a unique endpoint URL
   - It will look like: `https://getform.io/f/YOUR_UNIQUE_KEY`

4. **Update Your Code**
   - Open `app/page.tsx`
   - Find the line that says:
     ```typescript
     await fetch('https://getform.io/f/YOUR_FORM_ENDPOINT', {
     ```
   - Replace `YOUR_FORM_ENDPOINT` with your actual form key

5. **Test Your Form**
   - Run your development server: `npm run dev`
   - Navigate to the party line page
   - Enter a phone number and click the arrow
   - Check your Getform.io dashboard to see the submission

## Features Enabled

- Phone number collection with country code
- Automatic submission to Getform.io
- Email notifications (configure in Getform.io dashboard)
- Integration with other tools via Getform.io (Slack, Zapier, etc.)

## Free Tier Limits

Getform.io's free tier includes:
- 50 submissions per month
- Email notifications
- File uploads
- Spam filtering

For more submissions, upgrade to a paid plan.

