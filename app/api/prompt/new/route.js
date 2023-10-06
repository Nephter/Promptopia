import { supabase } from 'src/lib/supabase.js';

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();

    try {
        const { data, error } = await supabase
            .from('Prompt')
            .insert([{ userId, prompt, tag }]);
        if (error) {
            throw error;
        }
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        console.error('Error occurred:', error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};