import { NextApiRequest, NextApiResponse } from "next";
import { getSortedPostsData } from "../../lib/post";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const allPostData = getSortedPostsData();
	return res.status(200).json({ allPostData });
}
