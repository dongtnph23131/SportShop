import Banner from "../models/banner";

export const getBanners = async (req, res) => {
    try {
        const banners =  await Banner.find();
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json ({message: error.message})
    }
}