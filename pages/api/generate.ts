import { GenerateContentCandidate, GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const {prompt} = req.body
			if (process.env.NEXT_PUBLIC_GEMINI_KEY) {
				const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY)
				const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'})
				const result = await model.generateContent(prompt)
				const output = (result.response.candidates as GenerateContentCandidate[])[0].content.parts[0].text
				return res.status(200).json({output})
			}
		} catch(e: any) {
			console.log('ERROR:', e)
			return res.status(500).json({message: e.message})
		}
	}
}
