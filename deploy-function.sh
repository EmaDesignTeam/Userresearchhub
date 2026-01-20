#!/bin/bash

# ResearchHub - Deploy Edge Function to Supabase
# This script deploys the API server to Supabase Edge Functions

set -e

PROJECT_REF="orygtvywltqgjgzchavf"
FUNCTION_NAME="make-server-f854c4f1"

echo "🚀 Deploying ResearchHub Edge Function to Supabase..."
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo ""
    echo "📦 Install it with:"
    echo "   macOS:   brew install supabase/tap/supabase"
    echo "   Windows: scoop install supabase"
    echo "   Linux:   brew install supabase/tap/supabase"
    echo ""
    echo "Or visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

echo "✅ Supabase CLI found"

# Check if user is logged in
if ! supabase projects list &> /dev/null; then
    echo ""
    echo "🔐 Please login to Supabase first:"
    supabase login
fi

echo "✅ Logged in to Supabase"
echo ""

# Link the project
echo "🔗 Linking to project ${PROJECT_REF}..."
supabase link --project-ref $PROJECT_REF

echo ""
echo "📦 Deploying function: ${FUNCTION_NAME}..."
echo ""

# Deploy the function
cd supabase/functions
supabase functions deploy $FUNCTION_NAME --project-ref $PROJECT_REF

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🔍 Test your function:"
echo "   https://${PROJECT_REF}.supabase.co/functions/v1/${FUNCTION_NAME}/health"
echo ""
echo "📊 View logs:"
echo "   supabase functions logs ${FUNCTION_NAME}"
echo ""
echo "🎉 Your ResearchHub API is now live!"
