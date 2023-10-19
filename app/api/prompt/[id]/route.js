import Prompt from "src/models/prompt";
import { connectToDB } from "src/utils/database";
import { supabase } from "src/lib/supabase"

export const GET = async (request, { params }) => {
    // console.log('request', request)
    // console.log('params', params)
    // async function fetchItemFromBucket(fileName) {
    //     try {
    //         // Specify the bucket name
    //         const bucketName = 'promptopiaAvatars';

    //         // Use the "from" method to create a reference to the bucket and file
    //         const fileRef = supabase.storage.from(bucketName).createFile(fileName);

    //         // Use the "download" method to download the file
    //         const { data, error } = await fileRef.download();

    //         if (error) {
    //             console.error('Error downloading file:', error);
    //             return null;
    //         }

    //         // The data will contain the file content as a Buffer
    //         return data;
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //         return null;
    //     }
    // }
    // fetchItemFromBucket(fileName)
    //     .then((fileContent) => {
    //         if (fileContent) {
    //             // Handle the file content (e.g., display or save it)
    //             console.log('File content:', fileContent);
    //         } else {
    //             console.log('File not found or an error occurred.');
    //         }
    //     })
    //     .catch((error) => {
    //         console.error('Error:', error);
    //     });

}

// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB()

//         const prompt = await Prompt.findById(params.id).populate("creator")
//         if (!prompt) return new Response("Prompt Not Found", { status: 404 });

//         return new Response(JSON.stringify(prompt), { status: 200 })

//     } catch (error) {
//         return new Response("Internal Server Error", { status: 500 });
//     }
// }

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};
