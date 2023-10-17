import Prompt from "src/models/prompt";

export const GET = async (request) => {
    console.log('GET /api/prompt/all')
    try {
        const { data, error } = await supabase
            .from('Prompt')
            .select('*')
        if (error) {
            throw error;
        }

        console.log('data', data)

        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}
