
import { supabase } from "src/lib/supabase";

export const GET = async (request) => {
    try {
        const { data, error } = await supabase
            .from('Prompt')
            .select('*')
        if (error) {
            throw error;
        }
        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}