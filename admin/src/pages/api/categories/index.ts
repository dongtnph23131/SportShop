import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.categories.findMany();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json("error");
  }
}
