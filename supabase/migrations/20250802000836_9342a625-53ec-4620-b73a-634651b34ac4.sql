-- Enable RLS and create policies for properties table
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view properties (public real estate listings)
CREATE POLICY "Properties are viewable by everyone" 
ON public.properties 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert properties (for CRM)
CREATE POLICY "Anyone can insert properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to update properties (for CRM)
CREATE POLICY "Anyone can update properties" 
ON public.properties 
FOR UPDATE 
USING (true);

-- Create policy to allow anyone to delete properties (for CRM)
CREATE POLICY "Anyone can delete properties" 
ON public.properties 
FOR DELETE 
USING (true);

-- Also fix other tables with similar issues
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cities are viewable by everyone" ON public.cities FOR SELECT USING (true);

ALTER TABLE public.localities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Localities are viewable by everyone" ON public.localities FOR SELECT USING (true);

ALTER TABLE public.typologies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Typologies are viewable by everyone" ON public.typologies FOR SELECT USING (true);

ALTER TABLE public."Testimonials" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Testimonials are viewable by everyone" ON public."Testimonials" FOR SELECT USING (true);