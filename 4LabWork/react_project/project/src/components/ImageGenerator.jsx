import React, {useEffect} from 'react';
import OpenAI from "openai";
const OPEN_API_KEY ="*****"
const ImageGenerator = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const openai = new OpenAI({
                    apiKey: OPEN_API_KEY,
                    dangerouslyAllowBrowser: true
                });

                const chatCompletion = await openai.chat.completions.create({
                    messages: [{ role: "user", content: "Say this is a test" }],
                    model: "gpt-3.5-turbo",
                });
                console.log(chatCompletion)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            
        </div>
    );
};

export default ImageGenerator;