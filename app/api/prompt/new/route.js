import { supabase } from 'src/lib/supabase.js';

export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();
    // const token = req.headers.get('Authorization');
    // console.log('token', token)
    try {
        // if (!token) {
        //     return new Response("Unauthorized", { status: 401 });
        // }
        const { data, error } = await supabase
            .from('Prompt')
            .insert([{ userId, prompt, tag }]);
        if (error) {
            throw error;
        }
        return new Response(JSON.stringify(data), { status: 201 });
        return
    } catch (error) {
        console.error('Error occurred:', error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};