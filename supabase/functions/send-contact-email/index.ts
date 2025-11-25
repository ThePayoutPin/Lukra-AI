import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  business: string;
  listSize: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, business, listSize, message }: ContactFormData = await req.json();

    if (!name || !email || !business || !listSize || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'All fields are required' 
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name,
        email,
        business,
        list_size: listSize,
        message,
      }])
      .select();

    if (error) {
      console.error('Database error:', error);
      throw new Error(`Failed to save contact submission: ${error.message}`);
    }

    if (resendApiKey) {
      const emailBody = `New Contact Form Submission from Lukra AI Website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Business: ${business}
List Size: ${listSize}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this email to respond to ${name}.`;

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10b981; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #4b5563; }
    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border: 1px solid #e5e7eb; }
    .footer { background: #f3f4f6; padding: 15px; text-align: center; color: #6b7280; font-size: 12px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">${email}</div>
      </div>
      <div class="field">
        <div class="label">Business:</div>
        <div class="value">${business}</div>
      </div>
      <div class="field">
        <div class="label">List Size:</div>
        <div class="value">${listSize}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${message}</div>
      </div>
    </div>
    <div class="footer">
      Reply directly to this email to respond to ${name}
    </div>
  </div>
</body>
</html>`;

      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Lukra Contact Form <notifications@lukraai.com>',
            to: ['hello@lukraai.com'],
            reply_to: email,
            subject: `New Contact: ${name} from ${business}`,
            text: emailBody,
            html: emailHtml,
          }),
        });

        if (!resendResponse.ok) {
          const error = await resendResponse.text();
          console.error('Resend API error:', error);
        }
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact submission received successfully',
        data 
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});