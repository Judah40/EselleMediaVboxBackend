// services/storageService.js
const { supabaseBucket } = require("../config/default.config");
const { randomUUID } = require("crypto");
const { supabaseClient } = require("../config/supabase.config");

/**
 * Upload a file
 */
async function uploadFile(buffer, mimetype, folder = "", videoName) {
  const fileName = `${folder}${videoName ? videoName : randomUUID()}`;
  const { data, error } = await supabaseClient.storage
    .from(supabaseBucket)
    .upload(fileName, buffer, {
      contentType: mimetype,
      upsert: true, // replaces file if exists
    });

  if (error) throw error;

  // Get public URL
  const { data: publicUrl } = supabaseClient.storage
    .from(supabaseBucket)
    .getPublicUrl(fileName);

  return { path: data.path, url: publicUrl.publicUrl };
}

/**
 * Get file public URL
 */
async function getFileUrl(path) {
  console.log(supabaseBucket, path);
  const { data, error } = await supabaseClient.storage
    .from(supabaseBucket)
    .createSignedUrl(path, 3200);
  // console.log(data, error);
  return data.signedUrl;
}

/**
 * Delete a file
 */
async function deleteFile(path) {
  const { error } = await supabaseClient.storage
    .from(supabaseBucket)
    .remove([path]);
  if (error) throw error;
  return true;
}

/**
 * Replace a file (delete + upload new one)
 */
async function updateFile(oldPath, buffer, mimetype, folder = "") {
  await deleteFile(oldPath);
  return await uploadFile(buffer, mimetype, folder);
}

module.exports = {
  uploadFile,
  getFileUrl,
  deleteFile,
  updateFile,
};
