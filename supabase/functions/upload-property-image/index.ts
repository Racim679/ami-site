import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Upload function called')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Supabase client created')

    const formData = await req.formData()
    const file = formData.get('file') as File
    const propertyId = formData.get('propertyId') as string
    const bucketType = formData.get('bucketType') as string
    const tag = formData.get('tag') as string || 'secondary'

    console.log('Form data parsed:', { fileName: file?.name, propertyId, bucketType, tag })

    if (!file || !propertyId) {
      console.error('Missing file or propertyId')
      return new Response(
        JSON.stringify({ error: 'File and propertyId are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Determine which bucket to use
    const bucketName = bucketType === 'main' ? 'photo_principale' : 'property-images'
    
    // Create unique filename with folder structure based on tag
    const fileExt = file.name.split('.').pop()
    const folder = tag === 'main' ? 'main' : 'gallery'
    const fileName = `${propertyId}/${folder}/${crypto.randomUUID()}.${fileExt}`

    console.log('Uploading file to bucket:', bucketName, 'fileName:', fileName)

    // Convert File to ArrayBuffer first
    const fileBuffer = await file.arrayBuffer()
    
    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return new Response(
        JSON.stringify({ error: 'Failed to upload image', details: uploadError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Upload successful:', uploadData)

    // Get public URL
    const { data: urlData } = supabaseClient.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    console.log('Public URL generated:', urlData.publicUrl)

    return new Response(
      JSON.stringify({ 
        url: urlData.publicUrl,
        path: fileName,
        storage_path: fileName,
        bucket_name: bucketName,
        tag: tag
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in upload-property-image function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})