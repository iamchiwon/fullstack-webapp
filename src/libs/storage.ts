import { Schema } from "@amplify/data/resource";
import outputs from "@root/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { getUrl, uploadData } from "aws-amplify/storage";
import { ImageItem } from "../shared/types/ImageItem";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const uploadFile = (file: File) => {
  const result = uploadData({
    path: `images/${file.name}`,
    data: file,
  });

  return {
    cancel: () => result.cancel(),
    promise: () => {
      return result.result.then(async (res) => {
        const url = await getUrl({
          path: res.path,
        });
        await _addFilePath(res.path, res.size ?? 0, url.url.toString());
        return { ...res, url };
      });
    },
  };
};

const _addFilePath = async (path: string, size: number, url: string) => {
  await client.models.Image.create({
    path,
    size,
    url,
  });
};

const fileList = async () => {
  const resource = await client.models.Image.list();
  return resource.data.map((item) => {
    return {
      id: item.id,
      path: item.path,
      size: item.size,
      url: item.url,
    } as ImageItem;
  });
};

const deleteFile = async (id: string) => {
  const item = await client.models.Image.get({ id });
  const path = item.data?.path;
  if (!path) throw new Error("Path not found");
  // await remove({ path });
  await client.models.Image.delete({ id });
};

const Storage = {
  uploadFile,
  fileList,
  deleteFile,
};

export default Storage;
