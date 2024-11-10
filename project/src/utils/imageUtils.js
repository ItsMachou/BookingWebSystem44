// utils/imageUtils.js
import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabaseClient'; // Adjust the import according to your project structure

const uploadImage = async (file) => {
  if (!file) {
    console.error("No file selected");
    return { error: "No file selected" };
  }

  const uniqueFileName = `${uuidv4()}-${file.name}`;
  const { data, error } = await supabase
    .storage
    .from('image_storage')
    .upload(`public/${uniqueFileName}`, file);

  if (error) {
    console.error("Error uploading image:", error.message);
    return { error: error.message };
  } else {
    const publicURL = `https://fxnbmnduxydjsfkzsqtl.supabase.co/storage/v1/object/public/image_storage/public/${uniqueFileName}`;
    console.log("Image uploaded successfully:", publicURL);
    return { publicURL };
  }
};

const uploadBlog = async (file) => {
  if (!file) {
    console.error("No file selected");
    return { error: "No file selected" };
  }

  const uniqueFileName = `${uuidv4()}-${file.name}`;
  const { data, error } = await supabase
    .storage
    .from('blogs_img')
    .upload(`public_blogs/${uniqueFileName}`, file);

  if (error) {
    console.error("Error uploading image:", error.message);
    return { error: error.message };
  } else {
    const publicURL = `https://fxnbmnduxydjsfkzsqtl.supabase.co/storage/v1/object/public/blogs_img/public_blogs/${uniqueFileName}`;
    console.log("Image uploaded successfully:", publicURL);
    return { publicURL };
  }
};

export { uploadImage, uploadBlog };
