// Test script to verify Resend API configuration
// Run with: node test-resend.js

import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

const resend = new Resend(process.env.RESEND_API_KEY);

async function testResendSetup() {
  console.log('🧪 Testing Resend API Configuration...\n');

  // Test 1: Check API Key
  console.log('1️⃣ Checking API Key...');
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not found in .env.local');
    return;
  }
  console.log('✅ API Key found:', process.env.RESEND_API_KEY.substring(0, 10) + '...');

  // Test 2: Check Audience ID
  console.log('\n2️⃣ Checking Audience ID...');
  if (!process.env.RESEND_AUDIENCE_ID) {
    console.error('❌ RESEND_AUDIENCE_ID not found in .env.local');
    return;
  }
  console.log('✅ Audience ID found:', process.env.RESEND_AUDIENCE_ID);

  // Test 3: Fetch all audiences
  console.log('\n3️⃣ Fetching all audiences...');
  try {
    const { data: audiences } = await resend.audiences.list();
    console.log('✅ Found', audiences?.data?.length || 0, 'audience(s):');
    audiences?.data?.forEach((aud) => {
      console.log(`   - ${aud.name} (ID: ${aud.id})`);
      if (aud.id === process.env.RESEND_AUDIENCE_ID) {
        console.log('     ✅ This matches your RESEND_AUDIENCE_ID!');
      }
    });
  } catch (error) {
    console.error('❌ Failed to fetch audiences:', error.message);
    return;
  }

  // Test 4: Fetch contacts from the configured audience
  console.log('\n4️⃣ Fetching contacts from your audience...');
  try {
    const { data: contacts } = await resend.contacts.list({
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });
    console.log('✅ Found', contacts?.data?.length || 0, 'contact(s):');
    contacts?.data?.forEach((contact) => {
      console.log(`   - ${contact.email} (Unsubscribed: ${contact.unsubscribed})`);
    });
  } catch (error) {
    console.error('❌ Failed to fetch contacts:', error.message);
    return;
  }

  // Test 5: Check JWT Secret
  console.log('\n5️⃣ Checking JWT Secret...');
  if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET not found in .env.local');
    return;
  }
  console.log('✅ JWT Secret found (length:', process.env.JWT_SECRET.length, 'characters)');

  console.log('\n✅ All tests passed! Your Resend setup is ready.');
  console.log('\n📝 Next steps:');
  console.log('   1. Start your dev server: npm run dev');
  console.log('   2. Test subscription: POST http://localhost:4321/api/subscribe');
  console.log('   3. Check your email for verification link');
}

testResendSetup().catch(console.error);
