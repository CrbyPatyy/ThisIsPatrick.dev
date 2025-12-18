'use server';

import { Resend } from 'resend';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

interface FormResponse {
    success: boolean;
    message: string;
    error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData): Promise<FormResponse> {
    // Validation
    if (!formData.name?.trim()) {
        return { success: false, message: 'Name is required', error: 'VALIDATION_ERROR' };
    }

    if (!formData.email?.trim()) {
        return { success: false, message: 'Email is required', error: 'VALIDATION_ERROR' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return { success: false, message: 'Invalid email format', error: 'VALIDATION_ERROR' };
    }

    if (!formData.subject?.trim()) {
        return { success: false, message: 'Subject is required', error: 'VALIDATION_ERROR' };
    }

    if (!formData.message?.trim()) {
        return { success: false, message: 'Message is required', error: 'VALIDATION_ERROR' };
    }

    if (formData.message.length < 10) {
        return { success: false, message: 'Message must be at least 10 characters', error: 'VALIDATION_ERROR' };
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'patrickpilapilvillanueva@gmail.com',
            replyTo: formData.email,
            subject: `Portfolio: ${formData.subject}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #1a1a1a; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px; margin-bottom: 20px;">
                        New Contact Form Submission
                    </h2>
                    
                    <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                        <p style="margin: 0 0 10px 0;"><strong style="color: #666;">From:</strong> ${formData.name}</p>
                        <p style="margin: 0 0 10px 0;"><strong style="color: #666;">Email:</strong> <a href="mailto:${formData.email}" style="color: #0066cc;">${formData.email}</a></p>
                        <p style="margin: 0;"><strong style="color: #666;">Subject:</strong> ${formData.subject}</p>
                    </div>
                    
                    <div style="background: #fff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px;">
                        <h3 style="color: #1a1a1a; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
                        <p style="color: #333; line-height: 1.6; white-space: pre-wrap; margin: 0;">${formData.message}</p>
                    </div>
                    
                    <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
                        This email was sent from your portfolio contact form.
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return {
                success: false,
                message: 'Failed to send email. Please try again later.',
                error: 'SEND_ERROR'
            };
        }

        console.log('Email sent successfully:', data);
        return {
            success: true,
            message: "Message sent successfully! I'll get back to you within 24 hours."
        };

    } catch (error) {
        console.error('Send email error:', error);
        return {
            success: false,
            message: 'An unexpected error occurred. Please try again.',
            error: 'SERVER_ERROR'
        };
    }
}

