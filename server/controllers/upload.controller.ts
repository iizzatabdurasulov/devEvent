import type { NextFunction, Request, Response } from "express";
import { supabase } from "../config/supabase";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image data is required" });
    }

    console.log("📤 Uploading image to Supabase...");

    // Remove "data:image/jpeg;base64," from base64
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // define file extension
    const fileExt = image.match(/^data:image\/(\w+);base64,/)?.[1] || "jpg";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // upload to supabase storage
    const { data, error } = await supabase.storage
      .from("event-images") // supabase bucket's name
      .upload(fileName, buffer, {
        contentType: `image/${fileExt}`,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("❌ Supabase upload error:", error);
      throw error;
    }

    // get public url
    const { data: publicData } = supabase.storage
      .from("event-images") 
      .getPublicUrl(fileName);

    console.log("✅ Image uploaded:", publicData.publicUrl);

    res.json({
      url: publicData.publicUrl,
      fileName: fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    next(error);
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).json({ message: "File name is required" });
    }

    const { error } = await supabase.storage
      .from("event-images") 
      .remove([fileName]);

    if (error) {
      console.error("Delete error:", error);
      throw error;
    }

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    next(error);
  }
};